import React from 'react';
import Icon from '../../../components/AppIcon';

const TopCategories = () => {
  const categoryData = [
    {
      id: 1,
      name: 'AI & Technology',
      posts: 24,
      avgEngagement: 8.7,
      trend: 'up',
      trendValue: '+15%',
      icon: 'Bot',
      color: 'text-secondary'
    },
    {
      id: 2,
      name: 'Marketing Tips',
      posts: 18,
      avgEngagement: 7.9,
      trend: 'up',
      trendValue: '+8%',
      icon: 'Target',
      color: 'text-accent'
    },
    {
      id: 3,
      name: 'Industry Insights',
      posts: 15,
      avgEngagement: 7.2,
      trend: 'down',
      trendValue: '-3%',
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      id: 4,
      name: 'Leadership',
      posts: 12,
      avgEngagement: 6.8,
      trend: 'up',
      trendValue: '+12%',
      icon: 'Crown',
      color: 'text-warning'
    },
    {
      id: 5,
      name: 'Remote Work',
      posts: 9,
      avgEngagement: 6.4,
      trend: 'stable',
      trendValue: '0%',
      icon: 'Home',
      color: 'text-primary'
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            Top Content Categories
          </h3>
          <p className="text-sm text-text-secondary">
            Your best performing content types
          </p>
        </div>
        <Icon name="BarChart3" size={20} className="text-text-secondary" />
      </div>
      
      <div className="space-y-4">
        {categoryData.map((category, index) => (
          <div key={category.id} className="flex items-center justify-between p-3 bg-background rounded-lg hover:bg-border/20 transition-colors duration-200">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-text-secondary w-4">
                  #{index + 1}
                </span>
                <div className={`w-8 h-8 rounded-lg bg-surface flex items-center justify-center ${category.color}`}>
                  <Icon name={category.icon} size={16} />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-text-primary">
                  {category.name}
                </h4>
                <div className="flex items-center space-x-3 text-xs text-text-secondary">
                  <span>{category.posts} posts</span>
                  <span>•</span>
                  <span>{category.avgEngagement} avg score</span>
                </div>
              </div>
            </div>
            
            <div className={`flex items-center space-x-1 text-xs ${getTrendColor(category.trend)}`}>
              <Icon name={getTrendIcon(category.trend)} size={12} />
              <span>{category.trendValue}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Performance Summary */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-heading font-semibold text-text-primary">78</div>
            <div className="text-xs text-text-secondary">Total Posts</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-heading font-semibold text-text-primary">7.4</div>
            <div className="text-xs text-text-secondary">Avg Score</div>
          </div>
        </div>
      </div>
      
      {/* Quick Action */}
      <button className="w-full mt-4 px-4 py-2 bg-primary/10 text-primary rounded-md text-sm font-medium hover:bg-primary/20 transition-colors duration-200 flex items-center justify-center space-x-2">
        <Icon name="Plus" size={14} />
        <span>Create Content Plan</span>
      </button>
    </div>
  );
};

export default TopCategories;