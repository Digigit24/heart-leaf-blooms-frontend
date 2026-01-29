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

    // Toggle Status Mutation
    const toggleStatusMutation = useMutation({
        mutationFn: ({ id, isActive }) => adminApi.toggleBannerStatus(id, isActive),
        onSuccess: () => {
            queryClient.invalidateQueries(['banners']);
            toast.success('Banner status updated');
        },
        onError: (err) => {
            toast.error('Failed to update status');
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

            {/* Banners Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#1C5B45]/5 text-[#1C5B45] text-xs uppercase tracking-wider font-semibold border-b border-gray-200">
                            <tr>
                                <th className="p-4 pl-6">Banner Detail</th>
                                <th className="p-4">Subtitle</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Created At</th>
                                <th className="p-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-gray-500">
                                        <Loader2 className="animate-spin inline-block mr-2" /> Loading banners...
                                    </td>
                                </tr>
                            ) : banners.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center">
                                            <ImageIcon size={32} className="mb-2 opacity-50" />
                                            <p>No banners found. Create your first one!</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                banners.map((banner) => (
                                    <tr key={banner.id || banner._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-10 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                                                    {getBannerImageUrl(banner) ? (
                                                        <img
                                                            src={getBannerImageUrl(banner)}
                                                            alt={banner.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <ImageIcon size={16} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="font-semibold text-gray-900">{banner.title || 'Untitled'}</div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-gray-600 line-clamp-1 max-w-[200px]" title={banner.subtitle}>
                                                {banner.subtitle || '-'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => toggleStatusMutation.mutate({ id: banner.id || banner._id, isActive: !banner.isActive })}
                                                disabled={toggleStatusMutation.isPending}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${banner.isActive ? 'bg-[#1C5B45]' : 'bg-gray-300'}`}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${banner.isActive ? 'translate-x-6' : 'translate-x-1'}`}
                                                />
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-xs text-gray-500">
                                                {banner.createdAt ? new Date(banner.createdAt).toLocaleDateString() : '-'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right pr-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(banner)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#1C5B45] hover:bg-[#1C5B45]/10 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(banner.id || banner._id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
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
