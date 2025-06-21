import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSuccess }) => {
  const [loadingProvider, setLoadingProvider] = useState(null);

  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50'
    }
  ];

  const handleSocialLogin = (providerId) => {
    setLoadingProvider(providerId);
    
    // Simulate social login process
    setTimeout(() => {
      setLoadingProvider(null);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="space-y-3">
      {socialProviders.map((provider) => (
        <button
          key={provider.id}
          onClick={() => handleSocialLogin(provider.id)}
          disabled={loadingProvider !== null}
          className={`w-full flex items-center justify-center space-x-3 px-4 py-3 border border-border rounded-md transition-all duration-200 ${
            loadingProvider === provider.id
              ? 'bg-background cursor-not-allowed'
              : `bg-surface hover:bg-background ${provider.bgColor} focus-ring`
          }`}
        >
          {loadingProvider === provider.id ? (
            <>
              <Icon name="Loader" size={18} className="animate-spin text-text-secondary" />
              <span className="text-sm font-medium text-text-secondary">
                Connecting to {provider.name}...
              </span>
            </>
          ) : (
            <>
              <Icon name={provider.icon} size={18} className={provider.color} />
              <span className="text-sm font-medium text-text-primary">
                Continue with {provider.name}
              </span>
            </>
          )}
        </button>
      ))}
    </div>
  );
};

export default SocialLogin;