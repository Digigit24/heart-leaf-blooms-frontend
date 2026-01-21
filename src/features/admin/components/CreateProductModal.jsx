import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, X } from 'lucide-react';

export default function CreateProductModal({ isOpen, onClose, createMutation }) {
    const [formData, setFormData] = useState({
        category_id: 1, // Default or select
        product_name: '',
        product_title: '',
        product_description: '',
        product_guide: '',
        product_price: '',
        discount_price: '',
        stock: '',
        is_featured: false,
        status: 'ACTIVE',
        product_images: []
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    // Clear state on close
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                category_id: 1,
                product_name: '',
                product_title: '',
                product_description: '',
                product_guide: '',
                product_price: '',
                discount_price: '',
                stock: '',
                is_featured: false,
                status: 'ACTIVE',
                product_images: []
            });
            setImageFiles([]);
            setPreviews([]);
        }
    }, [isOpen]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const handleImageChange = (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImageFiles(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create FormData for upload
        const data = new FormData();
        data.append('category_id', formData.category_id);
        data.append('product_name', formData.product_name);
        data.append('product_title', formData.product_title);
        data.append('product_description', formData.product_description);
        data.append('product_guide', formData.product_guide);
        data.append('product_price', Number(formData.product_price));
        data.append('discount_price', Number(formData.discount_price));
        data.append('stock', Number(formData.stock));
        data.append('is_featured', formData.is_featured);
        data.append('status', formData.status);

        // Append images
        imageFiles.forEach(file => {
            data.append('product_images', file);
        });

        // Call mutation
        createMutation.mutate(data);
    };

    if (!isOpen) return null;

    return (
        // Main Overlay Scroll Container
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-gray-900/50 backdrop-blur-sm">

            {/* Centering Wrapper */}
            <div className="min-h-full flex items-center justify-center p-4">

                {/* Click-away Listener (Backdrop) */}
                <div
                    onClick={onClose}
                    className="absolute inset-0 w-full h-full"
                />

                {/* Modal Container: Grows with content */}
                <div className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col my-8 animate-in fade-in zoom-in-95 duration-200">

                    {/* Header (Sticky Top) */}
                    <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 border-b border-gray-100 bg-white/95 backdrop-blur rounded-t-2xl shadow-sm">
                        <h2 className="text-xl font-heading font-bold text-[#1C5B45]">Add New Product</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content Body (Flow Layout) */}
                    <div className="p-8 bg-gray-50/30">
                        <form id="create-product-form" onSubmit={handleSubmit} className="space-y-8">

                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* LEFT COLUMN */}
                                <div className="flex-1 space-y-6">

                                    {/* General Info */}
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                                            <Edit size={16} className="text-[#1C5B45]" />
                                            General Information
                                        </h3>
                                        <div className="space-y-5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-gray-500 uppercase">Internal Name</label>
                                                    <input
                                                        required
                                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all"
                                                        placeholder="e.g. Ficus Lyrata"
                                                        value={formData.product_name}
                                                        onChange={e => setFormData({ ...formData, product_name: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-gray-500 uppercase">Display Title</label>
                                                    <input
                                                        required
                                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all"
                                                        placeholder="e.g. Fiddle Leaf Fig"
                                                        value={formData.product_title}
                                                        onChange={e => setFormData({ ...formData, product_title: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                                                <textarea
                                                    required
                                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all min-h-[120px] resize-y"
                                                    placeholder="Describe features..."
                                                    value={formData.product_description}
                                                    onChange={e => setFormData({ ...formData, product_description: e.target.value })}
                                                />
                                            </div>

                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-gray-500 uppercase">Care Guide</label>
                                                <textarea
                                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all min-h-[80px] resize-y"
                                                    placeholder="Watering instructions..."
                                                    value={formData.product_guide}
                                                    onChange={e => setFormData({ ...formData, product_guide: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Media */}
                                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5 flex items-center gap-2">
                                            <ImageIcon size={16} className="text-[#1C5B45]" />
                                            Media Gallery
                                        </h3>

                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 hover:bg-gray-50 hover:border-[#1C5B45]/50 transition-all relative group cursor-pointer">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="flex flex-col items-center justify-center text-center">
                                                <div className="w-12 h-12 rounded-full bg-[#1C5B45]/10 flex items-center justify-center mb-3 group-hover:bg-[#1C5B45]/20 transition-colors">
                                                    <ImageIcon className="text-[#1C5B45]" size={24} />
                                                </div>
                                                <p className="text-sm font-semibold text-gray-700">Click to upload images</p>
                                                <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max 5MB)</p>
                                            </div>
                                        </div>

                                        {/* Previews */}
                                        {previews.length > 0 && (
                                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-5">
                                                {previews.map((src, idx) => (
                                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group shadow-sm bg-gray-100">
                                                        <img src={src} alt="" className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeImage(idx)}
                                                            className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* RIGHT COLUMN */}
                                <div className="w-full lg:w-80 space-y-6">
                                    {/* Visibility */}
                                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Visibility</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm font-medium text-gray-700">Published</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, status: prev.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }))}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-300'}`}
                                                >
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${formData.status === 'ACTIVE' ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm font-medium text-gray-700">Featured</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, is_featured: !prev.is_featured }))}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.is_featured ? 'bg-amber-500' : 'bg-gray-300'}`}
                                                >
                                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${formData.is_featured ? 'translate-x-6' : 'translate-x-1'}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Pricing</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-gray-600">Base Price (₹)</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-serif">₹</span>
                                                    <input
                                                        required
                                                        type="number"
                                                        className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all font-mono"
                                                        placeholder="0.00"
                                                        value={formData.product_price}
                                                        onChange={e => setFormData({ ...formData, product_price: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-gray-600">Discounted</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-serif">₹</span>
                                                    <input
                                                        type="number"
                                                        className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all font-mono"
                                                        placeholder="Optional"
                                                        value={formData.discount_price}
                                                        onChange={e => setFormData({ ...formData, discount_price: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Inventory */}
                                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Inventory</h3>
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-gray-600">Stock</label>
                                                <input
                                                    required
                                                    type="number"
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all"
                                                    placeholder="50"
                                                    value={formData.stock}
                                                    onChange={e => setFormData({ ...formData, stock: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-medium text-gray-600">Category ID</label>
                                                <input
                                                    type="number"
                                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#1C5B45] focus:ring-2 focus:ring-[#1C5B45]/10 outline-none transition-all"
                                                    value={formData.category_id}
                                                    onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Footer (Sticky Bottom) */}
                    <div className="sticky bottom-0 z-20 px-8 py-5 border-t border-gray-100 bg-white/95 backdrop-blur flex justify-end gap-3 rounded-b-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            form="create-product-form"
                            disabled={createMutation.isPending}
                            className="px-8 py-2.5 rounded-lg text-sm font-bold bg-[#1C5B45] text-white hover:bg-[#144233] shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {createMutation.isPending ? (
                                'Saving...'
                            ) : (
                                'Save Product'
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
