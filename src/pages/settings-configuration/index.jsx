import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import StatusBar from '../../components/ui/StatusBar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';


// Components
import AccountSettings from './components/AccountSettings';
import AIConfiguration from './components/AIConfiguration';
import LinkedInAccounts from './components/LinkedInAccounts';
import BillingSettings from './components/BillingSettings';
import IntegrationsSettings from './components/IntegrationsSettings';
import SecuritySettings from './components/SecuritySettings';

const SettingsConfiguration = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const settingsSections = [
    {
      id: 'account',
      label: 'Account',
      icon: 'User',
      description: 'Profile and preferences'
    },
    {
      id: 'ai-configuration',
      label: 'AI Configuration',
      icon: 'Bot',
      description: 'AI models and settings'
    },
    {
      id: 'linkedin-accounts',
      label: 'LinkedIn Accounts',
      icon: 'Linkedin',
      description: 'Connected profiles'
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: 'CreditCard',
      description: 'Subscription and usage'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'Plug',
      description: 'RSS feeds and APIs'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Authentication and data'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'account':
        return <AccountSettings />;
      case 'ai-configuration':
        return <AIConfiguration />;
      case 'linkedin-accounts':
        return <LinkedInAccounts />;
      case 'billing':
        return <BillingSettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <StatusBar />
      
      <main className="pt-4">
        <div className="container-custom">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-semibold text-text-primary mb-2">
                  Settings & Configuration
                </h1>
                <p className="text-text-secondary">
                  Manage your account, AI preferences, and platform integrations
                </p>
              </div>
              
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="lg:hidden btn-secondary flex items-center space-x-2"
              >
                <Icon name="Settings" size={20} />
                <span>Menu</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Settings Sidebar */}
            <div className={`lg:w-80 ${isMobileSidebarOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="card p-6 sticky top-32">
                <h2 className="text-lg font-heading font-medium text-text-primary mb-4">
                  Settings Categories
                </h2>
                <nav className="space-y-2">
                  {settingsSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                        activeSection === section.id
                          ? 'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-primary hover:bg-background'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={section.icon} 
                          size={20} 
                          className={activeSection === section.id ? 'text-primary' : 'text-text-secondary'}
                        />
                        <div>
                          <div className="font-medium">{section.label}</div>
                          <div className="text-xs text-text-secondary">{section.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SettingsConfiguration;