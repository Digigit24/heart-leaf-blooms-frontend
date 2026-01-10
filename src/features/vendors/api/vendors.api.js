// vendors API
import client from '@/lib/http/client';

export const vendorsApi = {
  getAllVendors: () => client.get('/vendor/list'),
  getVendorById: (id) => client.get(`/vendor/${id}`),
};