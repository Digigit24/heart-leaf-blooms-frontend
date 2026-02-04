import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/features/admin/api/admin.api';
import { reviewsApi } from '@/features/reviews/api/reviews.api';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageCircle, User, Loader2, Search, Filter, ThumbsUp, Calendar, Package } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ManageReviews() {
    const [searchTerm, setSearchTerm] = useState('');
    const [ratingFilter, setRatingFilter] = useState('all');

    // Fetch Reviews
    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['admin-reviews'],
        queryFn: async () => {
            const res = await reviewsApi.getAllReviews();
            return res.data || [];
        },
        staleTime: 5 * 60 * 1000,
    });

    const filteredReviews = reviews.filter(review => {
        const matchesSearch =
            review.review?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.user?.username?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRating = ratingFilter === 'all' || Math.round(review.rating) === parseInt(ratingFilter);

        return matchesSearch && matchesRating;
    });

    return (
        <div className="space-y-8 min-h-[80vh] font-sans text-gray-800">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-heading font-bold bg-linear-to-r from-[#1C5B45] to-[#4caf50] bg-clip-text text-transparent"
                    >
                        Customer Reviews
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 mt-2 text-lg font-light"
                    >
                        Monitor and analyze customer feedback
                    </motion.p>
                </div>

                {/* Stats Cards Mockup */}
                <div className="flex gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-yellow-50 text-yellow-500 rounded-lg">
                            <Star size={20} className="fill-current" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Avg Rating</p>
                            <p className="text-xl font-bold text-gray-800">
                                {reviews.length > 0
                                    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                                    : '0.0'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-4 z-20">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1C5B45] transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search by review text or user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <Filter size={18} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Filter Rating:</span>
                    <div className="flex gap-1">
                        {['all', 5, 4, 3, 2, 1].map((r) => (
                            <button
                                key={r}
                                onClick={() => setRatingFilter(r)}
                                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${ratingFilter === r
                                    ? 'bg-[#1C5B45] text-white shadow-md shadow-[#1C5B45]/20'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {r === 'all' ? 'All' : <div className="flex items-center gap-1">{r} <Star size={10} className="fill-current" /></div>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm animate-pulse h-32" />
                        ))
                    ) : filteredReviews.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 text-gray-400 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            <MessageCircle size={48} className="mb-4 opacity-50" />
                            <p>No reviews found matching your criteria.</p>
                        </div>
                    ) : (
                        filteredReviews.map((review, i) => (
                            <motion.div
                                key={review.id || i}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#1C5B45] to-[#4caf50] text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-[#1C5B45]/20 shrink-0">
                                            {review.user?.username ? review.user.username.charAt(0).toUpperCase() : <User size={20} />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900">{review.user?.username || 'Anonymous User'}</h3>
                                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-medium">Verified Purchase</span>
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex gap-0.5 text-[#ffc107]">
                                                    {[...Array(5)].map((_, idx) => (
                                                        <Star
                                                            key={idx}
                                                            size={14}
                                                            className={`fill-current ${idx < review.rating ? "text-[#ffc107]" : "text-gray-200"}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm font-bold text-gray-700">{review.rating}.0</span>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                                {review.review}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col items-center md:items-end gap-2 text-xs text-gray-400 font-medium shrink-0 ml-16 md:ml-0">
                                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                                            <Calendar size={14} />
                                            <span>{review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently'}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                                            <Package size={14} />
                                            <span>{review.adminProduct?.product_name || 'Product'}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
