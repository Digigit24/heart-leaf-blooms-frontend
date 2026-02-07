// auth API
import client from '@/lib/http/client';

export const authApi = {
  // User Auth
  registerUser: (data) => client.post('/user/register', data),
  loginUser: (data) => client.post('/user/login', data),
  getGoogleClientId: () => client.get('/user/google-client-id'),
  googleLogin: (token) => client.post('/user/google-login', { token }),
  getUserProfile: (id) => client.get(`/user/${id}`),
  updateUser: (id, data) => client.put(`/user/${id}`, data), // Added PUT
  addUserAddress: (id, data) => client.post(`/user/${id}/address`, data),

  // Vendor Auth
  registerVendor: (data) => client.post('/vendor/register', data),
  loginVendor: (data) => client.post('/vendor/login', data),

  // Admin Auth
  loginAdmin: (data) => client.post('/admin/login', data),
  logoutAdmin: () => client.post('/admin/logout'),

  // Vendor Auth (Add logout if needed similar to admin/user)
  logoutVendor: () => client.post('/vendor/logout'),

  // User Auth (Add logout)
  logoutUser: () => client.post('/user/logout'),
};