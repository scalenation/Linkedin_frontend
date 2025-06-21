import React, { useState } from 'react';
import Icon from '../AppIcon';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const notifications = [
    { id: 1, message: "Content scheduled successfully", type: "success", time: "2 min ago" },
    { id: 2, message: "LinkedIn session expires in 1 hour", type: "warning", time: "15 min ago" },
    { id: 3, message: "Monthly analytics report ready", type: "info", time: "1 hour ago" },
  ];

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-heading font-semibold text-primary">SocialAI</h1>
                <span className="text-xs font-caption text-text-secondary">Automation Platform</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Credit Usage Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-background rounded-full border border-border">
              <Icon name="Coins" size={16} color="#4A90A4" />
              <span className="text-sm font-medium text-text-primary">850</span>
              <span className="text-xs text-text-secondary">credits</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded-md"
              >
                <Icon name="Bell" size={20} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-surface rounded-lg shadow-lg border border-border animate-slide-down">
                  <div className="p-4 border-b border-border">
                    <h3 className="text-sm font-heading font-medium text-text-primary">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-4 border-b border-border last:border-b-0 hover:bg-background transition-colors duration-200">
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-success' :
                            notification.type === 'warning' ? 'bg-warning' : 'bg-secondary'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm text-text-primary">{notification.message}</p>
                            <p className="text-xs text-text-secondary mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-border">
                    <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors duration-200">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded-md"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <Icon name="ChevronDown" size={16} />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg shadow-lg border border-border animate-slide-down">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-text-primary">John Doe</p>
                    <p className="text-xs text-text-secondary">john@company.com</p>
                  </div>
                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background transition-colors duration-200 flex items-center space-x-2">
                      <Icon name="User" size={16} />
                      <span>Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background transition-colors duration-200 flex items-center space-x-2">
                      <Icon name="CreditCard" size={16} />
                      <span>Billing</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-background transition-colors duration-200 flex items-center space-x-2">
                      <Icon name="HelpCircle" size={16} />
                      <span>Support</span>
                    </button>
                  </div>
                  <div className="border-t border-border py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error/5 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(isUserMenuOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-90"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;