// API-Based Backend Service
// Communicates with Node.js/Express server instead of localStorage

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, method = 'GET', data = null, token = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'API Error');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ==================== Authentication ====================

export const authService = {
  // Get stored token
  getToken: () => localStorage.getItem('giveaway_token'),

  // Initialize (setup DB if needed)
  initialize: async () => {
    try {
      await apiCall('/initialize', 'POST');
    } catch (error) {
      console.log('Database already initialized');
    }
  },

  signup: async (email, password, fullName) => {
    try {
      const result = await apiCall('/auth/signup', 'POST', {
        email,
        password,
        fullName
      });

      if (result.success) {
        localStorage.setItem('giveaway_token', result.token);
        localStorage.setItem('giveaway_current_user', JSON.stringify(result.user));
      }

      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  login: async (email, password) => {
    try {
      const result = await apiCall('/auth/login', 'POST', {
        email,
        password
      });

      if (result.success) {
        localStorage.setItem('giveaway_token', result.token);
        localStorage.setItem('giveaway_current_user', JSON.stringify(result.user));
      }

      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  logout: () => {
    localStorage.removeItem('giveaway_token');
    localStorage.removeItem('giveaway_current_user');
    return { success: true };
  },

  getCurrentUser: async () => {
    try {
      const token = authService.getToken();
      if (!token) {
        const cached = localStorage.getItem('giveaway_current_user');
        return cached ? JSON.parse(cached) : null;
      }

      const result = await apiCall('/auth/me', 'GET', null, token);
      if (result.success) {
        localStorage.setItem('giveaway_current_user', JSON.stringify(result.user));
        return result.user;
      }
      return null;
    } catch (error) {
      const cached = localStorage.getItem('giveaway_current_user');
      return cached ? JSON.parse(cached) : null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('giveaway_token');
  },

  updateUserProfile: async (userId, updates) => {
    try {
      const token = authService.getToken();
      const result = await apiCall('/auth/profile', 'PUT', updates, token);

      if (result.success) {
        localStorage.setItem('giveaway_current_user', JSON.stringify(result.user));
      }

      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
};

// ==================== Giveaway Service ====================

export const giveawayService = {
  getGiveaways: async () => {
    try {
      const result = await apiCall('/giveaways', 'GET');
      return result.giveaways || [];
    } catch (error) {
      console.error('Failed to fetch giveaways:', error);
      return [];
    }
  }
};

// ==================== Entry Service ====================

export const entryService = {
  enterGiveaway: async (userId, giveawayId) => {
    try {
      const token = authService.getToken();
      const result = await apiCall('/entries', 'POST', { giveawayId }, token);
      return result;
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getUserEntries: async () => {
    try {
      const token = authService.getToken();
      const result = await apiCall('/entries', 'GET', null, token);
      return result.entries || [];
    } catch (error) {
      console.error('Failed to fetch entries:', error);
      return [];
    }
  }
};
