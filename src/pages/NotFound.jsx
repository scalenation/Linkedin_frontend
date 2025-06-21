import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-heading font-semibold text-primary">SocialAI</h1>
              <span className="text-sm font-caption text-text-secondary">Automation Platform</span>
            </div>
          </div>
        </div>

        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Icon name="AlertTriangle" size={64} className="text-primary" />
          </div>
          <h2 className="text-6xl font-heading font-bold text-primary mb-4">404</h2>
          <h3 className="text-2xl font-heading font-semibold text-text-primary mb-2">Page Not Found</h3>
          <p className="text-text-secondary mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoHome}
            className="w-full btn-primary flex items-center justify-center space-x-2 py-3"
          >
            <Icon name="Home" size={20} />
            <span>Go to Dashboard</span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="w-full bg-surface border border-border text-text-primary px-4 py-3 rounded-md font-medium hover:bg-background transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowLeft" size={20} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Help Links */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-text-secondary mb-4">Need help? Try these links:</p>
          <div className="flex justify-center space-x-6 text-sm">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-secondary hover:text-secondary/80 transition-colors duration-200"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/content-generation')}
              className="text-secondary hover:text-secondary/80 transition-colors duration-200"
            >
              Content
            </button>
            <button
              onClick={() => navigate('/settings-configuration')}
              className="text-secondary hover:text-secondary/80 transition-colors duration-200"
            >
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;