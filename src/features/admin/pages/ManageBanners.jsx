import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react';
import { adminApi } from '@/features/admin/api/admin.api';
import toast from 'react-hot-toast';
import CreateBannerModal from '../components/CreateBannerModal';

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

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-[#1C5B45]">Banners</h1>
                    <p className="text-gray-500 mt-2">Manage your homepage hero sliders and promotional banners</p>
                </div>
                <button
                    onClick={handleCreateOpen}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#1C5B45] text-white font-bold rounded-full shadow-lg hover:bg-[#144233] transition-all transform hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Add New Banner
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                        <Loader2 className="animate-spin mb-3" size={32} />
                        <p>Loading banners...</p>
                    </div>
                ) : banners.length === 0 ? (
                    <div className="col-span-full bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                            <ImageIcon size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">No Banners Found</h3>
                        <p className="text-gray-500 mt-1 max-w-sm mx-auto">Get started by creating your first banner to display on the homepage.</p>
                        <button
                            onClick={handleCreateOpen}
                            className="mt-6 text-[#1C5B45] font-semibold hover:underline"
                        >
                            Create a Banner
                        </button>
                    </div>
                ) : (
                    banners.map((banner, idx) => (
                        <div key={banner.id || banner._id || idx} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                            {/* Image Area */}
                            <div className="relative h-48 bg-gray-100 overflow-hidden">
                                {(() => {
                                    const getBannerImageUrl = (bannerItem) => {
                                        // 1. Direct property check on the banner object usually for 'imageUrl'
                                        if (bannerItem.imageUrl) return bannerItem.imageUrl;

                                        const img = bannerItem.image;
                                        if (!img) return null;
                                        if (typeof img === 'string') return img;
                                        if (img instanceof File || img instanceof Blob) return URL.createObjectURL(img);
                                        // Check for various potential keys in object
                                        return img.large_url || img.medium_url || img.small_url || img.url || img.imageUrl || null;
                                    };
                                    const imageUrl = getBannerImageUrl(banner);

                                    return imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={banner.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                            <ImageIcon size={32} />
                                        </div>
                                    );
                                })()}

                                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    <button
                                        onClick={() => handleEdit(banner)}
                                        className="p-2 bg-white/90 backdrop-blur text-gray-700 rounded-lg hover:text-[#1C5B45] hover:bg-white shadow-sm"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(banner.id || banner._id)}
                                        className="p-2 bg-white/90 backdrop-blur text-gray-700 rounded-lg hover:text-red-500 hover:bg-white shadow-sm"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1">{banner.title || 'Untitled Banner'}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{banner.subtitle || 'No subtitle provided'}</p>

                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400 uppercase font-semibold tracking-wider">
                                    <span>ID: {(banner.id || banner._id || '').slice(-4)}</span>
                                    <span className="px-2 py-1 rounded-md bg-green-50 text-green-700 border border-green-100">
                                        Active
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
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
