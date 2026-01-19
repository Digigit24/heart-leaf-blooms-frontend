import client from '@/lib/http/client';

export const adminApi = {
  // Products
  getAllProducts: () => client.get('/admin/products/public'),
  createProduct: (data) => client.post('/admin/products', data),
  updateProduct: (id, data) => client.put(`/admin/products/${id}`, data),
  uploadImage: (formData) => client.post('/admin/products/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // Vendors
  getAllVendors: () => client.get('/admin/vendor-list'),

  // Categories
  createCategory: (data) => client.post('/category', data),
  getAllCategories: () => client.get('/category'),

  // Orders
  getAllOrders: () => client.get('/order/admin'),
};