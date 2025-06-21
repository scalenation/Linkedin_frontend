import React from 'react';
import Icon from '../../../components/AppIcon';

const CreditUsageMeter = () => {
  const creditData = {
    used: 3750,
    total: 5000,
    plan: "Professional",
    renewsOn: "2024-02-15",
    bonusCredits: 250,
    usageBreakdown: [
      { category: "Content Generation", used: 2100, percentage: 56 },
      { category: "Trend Analysis", used: 850, percentage: 23 },
      { category: "Post Scheduling", used: 500, percentage: 13 },
      { category: "Analytics", used: 300, percentage: 8 }
    ]
  };

  const usagePercentage = (creditData.used / creditData.total) * 100;
  const remainingCredits = creditData.total - creditData.used;
  const daysUntilRenewal = Math.ceil((new Date(creditData.renewsOn) - new Date()) / (1000 * 60 * 60 * 24));

  const getUsageColor = () => {
    if (usagePercentage >= 90) return 'text-error';
    if (usagePercentage >= 75) return 'text-warning';
    return 'text-success';
  };

  const getUsageBgColor = () => {
    if (usagePercentage >= 90) return 'bg-error';
    if (usagePercentage >= 75) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-semibold text-text-primary">Credit Usage</h2>
          <span className="text-sm font-medium text-secondary">{creditData.plan} Plan</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Usage Overview */}
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-background"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={getUsageColor()}
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${usagePercentage}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-2xl font-heading font-bold ${getUsageColor()}`}>
                  {Math.round(usagePercentage)}%
                </div>
                <div className="text-xs text-text-secondary">Used</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Used:</span>
              <span className="font-medium text-text-primary">{creditData.used.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Remaining:</span>
              <span className="font-medium text-text-primary">{remainingCredits.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Bonus:</span>
              <span className="font-medium text-success">+{creditData.bonusCredits}</span>
            </div>
          </div>
        </div>

        {/* Usage Breakdown */}
        <div>
          <h3 className="font-medium text-text-primary mb-3">Usage Breakdown</h3>
          <div className="space-y-3">
            {creditData.usageBreakdown.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-text-secondary">{item.category}</span>
                  <span className="font-medium text-text-primary">{item.used}</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-secondary h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Renewal Info */}
        <div className="p-4 bg-background rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="Calendar" size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Next Renewal</span>
          </div>
          <div className="text-sm text-text-secondary">
            {daysUntilRenewal} days remaining ({new Date(creditData.renewsOn).toLocaleDateString()})
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {usagePercentage >= 75 && (
            <button className="w-full btn-accent flex items-center justify-center space-x-2">
              <Icon name="Zap" size={16} />
              <span>Upgrade Plan</span>
            </button>
          )}
          <button className="w-full bg-surface border border-border text-text-primary px-4 py-2 rounded-md font-medium hover:bg-background transition-colors duration-200 flex items-center justify-center space-x-2">
            <Icon name="CreditCard" size={16} />
            <span>Buy Credits</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreditUsageMeter;