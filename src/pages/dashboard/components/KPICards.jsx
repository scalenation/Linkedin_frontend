import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICards = () => {
  const kpiData = [
    {
      id: 1,
      title: "Posts Published",
      value: "47",
      change: "+12%",
      changeType: "positive",
      period: "This month",
      icon: "Send",
      color: "primary"
    },
    {
      id: 2,
      title: "Engagement Rate",
      value: "8.4%",
      change: "+2.1%",
      changeType: "positive",
      period: "vs last month",
      icon: "Heart",
      color: "secondary"
    },
    {
      id: 3,
      title: "Credits Remaining",
      value: "1,250",
      change: "75% used",
      changeType: "neutral",
      period: "of 5,000 monthly",
      icon: "Coins",
      color: "accent"
    },
    {
      id: 4,
      title: "Trending Topics",
      value: "23",
      change: "+5 new",
      changeType: "positive",
      period: "This week",
      icon: "TrendingUp",
      color: "success"
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getIconBgColor = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'secondary':
        return 'bg-secondary/10 text-secondary';
      case 'accent':
        return 'bg-accent/10 text-accent';
      case 'success':
        return 'bg-success/10 text-success';
      default:
        return 'bg-text-secondary/10 text-text-secondary';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiData.map((kpi) => (
        <div key={kpi.id} className="card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconBgColor(kpi.color)}`}>
              <Icon name={kpi.icon} size={24} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${getChangeColor(kpi.changeType)}`}>
              {kpi.changeType === 'positive' && <Icon name="TrendingUp" size={14} />}
              {kpi.changeType === 'negative' && <Icon name="TrendingDown" size={14} />}
              <span className="font-medium">{kpi.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-heading font-semibold text-text-primary mb-1">
              {kpi.value}
            </h3>
            <p className="text-sm font-medium text-text-primary mb-1">{kpi.title}</p>
            <p className="text-xs text-text-secondary">{kpi.period}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;