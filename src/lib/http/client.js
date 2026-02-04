import axios from 'axios';
import { useAuthStore } from '@/app/store/auth.store';

const client = axios.create({
  // Direct URL as requested to bypass localhost/proxy issues
  // baseURL: 'https://heart-leaf-blooms-backend.onrender.com',
     baseURL: `http://localhost:7071`,


  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add logging interceptors
client.interceptors.request.use(request => {
  // Check for tokens in priority order: Admin > Vendor > User
  let token = localStorage.getItem('admin_token') ||
    localStorage.getItem('vendor_token') ||
    localStorage.getItem('token');

  // Fallback: Check cookies in priority order if no localStorage token found
  if (!token) {
    const adminMatch = document.cookie.match(new RegExp('(^| )admin_token=([^;]+)'));
    if (adminMatch) token = adminMatch[2];
  }

  if (!token) {
    const vendorMatch = document.cookie.match(new RegExp('(^| )vendor_token=([^;]+)'));
    if (vendorMatch) token = vendorMatch[2];
  }

  if (!token) {
    const userMatch = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
    if (userMatch) token = userMatch[2];
  }

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Starting Request:', request.method.toUpperCase(), request.url);
  return request;
});



client.interceptors.response.use(response => {
  console.log('Response:', response.status, response.config.url);
  return response;
}, error => {
  console.error('API Error:', error.response?.status, error.message);

  if (error.response?.status === 401) {
    // Automatically logout if unauthorized
    useAuthStore.getState().logout();
  }

  return Promise.reject(error);
});

export default client;