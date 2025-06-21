import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';

const LoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAuthSuccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-heading font-semibold text-primary">SocialAI</h1>
                <span className="text-sm font-caption text-text-secondary">Automation Platform</span>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-heading font-medium text-text-primary mb-2">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-text-secondary text-sm">
            {activeTab === 'login' ?'Sign in to your AI-powered social media automation platform' :'Join thousands of professionals automating their LinkedIn presence'
            }
          </p>
        </div>

        {/* Main Authentication Card */}
        <div className="card-elevated p-8">
          {/* Tab Navigation */}
          <div className="flex mb-6 bg-background rounded-lg p-1">
            <button
              onClick={() => handleTabChange('login')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'login' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleTabChange('register')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === 'register' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Social Login */}
          <SocialLogin onSuccess={handleAuthSuccess} />

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-text-secondary font-caption">Or continue with email</span>
            </div>
          </div>

          {/* Forms */}
          {activeTab === 'login' ? (
            <LoginForm onSuccess={handleAuthSuccess} isLoading={isLoading} />
          ) : (
            <RegisterForm onSuccess={handleAuthSuccess} isLoading={isLoading} />
          )}
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-sm text-text-secondary">
          <p>
            By continuing, you agree to our{' '}
            <button className="text-secondary hover:text-secondary/80 transition-colors duration-200">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-secondary hover:text-secondary/80 transition-colors duration-200">
              Privacy Policy
            </button>
          </p>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100">
            <div className="bg-surface rounded-lg p-6 flex items-center space-x-3">
              <Icon name="Loader" size={20} className="animate-spin text-primary" />
              <span className="text-text-primary font-medium">Signing you in...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;