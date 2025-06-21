import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ContentPreview = ({ generatedContent, generationState, onRegenerate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  React.useEffect(() => {
    if (generatedContent) {
      setEditedContent(generatedContent.text);
    }
  }, [generatedContent]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    // Here you would update the generated content
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(generatedContent?.text || '');
  };

  const getQualityColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-error';
  };

  const getQualityBgColor = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 75) return 'bg-warning/10';
    return 'bg-error/10';
  };

  if (generationState === 'idle') {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={32} className="text-text-secondary" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">Content Preview</h3>
          <p className="text-text-secondary text-sm">
            Select a template and generate content to see the preview here
          </p>
        </div>
      </div>
    );
  }

  if (generationState === 'generating') {
    return (
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">Generating Content</h3>
          <p className="text-text-secondary text-sm">
            Please wait while AI creates your LinkedIn post...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-heading font-medium text-text-primary">Content Preview</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleEdit}
              className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded"
            >
              <Icon name="Edit" size={16} />
            </button>
            <button
              onClick={onRegenerate}
              className="p-2 text-text-secondary hover:text-primary transition-colors duration-200 focus-ring rounded"
            >
              <Icon name="RefreshCw" size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quality Score */}
        <div className={`p-4 rounded-lg ${getQualityBgColor(generatedContent?.qualityScore)}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">Quality Score</span>
            <span className={`text-2xl font-bold ${getQualityColor(generatedContent?.qualityScore)}`}>
              {generatedContent?.qualityScore}
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                generatedContent?.qualityScore >= 90 ? 'bg-success' :
                generatedContent?.qualityScore >= 75 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${generatedContent?.qualityScore}%` }}
            />
          </div>
        </div>

        {/* Content Preview */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-3">
            Generated Content
          </label>
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={12}
              />
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 btn-primary text-sm"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-sm text-text-secondary border border-border rounded-md hover:bg-background transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="whitespace-pre-wrap text-sm text-text-primary leading-relaxed">
                {generatedContent?.text}
              </div>
            </div>
          )}
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-background rounded-lg border border-border text-center">
            <div className="text-lg font-medium text-text-primary">{generatedContent?.engagementPrediction}</div>
            <div className="text-xs text-text-secondary">Engagement</div>
          </div>
          <div className="p-3 bg-background rounded-lg border border-border text-center">
            <div className="text-lg font-medium text-text-primary">{generatedContent?.estimatedReach}</div>
            <div className="text-xs text-text-secondary">Est. Reach</div>
          </div>
        </div>

        {/* Hashtags */}
        {generatedContent?.hashtags && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Suggested Hashtags
            </label>
            <div className="flex flex-wrap gap-2">
              {generatedContent.hashtags.map((hashtag) => (
                <span
                  key={hashtag}
                  className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                >
                  {hashtag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Improvement Suggestions */}
        {generatedContent?.improvements && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Improvement Suggestions
            </label>
            <div className="space-y-2">
              {generatedContent.improvements.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-background rounded-lg border border-border">
                  <Icon name="Lightbulb" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-text-primary">{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Best Posting Time */}
        {generatedContent?.bestPostingTime && (
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium text-text-primary">Optimal Posting Time</span>
            </div>
            <p className="text-sm text-text-secondary">
              {generatedContent.bestPostingTime} for maximum engagement
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 border-t border-border">
          <button className="w-full btn-primary py-2 text-sm">
            <Icon name="Calendar" size={16} className="mr-2" />
            Schedule for Optimal Time
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button className="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-md hover:bg-background transition-colors duration-200">
              <Icon name="Save" size={16} className="mr-2" />
              Save Draft
            </button>
            <button className="px-4 py-2 text-sm font-medium btn-secondary">
              <Icon name="Plus" size={16} className="mr-2" />
              Add to Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPreview;