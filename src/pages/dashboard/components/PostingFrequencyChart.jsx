import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const PostingFrequencyChart = () => {
  const frequencyData = [
    { day: 'Mon', posts: 3, scheduled: 2, published: 3 },
    { day: 'Tue', posts: 5, scheduled: 3, published: 5 },
    { day: 'Wed', posts: 4, scheduled: 4, published: 4 },
    { day: 'Thu', posts: 7, scheduled: 5, published: 6 },
    { day: 'Fri', posts: 6, scheduled: 4, published: 6 },
    { day: 'Sat', posts: 2, scheduled: 3, published: 2 },
    { day: 'Sun', posts: 3, scheduled: 2, published: 3 }
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

  const totalPosts = frequencyData.reduce((sum, day) => sum + day.posts, 0);
  const avgPostsPerDay = Math.round(totalPosts / frequencyData.length * 10) / 10;

  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">Posting Frequency</h2>
            <p className="text-sm text-text-secondary">Published vs scheduled posts</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-heading font-semibold text-text-primary">{avgPostsPerDay}</div>
            <div className="text-xs text-text-secondary">Avg per day</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="h-64 w-full" aria-label="Weekly Posting Frequency Bar Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={frequencyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
              <Bar 
                dataKey="published" 
                fill="var(--color-primary)"
                radius={[2, 2, 0, 0]}
                name="Published"
              />
              <Bar 
                dataKey="scheduled" 
                fill="var(--color-secondary)"
                radius={[2, 2, 0, 0]}
                name="Scheduled"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Stats */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-text-secondary">Published</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-secondary" />
                <span className="text-sm text-text-secondary">Scheduled</span>
              </div>
            </div>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 flex items-center space-x-1">
              <span>View Details</span>
              <Icon name="ArrowRight" size={14} />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-background rounded-lg">
              <div className="text-lg font-heading font-semibold text-text-primary">{totalPosts}</div>
              <div className="text-xs text-text-secondary">Total Posts</div>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <div className="text-lg font-heading font-semibold text-success">
                {frequencyData.reduce((sum, day) => sum + day.published, 0)}
              </div>
              <div className="text-xs text-text-secondary">Published</div>
            </div>
            <div className="p-3 bg-background rounded-lg">
              <div className="text-lg font-heading font-semibold text-secondary">
                {frequencyData.reduce((sum, day) => sum + day.scheduled, 0)}
              </div>
              <div className="text-xs text-text-secondary">Scheduled</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostingFrequencyChart;