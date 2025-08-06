import axios from "axios";

// API Configuration
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8080/api",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
};

// Create axios instance
const api = axios.create(API_CONFIG);

// Auth token management
const AUTH_TOKEN_KEY = "token";
const USER_EMAIL_KEY = "email";
const USER_ROLE_KEY = "userRole";
const REFRESH_TOKEN_KEY = "refreshToken";

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add timestamp to prevent caching
    config.params = {
      ...config.params,
      _t: Date.now(),
    };

    // Add auth token if available
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors
    if (!error.response) {
      return Promise.reject(
        new Error("Network error - please check your connection")
      );
    }

    // Handle 401 Unauthorized
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (refreshToken) {
          const response = await api.post("/auth/refresh", { refreshToken });
          const { token } = response.data;

          localStorage.setItem(AUTH_TOKEN_KEY, token);
          originalRequest.headers.Authorization = `Bearer ${token}`;

          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, logout
        handleLogout();
      }
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message;
    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      originalError: error,
    });
  }
);

// Auth functions
export const handleLogin = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    const { token, refreshToken, email, role } = response.data;

    // Store auth data
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(USER_EMAIL_KEY, email);
    localStorage.setItem(USER_ROLE_KEY, role);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      await api.post("/auth/logout", { token });
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Clear all auth data
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    localStorage.removeItem(USER_ROLE_KEY);

    // Redirect to login
    window.location.href = "/login";
  }
};

// API endpoints
export const authAPI = {
  login: (credentials) => handleLogin(credentials),
  logout: () => handleLogout(),
  register: (userData) => api.post("/auth/register", userData),
  resetPassword: (email) => api.post("/auth/reset-password", { email }),
  updatePassword: (data) => api.post("/auth/update-password", data),
};

export const userAPI = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),
  changePassword: (data) => api.post("/users/change-password", data),
};

export const timeTrackingAPI = {
  getEntries: (params) => api.get("/timetracking", { params }),
  createEntry: (data) => api.post("/timetracking", data),
  updateEntry: (id, data) => api.put(`/timetracking/${id}`, data),
  deleteEntry: (id) => api.delete(`/timetracking/${id}`),
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};

export default api;
