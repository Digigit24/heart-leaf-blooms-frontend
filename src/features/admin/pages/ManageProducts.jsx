import { useState } from 'react';
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
    }
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
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-full hover:bg-primary-2 transition-colors"
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
            filteredProducts.map((product) => {
              const title = product.product_title || product.product_name || product.name || 'Untitled';
              const price = product.product_price || product.price || 0;
              const category = product.category_id || product.category || 'Uncategorized';
              let displayImage = null;
              if (product.product_images && product.product_images.length > 0) displayImage = product.product_images[0];
              else if (product.images && product.images.length > 0) displayImage = typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.small_url;
              else if (product.image) displayImage = product.image;

              return (
                <div key={product.id} className="bg-[#ffffff] p-3 rounded-xl shadow-sm border border-gray-200 flex gap-3">
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
                  filteredProducts.map((product) => {
                    const title = product.product_title || product.product_name || product.name || 'Untitled';
                    const price = product.product_price || product.price || 0;
                    const category = product.category_id || product.category || 'Uncategorized';
                    // Handle image array or single string
                    let displayImage = null;
                    if (product.product_images && product.product_images.length > 0) displayImage = product.product_images[0];
                    else if (product.images && product.images.length > 0) displayImage = typeof product.images[0] === 'string' ? product.images[0] : product.images[0]?.small_url;
                    else if (product.image) displayImage = product.image;

                    return (
                      <tr key={product.id} className="hover:bg-bg/50 transition-colors bg-[wheat]">
                        <td className="p-4 pl-6 bg-[wheat]">
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
                        <td className="p-4 text-sm text-text/70 bg-[wheat]">{category}</td>
                        <td className="p-4 font-medium text-primary bg-[wheat]">₹{price}</td>
                        <td className="p-4 text-sm bg-[wheat]">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">In Stock</span>
                        </td>
                        <td className="p-4 text-right pr-6 bg-[wheat]">
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
    product_name: '',
    product_title: '',
    product_description: '',
    product_price: '',
    category_id: 1, // Default, hardcoded for now or fetch categories
    product_images: [] // Simple placeholder
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simple submission without valid image handling for MVP
    createMutation.mutate({
      ...formData,
      product_price: Number(formData.product_price),
      category_id: Number(formData.category_id),
      product_images: ["https://placehold.co/400", "https://placehold.co/400", "https://placehold.co/400"] // Mock images req by API
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text/80">Product Name</label>
            <input
              required
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-1 focus:ring-primary outline-none"
              placeholder="e.g. Ficus Lyrata"
              value={formData.product_name}
              onChange={e => setFormData({ ...formData, product_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text/80">Display Title</label>
            <input
              required
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-1 focus:ring-primary outline-none"
              placeholder="e.g. Fiddle Leaf Fig"
              value={formData.product_title}
              onChange={e => setFormData({ ...formData, product_title: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text/80">Description</label>
          <textarea
            required
            className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-1 focus:ring-primary outline-none min-h-[100px]"
            placeholder="Product description..."
            value={formData.product_description}
            onChange={e => setFormData({ ...formData, product_description: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text/80">Price (₹)</label>
            <input
              required
              type="number"
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-1 focus:ring-primary outline-none"
              placeholder="0.00"
              value={formData.product_price}
              onChange={e => setFormData({ ...formData, product_price: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-text/80">Category ID</label>
            <input
              type="number"
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:ring-1 focus:ring-primary outline-none"
              value={formData.category_id}
              onChange={e => setFormData({ ...formData, category_id: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-sm font-medium text-text/70 hover:bg-bg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="px-6 py-2.5 rounded-full text-sm font-medium bg-primary text-white hover:bg-primary-2 transition-colors disabled:opacity-50"
          >
            {createMutation.isPending ? 'Saving...' : 'Create Product'}
          </button>
        </div>
      </form>
    </Modal>
  );
}