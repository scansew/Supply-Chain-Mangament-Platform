import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Create auth context
const AuthContext = createContext({});

// Token storage keys
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Token expiration buffer (5 minutes in ms)
const TOKEN_EXPIRATION_BUFFER = 5 * 60 * 1000;

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if token is expired or about to expire
  const isTokenExpired = useCallback((token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (e) {
      return true;
    }
  }, []);

  // Get token expiration time
  const getTokenExpiration = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000; // Convert to ms
    } catch (e) {
      return null;
    }
  }, []);

  // Refresh token
  const refreshToken = useCallback(async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      logout();
      return null;
    }

    try {
      // TODO: Replace with actual token refresh API call
      // const response = await fetch('/api/auth/refresh', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ refreshToken }),
      // });
      // const data = await response.json();
      // return data.accessToken;
      
      // Mock implementation - remove in production
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
      return null;
    }
  }, []);

  // Get current session
  const getSession = useCallback(async () => {
    let token = localStorage.getItem(TOKEN_KEY);
    
    // If no token, user is not authenticated
    if (!token) {
      setLoading(false);
      return null;
    }

    // Check if token needs refresh
    if (isTokenExpired(token)) {
      token = await refreshToken();
      if (!token) {
        setLoading(false);
        return null;
      }
    }

    try {
      // TODO: Replace with actual user data fetch
      // const response = await fetch('/api/auth/me', {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // });
      // const userData = await response.json();
      
      // Mock user data - remove in production
      const decoded = jwtDecode(token);
      const userData = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name || 'User',
        role: decoded.role || 'user',
        emailVerified: decoded.email_verified || false,
      };

      setCurrentUser(userData);
      return userData;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      logout();
      return null;
    } finally {
      setLoading(false);
    }
  }, [isTokenExpired, refreshToken]);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      await getSession();
      
      // Set up token refresh timer
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const expiresAt = getTokenExpiration(token);
        if (expiresAt) {
          const timeUntilExpiry = expiresAt - Date.now() - TOKEN_EXPIRATION_BUFFER;
          if (timeUntilExpiry > 0) {
            const timer = setTimeout(() => {
              refreshToken();
            }, timeUntilExpiry);
            return () => clearTimeout(timer);
          }
        }
      }
    };

    initAuth();
  }, [getSession, getTokenExpiration, refreshToken]);

  // Login with email/password
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual login API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      
      // Mock response - remove in production
      const mockResponse = {
        accessToken: 'mock.jwt.token',
        refreshToken: 'mock.refresh.token',
        user: {
          id: '123',
          email,
          name: email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'user',
          emailVerified: true,
        }
      };

      // Store tokens
      localStorage.setItem(TOKEN_KEY, mockResponse.accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, mockResponse.refreshToken);
      
      // Set user data
      setCurrentUser(mockResponse.user);
      return mockResponse.user;
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual registration API call
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userData),
      // });
      // return await response.json();
      
      // Mock response - remove in production
      return { success: true, message: 'Registration successful. Please check your email to verify your account.' };
    } catch (error) {
      console.error('Registration failed:', error);
      setError(error.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    try {
      // TODO: Replace with actual logout API call if needed
      // await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth data
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      setCurrentUser(null);
      navigate('/login');
    }
  };

  // Request password reset
  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // return await response.json();
      
      // Mock response - remove in production
      return { success: true, message: 'Password reset link sent to your email' };
    } catch (error) {
      console.error('Password reset request failed:', error);
      setError(error.message || 'Failed to send reset link');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/reset-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ token, newPassword }),
      // });
      // return await response.json();
      
      // Mock response - remove in production
      return { success: true, message: 'Password reset successful' };
    } catch (error) {
      console.error('Password reset failed:', error);
      setError(error.message || 'Failed to reset password');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const token = localStorage.getItem(TOKEN_KEY);
      // const response = await fetch('/api/auth/profile', {
      //   method: 'PUT',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(updates),
      // });
      // const updatedUser = await response.json();
      // setCurrentUser(updatedUser);
      // return updatedUser;
      
      // Mock update - remove in production
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error);
      setError(error.message || 'Failed to update profile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Check if user has required role
  const hasRole = (requiredRole) => {
    if (!currentUser) return false;
    if (!requiredRole) return true;
    return currentUser.role === requiredRole;
  };

  // Check if user has any of the required roles
  const hasAnyRole = (requiredRoles = []) => {
    if (!currentUser) return false;
    if (!requiredRoles.length) return true;
    return requiredRoles.includes(currentUser.role);
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    logout,
    register,
    requestPasswordReset,
    resetPassword,
    updateProfile,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
