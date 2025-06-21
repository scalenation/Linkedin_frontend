import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AIAgentStatus = () => {
  const [agentStatus, setAgentStatus] = useState({
    isActive: true,
    currentTask: 'Analyzing trending topics',
    progress: 75,
    lastUpdate: new Date(),
    tasksCompleted: 12,
    tasksInQueue: 3
  });

  const [rssFeeds, setRssFeeds] = useState([
    {
      id: 1,
      name: "TechCrunch",
      status: "healthy",
      lastUpdate: "5 min ago",
      articlesFound: 8
    },
    {
      id: 2,
      name: "Harvard Business Review",
      status: "healthy",
      lastUpdate: "12 min ago",
      articlesFound: 3
    },
    {
      id: 3,
      name: "Marketing Land",
      status: "warning",
      lastUpdate: "2 hours ago",
      articlesFound: 0
    },
    {
      id: 4,
      name: "Social Media Today",
      status: "healthy",
      lastUpdate: "8 min ago",
      articlesFound: 5
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAgentStatus(prev => ({
        ...prev,
        progress: Math.min(prev.progress + Math.random() * 5, 100),
        lastUpdate: new Date()
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
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
      case 'healthy':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-text-primary">AI Agent Status</h2>
          <div className={`flex items-center space-x-2 ${agentStatus.isActive ? 'text-success' : 'text-error'}`}>
            <div className={`w-2 h-2 rounded-full ${agentStatus.isActive ? 'bg-success animate-pulse' : 'bg-error'}`} />
            <span className="text-sm font-medium">{agentStatus.isActive ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Current Task */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-text-primary">Current Task</h3>
            <span className="text-sm text-text-secondary">{agentStatus.progress}%</span>
          </div>
          <p className="text-sm text-text-secondary mb-3">{agentStatus.currentTask}</p>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="bg-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${agentStatus.progress}%` }}
            />
          </div>
        </div>

        {/* Task Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-background rounded-lg">
            <div className="text-xl font-heading font-semibold text-text-primary">{agentStatus.tasksCompleted}</div>
            <div className="text-xs text-text-secondary">Completed Today</div>
          </div>
          <div className="text-center p-3 bg-background rounded-lg">
            <div className="text-xl font-heading font-semibold text-text-primary">{agentStatus.tasksInQueue}</div>
            <div className="text-xs text-text-secondary">In Queue</div>
          </div>
        </div>

        {/* RSS Feed Health */}
        <div>
          <h3 className="font-medium text-text-primary mb-3">RSS Feed Health</h3>
          <div className="space-y-3">
            {rssFeeds.map((feed) => (
              <div key={feed.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getStatusIcon(feed.status)} 
                    size={16} 
                    className={getStatusColor(feed.status)}
                  />
                  <div>
                    <div className="text-sm font-medium text-text-primary">{feed.name}</div>
                    <div className="text-xs text-text-secondary">{feed.lastUpdate}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-text-primary">{feed.articlesFound}</div>
                  <div className="text-xs text-text-secondary">articles</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 p-2 text-sm text-primary border border-primary rounded-md hover:bg-primary/5 transition-colors duration-200">
              <Icon name="RefreshCw" size={14} />
              <span>Refresh</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-2 text-sm text-text-secondary border border-border rounded-md hover:bg-background transition-colors duration-200">
              <Icon name="Settings" size={14} />
              <span>Configure</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgentStatus;