import React from 'react';
import Icon from '../../../components/AppIcon';

const ContentTemplates = ({ selectedTemplate, onTemplateSelect }) => {
  const templates = [
    {
      id: 'thought-leadership',
      name: 'Thought Leadership',
      description: 'Share industry insights and establish expertise',
      icon: 'Lightbulb',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      engagementScore: 85,
      preview: 'The future of [industry] is evolving rapidly. Here are 3 key trends...',
      tags: ['Leadership', 'Insights', 'Trends']
    },
    {
      id: 'industry-insights',
      name: 'Industry Insights',
      description: 'Analyze market trends and share data-driven perspectives',
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      engagementScore: 78,
      preview: 'Recent data shows that [statistic]. This means...',
      tags: ['Data', 'Analysis', 'Market']
    },
    {
      id: 'company-updates',
      name: 'Company Updates',
      description: 'Announce milestones, achievements, and news',
      icon: 'Building',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      engagementScore: 72,
      preview: 'Excited to share that our team has achieved...',
      tags: ['News', 'Milestones', 'Team']
    },
    {
      id: 'personal-story',
      name: 'Personal Story',
      description: 'Share experiences and lessons learned',
      icon: 'User',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      engagementScore: 88,
      preview: 'Last week, I learned something valuable about...',
      tags: ['Experience', 'Learning', 'Personal']
    },
    {
      id: 'question-engagement',
      name: 'Question & Engagement',
      description: 'Ask thought-provoking questions to drive discussion',
      icon: 'MessageCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      engagementScore: 92,
      preview: 'What\'s your take on [topic]? I\'ve been thinking about...',
      tags: ['Questions', 'Discussion', 'Community']
    },
    {
      id: 'how-to-guide',
      name: 'How-To Guide',
      description: 'Share practical tips and step-by-step guidance',
      icon: 'BookOpen',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      engagementScore: 80,
      preview: 'Here\'s a simple 5-step process to [achieve goal]...',
      tags: ['Tutorial', 'Tips', 'Guide']
    }
  ];

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-medium text-text-primary">Content Templates</h2>
        <Icon name="Template" size={20} className="text-text-secondary" />
      </div>

      <div className="space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateSelect(template)}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedTemplate?.id === template.id
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg ${template.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon name={template.icon} size={20} className={template.color} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {template.name}
                  </h3>
                  <div className="flex items-center space-x-1 ml-2">
                    <Icon name="Zap" size={12} className="text-warning" />
                    <span className="text-xs font-medium text-warning">{template.engagementScore}</span>
                  </div>
                </div>
                
                <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="text-xs text-text-secondary/80 mb-3 italic">
                  "{template.preview}"
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-background text-text-secondary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Template Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-xs text-text-secondary mb-2">Template Performance</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-medium text-text-primary">6</div>
            <div className="text-xs text-text-secondary">Available</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium text-text-primary">82</div>
            <div className="text-xs text-text-secondary">Avg Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTemplates;