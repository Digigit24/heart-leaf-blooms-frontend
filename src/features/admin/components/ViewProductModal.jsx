import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Tag, Package, CreditCard, Info } from 'lucide-react';

export default function ViewProductModal({ isOpen, onClose, product, isLoading }) {
    const modalRef = useRef(null);

    // Lock body scroll and handle focus when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            setTimeout(() => {
                if (modalRef.current) {
                    modalRef.current.focus();
                }
            }, 50);
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Helper to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Helper to get image URL
    const getImageUrl = (img) => {
        if (!img) return null;
        if (typeof img === 'string') return img;
        return img.large_url || img.medium_url || img.small_url || img.url;
    };

    // Get display image
    const displayImage = product?.product_images?.length > 0
        ? getImageUrl(product.product_images[0])
        : (product?.image ? getImageUrl(product.image) : null);

    return createPortal(
        <div data-lenis-prevent className="fixed inset-0 z-[100] overflow-y-auto bg-gray-900/50 backdrop-blur-sm">
            <div className="min-h-full flex justify-center p-4">
                <div
                    onClick={onClose}
                    className="absolute inset-0 w-full h-full"
                />

                <div
                    ref={modalRef}
                    tabIndex={-1}
                    className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200 outline-none overflow-hidden"
                >
                    {/* Header */}
                    <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/95 backdrop-blur">
                        <h2 className="text-xl font-heading font-bold text-[#1C5B45]">Product Details</h2>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6 md:p-8 bg-gray-50/50">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <span className="loading loading-spinner loading-lg text-primary"></span>
                            </div>
                        ) : product ? (
                            <div className="flex flex-col md:flex-row gap-8">
                                {/* Left: Product Image */}
                                <div className="w-full md:w-1/3 space-y-4">
                                    <div className="aspect-square rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
                                        {displayImage ? (
                                            <img src={displayImage} alt={product.product_name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                                                <Package size={48} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {product.product_images?.slice(1).map((img, idx) => (
                                            <div key={idx} className="aspect-square rounded-lg border border-gray-200 overflow-hidden bg-white">
                                                <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Details */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border ${product.status === 'ACTIVE' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                {product.status || 'DRAFT'}
                                            </span>
                                            {product.is_featured && (
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-amber-100 text-amber-700 border border-amber-200">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                        <h1 className="text-2xl md:text-3xl font-heading font-bold text-gray-900">{product.product_title || product.product_name}</h1>
                                        <p className="text-sm font-mono text-gray-500 mt-1">ID: {product.product_id || product.id} | Internal: {product.product_name}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 border-y border-gray-100 py-4">
                                        <div className="flex items-center gap-2">
                                            <Tag size={16} className="text-primary" />
                                            <span className="font-medium">Category ID: {product.category_id}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Package size={16} className="text-primary" />
                                            <span className="font-medium">Stock: {product.stock}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-primary" />
                                            <span className="font-medium">Created: {new Date().toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-4xl font-bold text-[#1C5B45]">{formatCurrency(product.discount_price || product.product_price)}</span>
                                            {product.discount_price > 0 && product.discount_price < product.product_price && (
                                                <span className="text-lg text-gray-400 line-through decoration-2">{formatCurrency(product.product_price)}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                            <h4 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                                                <Info size={16} className="text-primary" />
                                                Description
                                            </h4>
                                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{product.product_description || 'No description provided.'}</p>
                                        </div>

                                        {product.product_guide && (
                                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                                <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
                                                    <Info size={16} className="text-blue-600" />
                                                    Care Guide
                                                </h4>
                                                <p className="text-sm text-blue-800 leading-relaxed whitespace-pre-line">{product.product_guide}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 text-gray-500">Product not found.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
