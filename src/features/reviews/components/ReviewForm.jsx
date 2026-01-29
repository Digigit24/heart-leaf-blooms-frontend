import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Star, Send, Loader2 } from 'lucide-react';
import { reviewsApi } from '../api/reviews.api';
import { useAuthStore } from '@/app/store/auth.store';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@/app/routes/paths';

export default function ReviewForm({ productId }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => reviewsApi.createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', productId]);
      reset();
      setRating(5);
      toast.success('Review submitted successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to submit review');
      console.error(err);
    }
  });

  const onSubmit = (data) => {
    if (!user) {
      toast.error('Please login to write a review');
      navigate(PATHS.LOGIN);
      return;
    }

    const payload = {
      user_id: String(user.id || user._id),
      product_id: parseInt(productId),
      admin_product_id: parseInt(productId),
      rating: Number(rating),
      review: data.review
    };
    console.log('Submitting review payload:', payload);

    mutation.mutate(payload);
  };

  if (!user) {
    return (
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 text-center">
        <h3 className="text-lg font-bold text-gray-800 mb-2">Share your thoughts</h3>
        <p className="text-gray-500 mb-6">Please log in to leave a review for this product.</p>
        <button
          onClick={() => navigate(PATHS.LOGIN)}
          className="px-6 py-2.5 bg-[#1C5B45] text-white font-bold rounded-lg hover:bg-[#144233] transition-colors shadow-sm"
        >
          Log In to Review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4 font-heading">Write a Review</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
        <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              className="p-1 focus:outline-none transition-transform hover:scale-110"
            >
              <Star
                size={24}
                className={`transition-colors ${star <= (hoverRating || rating)
                  ? "text-[#ffc107] fill-[#ffc107]"
                  : "text-gray-200 fill-gray-100"
                  }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
        <textarea
          id="review"
          rows="4"
          placeholder="Tell us what you liked (or didn't like) about this product..."
          {...register('review', { required: 'Review text is required', minLength: { value: 10, message: 'Review must be at least 10 characters' } })}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all resize-none bg-gray-50 focus:bg-white"
        />
        {errors.review && <p className="mt-1 text-sm text-red-500">{errors.review.message}</p>}
      </div>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full sm:w-auto px-8 py-3 bg-[#1C5B45] text-white font-bold rounded-lg hover:bg-[#144233] transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        <span>Submit Review</span>
      </button>
    </form>
  );
}