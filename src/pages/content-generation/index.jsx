import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Navigation from '../../components/ui/Navigation';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StatusBar from '../../components/ui/StatusBar';
import Icon from '../../components/AppIcon';
import ContentTemplates from './components/ContentTemplates';
import GenerationWorkspace from './components/GenerationWorkspace';
import ContentPreview from './components/ContentPreview';

const ContentGeneration = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [generationState, setGenerationState] = useState('idle'); // idle, generating, completed
  const [generatedContent, setGeneratedContent] = useState(null);
  const [creditBalance, setCreditBalance] = useState(850);
  const [activePanel, setActivePanel] = useState('templates'); // templates, workspace, preview

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setActivePanel('workspace');
  };

  const handleContentGenerate = (params) => {
    setGenerationState('generating');
    
    // Simulate AI generation process
    setTimeout(() => {
      const mockContent = {
        text: `🚀 The future of AI in business automation is here, and it's transforming how we approach productivity.

After implementing AI-driven workflows in our organization, we've seen a 40% increase in operational efficiency. The key isn't replacing human creativity – it's amplifying it.

Here are 3 game-changing insights from our AI transformation journey:

✅ AI excels at pattern recognition and data processing
✅ Human oversight ensures quality and strategic alignment  
✅ The combination creates unprecedented value

The companies that will thrive in the next decade are those that master the art of human-AI collaboration.

What's your experience with AI integration in your workflow? Share your thoughts below! 👇#AI #BusinessAutomation #FutureOfWork #Productivity #Innovation`,qualityScore: 92,engagementPrediction: 'High',
        improvements: [
          'Consider adding a specific call-to-action','Include relevant industry statistics','Add more visual elements or emojis'
        ],
        hashtags: ['#AI', '#BusinessAutomation', '#FutureOfWork', '#Productivity', '#Innovation'],
        estimatedReach: '2.5K - 5K',bestPostingTime: '9:00 AM - 11:00 AM'
      };
      
      setGeneratedContent(mockContent);
      setGenerationState('completed');
      setCreditBalance(prev => prev - 10);
      setActivePanel('preview');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <StatusBar />
      
      <main className="pt-4">
        <div className="container-custom">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-semibold text-text-primary mb-2">
                Content Generation
              </h1>
              <p className="text-text-secondary">
                Create AI-powered LinkedIn posts with guided workflows and customization options
              </p>
            </div>
            
            {/* Credit Balance */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-surface rounded-lg border border-border">
                <Icon name="Coins" size={20} color="#4A90A4" />
                <div>
                  <div className="text-sm font-medium text-text-primary">{creditBalance}</div>
                  <div className="text-xs text-text-secondary">credits remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Panel Navigation */}
          <div className="md:hidden mb-6">
            <div className="flex bg-surface rounded-lg border border-border p-1">
              <button
                onClick={() => setActivePanel('templates')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activePanel === 'templates' ?'bg-primary text-white' :'text-text-secondary hover:text-primary'
                }`}
              >
                Templates
              </button>
              <button
                onClick={() => setActivePanel('workspace')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activePanel === 'workspace' ?'bg-primary text-white' :'text-text-secondary hover:text-primary'
                }`}
              >
                Generate
              </button>
              <button
                onClick={() => setActivePanel('preview')}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activePanel === 'preview' ?'bg-primary text-white' :'text-text-secondary hover:text-primary'
                }`}
              >
                Preview
              </button>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Panel - Templates (Desktop) / Mobile Panel */}
            <div className={`md:col-span-3 ${activePanel === 'templates' ? 'block' : 'hidden md:block'}`}>
              <ContentTemplates
                selectedTemplate={selectedTemplate}
                onTemplateSelect={handleTemplateSelect}
              />
            </div>

            {/* Center Panel - Generation Workspace (Desktop) / Mobile Panel */}
            <div className={`md:col-span-6 ${activePanel === 'workspace' ? 'block' : 'hidden md:block'}`}>
              <GenerationWorkspace
                selectedTemplate={selectedTemplate}
                generationState={generationState}
                onGenerate={handleContentGenerate}
                creditBalance={creditBalance}
              />
            </div>

            {/* Right Panel - Content Preview (Desktop) / Mobile Panel */}
            <div className={`md:col-span-3 ${activePanel === 'preview' ? 'block' : 'hidden md:block'}`}>
              <ContentPreview
                generatedContent={generatedContent}
                generationState={generationState}
                onRegenerate={() => setGenerationState('idle')}
              />
            </div>
          </div>

          {/* Bottom Action Bar */}
          {generatedContent && (
            <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border shadow-lg z-50 md:relative md:mt-8 md:bg-transparent md:border-0 md:shadow-none">
              <div className="container-custom py-4">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span>Content generated successfully</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="px-4 py-2 text-sm font-medium text-text-secondary border border-border rounded-md hover:bg-background transition-colors duration-200">
                      Save Draft
                    </button>
                    <button className="px-4 py-2 text-sm font-medium btn-secondary">
                      Add to Queue
                    </button>
                    <button className="px-4 py-2 text-sm font-medium btn-primary">
                      Schedule Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ContentGeneration;