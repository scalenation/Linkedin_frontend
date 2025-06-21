// src/utils/authService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('auth_token');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  async signUp(email, password, userData = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          full_name: userData?.fullName || ''
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Signup failed' };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  }

  async signIn(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      // Store token and user data
      this.token = data.user.access_token;
      this.user = data.user;
      localStorage.setItem('auth_token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  async signOut() {
    try {
      if (this.token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
          }
        });
      }

      // Clear local storage
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');

      return { success: true };
    } catch (error) {
      // Clear local storage even if API call fails
      this.token = null;
      this.user = null;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      
      return { success: false, error: 'Logout failed. Please try again.' };
    }
  }

  async getSession() {
    try {
      if (!this.token) {
        return { success: false, error: 'No active session' };
      }

      return { 
        success: true, 
        data: { 
          session: { 
            access_token: this.token,
            user: this.user
          }
        }
      };
    } catch (error) {
      return { success: false, error: 'Failed to get session.' };
    }
  }

  async getUserProfile() {
    try {
      if (!this.token) {
        return { success: false, error: 'Not authenticated' };
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to fetch profile' };
      }

      return { success: true, data: data.user };
    } catch (error) {
      return { success: false, error: 'Failed to fetch user profile.' };
    }
  }

  async updateUserProfile(updates) {
    try {
      if (!this.token) {
        return { success: false, error: 'Not authenticated' };
      }

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Failed to update profile' };
      }

      return { success: true, data: data.user };
    } catch (error) {
      return { success: false, error: 'Failed to update profile.' };
    }
  }

  async resetPassword(email) {
    try {
      // This would need to be implemented in the backend
      return { success: false, error: 'Password reset not implemented yet' };
    } catch (error) {
      return { success: false, error: 'Failed to send reset email.' };
    }
  }

  getAuthHeaders() {
    return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
  }

  isAuthenticated() {
    return !!this.token;
  }

  getCurrentUser() {
    return this.user;
  }

  onAuthStateChange(callback) {
    // For now, we'll just call the callback with current state
    // In a real implementation, you might want to set up polling or websockets
    callback(null, { session: this.token ? { access_token: this.token, user: this.user } : null });
    
    // Return a cleanup function
    return () => {};
  }
}

export default new AuthService();

