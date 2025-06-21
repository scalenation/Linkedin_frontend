import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SecuritySettings = () => {
  const [activeTab, setActiveTab] = useState('authentication');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro',
      browser: 'Chrome 119.0',
      location: 'New York, NY',
      ipAddress: '192.168.1.100',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 15',
      browser: 'Safari Mobile',
      location: 'New York, NY',
      ipAddress: '192.168.1.101',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      device: 'Windows PC',
      browser: 'Edge 119.0',
      location: 'Boston, MA',
      ipAddress: '10.0.0.50',
      lastActive: '2 days ago',
      current: false
    }
  ]);

  const tabs = [
    { id: 'authentication', label: 'Authentication', icon: 'Shield' },
    { id: 'sessions', label: 'Active Sessions', icon: 'Monitor' },
    { id: 'data-export', label: 'Data & Privacy', icon: 'Database' }
  ];

  const generateBackupCodes = () => {
    const codes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setBackupCodes(codes);
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(true);
    generateBackupCodes();
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    setShowQRCode(false);
    setBackupCodes([]);
  };

  const handleTerminateSession = (sessionId) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
  };

  const handleExportData = (dataType) => {
    console.log(`Exporting ${dataType} data...`);
    // Simulate data export
  };

  const renderAuthenticationTab = () => (
    <div className="space-y-8">
      {/* Password Section */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-medium text-text-primary">Password</h4>
            <p className="text-sm text-text-secondary">
              Keep your account secure with a strong password
            </p>
          </div>
          <button className="btn-secondary">Change Password</button>
        </div>
        
        <div className="text-sm text-text-secondary">
          Last changed: November 15, 2024
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-medium text-text-primary">Two-Factor Authentication</h4>
            <p className="text-sm text-text-secondary">
              Add an extra layer of security to your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={(e) => e.target.checked ? handleEnable2FA() : handleDisable2FA()}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {twoFactorEnabled && (
          <div className="space-y-6">
            {showQRCode && (
              <div className="border-t border-border pt-6">
                <h5 className="text-sm font-medium text-text-primary mb-3">
                  Setup Authenticator App
                </h5>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center mx-auto md:mx-0">
                      <div className="text-center">
                        <Icon name="QrCode" size={48} className="text-text-secondary mx-auto mb-2" />
                        <p className="text-xs text-text-secondary">QR Code</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="space-y-3">
                      <div className="text-sm">
                        <p className="font-medium text-text-primary mb-2">Manual Setup Key:</p>
                        <code className="bg-background px-3 py-2 rounded text-xs font-mono">
                          JBSWY3DPEHPK3PXP
                        </code>
                      </div>
                      <div className="text-xs text-text-secondary">
                        <p>1. Install an authenticator app (Google Authenticator, Authy, etc.)</p>
                        <p>2. Scan the QR code or enter the manual key</p>
                        <p>3. Enter the 6-digit code from your app below</p>
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="000000"
                          className="flex-1 px-3 py-2 border border-border rounded text-center font-mono"
                          maxLength={6}
                        />
                        <button className="btn-primary">Verify</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {backupCodes.length > 0 && (
              <div className="border-t border-border pt-6">
                <h5 className="text-sm font-medium text-text-primary mb-3">
                  Backup Recovery Codes
                </h5>
                <div className="bg-background p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {backupCodes.map((code, index) => (
                      <code key={index} className="text-sm font-mono text-center py-1">
                        {code}
                      </code>
                    ))}
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-text-secondary">
                    <Icon name="AlertTriangle" size={14} className="text-warning" />
                    <span>Save these codes in a secure location. Each code can only be used once.</span>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button className="btn-secondary text-xs">Download</button>
                    <button className="btn-secondary text-xs">Print</button>
                    <button className="text-xs text-primary hover:text-primary/80">Generate New</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Login Notifications */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-medium text-text-primary">Login Notifications</h4>
            <p className="text-sm text-text-secondary">
              Get notified when someone signs into your account
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input type="checkbox" defaultChecked className="text-primary" />
            <span className="text-sm text-text-secondary">Email notifications for new logins</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="text-primary" />
            <span className="text-sm text-text-secondary">SMS notifications for suspicious activity</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSessionsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-2">Active Sessions</h3>
        <p className="text-sm text-text-secondary">
          Manage devices and browsers that are currently signed into your account
        </p>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="card-elevated p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon 
                    name={session.device.includes('iPhone') ? 'Smartphone' : 'Monitor'} 
                    size={20} 
                    className="text-primary" 
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-lg font-medium text-text-primary">{session.device}</h4>
                    {session.current && (
                      <span className="status-success text-xs px-2 py-1">Current Session</span>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-sm text-text-secondary">
                    <div className="flex items-center space-x-4">
                      <span>{session.browser}</span>
                      <span>•</span>
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span>IP: {session.ipAddress}</span>
                      <span>•</span>
                      <span>Last active: {session.lastActive}</span>
                    </div>
                  </div>
                </div>
              </div>

              {!session.current && (
                <button
                  onClick={() => handleTerminateSession(session.id)}
                  className="btn-secondary text-sm text-error hover:bg-error/5"
                >
                  Terminate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card-elevated p-6 border-2 border-dashed border-border">
        <div className="text-center">
          <Icon name="Shield" size={24} className="text-text-secondary mx-auto mb-3" />
          <h4 className="text-lg font-medium text-text-primary mb-2">Security Tip</h4>
          <p className="text-sm text-text-secondary mb-4">
            If you see any sessions you don't recognize, terminate them immediately and change your password.
          </p>
          <button className="btn-secondary text-error">Terminate All Other Sessions</button>
        </div>
      </div>
    </div>
  );

  const renderDataExportTab = () => (
    <div className="space-y-8">
      {/* Data Export */}
      <div className="card-elevated p-6">
        <div className="mb-6">
          <h4 className="text-lg font-medium text-text-primary mb-2">Export Your Data</h4>
          <p className="text-sm text-text-secondary">
            Download a copy of your data for backup or migration purposes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="FileText" size={20} className="text-primary" />
              <h5 className="font-medium text-text-primary">Content Data</h5>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              All your generated posts, templates, and content history
            </p>
            <button
              onClick={() => handleExportData('content')}
              className="btn-secondary w-full"
            >
              Export Content
            </button>
          </div>

          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="BarChart3" size={20} className="text-primary" />
              <h5 className="font-medium text-text-primary">Analytics Data</h5>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Performance metrics, engagement data, and reports
            </p>
            <button
              onClick={() => handleExportData('analytics')}
              className="btn-secondary w-full"
            >
              Export Analytics
            </button>
          </div>

          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Settings" size={20} className="text-primary" />
              <h5 className="font-medium text-text-primary">Settings & Config</h5>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Account settings, AI preferences, and configurations
            </p>
            <button
              onClick={() => handleExportData('settings')}
              className="btn-secondary w-full"
            >
              Export Settings
            </button>
          </div>

          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Package" size={20} className="text-primary" />
              <h5 className="font-medium text-text-primary">Complete Archive</h5>
            </div>
            <p className="text-sm text-text-secondary mb-4">
              Everything in one comprehensive download
            </p>
            <button
              onClick={() => handleExportData('complete')}
              className="btn-primary w-full"
            >
              Export All Data
            </button>
          </div>
        </div>
      </div>

      {/* Data Import */}
      <div className="card-elevated p-6">
        <div className="mb-6">
          <h4 className="text-lg font-medium text-text-primary mb-2">Import Data</h4>
          <p className="text-sm text-text-secondary">
            Restore your data from a previous export or migrate from another platform
          </p>
        </div>

        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Icon name="Upload" size={32} className="text-text-secondary mx-auto mb-4" />
          <h5 className="text-lg font-medium text-text-primary mb-2">Upload Data File</h5>
          <p className="text-sm text-text-secondary mb-4">
            Select a JSON or ZIP file exported from SocialAI or compatible platform
          </p>
          <div className="flex justify-center space-x-3">
            <button className="btn-primary">Choose File</button>
            <button className="btn-secondary">Import from URL</button>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="card-elevated p-6">
        <div className="mb-6">
          <h4 className="text-lg font-medium text-text-primary mb-2">Privacy Settings</h4>
          <p className="text-sm text-text-secondary">
            Control how your data is used and shared
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-text-primary">Analytics Tracking</h5>
              <p className="text-xs text-text-secondary">Allow anonymous usage analytics to improve the platform</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-text-primary">Data Retention</h5>
              <p className="text-xs text-text-secondary">Automatically delete old data after specified period</p>
            </div>
            <select className="px-3 py-1 text-sm border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary">
              <option>Never</option>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>5 Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="card-elevated p-6 border-error/20">
        <div className="mb-6">
          <h4 className="text-lg font-medium text-error mb-2">Delete Account</h4>
          <p className="text-sm text-text-secondary">
            Permanently delete your account and all associated data
          </p>
        </div>

        <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-error mb-1">This action cannot be undone</p>
              <p className="text-text-secondary">
                All your content, settings, and account data will be permanently deleted. 
                Make sure to export any data you want to keep before proceeding.
              </p>
            </div>
          </div>
        </div>

        <button className="btn-secondary text-error hover:bg-error/5">
          Delete Account
        </button>
      </div>
    </div>
  );

  return (
    <div className="card p-6">
      {/* Tab Navigation */}
      <div className="border-b border-border mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-primary hover:border-gray-300'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'authentication' && renderAuthenticationTab()}
        {activeTab === 'sessions' && renderSessionsTab()}
        {activeTab === 'data-export' && renderDataExportTab()}
      </div>
    </div>
  );
};

export default SecuritySettings;