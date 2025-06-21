import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const OptimizationRecommendations = () => {
  const [activeTab, setActiveTab] = useState('recommendations');

  const recommendations = [
    {
      id: 1,
      type: 'timing',
      priority: 'high',
      title: 'Optimize Posting Time',
      description: 'Your audience is most active at 10:00 AM on Wednesdays. Consider scheduling more content during this time.',
      impact: '+23% engagement',
      action: 'Schedule posts',
      icon: 'Clock',
      color: 'text-accent'
    },
    {
      id: 2,
      type: 'content',
      priority: 'high',
      title: 'Focus on AI Content',
      description: 'AI & Technology posts perform 40% better than your average. Create more content in this category.',
      impact: '+40% performance',
      action: 'Generate content',
      icon: 'Bot',
      color: 'text-secondary'
    },
    {
      id: 3,
      type: 'format',
      priority: 'medium',
      title: 'Add More Videos',
      description: 'Video content gets 2.3x more engagement than text posts. Consider creating video content.',
      impact: '+130% engagement',
      action: 'Create videos',
      icon: 'Video',
      color: 'text-success'
    },
    {
      id: 4,
      type: 'hashtags',
      priority: 'medium',
      title: 'Optimize Hashtags',
      description: 'Posts with 3-5 hashtags perform better. Your current average is 7 hashtags per post.',
      impact: '+15% reach',
      action: 'Update strategy',
      icon: 'Hash',
      color: 'text-warning'
    },
    {
      id: 5,
      type: 'engagement',
      priority: 'low',
      title: 'Respond Faster',
      description: 'Responding to comments within 2 hours increases engagement by 18%.',
      impact: '+18% engagement',
      action: 'Set notifications',
      icon: 'MessageCircle',
      color: 'text-primary'
    }
  ];

  const insights = [
    {
      id: 1,
      title: 'Peak Engagement Day',
      value: 'Wednesday',
      change: '+12%',
      icon: 'Calendar',
      description: 'Best performing day this month'
    },
    {
      id: 2,
      title: 'Top Performing Format',
      value: 'Articles',
      change: '+8.7',
      icon: 'FileText',
      description: 'Highest average engagement score'
    },
    {
      id: 3,
      title: 'Optimal Post Length',
      value: '150-200 words',
      change: '+25%',
      icon: 'Type',
      description: 'Sweet spot for engagement'
    },
    {
      id: 4,
      title: 'Audience Growth Rate',
      value: '2.3%',
      change: '+0.8%',
      icon: 'TrendingUp',
      description: 'Monthly follower growth'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-background text-text-secondary border-border';
    }
  };

  const handleTakeAction = (recommendation) => {
    console.log('Taking action for:', recommendation.title);
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            AI Recommendations
          </h3>
          <p className="text-sm text-text-secondary">
            Data-driven suggestions to improve performance
          </p>
        </div>
        <Icon name="Lightbulb" size={20} className="text-text-secondary" />
      </div>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-background rounded-lg p-1">
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'recommendations' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Recommendations
        </button>
        <button
          onClick={() => setActiveTab('insights')}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            activeTab === 'insights' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Insights
        </button>
      </div>
      
      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border border-border rounded-lg p-4 hover:border-primary/20 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-surface flex items-center justify-center ${rec.color}`}>
                    <Icon name={rec.icon} size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">{rec.title}</h4>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(rec.priority)}`}>
                      {rec.priority} priority
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                {rec.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="TrendingUp" size={12} className="text-success" />
                    <span className="text-xs font-medium text-success">{rec.impact}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleTakeAction(rec)}
                  className="px-3 py-1 bg-primary text-white text-xs font-medium rounded-md hover:bg-primary/90 transition-colors duration-200"
                >
                  {rec.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-4">
          {insights.map((insight) => (
            <div key={insight.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center">
                  <Icon name={insight.icon} size={16} className="text-secondary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-text-primary">{insight.title}</h4>
                  <p className="text-xs text-text-secondary">{insight.description}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">{insight.value}</div>
                <div className="text-xs text-success">{insight.change}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Action Button */}
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full px-4 py-2 bg-secondary text-white rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors duration-200 flex items-center justify-center space-x-2">
          <Icon name="Zap" size={14} />
          <span>Apply All Recommendations</span>
        </button>
      </div>
    </div>
  );
};

export default OptimizationRecommendations;