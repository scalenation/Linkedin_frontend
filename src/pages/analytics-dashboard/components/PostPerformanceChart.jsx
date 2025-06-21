import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PostPerformanceChart = ({ contentType }) => {
  const [sortBy, setSortBy] = useState('engagement');

  const postData = [
    { 
      title: 'AI in Marketing: 5 Game-Changing Trends', 
      type: 'article',
      engagement: 892, 
      impressions: 12400, 
      ctr: 7.2 
    },
    { 
      title: 'Building Remote Teams That Actually Work', 
      type: 'post',
      engagement: 756, 
      impressions: 9800, 
      ctr: 7.7 
    },
    { 
      title: 'The Future of Work: Hybrid vs Remote', 
      type: 'video',
      engagement: 1024, 
      impressions: 15600, 
      ctr: 6.6 
    },
    { 
      title: 'LinkedIn Growth Strategies for 2024', 
      type: 'post',
      engagement: 634, 
      impressions: 8200, 
      ctr: 7.7 
    },
    { 
      title: 'Data-Driven Decision Making', 
      type: 'image',
      engagement: 445, 
      impressions: 6800, 
      ctr: 6.5 
    },
    { 
      title: 'Customer Success Best Practices', 
      type: 'article',
      engagement: 578, 
      impressions: 7900, 
      ctr: 7.3 
    }
  ];

  const sortedData = [...postData].sort((a, b) => {
    if (sortBy === 'engagement') return b.engagement - a.engagement;
    if (sortBy === 'impressions') return b.impressions - a.impressions;
    if (sortBy === 'ctr') return b.ctr - a.ctr;
    return 0;
  }).slice(0, 6);

  const getContentTypeIcon = (type) => {
    switch (type) {
      case 'article': return 'FileText';
      case 'video': return 'Video';
      case 'image': return 'Image';
      default: return 'MessageSquare';
    }
  };

  const getContentTypeColor = (type) => {
    switch (type) {
      case 'article': return '#4A90A4';
      case 'video': return '#FF6B35';
      case 'image': return '#38A169';
      default: return '#1B365D';
    }
  };

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            Post Performance Comparison
          </h3>
          <p className="text-sm text-text-secondary">
            Top performing content by engagement
          </p>
        </div>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="engagement">Sort by Engagement</option>
          <option value="impressions">Sort by Impressions</option>
          <option value="ctr">Sort by CTR</option>
        </select>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="title"
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              stroke="var(--color-text-secondary)"
              fontSize={10}
              tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
            />
            <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-md)'
              }}
              formatter={(value, name) => {
                if (name === 'engagement') return [value, 'Total Engagement'];
                if (name === 'impressions') return [value.toLocaleString(), 'Impressions'];
                if (name === 'ctr') return [`${value}%`, 'CTR'];
                return [value, name];
              }}
              labelFormatter={(label) => `Post: ${label}`}
            />
            <Bar 
              dataKey={sortBy} 
              fill={(entry) => getContentTypeColor(entry.type)}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
        {['article', 'post', 'video', 'image'].map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <Icon name={getContentTypeIcon(type)} size={14} style={{ color: getContentTypeColor(type) }} />
            <span className="text-xs text-text-secondary capitalize">{type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPerformanceChart;