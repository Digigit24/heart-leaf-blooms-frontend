// orders API
import client from '@/lib/http/client';

export const ordersApi = {
  createOrder: (data) => client.post('/orders', data),
  getUserOrders: (userId) => client.get(`/orders/user/${userId}`),
  getOrderDetails: (orderId) => client.get(`/orders/${orderId}`),
};