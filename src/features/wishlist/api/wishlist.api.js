// Wishlist API
import client from '@/lib/http/client';

export const wishlistApi = {
    /**
     * Add item to user wishlist
     * POST /wishlist/{id}
     * @param {string} userId - User ID
     * @param {object} data - { product_id: string }
     * @returns {Promise}
     */
    addToWishlist: (userId, data) => client.post(`/wishlist/${userId}`, data),

    /**
     * Remove item from user wishlist
     * DELETE /wishlist/{id}/{wishlistId}
     * @param {string} userId - User ID
     * @param {string} wishlistId - Wishlist item ID
     * @returns {Promise}
     */
    removeFromWishlist: (userId, wishlistId) => client.delete(`/wishlist/${userId}/${wishlistId}`),

    /**
     * Get user's wishlist
     * GET /wishlist/{id}
     * @param {string} userId - User ID
     * @returns {Promise}
     */
    getWishlist: (userId) => client.get(`/wishlist/${userId}`),
};
