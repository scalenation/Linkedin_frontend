import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const StatusBar = () => {
  const [systemStatus, setSystemStatus] = useState({
    linkedinSession: { status: 'connected', lastSync: '2 min ago' },
    postingQueue: { status: 'active', count: 3 },
    aiAgent: { status: 'processing', task: 'Generating content suggestions' }
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        linkedinSession: {
          ...prev.linkedinSession,
          lastSync: Math.random() > 0.7 ? 'Just now' : prev.linkedinSession.lastSync
        }
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': case'active':
        return 'text-success';
      case 'processing':
        return 'text-secondary';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected':
        return 'CheckCircle';
      case 'active':
        return 'Play';
      case 'processing':
        return 'Loader';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const hasActiveStatus = () => {
    return systemStatus.aiAgent.status === 'processing' || 
           systemStatus.postingQueue.count > 0 ||
           systemStatus.linkedinSession.status !== 'connected';
  };

  if (!isVisible || !hasActiveStatus()) {
    return null;
  }

  return (
    <div className="sticky top-30 z-70 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="py-2">
          {/* Collapsed View */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* LinkedIn Session Status */}
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(systemStatus.linkedinSession.status)} 
                  size={14} 
                  className={`${getStatusColor(systemStatus.linkedinSession.status)} ${
                    systemStatus.linkedinSession.status === 'processing' ? 'animate-spin' : ''
                  }`}
                />
                <span className="text-xs font-caption text-text-secondary">
                  LinkedIn {systemStatus.linkedinSession.status}
                </span>
              </div>

              {/* Posting Queue Status */}
              {systemStatus.postingQueue.count > 0 && (
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getStatusIcon(systemStatus.postingQueue.status)} 
                    size={14} 
                    className={getStatusColor(systemStatus.postingQueue.status)}
                  />
                  <span className="text-xs font-caption text-text-secondary">
                    {systemStatus.postingQueue.count} posts queued
                  </span>
                </div>
              )}

              {/* AI Agent Status */}
              {systemStatus.aiAgent.status === 'processing' && (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-secondary rounded-full animate-pulse-dot" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-1 bg-secondary rounded-full animate-pulse-dot" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-1 bg-secondary rounded-full animate-pulse-dot" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs font-caption text-text-secondary">
                    AI working...
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded p-1"
              >
                <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded p-1"
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          </div>

          {/* Expanded View */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-border animate-slide-down">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* LinkedIn Session Details */}
                <div className="flex items-center space-x-3 p-3 bg-surface rounded border border-border">
                  <Icon 
                    name="Linkedin" 
                    size={20} 
                    className="text-secondary"
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary">LinkedIn Session</div>
                    <div className="text-xs text-text-secondary">
                      Last sync: {systemStatus.linkedinSession.lastSync}
                    </div>
                  </div>
                </div>

                {/* Posting Queue Details */}
                <div className="flex items-center space-x-3 p-3 bg-surface rounded border border-border">
                  <Icon 
                    name="Clock" 
                    size={20} 
                    className="text-warning"
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary">Posting Queue</div>
                    <div className="text-xs text-text-secondary">
                      {systemStatus.postingQueue.count} posts scheduled
                    </div>
                  </div>
                </div>

                {/* AI Agent Details */}
                <div className="flex items-center space-x-3 p-3 bg-surface rounded border border-border">
                  <Icon 
                    name="Bot" 
                    size={20} 
                    className="text-secondary"
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary">AI Agent</div>
                    <div className="text-xs text-text-secondary">
                      {systemStatus.aiAgent.task}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;