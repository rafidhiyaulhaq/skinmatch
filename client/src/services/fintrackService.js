import axios from 'axios';

const FINTRACKIT_API = 'https://api.fintrackit.my.id/v1';
const API_KEY = import.meta.env.VITE_FINTRACKIT_API_KEY;

class FinTrackItService {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    // Check if token exists and is not expired (with 5 minutes buffer)
    if (this.accessToken && this.tokenExpiry && this.tokenExpiry > Date.now() + 300000) {
      return this.accessToken;
    }

    try {
      const response = await axios.post(`${FINTRACKIT_API}/auth/token`, null, {
        headers: {
          'X-API-Key': API_KEY
        }
      });

      this.accessToken = response.data.access_token;
      // Set expiry time (current time + expires_in - 5 minutes buffer)
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000) - 300000;

      return this.accessToken;
    } catch (error) {
      console.error('Error getting FinTrackIt access token:', error);
      throw new Error('Failed to get access token');
    }
  }

  async getAuthHeaders() {
    const token = await this.getAccessToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  async testConnection() {
    try {
      const token = await this.getAccessToken();
      console.log('Successfully connected to FinTrackIt:', token ? 'Token received' : 'No token');
      return true;
    } catch (error) {
      console.error('Failed to connect to FinTrackIt:', error);
      return false;
    }
  }
}

export const fintrackService = new FinTrackItService();