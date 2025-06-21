import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PlanSelector = ({ selectedPlan, onPlanSelect }) => {
  const [showTooltip, setShowTooltip] = useState(null);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      description: 'Perfect for individuals',
      features: [
        '50 AI-generated posts/month',
        'Basic analytics',
        'Email support',
        '1 LinkedIn account'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 79,
      description: 'Best for growing businesses',
      features: [
        '200 AI-generated posts/month',
        'Advanced analytics',
        'Priority support',
        '3 LinkedIn accounts',
        'Custom templates'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      description: 'For large organizations',
      features: [
        'Unlimited AI-generated posts',
        'Full analytics suite',
        '24/7 phone support',
        'Unlimited LinkedIn accounts',
        'White-label options',
        'API access'
      ],
      popular: false
    }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-3">
        Choose Your Plan
      </label>
      <div className="grid grid-cols-1 gap-3">
        {plans.map((plan) => (
          <div key={plan.id} className="relative">
            <button
              type="button"
              onClick={() => onPlanSelect(plan.id)}
              className={`w-full p-4 border rounded-lg text-left transition-all duration-200 ${
                selectedPlan === plan.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/50 hover:bg-background'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {selectedPlan === plan.id && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-text-primary">{plan.name}</h3>
                      {plan.popular && (
                        <span className="px-2 py-1 bg-accent text-white text-xs rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">{plan.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-text-primary">
                      ${plan.price}
                    </div>
                    <div className="text-xs text-text-secondary">per month</div>
                  </div>
                  <button
                    type="button"
                    onMouseEnter={() => setShowTooltip(plan.id)}
                    onMouseLeave={() => setShowTooltip(null)}
                    className="text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    <Icon name="Info" size={16} />
                  </button>
                </div>
              </div>
            </button>

            {/* Tooltip */}
            {showTooltip === plan.id && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-text-primary text-white p-3 rounded-lg shadow-lg z-10 animate-fade-in">
                <h4 className="font-medium mb-2">{plan.name} Features:</h4>
                <ul className="space-y-1 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} className="text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="absolute -top-2 right-4 w-4 h-4 bg-text-primary transform rotate-45" />
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-3 p-3 bg-background rounded-md">
        <div className="flex items-center space-x-2">
          <Icon name="CreditCard" size={16} className="text-secondary" />
          <span className="text-sm text-text-secondary">
            14-day free trial • No credit card required • Cancel anytime
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;