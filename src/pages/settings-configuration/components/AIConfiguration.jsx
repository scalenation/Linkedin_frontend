// src/pages/settings-configuration/components/AIConfiguration.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';
import openRouterService from '../../../utils/openRouterService';
import aiAgentService from '../../../utils/aiAgentService';

const AIConfiguration = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('models');
  const [settings, setSettings] = useState({
    selectedModel: 'openrouter/meta-llama/llama-3.1-8b-instruct:free',
    creativity: 0.7,
    tone: 'professional',
    contentLength: 'medium',
    includeHashtags: true,
    includeEmojis: false,
    customPrompt: `Generate a professional LinkedIn post about {topic}. Focus on providing value to the audience while maintaining an engaging and authentic tone. Include relevant insights and actionable takeaways.`,
    autoGenerate: true,
    reviewRequired: true
  });
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const tabs = [
    { id: 'models', label: 'AI Models', icon: 'Bot' },
    { id: 'agents', label: 'AI Agents', icon: 'Users' },
    { id: 'content', label: 'Content Preferences', icon: 'FileText' },
    { id: 'prompts', label: 'Custom Prompts', icon: 'MessageSquare' },
    { id: 'automation', label: 'Automation', icon: 'Zap' }
  ];

  const freeModels = openRouterService.getFreeModels();

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-focused' },
    { value: 'casual', label: 'Casual', description: 'Friendly and approachable' },
    { value: 'authoritative', label: 'Authoritative', description: 'Expert and confident' },
    { value: 'inspirational', label: 'Inspirational', description: 'Motivating and uplifting' },
    { value: 'educational', label: 'Educational', description: 'Informative and teaching' }
  ];

  const contentLengthOptions = [
    { value: 'short', label: 'Short (50-100 words)', description: 'Quick insights and updates' },
    { value: 'medium', label: 'Medium (100-200 words)', description: 'Balanced posts with details' },
    { value: 'long', label: 'Long (200-300 words)', description: 'In-depth analysis and stories' }
  ];

  useEffect(() => {
    if (user?.id) {
      loadUserAgents();
    }
  }, [user]);

  const loadUserAgents = async () => {
    if (!user?.id) return;
    
    const result = await aiAgentService.getUserAgents(user.id);
    if (result.success) {
      setAgents(result.data);
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    // Save settings to user profile or separate settings table
    console.log('Saving AI configuration:', settings);
    
    // Simulate save
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const testPrompt = async () => {
    setLoading(true);
    setTestResult(null);
    
    try {
      const result = await openRouterService.generateLinkedInPost({
        topic: 'artificial intelligence in business',
        tone: settings.tone,
        length: settings.contentLength,
        includeHashtags: settings.includeHashtags,
        includeEmojis: settings.includeEmojis,
        customPrompt: settings.customPrompt,
        model: settings.selectedModel
      });
      
      if (result.success) {
        setTestResult({
          success: true,
          content: result.data.content,
          usage: result.data.usage
        });
      } else {
        setTestResult({
          success: false,
          error: result.error
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Test failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const createAgent = async (agentData) => {
    if (!user?.id) return;
    
    const result = await aiAgentService.createAgent(user.id, agentData);
    if (result.success) {
      await loadUserAgents();
      return result;
    }
    return result;
  };

  const renderModelsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-2">Select AI Model</h3>
        <p className="text-sm text-text-secondary mb-6">
          Choose from OpenRouter's free AI models for content generation
        </p>
      </div>

      <div className="grid gap-4">
        {freeModels.map((model) => (
          <div
            key={model.id}
            className={`card-elevated p-6 cursor-pointer transition-all duration-200 ${
              settings.selectedModel === model.id
                ? 'ring-2 ring-primary border-primary' : 'hover:shadow-md'
            }`}
            onClick={() => handleSettingChange('selectedModel', model.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-medium text-text-primary">{model.name}</h4>
                  {model.recommended && (
                    <span className="status-success text-xs px-2 py-1">Recommended</span>
                  )}
                  <span className="text-sm text-text-secondary">by {model.provider}</span>
                </div>
                <p className="text-sm text-text-secondary mb-3">{model.description}</p>
                <div className="text-sm text-text-primary">
                  <span className="font-medium text-success">{model.cost}</span>
                </div>
              </div>
              <div className="ml-4">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  settings.selectedModel === model.id
                    ? 'border-primary bg-primary' : 'border-gray-300'
                }`}>
                  {settings.selectedModel === model.id && (
                    <Icon name="Check" size={12} color="white" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card-elevated p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Info" size={16} className="text-secondary" />
          <h4 className="text-sm font-medium text-text-primary">OpenRouter Integration</h4>
        </div>
        <p className="text-sm text-text-secondary mb-3">
          These models are provided through OpenRouter, giving you access to state-of-the-art AI models 
          including free options. Configure your OpenRouter API key in the environment variables.
        </p>
        <div className="text-xs text-text-secondary">
          API Key Status: {import.meta.env.VITE_OPENROUTER_API_KEY ? 
            <span className="text-success">✓ Configured</span> : 
            <span className="text-error">✗ Not configured</span>
          }
        </div>
      </div>
    </div>
  );

  const renderAgentsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-text-primary mb-2">AI Agents</h3>
          <p className="text-sm text-text-secondary">
            Manage your specialized AI agents for different automation tasks
          </p>
        </div>
        <button
          onClick={() => {
            // Create a content generator agent
            createAgent({
              name: `Content Agent ${agents.length + 1}`,
              type: 'content_generator',
              modelConfig: {
                model: settings.selectedModel,
                temperature: settings.creativity,
                tone: settings.tone,
                length: settings.contentLength
              },
              promptTemplate: settings.customPrompt
            });
          }}
          className="btn-primary flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Create Agent</span>
        </button>
      </div>

      <div className="grid gap-4">
        {agents.map((agent) => (
          <div key={agent.id} className="card-elevated p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-lg font-medium text-text-primary mb-1">{agent.agent_name}</h4>
                <p className="text-sm text-text-secondary mb-2">
                  Type: {agent.agent_type.replace('_', ' ')}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs ${
                    agent.status === 'active' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {agent.status}
                  </span>
                  <span className="text-text-secondary">
                    Model: {agent.model_config?.model?.split('/').pop() || 'Default'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-text-secondary hover:text-primary transition-colors">
                  <Icon name="Settings" size={16} />
                </button>
                <button className="p-2 text-text-secondary hover:text-error transition-colors">
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {agents.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Bot" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No AI agents created yet</p>
            <p className="text-sm">Create your first agent to start automating content generation</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderContentTab = () => (
    <div className="space-y-8">
      {/* Creativity Level */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Creativity Level: {Math.round(settings.creativity * 100)}%
        </label>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.creativity}
            onChange={(e) => handleSettingChange('creativity', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-text-secondary mt-2">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Creative</span>
          </div>
        </div>
        <p className="text-xs text-text-secondary mt-2">
          Higher creativity produces more unique content but may be less predictable
        </p>
      </div>

      {/* Content Tone */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">Content Tone</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {toneOptions.map((tone) => (
            <label
              key={tone.value}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                settings.tone === tone.value
                  ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="tone"
                value={tone.value}
                checked={settings.tone === tone.value}
                onChange={(e) => handleSettingChange('tone', e.target.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-text-primary">{tone.label}</div>
                <div className="text-sm text-text-secondary">{tone.description}</div>
              </div>
              {settings.tone === tone.value && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Content Length */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">Content Length</label>
        <div className="space-y-3">
          {contentLengthOptions.map((length) => (
            <label
              key={length.value}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
                settings.contentLength === length.value
                  ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <input
                type="radio"
                name="contentLength"
                value={length.value}
                checked={settings.contentLength === length.value}
                onChange={(e) => handleSettingChange('contentLength', e.target.value)}
                className="sr-only"
              />
              <div className="flex-1">
                <div className="font-medium text-text-primary">{length.label}</div>
                <div className="text-sm text-text-secondary">{length.description}</div>
              </div>
              {settings.contentLength === length.value && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Additional Options */}
      <div className="card-elevated p-4">
        <h4 className="text-sm font-medium text-text-primary mb-4">Additional Options</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-text-primary">Include Hashtags</h5>
              <p className="text-xs text-text-secondary">Add relevant hashtags to posts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.includeHashtags}
                onChange={(e) => handleSettingChange('includeHashtags', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-medium text-text-primary">Include Emojis</h5>
              <p className="text-xs text-text-secondary">Add emojis to make posts more engaging</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.includeEmojis}
                onChange={(e) => handleSettingChange('includeEmojis', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPromptsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-2">Custom Prompt Template</h3>
        <p className="text-sm text-text-secondary mb-4">
          Customize the AI prompt to match your specific content style and requirements
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Prompt Template
        </label>
        <textarea
          value={settings.customPrompt}
          onChange={(e) => handleSettingChange('customPrompt', e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 font-mono text-sm"
          placeholder="Enter your custom prompt template..."
        />
        <p className="text-xs text-text-secondary mt-2">
          Use {'{topic}'} as a placeholder for the content topic. Other variables: {'{tone}'}, {'{length}'}, {'{industry}'}
        </p>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={testPrompt}
          disabled={loading}
          className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? (
            <Icon name="Loader" size={16} className="animate-spin" />
          ) : (
            <Icon name="Play" size={16} />
          )}
          <span>Test Prompt</span>
        </button>
        <button 
          onClick={() => handleSettingChange('customPrompt', 'Generate a professional LinkedIn post about {topic}. Focus on providing value to the audience while maintaining an engaging and authentic tone. Include relevant insights and actionable takeaways.')}
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
        >
          Reset to Default
        </button>
      </div>

      {/* Test Results */}
      {testResult && (
        <div className={`card-elevated p-4 ${
          testResult.success ? 'border-success/20' : 'border-error/20'
        }`}>
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon 
              name={testResult.success ? 'CheckCircle' : 'AlertCircle'} 
              size={16} 
              className={testResult.success ? 'text-success' : 'text-error'}
            />
            <span>Test Result</span>
          </h4>
          {testResult.success ? (
            <div>
              <div className="bg-background p-3 rounded border mb-3">
                <pre className="text-sm text-text-primary whitespace-pre-wrap">
                  {testResult.content}
                </pre>
              </div>
              {testResult.usage && (
                <div className="text-xs text-text-secondary">
                  Tokens used: {testResult.usage.total_tokens || 'N/A'}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-error">{testResult.error}</p>
          )}
        </div>
      )}

      {/* Prompt Variables Reference */}
      <div className="card-elevated p-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Available Variables</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <code className="bg-background px-2 py-1 rounded text-xs">{'{topic}'}</code>
            <span className="text-text-secondary">Content topic</span>
          </div>
          <div className="flex items-center space-x-2">
            <code className="bg-background px-2 py-1 rounded text-xs">{'{tone}'}</code>
            <span className="text-text-secondary">Selected tone</span>
          </div>
          <div className="flex items-center space-x-2">
            <code className="bg-background px-2 py-1 rounded text-xs">{'{length}'}</code>
            <span className="text-text-secondary">Content length</span>
          </div>
          <div className="flex items-center space-x-2">
            <code className="bg-background px-2 py-1 rounded text-xs">{'{industry}'}</code>
            <span className="text-text-secondary">User industry</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAutomationTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-text-primary mb-2">Automation Settings</h3>
        <p className="text-sm text-text-secondary mb-6">
          Configure how AI generates and processes content automatically
        </p>
      </div>

      <div className="space-y-6">
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Auto-Generate Content</h4>
              <p className="text-xs text-text-secondary">Automatically generate posts from trending topics</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoGenerate}
                onChange={(e) => handleSettingChange('autoGenerate', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          {settings.autoGenerate && (
            <div className="border-t border-border pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-text-primary mb-2">
                    Generation Frequency
                  </label>
                  <select className="w-full px-3 py-2 text-sm border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary">
                    <option>Daily</option>
                    <option>Every 2 days</option>
                    <option>Weekly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-primary mb-2">
                    Posts per Generation
                  </label>
                  <select className="w-full px-3 py-2 text-sm border border-border rounded focus:ring-2 focus:ring-primary focus:border-primary">
                    <option>1 post</option>
                    <option>2 posts</option>
                    <option>3 posts</option>
                    <option>5 posts</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="card-elevated p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-text-primary">Manual Review Required</h4>
              <p className="text-xs text-text-secondary">Require approval before posting AI-generated content</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.reviewRequired}
                onChange={(e) => handleSettingChange('reviewRequired', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
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
                  ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-primary hover:border-gray-300'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'models' && renderModelsTab()}
        {activeTab === 'agents' && renderAgentsTab()}
        {activeTab === 'content' && renderContentTab()}
        {activeTab === 'prompts' && renderPromptsTab()}
        {activeTab === 'automation' && renderAutomationTab()}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-border">
        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50"
        >
          {loading ? (
            <Icon name="Loader" size={16} className="animate-spin" />
          ) : (
            <Icon name="Save" size={16} />
          )}
          <span>Save Configuration</span>
        </button>
      </div>
    </div>
  );
};

export default AIConfiguration;