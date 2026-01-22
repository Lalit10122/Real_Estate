import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create Context
const AuthContext = createContext();

// API Base URL
const API_URL = 'http://localhost:8081/api';

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  // State variables
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [isBuyer, setIsBuyer] = useState(() => {
    // Check localStorage first, default to true
    const saved = localStorage.getItem('isBuyer');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Save isBuyer to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('isBuyer', JSON.stringify(isBuyer));
  }, [isBuyer]);

  // Verify token and get user info on mount
  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/users/verify-token`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.data.success) {
          const userData = response.data.user;
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            phone: userData.phone || '',
            isBuyer: userData.isBuyer,
            role: userData.role,
          });
          setIsBuyer(userData.isBuyer);
          setIsAuthenticated(true);
          setToken(storedToken);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  // Register as Buyer
  const registerBuyer = async (name, email, password, phone) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        name,
        email,
        password,
        phone: phone || '',
      });

      if (response.data.success) {
        const { token, userId, userName, isBuyer } = response.data;
        
        localStorage.setItem('token', token);
        setToken(token);
        
        setUser({
          id: userId,
          name: userName,
          email,
          phone: phone || '',
          isBuyer,
        });
        
        setIsBuyer(isBuyer);
        setIsAuthenticated(true);

        return { success: true, message: 'Registration successful' };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  // Register as Seller
  const registerSeller = async (name, email, password, phone) => {
    try {
      const response = await axios.post(`${API_URL}/users/register-seller`, {
        name,
        email,
        password,
        phone: phone || '',
      });

      if (response.data.success) {
        const { token, userId, userName, isBuyer } = response.data;
        
        localStorage.setItem('token', token);
        setToken(token);
        
        setUser({
          id: userId,
          name: userName,
          email,
          isBuyer,
        });
        
        setIsBuyer(isBuyer);
        setIsAuthenticated(true);

        return { success: true, message: 'Seller registration successful' };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const { token, userId, userName, isBuyer } = response.data;
        
        localStorage.setItem('token', token);
        setToken(token);
        
        setUser({
          id: userId,
          name: userName,
          email,
          isBuyer,
        });
        
        setIsBuyer(isBuyer);
        setIsAuthenticated(true);

        return { success: true, message: 'Login successful' };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isBuyer');
    setToken(null);
    setUser(null);
    setIsBuyer(true);
    setIsAuthenticated(false);
  };

  // Toggle between Buyer and Seller mode
  const toggleUserMode = () => {
    setIsBuyer(prev => !prev);
  };

  // Check if user is seller
  const isSeller = !isBuyer;

  // Get Authorization Header
  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const value = {
    user,
    token,
    isBuyer,
    setIsBuyer,
    isAuthenticated,
    loading,
    isSeller,
    registerBuyer,
    registerSeller,
    login,
    logout: handleLogout,
    toggleUserMode,
    getAuthHeader,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;