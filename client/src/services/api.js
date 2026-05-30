import axios from 'axios';

// Use Vite proxy in development (all /api calls go through proxy to localhost:5000)
export const API_BASE = import.meta.env.VITE_API_URL || '/api';

// Base URL for backend uploads (e.g., http://localhost:5000 or production backend domain)
// If VITE_API_URL is set (e.g. https://my-backend.com/api), strip /api to get the root domain.
export const BACKEND_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') 
  : '';

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's a base64 or blob URL, return as is
  if (imagePath.startsWith('data:') || imagePath.startsWith('blob:')) {
    return imagePath;
  }
  
  // If it's already an absolute URL
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    // If it's a localhost URL but we have a production backend configured, rewrite it
    if (BACKEND_URL && imagePath.includes('localhost:5000')) {
      return imagePath.replace('http://localhost:5000', BACKEND_URL);
    }
    return imagePath;
  }
  
  // If it's a relative path, prepend BACKEND_URL
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${BACKEND_URL}${cleanPath}`;
};

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Request interceptor — attach JWT token for admin routes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      // Only redirect if we're in the admin area
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin-login') {
        window.location.href = '/admin-login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
