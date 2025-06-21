// src/utils/aiAgentService.js
import supabase from './supabaseClient';
import openRouterService from './openRouterService';
import linkedinAutomationService from './linkedinAutomationService';

class AIAgentService {
  async createAgent(userId, agentData) {
    try {
      const { data, error } = await supabase
        .from('ai_agents')
        .insert({
          user_id: userId,
          agent_name: agentData.name,
          agent_type: agentData.type,
          model_config: agentData.modelConfig || {},
          prompt_template: agentData.promptTemplate || '',
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create AI agent'
      };
    }
  }

  async getUserAgents(userId) {
    try {
      const { data, error } = await supabase
        .from('ai_agents')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch AI agents'
      };
    }
  }

  async updateAgent(agentId, updates) {
    try {
      const { data, error } = await supabase
        .from('ai_agents')
        .update(updates)
        .eq('id', agentId)
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to update AI agent'
      };
    }
  }

  async deleteAgent(agentId) {
    try {
      const { error } = await supabase
        .from('ai_agents')
        .delete()
        .eq('id', agentId);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to delete AI agent'
      };
    }
  }

  async executeContentGeneratorAgent(agentId, parameters) {
    try {
      // Log agent execution
      await this.logAgentAction(agentId, 'content_generation', 'started', {
        parameters
      });

      // Get agent configuration
      const { data: agent, error: agentError } = await supabase
        .from('ai_agents')
        .select('*')
        .eq('id', agentId)
        .single();

      if (agentError) throw agentError;

      // Generate content using OpenRouter
      const result = await openRouterService.generateLinkedInPost({
        topic: parameters.topic,
        tone: parameters.tone || agent.model_config?.tone || 'professional',
        length: parameters.length || agent.model_config?.length || 'medium',
        includeHashtags: parameters.includeHashtags ?? true,
        includeEmojis: parameters.includeEmojis ?? false,
        customPrompt: agent.prompt_template,
        model: agent.model_config?.model || 'openrouter/meta-llama/llama-3.1-8b-instruct:free'
      });

      if (!result.success) {
        await this.logAgentAction(agentId, 'content_generation', 'failed', {
          error: result.error
        });
        return result;
      }

      // Save generated content
      const contentResult = await this.saveGeneratedContent(
        agent.user_id,
        agentId,
        result.data.content,
        parameters
      );

      if (!contentResult.success) {
        await this.logAgentAction(agentId, 'content_generation', 'failed', {
          error: contentResult.error
        });
        return contentResult;
      }

      await this.logAgentAction(agentId, 'content_generation', 'completed', {
        contentId: contentResult.data.id,
        usage: result.data.usage
      });

      return {
        success: true,
        data: {
          content: result.data.content,
          contentId: contentResult.data.id,
          usage: result.data.usage
        }
      };
    } catch (error) {
      await this.logAgentAction(agentId, 'content_generation', 'error', {
        error: error.message
      });
      return {
        success: false,
        error: error.message || 'Content generation failed'
      };
    }
  }

  async executeSchedulerAgent(agentId, contentId, scheduledTime) {
    try {
      await this.logAgentAction(agentId, 'scheduling', 'started', {
        contentId,
        scheduledTime
      });

      // Update content post with schedule
      const { data, error } = await supabase
        .from('content_posts')
        .update({
          status: 'scheduled',
          scheduled_at: scheduledTime
        })
        .eq('id', contentId)
        .select()
        .single();

      if (error) throw error;

      await this.logAgentAction(agentId, 'scheduling', 'completed', {
        contentId,
        scheduledTime
      });

      return { success: true, data };
    } catch (error) {
      await this.logAgentAction(agentId, 'scheduling', 'error', {
        error: error.message
      });
      return {
        success: false,
        error: error.message || 'Scheduling failed'
      };
    }
  }

  async executePostingAgent(agentId, contentId, linkedinAccountId) {
    try {
      await this.logAgentAction(agentId, 'posting', 'started', {
        contentId,
        linkedinAccountId
      });

      // Get content to post
      const { data: content, error: contentError } = await supabase
        .from('content_posts')
        .select('*')
        .eq('id', contentId)
        .single();

      if (contentError) throw contentError;

      // Post to LinkedIn
      const postResult = await linkedinAutomationService.postToLinkedIn(
        linkedinAccountId,
        content.content,
        {
          humanLikeDelay: true,
          useProxyRotation: false
        }
      );

      if (!postResult.success) {
        // Update post status to failed
        await supabase
          .from('content_posts')
          .update({ status: 'failed' })
          .eq('id', contentId);

        await this.logAgentAction(agentId, 'posting', 'failed', {
          error: postResult.error
        });
        return postResult;
      }

      // Update post status to published
      await supabase
        .from('content_posts')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
          linkedin_post_id: postResult.data.postId
        })
        .eq('id', contentId);

      await this.logAgentAction(agentId, 'posting', 'completed', {
        contentId,
        linkedinPostId: postResult.data.postId
      });

      return { success: true, data: postResult.data };
    } catch (error) {
      await this.logAgentAction(agentId, 'posting', 'error', {
        error: error.message
      });
      return {
        success: false,
        error: error.message || 'Posting failed'
      };
    }
  }

  async executeAnalyticsAgent(agentId, contentId) {
    try {
      await this.logAgentAction(agentId, 'analytics', 'started', {
        contentId
      });

      // Get content to analyze
      const { data: content, error: contentError } = await supabase
        .from('content_posts')
        .select('*')
        .eq('id', contentId)
        .single();

      if (contentError) throw contentError;

      // Analyze content using AI
      const analysisResult = await openRouterService.analyzeContent(
        content.content,
        'engagement'
      );

      if (!analysisResult.success) {
        await this.logAgentAction(agentId, 'analytics', 'failed', {
          error: analysisResult.error
        });
        return analysisResult;
      }

      // Save analysis results
      const currentMetrics = content.engagement_metrics || {};
      const updatedMetrics = {
        ...currentMetrics,
        ai_analysis: analysisResult.data.content,
        analyzed_at: new Date().toISOString()
      };

      await supabase
        .from('content_posts')
        .update({ engagement_metrics: updatedMetrics })
        .eq('id', contentId);

      await this.logAgentAction(agentId, 'analytics', 'completed', {
        contentId,
        analysis: analysisResult.data.content
      });

      return {
        success: true,
        data: {
          analysis: analysisResult.data.content,
          metrics: updatedMetrics
        }
      };
    } catch (error) {
      await this.logAgentAction(agentId, 'analytics', 'error', {
        error: error.message
      });
      return {
        success: false,
        error: error.message || 'Analytics failed'
      };
    }
  }

  async saveGeneratedContent(userId, agentId, content, parameters) {
    try {
      const { data, error } = await supabase
        .from('content_posts')
        .insert({
          user_id: userId,
          ai_agent_id: agentId,
          title: parameters.title || `Generated content - ${new Date().toLocaleDateString()}`,
          content,
          hashtags: this.extractHashtags(content),
          status: 'draft'
        })
        .select()
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to save content'
      };
    }
  }

  async logAgentAction(agentId, actionType, status, details = {}) {
    try {
      const { data: agent } = await supabase
        .from('ai_agents')
        .select('user_id')
        .eq('id', agentId)
        .single();

      if (!agent) return;

      await supabase
        .from('automation_logs')
        .insert({
          user_id: agent.user_id,
          ai_agent_id: agentId,
          action_type: actionType,
          status,
          details,
          error_message: details.error || null
        });
    } catch (error) {
      console.log('Failed to log agent action:', error);
    }
  }

  extractHashtags(content) {
    const hashtagRegex = /#[\w\d_]+/g;
    const matches = content.match(hashtagRegex) || [];
    return matches.map(tag => tag.replace('#', ''));
  }

  async getAgentLogs(agentId, limit = 50) {
    try {
      const { data, error } = await supabase
        .from('automation_logs')
        .select('*')
        .eq('ai_agent_id', agentId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return { success: true, data: data || [] };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch agent logs'
      };
    }
  }
}

export default new AIAgentService();