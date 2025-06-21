import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICards = ({ dateRange, comparisonPeriod }) => {
  const kpiData = [
    {
      id: 'impressions',
      title: 'Total Impressions',
      value: '2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: 'Eye',
      color: 'text-secondary'
    },
    {
      id: 'engagement',
      title: 'Engagement Rate',
      value: '4.8%',
      change: '+0.8%',
      trend: 'up',
      icon: 'Heart',
      color: 'text-success'
    },
    {
      id: 'ctr',
      title: 'Click-through Rate',
      value: '2.1%',
      change: '-0.3%',
      trend: 'down',
      icon: 'MousePointer',
      color: 'text-warning'
    },
    {
      id: 'followers',
      title: 'Follower Growth',
      value: '+1,247',
      change: '+18.2%',
      trend: 'up',
      icon: 'Users',
      color: 'text-accent'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi) => (
        <div key={kpi.id} className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center ${kpi.color}`}>
              <Icon name={kpi.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              kpi.trend === 'up' ? 'text-success' : 'text-error'
            }`}>
              <Icon name={kpi.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
              <span>{kpi.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-heading font-semibold text-text-primary mb-1">
              {kpi.value}
            </h3>
            <p className="text-sm text-text-secondary">{kpi.title}</p>
          </div>
          
          {/* Mini trend indicator */}
          <div className="mt-4 h-2 bg-background rounded-full overflow-hidden">
            <div 
              className={`h-full ${kpi.trend === 'up' ? 'bg-success' : 'bg-error'} rounded-full transition-all duration-300`}
              style={{ width: `${Math.abs(parseFloat(kpi.change))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;