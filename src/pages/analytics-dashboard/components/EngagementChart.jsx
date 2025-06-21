import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const EngagementChart = ({ dateRange }) => {
  const [chartType, setChartType] = useState('engagement');

  const engagementData = [
    { date: '2024-01-01', likes: 245, comments: 32, shares: 18, impressions: 3200 },
    { date: '2024-01-02', likes: 189, comments: 28, shares: 15, impressions: 2800 },
    { date: '2024-01-03', likes: 312, comments: 45, shares: 23, impressions: 4100 },
    { date: '2024-01-04', likes: 278, comments: 38, shares: 20, impressions: 3600 },
    { date: '2024-01-05', likes: 356, comments: 52, shares: 28, impressions: 4800 },
    { date: '2024-01-06', likes: 298, comments: 41, shares: 22, impressions: 3900 },
    { date: '2024-01-07', likes: 423, comments: 67, shares: 35, impressions: 5200 },
    { date: '2024-01-08', likes: 387, comments: 58, shares: 31, impressions: 4700 },
    { date: '2024-01-09', likes: 445, comments: 72, shares: 38, impressions: 5600 },
    { date: '2024-01-10', likes: 512, comments: 89, shares: 45, impressions: 6200 }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const chartOptions = [
    { value: 'engagement', label: 'Engagement', icon: 'Heart' },
    { value: 'impressions', label: 'Impressions', icon: 'Eye' }
  ];

  return (
    <div className="card-elevated p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
            Engagement Timeline
          </h3>
          <p className="text-sm text-text-secondary">
            Track your content performance over time
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {chartOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setChartType(option.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                chartType === option.value
                  ? 'bg-primary text-white' :'bg-background text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={option.icon} size={14} />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-md)'
              }}
              labelFormatter={(value) => formatDate(value)}
            />
            {chartType === 'engagement' ? (
              <>
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="likes" 
                  stroke="var(--color-success)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                  name="Likes"
                />
                <Line 
                  type="monotone" 
                  dataKey="comments" 
                  stroke="var(--color-secondary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
                  name="Comments"
                />
                <Line 
                  type="monotone" 
                  dataKey="shares" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                  name="Shares"
                />
              </>
            ) : (
              <Line 
                type="monotone" 
                dataKey="impressions" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 5 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EngagementChart;