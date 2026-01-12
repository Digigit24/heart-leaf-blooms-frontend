import client from '@/lib/http/client';

export const adminApi = {
  // Products
  createProduct: (data) => client.post('/product', data),
  updateProduct: (id, data) => client.put(`/product/${id}`, data),
  uploadImage: (formData) => client.post('/product/upload-image', formData, {
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