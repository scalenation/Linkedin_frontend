import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BillingSettings = () => {
  const [currentPlan, setCurrentPlan] = useState('professional');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: { monthly: 29, yearly: 290 },
      credits: 500,
      features: [
        '500 AI-generated posts per month',
        '1 LinkedIn account',
        'Basic content templates',
        'Email support',
        'Basic analytics'
      ],
      recommended: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: { monthly: 79, yearly: 790 },
      credits: 1500,
      features: [
        '1,500 AI-generated posts per month',
        '3 LinkedIn accounts',
        'Advanced content templates',
        'Priority support',
        'Advanced analytics',
        'Custom AI prompts',
        'Scheduling automation'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 199, yearly: 1990 },
      credits: 5000,
      features: [
        '5,000 AI-generated posts per month',
        'Unlimited LinkedIn accounts',
        'Custom content templates',
        '24/7 dedicated support',
        'Enterprise analytics',
        'API access',
        'White-label options',
        'Team collaboration'
      ],
      recommended: false
    }
  ];

  const usageData = {
    creditsUsed: 850,
    creditsTotal: 1500,
    postsGenerated: 127,
    accountsConnected: 2,
    billingPeriodEnd: '2024-12-31'
  };

  const paymentHistory = [
    {
      id: 1,
      date: '2024-11-01',
      amount: 79,
      plan: 'Professional',
      status: 'paid',
      invoice: 'INV-2024-001'
    },
    {
      id: 2,
      date: '2024-10-01',
      amount: 79,
      plan: 'Professional',
      status: 'paid',
      invoice: 'INV-2024-002'
    },
    {
      id: 3,
      date: '2024-09-01',
      amount: 29,
      plan: 'Starter',
      status: 'paid',
      invoice: 'INV-2024-003'
    }
  ];

  const handlePlanChange = (planId) => {
    setCurrentPlan(planId);
    setShowUpgradeModal(true);
  };

  const getUsagePercentage = () => {
    return (usageData.creditsUsed / usageData.creditsTotal) * 100;
  };

  const getUsageColor = () => {
    const percentage = getUsagePercentage();
    if (percentage >= 90) return 'bg-error';
    if (percentage >= 70) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="space-y-8">
      {/* Current Plan & Usage */}
      <div className="card p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-text-primary mb-2">Current Plan & Usage</h3>
          <p className="text-sm text-text-secondary">
            Monitor your subscription and credit usage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Plan Info */}
          <div className="card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xl font-medium text-text-primary">
                  {plans.find(p => p.id === currentPlan)?.name} Plan
                </h4>
                <p className="text-sm text-text-secondary">
                  ${plans.find(p => p.id === currentPlan)?.price[billingCycle]}/{billingCycle === 'monthly' ? 'month' : 'year'}
                </p>
              </div>
              <div className="status-success">Active</div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Billing Cycle:</span>
                <span className="text-text-primary capitalize">{billingCycle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Next Billing Date:</span>
                <span className="text-text-primary">{new Date(usageData.billingPeriodEnd).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Connected Accounts:</span>
                <span className="text-text-primary">{usageData.accountsConnected}</span>
              </div>
            </div>
          </div>

          {/* Usage Metrics */}
          <div className="card-elevated p-6">
            <h4 className="text-lg font-medium text-text-primary mb-4">Usage This Month</h4>
            
            {/* Credits Usage */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Credits Used</span>
                <span className="text-text-primary">
                  {usageData.creditsUsed.toLocaleString()} / {usageData.creditsTotal.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getUsageColor()}`}
                  style={{ width: `${getUsagePercentage()}%` }}
                />
              </div>
              <p className="text-xs text-text-secondary mt-1">
                {Math.round(getUsagePercentage())}% of monthly credits used
              </p>
            </div>

            {/* Posts Generated */}
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Posts Generated:</span>
              <span className="text-text-primary">{usageData.postsGenerated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-2">Available Plans</h3>
            <p className="text-sm text-text-secondary">
              Choose the plan that best fits your needs
            </p>
          </div>
          
          {/* Billing Toggle */}
          <div className="flex items-center space-x-3">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'text-text-primary' : 'text-text-secondary'}`}>
              Monthly
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={billingCycle === 'yearly'}
                onChange={(e) => setBillingCycle(e.target.checked ? 'yearly' : 'monthly')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'text-text-primary' : 'text-text-secondary'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">Save 17%</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card-elevated p-6 relative transition-all duration-200 ${
                currentPlan === plan.id
                  ? 'ring-2 ring-primary border-primary' :'hover:shadow-lg'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h4 className="text-xl font-medium text-text-primary mb-2">{plan.name}</h4>
                <div className="text-3xl font-bold text-text-primary mb-1">
                  ${plan.price[billingCycle]}
                </div>
                <p className="text-sm text-text-secondary">
                  per {billingCycle === 'monthly' ? 'month' : 'year'}
                </p>
                <p className="text-sm text-text-secondary mt-2">
                  {plan.credits.toLocaleString()} credits included
                </p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanChange(plan.id)}
                className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-200 ${
                  currentPlan === plan.id
                    ? 'bg-gray-100 text-text-secondary cursor-default' :'btn-primary'
                }`}
                disabled={currentPlan === plan.id}
              >
                {currentPlan === plan.id ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-2">Payment History</h3>
            <p className="text-sm text-text-secondary">
              View your billing history and download invoices
            </p>
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Icon name="Download" size={16} />
            <span>Export</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-primary">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-primary">Plan</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-primary">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-primary">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-primary">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-background transition-colors duration-200">
                  <td className="py-3 px-4 text-sm text-text-secondary">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-text-primary">{payment.plan}</td>
                  <td className="py-3 px-4 text-sm text-text-primary">${payment.amount}</td>
                  <td className="py-3 px-4">
                    <span className="status-success text-xs px-2 py-1 capitalize">
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
                      {payment.invoice}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-2">Payment Method</h3>
            <p className="text-sm text-text-secondary">
              Manage your billing information
            </p>
          </div>
          <button className="btn-secondary">Update</button>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-background rounded-lg">
          <div className="w-12 h-8 bg-primary rounded flex items-center justify-center">
            <Icon name="CreditCard" size={20} color="white" />
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary">•••• •••• •••• 4242</div>
            <div className="text-xs text-text-secondary">Expires 12/26</div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">Confirm Plan Change</h3>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-text-secondary">
                  You're about to change to the {plans.find(p => p.id === currentPlan)?.name} plan.
                  The change will take effect immediately.
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-background rounded-lg">
                  <Icon name="Info" size={20} className="text-primary" />
                  <div className="text-sm">
                    <div className="font-medium text-text-primary">Prorated Billing</div>
                    <div className="text-text-secondary">You'll be charged the difference for the remaining billing period</div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="flex-1 btn-primary"
                  >
                    Confirm Change
                  </button>
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="px-4 py-2 text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingSettings;