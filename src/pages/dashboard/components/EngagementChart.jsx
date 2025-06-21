import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const EngagementChart = () => {
  const engagementData = [
    { day: 'Mon', likes: 45, comments: 12, shares: 8, views: 320 },
    { day: 'Tue', likes: 67, comments: 18, shares: 15, views: 480 },
    { day: 'Wed', likes: 89, comments: 25, shares: 22, views: 650 },
    { day: 'Thu', likes: 123, comments: 34, shares: 28, views: 890 },
    { day: 'Fri', likes: 156, comments: 42, shares: 35, views: 1120 },
    { day: 'Sat', likes: 98, comments: 28, shares: 18, views: 720 },
    { day: 'Sun', likes: 76, comments: 21, shares: 14, views: 580 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg shadow-lg p-3">
          <p className="font-medium text-text-primary mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-text-secondary capitalize">{entry.dataKey}:</span>
              <span className="font-medium text-text-primary">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalEngagement = engagementData.reduce((sum, day) => 
    sum + day.likes + day.comments + day.shares, 0
  );

  const avgEngagement = Math.round(totalEngagement / engagementData.length);

  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">Weekly Engagement</h2>
            <p className="text-sm text-text-secondary">Likes, comments, and shares</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-heading font-semibold text-text-primary">{avgEngagement}</div>
            <div className="text-xs text-text-secondary">Avg per day</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="h-64 w-full" aria-label="Weekly Engagement Line Chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="likes" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="comments" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-secondary)', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="shares" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-text-secondary">Likes</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-sm text-text-secondary">Comments</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent" />
            <span className="text-sm text-text-secondary">Shares</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementChart;