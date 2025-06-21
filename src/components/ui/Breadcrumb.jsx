import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', parent: null },
    '/content-generation': { label: 'Content Generation', parent: '/dashboard' },
    '/content-calendar': { label: 'Content Calendar', parent: '/dashboard' },
    '/analytics-dashboard': { label: 'Analytics Dashboard', parent: '/dashboard' },
    '/settings-configuration': { label: 'Settings & Configuration', parent: '/dashboard' },
    '/login-register': { label: 'Authentication', parent: null }
  };

  const buildBreadcrumbs = (currentPath) => {
    const breadcrumbs = [];
    let path = currentPath;

    while (path && routeMap[path]) {
      const route = routeMap[path];
      breadcrumbs.unshift({
        label: route.label,
        path: path,
        isActive: path === currentPath
      });
      path = route.parent;
    }

    return breadcrumbs;
  };

  const breadcrumbs = buildBreadcrumbs(location.pathname);

  // Don't show breadcrumbs for login page or if only one item
  if (location.pathname === '/login-register' || breadcrumbs.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path !== location.pathname) {
      window.location.href = path;
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <Icon name="Home" size={16} className="text-text-secondary" />
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          )}
          {crumb.isActive ? (
            <span className="font-medium text-text-primary font-caption">
              {crumb.label}
            </span>
          ) : (
            <button
              onClick={() => handleNavigation(crumb.path)}
              className="text-text-secondary hover:text-primary transition-colors duration-200 font-caption focus-ring rounded px-1"
            >
              {crumb.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;