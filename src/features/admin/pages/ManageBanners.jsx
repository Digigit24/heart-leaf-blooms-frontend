import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Image as ImageIcon, Loader2, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { adminApi } from '@/features/admin/api/admin.api';
import toast from 'react-hot-toast';
import CreateBannerModal from '../components/CreateBannerModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageBanners() {
    const queryClient = useQueryClient();
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState(null);

    // Fetch Banners
    const { data: banners = [], isLoading } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await adminApi.getAllBanners();
            return res.data || [];
        },
        staleTime: 5 * 60 * 1000,
    });

    // Create Mutation
    const createMutation = useMutation({
        mutationFn: adminApi.uploadBanner,
        onSuccess: () => {
            queryClient.invalidateQueries(['banners']);
            setCreateOpen(false);
            toast.success('Banner created successfully');
        },
        onError: (err) => {
            toast.error('Failed to create banner');
            console.error(err);
        }
    });

    // Update Mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => adminApi.updateBanner(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['banners']);
            setCreateOpen(false);
            setEditingBanner(null);
            toast.success('Banner updated successfully');
        },
        onError: (err) => {
            toast.error('Failed to update banner');
            console.error(err);
        }
    });

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: adminApi.deleteBanner,
        onSuccess: () => {
            queryClient.invalidateQueries(['banners']);
            toast.success('Banner deleted successfully');
        },
        onError: (err) => {
            toast.error('Failed to delete banner');
            console.error(err);
        }
    });

    const handleEdit = (banner) => {
        setEditingBanner(banner);
        setCreateOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this banner?')) {
            deleteMutation.mutate(id);
        }
    };

    const handleCreateOpen = () => {
        setEditingBanner(null);
        setCreateOpen(true);
    };

    // Helper to extract image URL
    const getBannerImageUrl = (bannerItem) => {
        if (bannerItem.imageUrl) return bannerItem.imageUrl;
        const img = bannerItem.image;
        if (!img) return null;
        if (typeof img === 'string') return img;
        if (img instanceof File || img instanceof Blob) return URL.createObjectURL(img);
        return img.large_url || img.medium_url || img.small_url || img.url || img.imageUrl || null;
    };

    return (
        <div className="space-y-8 min-h-[80vh]">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-heading font-bold bg-gradient-to-r from-[#1C5B45] to-[#4caf50] bg-clip-text text-transparent"
                    >
                        Hero Banners
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 mt-2 text-lg font-light"
                    >
                        Manage the visuals that welcome your customers
                    </motion.p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(28, 91, 69, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCreateOpen}
                    className="flex items-center gap-3 px-8 py-3 bg-[#1C5B45] text-white font-bold rounded-2xl shadow-lg hover:bg-[#144233] transition-all"
                >
                    <div className="p-1 bg-white/20 rounded-full">
                        <Plus size={18} />
                    </div>
                    <span>Add Banner</span>
                </motion.button>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        <div className="col-span-full py-32 flex flex-col items-center justify-center text-gray-400">
                            <Loader2 className="animate-spin mb-4 text-[#1C5B45]" size={40} />
                            <p className="text-lg animate-pulse">Loading amazing banners...</p>
                        </div>
                    ) : banners.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="col-span-full"
                        >
                            <div className="bg-white rounded-3xl p-16 text-center border-3 border-dashed border-gray-100 flex flex-col items-center">
                                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 text-[#1C5B45]">
                                    <ImageIcon size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Banners Yet</h3>
                                <p className="text-gray-500 max-w-md mx-auto leading-relaxed mb-8">
                                    Your homepage looks a bit empty. Upload your first banner to make a great first impression.
                                </p>
                                <button
                                    onClick={handleCreateOpen}
                                    className="px-8 py-3 rounded-xl bg-white border-2 border-[#1C5B45] text-[#1C5B45] font-bold hover:bg-[#1C5B45] hover:text-white transition-all duration-300"
                                >
                                    Create First Banner
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        banners.map((banner, idx) => (
                            <motion.div
                                key={banner.id || banner._id || idx}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className="group relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col"
                            >
                                {/* Image Container */}
                                <div className="relative h-56 overflow-hidden bg-gray-100">
                                    {getBannerImageUrl(banner) ? (
                                        <img
                                            src={getBannerImageUrl(banner)}
                                            alt={banner.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-gray-50">
                                            <ImageIcon size={40} />
                                            <span className="text-xs mt-2 font-medium">No Image</span>
                                        </div>
                                    )}

                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                    {/* Active Badge */}
                                    <div className="absolute top-4 left-4">
                                        {banner.isActive ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-emerald-700 text-xs font-bold shadow-sm">
                                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-gray-500 text-xs font-bold shadow-sm">
                                                <span className="w-2 h-2 rounded-full bg-gray-400" />
                                                Inactive
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions - Always visible, Glassmorphism pill */}
                                    <div className="absolute top-4 right-4 flex items-center gap-1 p-1 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 shadow-lg">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleEdit(banner); }}
                                            className="w-9 h-9 flex items-center justify-center rounded-lg text-white/90 hover:text-white hover:bg-white/20 transition-all active:scale-95"
                                            title="Edit Banner"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <div className="w-px h-4 bg-white/20"></div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(banner.id || banner._id); }}
                                            className="w-9 h-9 flex items-center justify-center rounded-lg text-white/90 hover:text-red-200 hover:bg-red-500/20 transition-all active:scale-95"
                                            title="Delete Banner"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="p-6 flex-1 flex flex-col relative">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 line-clamp-1 group-hover:text-[#1C5B45] transition-colors">{banner.title || 'Untitled Banner'}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{banner.subtitle || 'No subtitle provided for this banner.'}</p>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        {banner.createdAt && (
                                            <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                                <Calendar size={14} />
                                                <span>{new Date(banner.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Decorative flourish */}
                                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#1C5B45]/5 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <CreateBannerModal
                isOpen={isCreateOpen}
                onClose={() => setCreateOpen(false)}
                createMutation={createMutation}
                updateMutation={updateMutation}
                bannerToEdit={editingBanner}
                isEditMode={!!editingBanner}
            />
        </div>
    );
}
