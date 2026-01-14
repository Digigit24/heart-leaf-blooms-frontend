// catalog API
import client from '@/lib/http/client';

export const catalogApi = {
  getAllProducts: () => client.get('/admin/products/public'),
  getProductById: (id) => client.get(`/product/${id}`),
};