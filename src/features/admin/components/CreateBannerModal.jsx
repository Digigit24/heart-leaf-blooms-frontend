import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, Image as ImageIcon, Check } from 'lucide-react';

export default function CreateBannerModal({ isOpen, onClose, createMutation, updateMutation, bannerToEdit, isEditMode }) {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [removeBackground, setRemoveBackground] = useState(false);

    // Reset or populate when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            if (isEditMode && bannerToEdit) {
                setTitle(bannerToEdit.title || '');
                setSubtitle(bannerToEdit.subtitle || '');
                // For editing, we show existing image. 
                // Assuming bannerToEdit.image is the URL string
                setPreview(bannerToEdit.image || null);
                setImageFile(null);
            } else {
                setTitle('');
                setSubtitle('');
                setImageFile(null);
                setPreview(null);
                setRemoveBackground(false);
            }
        }
    }, [isOpen, isEditMode, bannerToEdit]);

    const modalRef = useRef(null);

    // Focus trap and scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => modalRef.current?.focus(), 50);
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle);

        if (imageFile) {
            formData.append('image', imageFile);
            if (removeBackground) {
                formData.append('removeBackground', 'true');
            }
        }

        if (isEditMode && bannerToEdit) {
            updateMutation.mutate({ id: bannerToEdit.id || bannerToEdit._id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={onClose} />

            <div
                ref={modalRef}
                tabIndex={-1}
                className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white/50">
                    <h2 className="text-xl font-heading font-bold text-[#1C5B45]">
                        {isEditMode ? 'Edit Banner' : 'Add New Banner'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Banner Image</label>
                        <div className="relative group cursor-pointer border-2 border-dashed border-gray-200 rounded-xl overflow-hidden hover:border-[#1C5B45] hover:bg-[#1C5B45]/5 transition-all h-48">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                            />
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 group-hover:text-[#1C5B45] transition-colors">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2 group-hover:bg-white group-hover:shadow-sm">
                                        <Upload size={24} />
                                    </div>
                                    <span className="text-sm font-medium">Click to upload image</span>
                                    <span className="text-xs mt-1 opacity-60">1920x600 px recommended</span>
                                </div>
                            )}
                            {/* Hover Overlay for Edit */}
                            {preview && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        <ImageIcon size={18} /> Change Image
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Title</label>
                            <input
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter banner main title"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Subtitle</label>
                            <input
                                required
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                placeholder="Enter a catchy subtitle"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Remove Background Option */}
                    {!isEditMode && imageFile && (
                        <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                            <input
                                type="checkbox"
                                id="removeBg"
                                checked={removeBackground}
                                onChange={(e) => setRemoveBackground(e.target.checked)}
                                className="w-5 h-5 text-[#1C5B45] rounded focus:ring-[#1C5B45] border-gray-300 cursor-pointer"
                            />
                            <label htmlFor="removeBg" className="text-sm font-medium text-indigo-900 cursor-pointer select-none flex-1">
                                Remove Background (AI)
                                <span className="block text-xs text-indigo-500 font-normal">May take a few extra seconds</span>
                            </label>
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="pt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={createMutation?.isPending || updateMutation?.isPending}
                            className="flex-[2] px-4 py-2.5 rounded-xl bg-[#1C5B45] text-white font-bold hover:bg-[#144233] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:translate-y-0 disabled:shadow-none flex items-center justify-center gap-2"
                        >
                            {(createMutation?.isPending || updateMutation?.isPending) ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Check size={18} />
                                    {isEditMode ? 'Update Banner' : 'Create Banner'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div >
        </div >,
        document.body
    );
}
