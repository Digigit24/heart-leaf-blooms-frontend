// vendorPanel API
import client from '@/lib/http/client';

export const vendorPanelApi = {
  uploadProductImage: (formData) => client.post('/product/upload-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  createProduct: (data) => client.post('/product', data),
};