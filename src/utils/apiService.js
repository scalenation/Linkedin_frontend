// src/utils/apiService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://linkedin-backend-cfx2.onrender.com/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  getAuthHeaders() {
    return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Content API
  async getPosts() {
    return this.request('/content/posts');
  }

  async createPost(postData) {
    return this.request('/content/posts', {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  }

  async updatePost(postId, postData) {
    return this.request(`/content/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(postData)
    });
  }

  async deletePost(postId) {
    return this.request(`/content/posts/${postId}`, {
      method: 'DELETE'
    });
  }

  async getCalendar() {
    return this.request('/content/calendar');
  }

  // AI API
  async generateContent(prompt, options = {}) {
    return this.request('/ai/generate-content', {
      method: 'POST',
      body: JSON.stringify({
        prompt,
        ...options
      })
    });
  }

  async getAiAgents() {
    return this.request('/ai/agents');
  }

  async createAiAgent(agentData) {
    return this.request('/ai/agents', {
      method: 'POST',
      body: JSON.stringify(agentData)
    });
  }

  async getAvailableModels() {
    return this.request('/ai/models');
  }

  // LinkedIn API
  async getLinkedInAccounts() {
    return this.request('/linkedin/accounts');
  }

  async addLinkedInAccount(accountData) {
    return this.request('/linkedin/accounts', {
      method: 'POST',
      body: JSON.stringify(accountData)
    });
  }

  async linkedInLogin(credentials) {
    return this.request('/linkedin/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async postToLinkedIn(postData) {
    return this.request('/linkedin/post', {
      method: 'POST',
      body: JSON.stringify(postData)
    });
  }

  async testLinkedInConnection(accountId) {
    return this.request(`/linkedin/test-connection/${accountId}`);
  }

  // Analytics API
  async getDashboardData() {
    return this.request('/analytics/dashboard');
  }

  async getEngagementAnalytics() {
    return this.request('/analytics/engagement');
  }

  async getPerformanceAnalytics() {
    return this.request('/analytics/performance');
  }
}

export default new ApiService();

