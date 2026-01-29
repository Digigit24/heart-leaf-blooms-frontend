import { useQuery } from '@tanstack/react-query';
import { reviewsApi } from '../api/reviews.api';
import { Star, MessageCircle, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReviewList({ productId }) {
  const { data: reviews = [], isLoading, error } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => {
      const res = await reviewsApi.getProductReviews(productId);
      return res.data || [];
    },
    enabled: !!productId
  });

  if (isLoading) return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="animate-pulse bg-gray-50 rounded-xl p-6 border border-gray-100 h-32" />
      ))}
    </div>
  );

  if (error) return <div className="text-red-500 text-center py-8">Failed to load reviews.</div>;

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
        <MessageCircle size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-bold text-gray-900">No reviews yet</h3>
        <p className="text-gray-500">Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {reviews.map((review, i) => (
          <motion.div
            key={review.id || i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#1C5B45] to-[#4caf50] text-white flex items-center justify-center font-bold shadow-sm">
                  <User size={18} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    {review.user_name || review.userId || 'Anonymous User'}
                  </p>
                  <div className="flex gap-0.5 text-[#ffc107] mt-0.5">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={12}
                        className={`fill-current ${idx < review.rating ? "text-[#ffc107]" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {review.created_at ? new Date(review.created_at).toLocaleDateString() : 'Recently'}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{review.review}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}