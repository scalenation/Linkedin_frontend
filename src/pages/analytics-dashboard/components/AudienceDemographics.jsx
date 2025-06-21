import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const AudienceDemographics = () => {
  const industryData = [
    { name: 'Technology', value: 35, color: '#1B365D' },
    { name: 'Marketing', value: 25, color: '#4A90A4' },
    { name: 'Finance', value: 15, color: '#FF6B35' },
    { name: 'Healthcare', value: 12, color: '#38A169' },
    { name: 'Education', value: 8, color: '#D69E2E' },
    { name: 'Other', value: 5, color: '#718096' }
  ];

  const locationData = [
    { country: 'United States', percentage: 42, flag: '🇺🇸' },
    { country: 'United Kingdom', percentage: 18, flag: '🇬🇧' },
    { country: 'Canada', percentage: 12, flag: '🇨🇦' },
    { country: 'Australia', percentage: 8, flag: '🇦🇺' },
    { country: 'Germany', percentage: 7, flag: '🇩🇪' },
    { country: 'Other', percentage: 13, flag: '🌍' }
  ];

  const seniorityData = [
    { level: 'Senior', count: 2840, percentage: 38 },
    { level: 'Mid-level', count: 2130, percentage: 28 },
    { level: 'Entry-level', count: 1520, percentage: 20 },
    { level: 'Executive', count: 760, percentage: 10 },
    { level: 'Director', count: 304, percentage: 4 }
  ];

  return (
    <div className="space-y-6">
      {/* Industry Distribution */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Industry Distribution
          </h3>
          <Icon name="PieChart" size={20} className="text-text-secondary" />
        </div>
        
        <div className="h-48 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={industryData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {industryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-md)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-2">
          {industryData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-text-primary">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-text-secondary">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Geographic Distribution
          </h3>
          <Icon name="Globe" size={20} className="text-text-secondary" />
        </div>
        
        <div className="space-y-3">
          {locationData.map((location) => (
            <div key={location.country} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{location.flag}</span>
                <span className="text-sm text-text-primary">{location.country}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-secondary rounded-full transition-all duration-300"
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-text-secondary w-8 text-right">
                  {location.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Seniority Levels */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Seniority Levels
          </h3>
          <Icon name="Users" size={20} className="text-text-secondary" />
        </div>
        
        <div className="space-y-3">
          {seniorityData.map((item) => (
            <div key={item.level} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={14} className="text-primary" />
                </div>
                <div>
                  <span className="text-sm font-medium text-text-primary">{item.level}</span>
                  <div className="text-xs text-text-secondary">{item.count.toLocaleString()} followers</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-2 bg-background rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-text-secondary w-8 text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AudienceDemographics;