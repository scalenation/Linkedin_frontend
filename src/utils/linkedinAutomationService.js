// src/utils/linkedinAutomationService.js
import apiService from './apiService';

class LinkedInAutomationService {
  async getLinkedInAccounts() {
    try {
      const result = await apiService.getLinkedInAccounts();
      
      if (result.success) {
        return {
          success: true,
          accounts: result.data.accounts
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
        error: 'Failed to fetch LinkedIn accounts'
      };
    }
  }

  async addLinkedInAccount(accountData) {
    try {
      const result = await apiService.addLinkedInAccount(accountData);
      
      if (result.success) {
        return {
          success: true,
          account: result.data.account
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
        error: 'Failed to add LinkedIn account'
      };
    }
  }

  async loginToLinkedIn(credentials) {
    try {
      const result = await apiService.linkedInLogin(credentials);
      
      if (result.success) {
        return {
          success: true,
          message: result.data.message
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
        error: 'Failed to login to LinkedIn'
      };
    }
  }

  async postToLinkedIn(postData) {
    try {
      const result = await apiService.postToLinkedIn(postData);
      
      if (result.success) {
        return {
          success: true,
          message: result.data.message
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
        error: 'Failed to post to LinkedIn'
      };
    }
  }

  async testConnection(accountId) {
    try {
      const result = await apiService.testLinkedInConnection(accountId);
      
      if (result.success) {
        return {
          success: true,
          connected: result.data.connected,
          message: result.data.message
        };
      } else {
        return {
          success: false,
          connected: false,
          error: result.error
        };
      }
    } catch (error) {
      return {
        success: false,
        connected: false,
        error: 'Failed to test connection'
      };
    }
  }

  async schedulePost(postData) {
    try {
      // This uses the content API to create a scheduled post
      const result = await apiService.createPost({
        ...postData,
        status: 'scheduled'
      });
      
      if (result.success) {
        return {
          success: true,
          post: result.data.post
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
        error: 'Failed to schedule post'
      };
    }
  }

  async getAutomationLogs(limit = 50) {
    try {
      // This would need to be implemented in the analytics API
      return {
        success: false,
        error: 'Automation logs not implemented yet'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch automation logs'
      };
    }
  }
}

export default new LinkedInAutomationService();

