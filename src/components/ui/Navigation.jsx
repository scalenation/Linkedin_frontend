import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'Overview and quick actions'
    },
    {
      label: 'Content',
      path: '/content-generation',
      icon: 'PenTool',
      tooltip: 'AI-powered content creation'
    },
    {
      label: 'Calendar',
      path: '/content-calendar',
      icon: 'Calendar',
      tooltip: 'Schedule and manage posts'
    },
    {
      label: 'Analytics',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      tooltip: 'Performance insights and metrics'
    },
    {
      label: 'Settings',
      path: '/settings-configuration',
      icon: 'Settings',
      tooltip: 'Platform configuration'
    }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-16 z-80 bg-surface border-b border-border shadow-sm">
        <div className="container-custom">
          <div className="flex items-center space-x-8 h-14">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`nav-item relative group ${
                  isActiveRoute(item.path) ? 'nav-item-active' : ''
                }`}
                title={item.tooltip}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-text-primary text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                  {item.tooltip}
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Toggle */}
      <div className="md:hidden sticky top-16 z-80 bg-surface border-b border-border">
        <div className="container-custom">
          <div className="flex items-center justify-between h-14">
            <h2 className="text-lg font-heading font-medium text-text-primary">
              {navigationItems.find(item => isActiveRoute(item.path))?.label || 'Menu'}
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded-md"
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-90 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-64 bg-surface shadow-xl animate-slide-down">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-medium text-text-primary">Navigation</h3>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded-md"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>
            <div className="py-4">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full px-6 py-3 text-left flex items-center space-x-3 transition-colors duration-200 ${
                    isActiveRoute(item.path)
                      ? 'bg-primary/10 text-primary border-r-2 border-primary' :'text-text-secondary hover:text-primary hover:bg-background'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-text-secondary">{item.tooltip}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;