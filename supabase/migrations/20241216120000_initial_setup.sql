-- supabase/migrations/20241216120000_initial_setup.sql

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE public.user_role AS ENUM ('admin', 'user', 'premium');
CREATE TYPE public.post_status AS ENUM ('draft', 'scheduled', 'published', 'failed');
CREATE TYPE public.ai_model_type AS ENUM ('openrouter/auto', 'openrouter/anthropic/claude-3-haiku', 'openrouter/meta-llama/llama-3.1-8b-instruct:free', 'openrouter/microsoft/phi-3-mini-128k-instruct:free', 'openrouter/google/gemma-2-9b-it:free');
CREATE TYPE public.automation_status AS ENUM ('active', 'paused', 'stopped', 'error');

-- User profiles table (intermediary for auth.users)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'user'::public.user_role,
    avatar_url TEXT,
    company TEXT,
    industry TEXT,
    subscription_tier TEXT DEFAULT 'free',
    credits_remaining INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- LinkedIn accounts table
CREATE TABLE public.linkedin_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    account_name TEXT NOT NULL,
    account_email TEXT NOT NULL,
    profile_url TEXT,
    avatar_url TEXT,
    account_type TEXT DEFAULT 'personal',
    is_active BOOLEAN DEFAULT true,
    session_token TEXT,
    session_expires_at TIMESTAMPTZ,
    last_sync_at TIMESTAMPTZ,
    automation_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- AI agents table
CREATE TABLE public.ai_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    agent_name TEXT NOT NULL,
    agent_type TEXT NOT NULL, -- 'content_generator', 'scheduler', 'engagement_analyzer', etc.
    model_config JSONB DEFAULT '{}',
    prompt_template TEXT,
    status public.automation_status DEFAULT 'active'::public.automation_status,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Content posts table
CREATE TABLE public.content_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    linkedin_account_id UUID REFERENCES public.linkedin_accounts(id) ON DELETE CASCADE,
    ai_agent_id UUID REFERENCES public.ai_agents(id) ON DELETE SET NULL,
    title TEXT,
    content TEXT NOT NULL,
    hashtags TEXT[],
    media_urls TEXT[],
    status public.post_status DEFAULT 'draft'::public.post_status,
    scheduled_at TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    linkedin_post_id TEXT,
    engagement_metrics JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Automation logs table
CREATE TABLE public.automation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    ai_agent_id UUID REFERENCES public.ai_agents(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    status TEXT NOT NULL,
    details JSONB DEFAULT '{}',
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_linkedin_accounts_user_id ON public.linkedin_accounts(user_id);
CREATE INDEX idx_ai_agents_user_id ON public.ai_agents(user_id);
CREATE INDEX idx_content_posts_user_id ON public.content_posts(user_id);
CREATE INDEX idx_content_posts_status ON public.content_posts(status);
CREATE INDEX idx_automation_logs_user_id ON public.automation_logs(user_id);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.linkedin_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;

-- Helper functions for RLS policies
CREATE OR REPLACE FUNCTION public.is_user_owner(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.id = user_uuid
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_linkedin_account(account_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.linkedin_accounts la
    WHERE la.id = account_uuid AND la.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_ai_agent(agent_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.ai_agents aa
    WHERE aa.id = agent_uuid AND aa.user_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.can_access_content_post(post_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.content_posts cp
    WHERE cp.id = post_uuid AND cp.user_id = auth.uid()
)
$$;

-- RLS Policies
CREATE POLICY "users_own_profile" ON public.user_profiles
FOR ALL TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "users_own_linkedin_accounts" ON public.linkedin_accounts
FOR ALL TO authenticated
USING (public.can_access_linkedin_account(id))
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_own_ai_agents" ON public.ai_agents
FOR ALL TO authenticated
USING (public.can_access_ai_agent(id))
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_own_content_posts" ON public.content_posts
FOR ALL TO authenticated
USING (public.can_access_content_post(id))
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_own_automation_logs" ON public.automation_logs
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Trigger function for updating updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_linkedin_accounts_updated_at
    BEFORE UPDATE ON public.linkedin_accounts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ai_agents_updated_at
    BEFORE UPDATE ON public.ai_agents
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_posts_updated_at
    BEFORE UPDATE ON public.content_posts
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'user')::public.user_role
    );
    RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data
DO $$
DECLARE
    admin_user_id UUID := gen_random_uuid();
    demo_user_id UUID := gen_random_uuid();
    linkedin_account_id UUID := gen_random_uuid();
    content_agent_id UUID := gen_random_uuid();
BEGIN
    -- Create sample auth users
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@socialai.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Admin User", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (demo_user_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'demo@socialai.com', crypt('demo123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Demo User", "role": "user"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create LinkedIn account
    INSERT INTO public.linkedin_accounts (id, user_id, account_name, account_email, profile_url, account_type, automation_enabled)
    VALUES (linkedin_account_id, demo_user_id, 'Demo User LinkedIn', 'demo@socialai.com', 'https://linkedin.com/in/demo-user', 'personal', true);

    -- Create AI agent
    INSERT INTO public.ai_agents (id, user_id, agent_name, agent_type, model_config, prompt_template)
    VALUES (
        content_agent_id,
        demo_user_id,
        'Content Generator Agent',
        'content_generator',
        '{"model": "openrouter/meta-llama/llama-3.1-8b-instruct:free", "temperature": 0.7, "max_tokens": 500}'::jsonb,
        'Generate a professional LinkedIn post about {topic}. Keep it engaging, add relevant hashtags, and make it sound authentic and human-like.'
    );

    -- Create sample content post
    INSERT INTO public.content_posts (user_id, linkedin_account_id, ai_agent_id, title, content, hashtags, status)
    VALUES (
        demo_user_id,
        linkedin_account_id,
        content_agent_id,
        'Welcome to AI-Powered LinkedIn Automation',
        'Excited to share my journey with AI-powered LinkedIn automation! This tool has revolutionized how I manage my professional presence online. The future of social media management is here, and it is intelligent, efficient, and incredibly powerful. What are your thoughts on AI in social media? #AI #LinkedIn #Automation #SocialMedia #Innovation',
        ARRAY['AI', 'LinkedIn', 'Automation', 'SocialMedia', 'Innovation'],
        'published'::public.post_status
    );
END $$;