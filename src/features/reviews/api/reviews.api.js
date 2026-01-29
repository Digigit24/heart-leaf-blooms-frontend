import client from '@/lib/http/client';

export const reviewsApi = {
  getAllReviews: () => client.get('/review/admin/all'),
  createReview: (data) => client.post('/review', data),
  getProductReviews: (productId) => client.get(`/review/${productId}`),
};