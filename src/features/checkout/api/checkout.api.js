// checkout API
import client from '@/lib/http/client';

export const checkoutApi = {
  createOrder: (data) => client.post('/payment/create-order', data),
  verifyPayment: (data) => client.post('/payment/verify', data),
};