import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const GenerationWorkspace = ({ selectedTemplate, generationState, onGenerate, creditBalance }) => {
  const [formData, setFormData] = useState({
    topic: '',
    tone: 'professional',
    audience: 'general',
    keywords: [],
    aiModel: 'gpt-4',
    length: 'medium'
  });
  const [keywordInput, setKeywordInput] = useState('');

  const toneOptions = [
    { value: 'professional', label: 'Professional', icon: 'Briefcase', description: 'Formal and business-focused' },
    { value: 'casual', label: 'Casual', icon: 'Coffee', description: 'Friendly and conversational' },
    { value: 'authoritative', label: 'Authoritative', icon: 'Crown', description: 'Expert and confident' },
    { value: 'inspirational', label: 'Inspirational', icon: 'Sparkles', description: 'Motivating and uplifting' }
  ];

  const audienceOptions = [
    { value: 'general', label: 'General Audience' },
    { value: 'executives', label: 'Executives & Leaders' },
    { value: 'entrepreneurs', label: 'Entrepreneurs' },
    { value: 'developers', label: 'Developers & Tech' },
    { value: 'marketers', label: 'Marketing Professionals' },
    { value: 'sales', label: 'Sales Teams' }
  ];

  const aiModels = [
    {
      value: 'gpt-4',
      label: 'GPT-4',
      description: 'Best for creative and engaging content',
      credits: 10,
      capabilities: ['Creative writing', 'Storytelling', 'Engagement optimization']
    },
    {
      value: 'claude',
      label: 'Claude',
      description: 'Excellent for analytical and professional content',
      credits: 8,
      capabilities: ['Data analysis', 'Professional tone', 'Fact-checking']
    }
  ];

  const lengthOptions = [
    { value: 'short', label: 'Short', description: '50-100 words', credits: 5 },
    { value: 'medium', label: 'Medium', description: '100-200 words', credits: 10 },
    { value: 'long', label: 'Long', description: '200-300 words', credits: 15 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({
        ...prev,
        keywords: [...prev.keywords, keywordInput.trim()]
      }));
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(k => k !== keyword)
    }));
  };

  const handleGenerate = () => {
    if (!formData.topic.trim()) return;
    onGenerate(formData);
  };

  const getSelectedModel = () => aiModels.find(model => model.value === formData.aiModel);
  const getSelectedLength = () => lengthOptions.find(length => length.value === formData.length);
  const estimatedCredits = getSelectedLength()?.credits || 10;

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-heading font-medium text-text-primary">Generation Workspace</h2>
            {selectedTemplate && (
              <p className="text-sm text-text-secondary mt-1">
                Using template: <span className="font-medium">{selectedTemplate.name}</span>
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Zap" size={16} />
            <span>~{estimatedCredits} credits</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Topic Input */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Topic or Main Idea *
          </label>
          <textarea
            value={formData.topic}
            onChange={(e) => handleInputChange('topic', e.target.value)}
            placeholder="Enter the main topic or idea for your LinkedIn post..."
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows={3}
            disabled={generationState === 'generating'}
          />
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Tone & Style
          </label>
          <div className="grid grid-cols-2 gap-3">
            {toneOptions.map((tone) => (
              <button
                key={tone.value}
                onClick={() => handleInputChange('tone', tone.value)}
                disabled={generationState === 'generating'}
                className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                  formData.tone === tone.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name={tone.icon} size={16} className="text-primary" />
                  <span className="text-sm font-medium text-text-primary">{tone.label}</span>
                </div>
                <p className="text-xs text-text-secondary">{tone.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Target Audience
          </label>
          <select
            value={formData.audience}
            onChange={(e) => handleInputChange('audience', e.target.value)}
            disabled={generationState === 'generating'}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {audienceOptions.map((audience) => (
              <option key={audience.value} value={audience.value}>
                {audience.label}
              </option>
            ))}
          </select>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Keywords & Tags
          </label>
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddKeyword()}
              placeholder="Add keyword..."
              disabled={generationState === 'generating'}
              className="flex-1 px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={handleAddKeyword}
              disabled={generationState === 'generating' || !keywordInput.trim()}
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-200 disabled:opacity-50"
            >
              <Icon name="Plus" size={16} />
            </button>
          </div>
          {formData.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  <span>{keyword}</span>
                  <button
                    onClick={() => handleRemoveKeyword(keyword)}
                    disabled={generationState === 'generating'}
                    className="hover:text-primary/70"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* AI Model Selection */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            AI Model
          </label>
          <div className="space-y-3">
            {aiModels.map((model) => (
              <div
                key={model.value}
                onClick={() => handleInputChange('aiModel', model.value)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                  formData.aiModel === model.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      formData.aiModel === model.value ? 'bg-primary' : 'bg-border'
                    }`} />
                    <span className="font-medium text-text-primary">{model.label}</span>
                  </div>
                  <span className="text-sm text-text-secondary">{model.credits} credits</span>
                </div>
                <p className="text-sm text-text-secondary mb-2">{model.description}</p>
                <div className="flex flex-wrap gap-1">
                  {model.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="px-2 py-1 text-xs bg-background text-text-secondary rounded"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Length */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Content Length
          </label>
          <div className="grid grid-cols-3 gap-3">
            {lengthOptions.map((length) => (
              <button
                key={length.value}
                onClick={() => handleInputChange('length', length.value)}
                disabled={generationState === 'generating'}
                className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                  formData.length === length.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="text-sm font-medium text-text-primary mb-1">{length.label}</div>
                <div className="text-xs text-text-secondary mb-1">{length.description}</div>
                <div className="text-xs text-primary">{length.credits} credits</div>
              </button>
            ))}
          </div>
        </div>

        {/* Generation Progress */}
        {generationState === 'generating' && (
          <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-6 h-6 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-medium text-text-primary">Generating content...</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Search" size={14} />
                <span>Researching topic and trends</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="PenTool" size={14} />
                <span>Writing content with selected tone</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="Zap" size={14} />
                <span>Optimizing for engagement</span>
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!formData.topic.trim() || generationState === 'generating' || creditBalance < estimatedCredits}
          className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generationState === 'generating' ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Sparkles" size={20} />
              <span>Generate Content ({estimatedCredits} credits)</span>
            </div>
          )}
        </button>

        {creditBalance < estimatedCredits && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="AlertTriangle" size={16} />
              <span className="text-sm">Insufficient credits. You need {estimatedCredits} credits but have {creditBalance}.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerationWorkspace;