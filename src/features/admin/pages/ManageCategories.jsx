import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Layers, Loader2, Search } from 'lucide-react';
import { adminApi } from '@/features/admin/api/admin.api';
import toast from 'react-hot-toast';
import CreateCategoryModal from '../components/CreateCategoryModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageCategories() {
    const queryClient = useQueryClient();
    const [isCreateOpen, setCreateOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch Categories
    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await adminApi.getAllCategories();
            return res.data || [];
        },
        staleTime: 5 * 60 * 1000,
    });

    // Create Mutation
    const createMutation = useMutation({
        mutationFn: adminApi.createCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            setCreateOpen(false);
            toast.success('Category created successfully');
        },
        onError: (err) => {
            toast.error('Failed to create category');
            console.error(err);
        }
    });

    // Update Mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => adminApi.updateCategory(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            setCreateOpen(false);
            setEditingCategory(null);
            toast.success('Category updated successfully');
        },
        onError: (err) => {
            toast.error('Failed to update category');
            console.error(err);
        }
    });

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: adminApi.deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries(['categories']);
            toast.success('Category deleted successfully');
        },
        onError: (err) => {
            toast.error('Failed to delete category');
            console.error(err);
        }
    });

    const handleEdit = (category) => {
        setEditingCategory(category);
        setCreateOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
            deleteMutation.mutate(id);
        }
    };

    const handleCreateOpen = () => {
        setEditingCategory(null);
        setCreateOpen(true);
    };

    // Filter categories based on search
    const filteredCategories = categories.filter(cat =>
        cat.category_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.category_description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 min-h-[80vh]">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-heading font-bold bg-linear-to-r from-[#1C5B45] to-[#4caf50] bg-clip-text text-transparent"
                    >
                        Manage Categories
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-500 mt-2 text-lg font-light"
                    >
                        Organize your products into collections
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
                    <span>Add Category</span>
                </motion.button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all"
                />
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        [...Array(4)].map((_, i) => (
                            <div key={i} className="h-64 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse" />
                        ))
                    ) : filteredCategories.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center justify-center p-12 text-gray-400">
                            <Layers size={48} className="mb-4 opacity-50" />
                            <p>No categories found.</p>
                        </div>
                    ) : (
                        filteredCategories.map((category, index) => (
                            <motion.div
                                key={category.category_id || category.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden relative"
                            >
                                <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(category)}
                                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-500 hover:text-[#1C5B45] shadow-sm transition-colors"
                                        title="Edit"
                                        aria-label="Edit Category"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.category_id || category.id)}
                                        className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-500 hover:text-red-500 shadow-sm transition-colors"
                                        title="Delete"
                                        aria-label="Delete Category"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                <div className="p-6 flex flex-col items-center text-center">
                                    <div className="w-20 h-20 rounded-full bg-[#1C5B45]/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <img
                                            src={category.category_icon || category.icon}
                                            alt={category.category_name}
                                            className="w-12 h-12 object-contain"
                                            onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=Icon'; }}
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">{category.category_name}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                        {category.category_description}
                                    </p>
                                </div>
                                <div className="h-1 w-full bg-linear-to-r from-transparent via-[#1C5B45]/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <CreateCategoryModal
                isOpen={isCreateOpen}
                onClose={() => setCreateOpen(false)}
                createMutation={createMutation}
                updateMutation={updateMutation}
                categoryToEdit={editingCategory}
                isEditMode={!!editingCategory}
            />
        </div>
    );
}
