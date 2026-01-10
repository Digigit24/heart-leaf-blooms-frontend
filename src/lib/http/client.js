import axios from 'axios';

const client = axios.create({
  baseURL: 'https://heart-leaf-blooms-backend.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add logging interceptors
client.interceptors.request.use(request => {
  const token = localStorage.getItem('token');
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
  return Promise.reject(error);
});

export default client;