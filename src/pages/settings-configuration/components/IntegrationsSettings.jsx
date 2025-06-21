import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const IntegrationsSettings = () => {
  const [activeTab, setActiveTab] = useState('rss-feeds');
  const [rssFeeds, setRssFeeds] = useState([
    {
      id: 1,
      name: 'TechCrunch',
      url: 'https://techcrunch.com/feed/',
      category: 'Technology',
      status: 'active',
      lastSync: '2 hours ago',
      postsGenerated: 12
    },
    {
      id: 2,
      name: 'Harvard Business Review',
      url: 'https://hbr.org/feed',
      category: 'Business',
      status: 'active',
      lastSync: '1 hour ago',
      postsGenerated: 8
    },
    {
      id: 3,
      name: 'Marketing Land',
      url: 'https://marketingland.com/feed',
      category: 'Marketing',
      status: 'error',
      lastSync: '2 days ago',
      postsGenerated: 0
    }
  ]);

  const [apiCredentials, setApiCredentials] = useState([
    {
      id: 1,
      service: 'OpenRouter',
      status: 'connected',
      lastUsed: '5 minutes ago',
      encrypted: true
    },
    {
      id: 2,
      service: 'LinkedIn API',
      status: 'connected',
      lastUsed: '1 hour ago',
      encrypted: true
    }
  ]);

  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      name: 'Post Success Notification',
      url: 'https://api.company.com/webhooks/post-success',
      events: ['post.published', 'post.failed'],
      status: 'active'
    }
  ]);

  const [showAddFeed, setShowAddFeed] = useState(false);
  const [showAddWebhook, setShowAddWebhook] = useState(false);
  const [newFeed, setNewFeed] = useState({ name: '', url: '', category: 'Technology' });
  const [newWebhook, setNewWebhook] = useState({ name: '', url: '', events: [] });

  const tabs = [
    { id: 'rss-feeds', label: 'RSS Feeds', icon: 'Rss' },
    { id: 'api-credentials', label: 'API Credentials', icon: 'Key' },
    { id: 'webhooks', label: 'Webhooks', icon: 'Webhook' }
  ];

  const categories = ['Technology', 'Business', 'Marketing', 'Finance', 'Healthcare', 'Education'];
  const webhookEvents = [
    'post.published',
    'post.failed',
    'post.scheduled',
    'account.connected',
    'account.disconnected',
    'credits.low'
  ];

  const handleAddRSSFeed = () => {
    if (newFeed.name && newFeed.url) {
      setRssFeeds(prev => [...prev, {
        id: Date.now(),
        ...newFeed,
        status: 'active',
        lastSync: 'Never',
        postsGenerated: 0
      }]);
      setNewFeed({ name: '', url: '', category: 'Technology' });
      setShowAddFeed(false);
    }
  };

  const handleRemoveFeed = (feedId) => {
    setRssFeeds(prev => prev.filter(feed => feed.id !== feedId));
  };

  const handleToggleFeed = (feedId) => {
    setRssFeeds(prev => prev.map(feed => 
      feed.id === feedId 
        ? { ...feed, status: feed.status === 'active' ? 'paused' : 'active' }
        : feed
    ));
  };

  const handleAddWebhook = () => {
    if (newWebhook.name && newWebhook.url && newWebhook.events.length > 0) {
      setWebhooks(prev => [...prev, {
        id: Date.now(),
        ...newWebhook,
        status: 'active'
      }]);
      setNewWebhook({ name: '', url: '', events: [] });
      setShowAddWebhook(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': case'connected':
        return 'text-success';
      case 'paused':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': case'connected':
        return 'CheckCircle';
      case 'paused':
        return 'Pause';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const renderRSSFeedsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-2">RSS Feed Sources</h3>
          <p className="text-sm text-text-secondary">
            Monitor RSS feeds for trending topics and content inspiration
          </p>
        </div>
        <button
          onClick={() => setShowAddFeed(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Add Feed</span>
        </button>
      </div>

      <div className="space-y-4">
        {rssFeeds.map((feed) => (
          <div key={feed.id} className="card-elevated p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-medium text-text-primary">{feed.name}</h4>
                  <span className="text-xs bg-background text-text-secondary px-2 py-1 rounded">
                    {feed.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={getStatusIcon(feed.status)} 
                      size={14} 
                      className={getStatusColor(feed.status)}
                    />
                    <span className={`text-xs capitalize ${getStatusColor(feed.status)}`}>
                      {feed.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-text-secondary mb-3">{feed.url}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Last Sync:</span>
                    <div className="text-text-primary">{feed.lastSync}</div>
                  </div>
                  <div>
                    <span className="text-text-secondary">Posts Generated:</span>
                    <div className="text-text-primary">{feed.postsGenerated}</div>
                  </div>
                  <div>
                    <span className="text-text-secondary">Category:</span>
                    <div className="text-text-primary">{feed.category}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handleToggleFeed(feed.id)}
                  className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded"
                  title={feed.status === 'active' ? 'Pause Feed' : 'Resume Feed'}
                >
                  <Icon name={feed.status === 'active' ? 'Pause' : 'Play'} size={16} />
                </button>
                
                <button
                  className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded"
                  title="Sync Now"
                >
                  <Icon name="RefreshCw" size={16} />
                </button>
                
                <button
                  onClick={() => handleRemoveFeed(feed.id)}
                  className="p-2 text-text-secondary hover:text-error transition-colors duration-200 focus-ring rounded"
                  title="Remove Feed"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Feed Modal */}
      {showAddFeed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">Add RSS Feed</h3>
                <button
                  onClick={() => setShowAddFeed(false)}
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Feed Name
                  </label>
                  <input
                    type="text"
                    value={newFeed.name}
                    onChange={(e) => setNewFeed(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="e.g., TechCrunch"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    RSS URL
                  </label>
                  <input
                    type="url"
                    value={newFeed.url}
                    onChange={(e) => setNewFeed(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="https://example.com/feed.xml"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Category
                  </label>
                  <select
                    value={newFeed.category}
                    onChange={(e) => setNewFeed(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddRSSFeed}
                    className="flex-1 btn-primary"
                  >
                    Add Feed
                  </button>
                  <button
                    onClick={() => setShowAddFeed(false)}
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

  const renderAPICredentialsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-2">API Credentials</h3>
        <p className="text-sm text-text-secondary">
          Manage your API keys and service connections
        </p>
      </div>

      <div className="space-y-4">
        {apiCredentials.map((credential) => (
          <div key={credential.id} className="card-elevated p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Key" size={20} className="text-primary" />
                </div>
                
                <div>
                  <h4 className="text-lg font-medium text-text-primary">{credential.service}</h4>
                  <div className="flex items-center space-x-3 text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon 
                        name={getStatusIcon(credential.status)} 
                        size={12} 
                        className={getStatusColor(credential.status)}
                      />
                      <span className="capitalize">{credential.status}</span>
                    </div>
                    <span>Last used: {credential.lastUsed}</span>
                    {credential.encrypted && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Shield" size={12} className="text-success" />
                        <span>Encrypted</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="btn-secondary text-sm">
                  Update
                </button>
                <button className="p-2 text-text-secondary hover:text-error transition-colors duration-200 focus-ring rounded">
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New API Credential */}
      <div className="card-elevated p-6 border-2 border-dashed border-border">
        <div className="text-center">
          <Icon name="Plus" size={24} className="text-text-secondary mx-auto mb-3" />
          <h4 className="text-lg font-medium text-text-primary mb-2">Add API Credential</h4>
          <p className="text-sm text-text-secondary mb-4">
            Connect additional services to enhance your automation
          </p>
          <button className="btn-primary">Add Credential</button>
        </div>
      </div>
    </div>
  );

  const renderWebhooksTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-2">Webhooks</h3>
          <p className="text-sm text-text-secondary">
            Configure webhooks to receive real-time notifications
          </p>
        </div>
        <button
          onClick={() => setShowAddWebhook(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Add Webhook</span>
        </button>
      </div>

      <div className="space-y-4">
        {webhooks.map((webhook) => (
          <div key={webhook.id} className="card-elevated p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-medium text-text-primary">{webhook.name}</h4>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={getStatusIcon(webhook.status)} 
                      size={14} 
                      className={getStatusColor(webhook.status)}
                    />
                    <span className={`text-xs capitalize ${getStatusColor(webhook.status)}`}>
                      {webhook.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-text-secondary mb-3 font-mono">{webhook.url}</p>
                
                <div>
                  <span className="text-sm text-text-secondary">Events:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {webhook.events.map((event, index) => (
                      <span
                        key={index}
                        className="text-xs bg-background text-text-secondary px-2 py-1 rounded font-mono"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded">
                  <Icon name="TestTube" size={16} />
                </button>
                <button className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded">
                  <Icon name="Edit" size={16} />
                </button>
                <button className="p-2 text-text-secondary hover:text-error transition-colors duration-200 focus-ring rounded">
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Webhook Modal */}
      {showAddWebhook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">Add Webhook</h3>
                <button
                  onClick={() => setShowAddWebhook(false)}
                  className="text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Webhook Name
                  </label>
                  <input
                    type="text"
                    value={newWebhook.name}
                    onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="e.g., Slack Notifications"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="url"
                    value={newWebhook.url}
                    onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="https://hooks.slack.com/..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Events
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {webhookEvents.map((event) => (
                      <label key={event} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newWebhook.events.includes(event)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewWebhook(prev => ({
                                ...prev,
                                events: [...prev.events, event]
                              }));
                            } else {
                              setNewWebhook(prev => ({
                                ...prev,
                                events: prev.events.filter(e => e !== event)
                              }));
                            }
                          }}
                          className="text-primary"
                        />
                        <span className="text-sm font-mono">{event}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddWebhook}
                    className="flex-1 btn-primary"
                  >
                    Add Webhook
                  </button>
                  <button
                    onClick={() => setShowAddWebhook(false)}
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
        {activeTab === 'rss-feeds' && renderRSSFeedsTab()}
        {activeTab === 'api-credentials' && renderAPICredentialsTab()}
        {activeTab === 'webhooks' && renderWebhooksTab()}
      </div>
    </div>
  );
};

export default IntegrationsSettings;