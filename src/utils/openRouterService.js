// src/utils/openRouterService.js
import apiService from './apiService';

class OpenRouterService {
  async generateContent(prompt, options = {}) {
    try {
      const result = await apiService.generateContent(prompt, options);
      
      if (result.success) {
        return {
          success: true,
          data: {
            content: result.data.content,
            creditsUsed: result.data.credits_used,
            creditsRemaining: result.data.credits_remaining
          }
        };
      } else {
        return {
          success: false,
          error: result.error
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to generate content'
      };
    }
  }

  async getAvailableModels() {
    try {
      const result = await apiService.getAvailableModels();
      
      if (result.success) {
        return {
          success: true,
          data: result.data.models
        };
      } else {
        return {
          success: false,
          error: result.error
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch models'
      };
    }
  }

  async generateLinkedInPost({
    topic,
    tone = 'professional',
    length = 'medium',
    includeHashtags = true,
    includeEmojis = false,
    customPrompt = null,
    model = 'openrouter/meta-llama/llama-3.1-8b-instruct:free'
  }) {
    const lengthMap = {
      short: '50-100 words',
      medium: '100-200 words',
      long: '200-300 words'
    };

    const prompt = customPrompt || `Generate a ${tone} LinkedIn post about "${topic}".

Requirements:
- Length: ${lengthMap[length] || '100-200 words'}
- Tone: ${tone}
- ${includeHashtags ? 'Include 3-5 relevant hashtags at the end' : 'Do not include hashtags'}
- ${includeEmojis ? 'Use appropriate emojis sparingly' : 'Do not use emojis'}
- Make it sound human and authentic
- Provide value or insights
- End with a question to encourage engagement

Post:`;

    return this.generateContent(prompt, {
      model,
      tone,
      topic
    });
  }

  async analyzeContent(content, analysisType = 'engagement') {
    const prompts = {
      engagement: `Analyze this LinkedIn post for engagement potential. Rate it 1-10 and provide specific suggestions for improvement:\n\n"${content}"`,
      tone: `Analyze the tone of this LinkedIn post. Identify the primary tone and suggest improvements:\n\n"${content}"`,
      hashtags: `Suggest 5 optimal hashtags for this LinkedIn post:\n\n"${content}"`
    };

    return this.generateContent(prompts[analysisType] || prompts.engagement, {
      model: 'openrouter/meta-llama/llama-3.1-8b-instruct:free'
    });
  }

  getFreeModels() {
    return [
      {
        id: 'openrouter/meta-llama/llama-3.1-8b-instruct:free',
        name: 'Llama 3.1 8B Instruct (Free)',
        provider: 'Meta',
        description: 'Fast and efficient for content generation',
        cost: 'Free',
        recommended: true
      },
      {
        id: 'openrouter/microsoft/phi-3-mini-128k-instruct:free',
        name: 'Phi-3 Mini 128K (Free)',
        provider: 'Microsoft',
        description: 'Compact model with good performance',
        cost: 'Free',
        recommended: false
      },
      {
        id: 'openrouter/google/gemma-2-9b-it:free',
        name: 'Gemma 2 9B IT (Free)',
        provider: 'Google',
        description: 'Advanced instruction-tuned model',
        cost: 'Free',
        recommended: false
      },
      {
        id: 'openrouter/anthropic/claude-3-haiku',
        name: 'Claude 3 Haiku',
        provider: 'Anthropic',
        description: 'Fast and cost-effective Claude model',
        cost: 'Paid',
        recommended: false
      }
    ];
  }
}

export default new OpenRouterService();

