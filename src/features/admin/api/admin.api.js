import client from '@/lib/http/client';

export const adminApi = {
  // Products
  getAllProducts: () => client.get('/admin/products/public'),
  getProductById: (id) => client.get(`/admin/products/${id}`),
  createProduct: (data) => client.post('/admin/products', data),
  deleteProduct: (id) => client.delete(`/admin/products/${id}`),
  updateProduct: (id, data) => client.put(`/admin/products/${id}`, data),
  uploadImage: (formData) => client.post('/product/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // Banners
  uploadBanner: (formData) => client.post('/banner/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAllBanners: () => client.get('/banner'),
  getActiveBanners: () => client.get('/banner/active'),
  updateBanner: (id, formData) => client.put(`/banner/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  toggleBannerStatus: (id, isActive) => client.put(`/banner/${id}`, { isActive }), // JSON update for status
  deleteBanner: (id) => client.delete(`/banner/${id}`),

  // Vendors
  getAllVendors: () => client.get('/admin/vendor-list'),

  // Categories
  createCategory: (data) => client.post('/category', data),
  getAllCategories: () => client.get('/category'),
  deleteCategory: (id) => client.delete(`/category/${id}`),
  updateCategory: (id, data) => client.put(`/category/${id}`, data),

  // Orders
  getAllOrders: () => client.get('/order/admin'),

  // Users
  getAllUsers: () => client.get('/user'),
};