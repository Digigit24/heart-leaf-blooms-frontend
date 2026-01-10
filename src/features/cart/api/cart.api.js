// cart API
import client from '@/lib/http/client';

export const cartApi = {
    addToCart: (userId, data) => client.post(`/cart/${userId}`, data),
    updateCartQuantity: (userId, cartId, data) => client.put(`/cart/${userId}/${cartId}`, data),
    addToWishlist: (userId, data) => client.post(`/wishlist/${userId}`, data),
};
