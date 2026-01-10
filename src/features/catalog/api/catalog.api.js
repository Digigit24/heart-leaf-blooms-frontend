// catalog API
import client from '@/lib/http/client';

export const catalogApi = {
  getAllProducts: () => client.get('/product'),
  getProductById: (id) => client.get(`/product/${id}`),
};