import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Upload, Loader2, Link as LinkIcon, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreateCategoryModal({ isOpen, onClose, createMutation, updateMutation, categoryToEdit, isEditMode }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && categoryToEdit) {
                setValue('category_name', categoryToEdit.category_name);
                setValue('category_description', categoryToEdit.category_description);
                setValue('category_icon', categoryToEdit.category_icon);
                setPreviewImage(categoryToEdit.category_icon);
            } else {
                reset();
                setPreviewImage(null);
            }
        }
    }, [isOpen, isEditMode, categoryToEdit, setValue, reset]);

    const onSubmit = (data) => {
        if (isEditMode) {
            updateMutation.mutate({ id: categoryToEdit.category_id || categoryToEdit.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleImageUrlChange = (e) => {
        setPreviewImage(e.target.value);
    };

    const isLoading = createMutation.isPending || updateMutation.isPending;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <Dialog.Title as="h3" className="text-2xl font-heading font-bold text-gray-900">
                                        {isEditMode ? 'Edit Category' : 'Create Category'}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                    {/* Icon / Image Preview */}
                                    <div className="flex justify-center mb-6">
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative group"
                                        >
                                            {previewImage ? (
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=?'; }}
                                                />
                                            ) : (
                                                <Upload className="text-gray-400 group-hover:text-[#1C5B45] transition-colors" size={32} />
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                                        <input
                                            type="text"
                                            {...register('category_name', { required: 'Name is required' })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/20 outline-none transition-all"
                                            placeholder="e.g. Indoor Plants"
                                        />
                                        {errors.category_name && <p className="text-red-500 text-xs mt-1">{errors.category_name.message}</p>}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            {...register('category_description', { required: 'Description is required' })}
                                            rows="3"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/20 outline-none transition-all resize-none"
                                            placeholder="Brief description of the category..."
                                        />
                                        {errors.category_description && <p className="text-red-500 text-xs mt-1">{errors.category_description.message}</p>}
                                    </div>

                                    {/* Icon URL */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon URL</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <LinkIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="url"
                                                {...register('category_icon', { required: 'Icon URL is required' })}
                                                onChange={handleImageUrlChange}
                                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/20 outline-none transition-all"
                                                placeholder="https://example.com/icon.png"
                                            />
                                        </div>
                                        {errors.category_icon && <p className="text-red-500 text-xs mt-1">{errors.category_icon.message}</p>}
                                        <p className="text-xs text-gray-500 mt-2">Paste a direct image URL for the category icon.</p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 px-6 py-3 bg-[#1C5B45] text-white font-bold rounded-xl hover:bg-[#144233] shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="animate-spin" size={20} />
                                            ) : (
                                                <>
                                                    <Save size={18} />
                                                    {isEditMode ? 'Update' : 'Create'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
