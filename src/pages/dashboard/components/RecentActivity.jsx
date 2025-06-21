import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = () => {
  const [selectedTab, setSelectedTab] = useState('posts');

  const recentPosts = [
    {
      id: 1,
      title: "The Future of AI in Business Automation",
      platform: "LinkedIn",
      publishedAt: "2024-01-15T10:30:00Z",
      status: "published",
      engagement: {
        likes: 127,
        comments: 23,
        shares: 15,
        views: 2840
      },
      performance: "high"
    },
    {
      id: 2,
      title: "5 Key Trends Shaping Digital Marketing in 2024",
      platform: "LinkedIn",
      publishedAt: "2024-01-14T14:15:00Z",
      status: "published",
      engagement: {
        likes: 89,
        comments: 12,
        shares: 8,
        views: 1950
      },
      performance: "medium"
    },
    {
      id: 3,
      title: "How to Build Authentic Professional Relationships",
      platform: "LinkedIn",
      publishedAt: "2024-01-13T09:45:00Z",
      status: "published",
      engagement: {
        likes: 203,
        comments: 45,
        shares: 32,
        views: 4120
      },
      performance: "high"
    },
    {
      id: 4,
      title: "The Power of Storytelling in Content Marketing",
      platform: "LinkedIn",
      publishedAt: "2024-01-12T16:20:00Z",
      status: "published",
      engagement: {
        likes: 156,
        comments: 28,
        shares: 19,
        views: 3200
      },
      performance: "high"
    },
    {
      id: 5,
      title: "Remote Work Best Practices for 2024",
      platform: "LinkedIn",
      publishedAt: "2024-01-11T11:00:00Z",
      status: "published",
      engagement: {
        likes: 67,
        comments: 8,
        shares: 4,
        views: 1420
      },
      performance: "low"
    }
  ];

  const systemActivity = [
    {
      id: 1,
      type: "content_generated",
      message: "AI generated 3 new post ideas based on trending topics",
      timestamp: "2024-01-15T15:30:00Z",
      icon: "Bot",
      color: "secondary"
    },
    {
      id: 2,
      type: "post_scheduled",
      message: "Post scheduled for tomorrow at 9:00 AM",
      timestamp: "2024-01-15T14:45:00Z",
      icon: "Calendar",
      color: "primary"
    },
    {
      id: 3,
      type: "trending_discovered",
      message: "5 new trending topics discovered in Technology category",
      timestamp: "2024-01-15T13:20:00Z",
      icon: "TrendingUp",
      color: "success"
    },
    {
      id: 4,
      type: "rss_updated",
      message: "RSS feeds updated with 12 new articles",
      timestamp: "2024-01-15T12:00:00Z",
      icon: "Rss",
      color: "accent"
    }
  ];

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'high':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getPerformanceIcon = (performance) => {
    switch (performance) {
      case 'high':
        return 'TrendingUp';
      case 'medium':
        return 'Minus';
      case 'low':
        return 'TrendingDown';
      default:
        return 'Circle';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-text-primary">Recent Activity</h2>
          <div className="flex items-center space-x-1 bg-background rounded-lg p-1">
            <button
              onClick={() => setSelectedTab('posts')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                selectedTab === 'posts' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setSelectedTab('system')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                selectedTab === 'system' ?'bg-surface text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              System
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {selectedTab === 'posts' ? (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-background rounded-lg hover:bg-background/80 transition-colors duration-200">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-text-primary line-clamp-1">{post.title}</h3>
                    <div className={`flex items-center space-x-1 ${getPerformanceColor(post.performance)}`}>
                      <Icon name={getPerformanceIcon(post.performance)} size={14} />
                      <span className="text-xs font-medium capitalize">{post.performance}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>{formatDate(post.publishedAt)}</span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1">
                        <Icon name="Heart" size={12} />
                        <span>{formatNumber(post.engagement.likes)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="MessageCircle" size={12} />
                        <span>{formatNumber(post.engagement.comments)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Share" size={12} />
                        <span>{formatNumber(post.engagement.shares)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{formatNumber(post.engagement.views)}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded">
                  <Icon name="ExternalLink" size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {systemActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-4 bg-background rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.color === 'primary' ? 'bg-primary/10 text-primary' :
                  activity.color === 'secondary' ? 'bg-secondary/10 text-secondary' :
                  activity.color === 'success' ? 'bg-success/10 text-success' :
                  activity.color === 'accent'? 'bg-accent/10 text-accent' : 'bg-text-secondary/10 text-text-secondary'
                }`}>
                  <Icon name={activity.icon} size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary mb-1">{activity.message}</p>
                  <p className="text-xs text-text-secondary">{formatDate(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;