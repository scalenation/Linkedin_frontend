// src/pages/settings-configuration/components/LinkedInAccounts.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import linkedinAutomationService from '../../../utils/linkedinAutomationService';

const LinkedInAccounts = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [automationSettings, setAutomationSettings] = useState({
    humanLikeDelay: true,
    randomizeTimings: true,
    respectRateLimits: true,
    useProxyRotation: false,
    sessionPersistence: true
  });
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    if (user?.id) {
      loadLinkedInAccounts();
      checkServerStatus();
    }
  }, [user]);

  const loadLinkedInAccounts = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    const result = await linkedinAutomationService.getLinkedInAccounts(user.id);
    
    if (result.success) {
      setAccounts(result.data);
    } else {
      console.log('Failed to load LinkedIn accounts:', result.error);
    }
    setLoading(false);
  };

  const checkServerStatus = async () => {
    const status = await linkedinAutomationService.checkAutomationServerStatus();
    setServerStatus(status);
  };

  const handleAddAccount = async () => {
    if (!loginForm.email || !loginForm.password) {
      return;
    }

    setLoading(true);
    
    try {
      // Authenticate with LinkedIn
      const authResult = await linkedinAutomationService.loginToLinkedIn({
        email: loginForm.email,
        password: loginForm.password
      });

      if (!authResult.success) {
        console.log('LinkedIn authentication failed:', authResult.error);
        setLoading(false);
        return;
      }

      // Save account to database
      const saveResult = await linkedinAutomationService.saveLinkedInAccount(
        user.id,
        authResult.data
      );

      if (saveResult.success) {
        await loadLinkedInAccounts();
        setShowAddAccount(false);
        setLoginForm({ email: '', password: '' });
      } else {
        console.log('Failed to save LinkedIn account:', saveResult.error);
      }
    } catch (error) {
      console.log('Error adding LinkedIn account:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePosting = async (accountId) => {
    const account = accounts.find(acc => acc.id === accountId);
    if (!account) return;

    const newStatus = account.automation_enabled ? 'paused' : 'active';
    const result = await linkedinAutomationService.updateAccountStatus(accountId, newStatus);
    
    if (result.success) {
      await loadLinkedInAccounts();
    }
  };

  const handleRemoveAccount = async (accountId) => {
    if (!confirm('Are you sure you want to remove this LinkedIn account?')) {
      return;
    }

    const result = await linkedinAutomationService.removeLinkedInAccount(accountId);
    if (result.success) {
      await loadLinkedInAccounts();
    }
  };

  const handleRefreshSession = async (accountId) => {
    // In a real implementation, this would refresh the LinkedIn session
    const result = await linkedinAutomationService.updateAccountStatus(accountId, 'active');
    if (result.success) {
      await loadLinkedInAccounts();
    }
  };

  const handleAutomationSettingChange = (key, value) => {
    setAutomationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getStatusColor = (status) => {
    if (!status) return 'text-text-secondary';
    
    switch (status) {
      case 'connected': case'active':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error': case'inactive':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    if (!status) return 'Circle';
    
    switch (status) {
      case 'connected': case'active':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error': case'inactive':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const getAccountStatus = (account) => {
    if (!account.is_active) return 'inactive';
    if (account.automation_enabled) return 'active';
    return 'connected';
  };

  return (
    <div className="space-y-8">
      {/* Server Status */}
      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon 
              name={serverStatus?.status === 'online' ? 'CheckCircle' : 
                    serverStatus?.status === 'demo_mode' ? 'Info' : 'AlertCircle'} 
              size={20} 
              className={serverStatus?.status === 'online' ? 'text-success' :
                        serverStatus?.status === 'demo_mode' ? 'text-secondary' : 'text-error'}
            />
            <div>
              <h4 className="text-sm font-medium text-text-primary">
                Automation Server Status
              </h4>
              <p className="text-xs text-text-secondary">
                {serverStatus?.status === 'online' && 'Automation server is running'}
                {serverStatus?.status === 'demo_mode' && 'Running in demo mode - automation simulated'}
                {serverStatus?.status === 'offline' && 'Automation server is offline'}
              </p>
            </div>
          </div>
          <button
            onClick={checkServerStatus}
            className="btn-secondary text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium text-text-primary mb-2">Connected LinkedIn Accounts</h3>
            <p className="text-sm text-text-secondary">
              Manage your LinkedIn profiles for automated posting
            </p>
          </div>
          <button
            onClick={() => setShowAddAccount(true)}
            disabled={loading}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50"
          >
            <Icon name="Plus" size={16} />
            <span>Add Account</span>
          </button>
        </div>

        <div className="space-y-4">
          {loading && accounts.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Loader" size={32} className="animate-spin mx-auto mb-4 text-text-secondary" />
              <p className="text-text-secondary">Loading accounts...</p>
            </div>
          ) : accounts.length === 0 ? (
            <div className="text-center py-8 text-text-secondary">
              <Icon name="Linkedin" size={48} className="mx-auto mb-4 opacity-50" />
              <p>No LinkedIn accounts connected</p>
              <p className="text-sm">Add your first LinkedIn account to start automation</p>
            </div>
          ) : (
            accounts.map((account) => {
              const status = getAccountStatus(account);
              return (
                <div key={account.id} className="card-elevated p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                          {account.avatar_url ? (
                            <Image
                              src={account.avatar_url}
                              alt={account.account_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Icon name="User" size={20} className="text-text-secondary" />
                            </div>
                          )}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          status === 'active' ? 'bg-success' :
                          status === 'connected' ? 'bg-secondary' : 'bg-error'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-medium text-text-primary">{account.account_name}</h4>
                        <p className="text-sm text-text-secondary mb-1">{account.account_email}</p>
                        <div className="flex items-center space-x-4 text-xs text-text-secondary">
                          <div className="flex items-center space-x-1">
                            <Icon 
                              name={getStatusIcon(status)} 
                              size={12} 
                              className={getStatusColor(status)}
                            />
                            <span className="capitalize">{status}</span>
                          </div>
                          {account.last_sync_at && (
                            <span>Last sync: {new Date(account.last_sync_at).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-text-secondary">Automation</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={account.automation_enabled || false}
                            onChange={() => handleTogglePosting(account.id)}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <button
                        onClick={() => handleRefreshSession(account.id)}
                        className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded"
                        title="Refresh Session"
                      >
                        <Icon name="RefreshCw" size={16} />
                      </button>
                      
                      <button
                        onClick={() => handleRemoveAccount(account.id)}
                        className="p-2 text-text-secondary hover:text-error transition-colors duration-200 focus-ring rounded"
                        title="Remove Account"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">Account Type:</span>
                        <div className="text-text-primary mt-1 capitalize">
                          {account.account_type || 'Personal'}
                        </div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Session Status:</span>
                        <div className="text-text-primary mt-1">
                          {account.session_expires_at ? 
                            new Date(account.session_expires_at) > new Date() ? 'Valid' : 'Expired' : 'Not authenticated'
                          }
                        </div>
                      </div>
                      <div>
                        <span className="text-text-secondary">Profile URL:</span>
                        <div className="text-primary hover:text-primary/80 mt-1">
                          {account.profile_url ? (
                            <a href={account.profile_url} target="_blank" rel="noopener noreferrer" className="text-xs">
                              View Profile
                            </a>
                          ) : (
                            <span className="text-text-secondary text-xs">Not available</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Browser Automation Settings */}
      <div className="card p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-text-primary mb-2">Browser Automation Settings</h3>
          <p className="text-sm text-text-secondary">
            Configure anti-detection and human-like behavior patterns
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-elevated p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Human-like Delays</h4>
                  <p className="text-xs text-text-secondary">Add random delays between actions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={automationSettings.humanLikeDelay}
                    onChange={(e) => handleAutomationSettingChange('humanLikeDelay', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              {automationSettings.humanLikeDelay && (
                <div className="text-xs text-text-secondary">
                  Delay range: 2-8 seconds between actions
                </div>
              )}
            </div>

            <div className="card-elevated p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Randomize Timings</h4>
                  <p className="text-xs text-text-secondary">Vary posting times to appear natural</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={automationSettings.randomizeTimings}
                    onChange={(e) => handleAutomationSettingChange('randomizeTimings', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="card-elevated p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Respect Rate Limits</h4>
                  <p className="text-xs text-text-secondary">Follow LinkedIn's posting guidelines</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={automationSettings.respectRateLimits}
                    onChange={(e) => handleAutomationSettingChange('respectRateLimits', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="card-elevated p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-sm font-medium text-text-primary">Session Persistence</h4>
                  <p className="text-xs text-text-secondary">Maintain login sessions securely</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={automationSettings.sessionPersistence}
                    onChange={(e) => handleAutomationSettingChange('sessionPersistence', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="card-elevated p-4">
            <h4 className="text-sm font-medium text-text-primary mb-4">Advanced Anti-Detection</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-medium text-text-primary">Proxy Rotation</h5>
                  <p className="text-xs text-text-secondary">Use different IP addresses for posting</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={automationSettings.useProxyRotation}
                    onChange={(e) => handleAutomationSettingChange('useProxyRotation', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              {automationSettings.useProxyRotation && (
                <div className="pl-4 border-l-2 border-primary/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-text-primary mb-1">
                        Proxy Provider
                      </label>
                      <select className="w-full px-3 py-2 text-sm border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary">
                        <option>Built-in Proxies</option>
                        <option>Custom Proxy List</option>
                        <option>Residential Proxies</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-text-primary mb-1">
                        Rotation Frequency
                      </label>
                      <select className="w-full px-3 py-2 text-sm border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary">
                        <option>Every Post</option>
                        <option>Every Hour</option>
                        <option>Daily</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Account Modal */}
      {showAddAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">Add LinkedIn Account</h3>
                <button
                  onClick={() => setShowAddAccount(false)}
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-text-secondary">
                  Enter your LinkedIn credentials to connect your account for automation.
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    LinkedIn Email
                  </label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    LinkedIn Password
                  </label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Enter your password"
                  />
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-background rounded-lg">
                  <Icon name="Shield" size={20} className="text-success" />
                  <div className="text-sm">
                    <div className="font-medium text-text-primary">Secure Connection</div>
                    <div className="text-text-secondary">Your credentials are encrypted and stored securely</div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddAccount}
                    disabled={loading || !loginForm.email || !loginForm.password}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Icon name="Loader" size={16} className="animate-spin" />
                        <span>Connecting...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Linkedin" size={16} />
                        <span>Connect Account</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowAddAccount(false)}
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

export default LinkedInAccounts;