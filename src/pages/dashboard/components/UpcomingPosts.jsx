import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingPosts = () => {
  const upcomingPosts = [
    {
      id: 1,
      title: "Mastering LinkedIn Automation: A Complete Guide",
      scheduledFor: "2024-01-16T09:00:00Z",
      status: "scheduled",
      platform: "LinkedIn",
      contentType: "article",
      estimatedEngagement: "high"
    },
    {
      id: 2,
      title: "Top 10 AI Tools Every Marketer Should Know",
      scheduledFor: "2024-01-16T14:30:00Z",
      status: "scheduled",
      platform: "LinkedIn",
      contentType: "list",
      estimatedEngagement: "medium"
    },
    {
      id: 3,
      title: "The ROI of Social Media Automation",
      scheduledFor: "2024-01-17T10:15:00Z",
      status: "draft",
      platform: "LinkedIn",
      contentType: "insight",
      estimatedEngagement: "high"
    },
    {
      id: 4,
      title: "Building Your Personal Brand on LinkedIn",
      scheduledFor: "2024-01-17T16:00:00Z",
      status: "review",
      platform: "LinkedIn",
      contentType: "guide",
      estimatedEngagement: "medium"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-success/10 text-success';
      case 'draft':
        return 'bg-warning/10 text-warning';
      case 'review':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-text-secondary/10 text-text-secondary';
    }
  };

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'article':
        return 'FileText';
      case 'list':
        return 'List';
      case 'insight':
        return 'Lightbulb';
      case 'guide':
        return 'BookOpen';
      default:
        return 'FileText';
    }
  };

  const formatScheduledTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Today at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      return `Tomorrow at ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-text-primary">Upcoming Posts</h2>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 flex items-center space-x-1">
            <span>View All</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {upcomingPosts.map((post) => (
            <div key={post.id} className="border border-border rounded-lg p-4 hover:bg-background/50 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={getContentTypeIcon(post.contentType)} size={16} className="text-text-secondary" />
                  <span className={`status-indicator ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </div>
                <button className="p-1 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded">
                  <Icon name="MoreHorizontal" size={16} />
                </button>
              </div>

              <h3 className="font-medium text-text-primary mb-2 line-clamp-2">
                {post.title}
              </h3>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-text-secondary">
                  <Icon name="Clock" size={14} />
                  <span>{formatScheduledTime(post.scheduledFor)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    post.estimatedEngagement === 'high' ? 'bg-success' :
                    post.estimatedEngagement === 'medium' ? 'bg-warning' : 'bg-error'
                  }`} />
                  <span className="text-xs text-text-secondary capitalize">
                    {post.estimatedEngagement} engagement
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Next post in:</span>
            <div className="flex items-center space-x-2 text-primary font-medium">
              <Icon name="Clock" size={14} />
              <span>2h 15m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingPosts;