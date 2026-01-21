import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { adminApi } from '@/features/admin/api/admin.api';
import Modal from '@/components/ui/Modal';
import toast from 'react-hot-toast';

export default function ManageProducts() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['adminValues'],
    queryFn: async () => {
      const res = await adminApi.getAllProducts();
      return res.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache to prevent aggressive refetching
  });

  // Create Product Mutation
  const createMutation = useMutation({
    mutationFn: adminApi.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminValues']);
      setCreateOpen(false);
      toast.success('Product created successfully');
    },
    onError: (err) => {
      toast.error('Failed to create product');
      console.error(err);
    }
  });

  const filteredProducts = products.filter(p =>
    p.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.product_title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Products</h1>
          <p className="text-text/60 mt-2">Manage your product catalog</p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#1C5B45] text-white font-bold rounded-full shadow-lg hover:bg-[#144233] transition-all transform hover:-translate-y-0.5"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Search & Filters */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40" size={18} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Products List - Responsive Views */}
      <div className="space-y-4">

        {/* Mobile View: Compact Cards */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {isLoading ? (
            <div className="p-8 text-center text-text/60">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-8 text-center text-text/60">No products found.</div>
          ) : (
            filteredProducts.map((product, index) => {
              const title = product.product_title || product.product_name || product.name || 'Untitled';
              const price = product.product_price || product.price || 0;
              const category = product.category_id || product.category || 'Uncategorized';
              let displayImage = null;
              if (product.product_images && product.product_images.length > 0) displayImage = product.product_images[0];
              else if (product.images && product.images.length > 0) displayImage = typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.small_url;
              else if (product.image) displayImage = product.image;

              return (
                <div key={product.id || index} className="bg-[#ffffff] p-3 rounded-xl shadow-sm border border-gray-200 flex gap-3">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg bg-gray-50 shrink-0 overflow-hidden border border-gray-200">
                    {displayImage ? (
                      <img src={displayImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{title}</h3>
                        <p className="text-xs text-gray-500 capitalize">{category}</p>
                      </div>
                      <span className="font-bold text-primary text-sm">₹{price}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-100 text-green-800 border border-green-200">
                        In Stock
                      </span>

                      <div className="flex items-center gap-1">
                        <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                          <Edit size={14} />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left bg-white">
              <thead className="bg-surface-2 text-text/60 text-xs uppercase tracking-wider font-semibold border-b border-border">
                <tr>
                  <th className="p-4 pl-6">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-text/60">Loading products...</td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-text/60">No products found.</td>
                  </tr>
                ) : (
                  filteredProducts.map((product, index) => {
                    const title = product.product_title || product.product_name || product.name || 'Untitled';
                    const price = product.product_price || product.price || 0;
                    const category = product.category_id || product.category || 'Uncategorized';
                    // Handle image array or single string
                    let displayImage = null;
                    if (product.product_images && product.product_images.length > 0) displayImage = product.product_images[0];
                    else if (product.images && product.images.length > 0) displayImage = typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.small_url;
                    else if (product.image) displayImage = product.image;

                    return (
                      <tr key={product.id || index} className="hover:bg-bg/50 transition-colors bg-white border-b border-border/50">
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-bg flex items-center justify-center overflow-hidden border border-border/50 shrink-0">
                              {displayImage ? (
                                <img src={displayImage} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon size={20} className="text-text/20" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-text line-clamp-1">{title}</p>
                              <p className="text-xs text-text/50">{product.product_name || product.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-text/70">{category}</td>
                        <td className="p-4 font-medium text-primary">₹{price}</td>
                        <td className="p-4 text-sm">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">In Stock</span>
                        </td>
                        <td className="p-4 text-right pr-6">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-text/50 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                              <Edit size={16} />
                            </button>
                            <button className="p-2 text-text/50 hover:text-danger hover:bg-danger/5 rounded-lg transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <CreateProductModal isOpen={isCreateOpen} onClose={() => setCreateOpen(false)} createMutation={createMutation} />
    </div>
  );
}

function CreateProductModal({ isOpen, onClose, createMutation }) {
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">

        {/* LEFT COLUMN: Main Info & Media (Flex-1) */}
        <div className="flex-1 space-y-8">

          {/* Section: General Info */}
          <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Edit size={16} className="text-primary" />
              General Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Internal Name</label>
                  <input
                    required
                    tabIndex={1}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    placeholder="e.g. Ficus Lyrata"
                    value={formData.product_name}
                    onChange={e => setFormData({ ...formData, product_name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Display Title</label>
                  <input
                    required
                    tabIndex={2}
                    className="w-full px-4 py-2.5 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                    placeholder="e.g. Fiddle Leaf Fig"
                    value={formData.product_title}
                    onChange={e => setFormData({ ...formData, product_title: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                <textarea
                  required
                  tabIndex={3}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all min-h-[120px] resize-y"
                  placeholder="Describe the product features and benefits..."
                  value={formData.product_description}
                  onChange={e => setFormData({ ...formData, product_description: e.target.value })}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase">Care Guide</label>
                <textarea
                  tabIndex={4}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all min-h-[80px] resize-y"
                  placeholder="Watering, light, and care instructions..."
                  value={formData.product_guide}
                  onChange={e => setFormData({ ...formData, product_guide: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section: Media */}
          <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <ImageIcon size={16} className="text-primary" />
              Media Gallery
            </h3>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 hover:bg-white hover:border-primary/50 transition-all relative group cursor-pointer bg-white">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <ImageIcon className="text-primary" size={24} />
                </div>
                <p className="text-sm font-semibold text-gray-700">Click to upload images</p>
                <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG or WEBP (max 5MB)</p>
              </div>
            </div>

            {/* Previews Grid */}
            {previews.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 mt-4">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group shadow-sm">
                    <img src={src} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-md"
                    >
                      <Trash2 size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (w-80) */}
        <div className="w-full lg:w-80 space-y-6">

          {/* Status Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Visibility Status</h3>

            <div className="space-y-4">
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

          {/* Pricing Card */}
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
                    tabIndex={5}
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-mono"
                    placeholder="0.00"
                    value={formData.product_price}
                    onChange={e => setFormData({ ...formData, product_price: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-600">Discounted Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-serif">₹</span>
                  <input
                    type="number"
                    tabIndex={6}
                    className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-mono"
                    placeholder="Optional"
                    value={formData.discount_price}
                    onChange={e => setFormData({ ...formData, discount_price: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Inventory Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Organization</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-600">Stock Quantity</label>
                <input
                  required
                  type="number"
                  tabIndex={7}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                  placeholder="e.g. 50"
                  value={formData.stock}
                  onChange={e => setFormData({ ...formData, stock: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-600">Category ID</label>
                <input
                  type="number"
                  tabIndex={8}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                  value={formData.category_id}
                  onChange={e => setFormData({ ...formData, category_id: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Footer / Actions */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-[#1C5B45] text-white hover:bg-[#144233] shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {createMutation.isPending ? (
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>Save Product</>
              )}
            </button>
          </div>

        </div>

      </form>
    </Modal>
  );
}