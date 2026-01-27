import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Edit, Trash2, Image as ImageIcon, Eye } from 'lucide-react';
import { adminApi } from '@/features/admin/api/admin.api';
import toast from 'react-hot-toast';
import CreateProductModal from '../components/CreateProductModal';
import ViewProductModal from '../components/ViewProductModal';

export default function ManageProducts() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProduct, setViewingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['adminValues'],
    queryFn: async () => {
      const res = await adminApi.getAllProducts();
      return res.data || [];
    },
    staleTime: 5 * 60 * 1000,
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

  // Update Product Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => adminApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['adminValues']);
      setCreateOpen(false);
      setEditingProduct(null);
      toast.success('Product details updated successfully!');
    },
    onError: (err) => {
      toast.error('Failed to update product');
      console.error(err);
    }
  });

  // Delete Product Mutation
  const deleteMutation = useMutation({
    mutationFn: adminApi.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminValues']);
      toast.success('Product deleted successfully');
    },
    onError: (err) => {
      toast.error('Failed to delete product');
      console.error(err);
    }
  });

  const handleDelete = (id) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium text-gray-800">Are you sure you want to delete this product?</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              deleteMutation.mutate(id);
              toast.dismiss(t.id);
            }}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setCreateOpen(true);
  };

  const handleCreateOpen = () => {
    setEditingProduct(null);
    setCreateOpen(true);
  };

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
          onClick={handleCreateOpen}
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
                        <button
                          onClick={() => setViewingProduct(product)}
                          className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.product_id || product.id)}
                          disabled={deleteMutation.isPending}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
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
                            <button
                              onClick={() => setViewingProduct(product)}
                              className="p-2 text-text/50 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => handleEdit(product)}
                              className="p-2 text-text/50 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.product_id || product.id)}
                              disabled={deleteMutation.isPending}
                              className="p-2 text-text/50 hover:text-danger hover:bg-danger/5 rounded-lg transition-colors">
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

      {/* Create/Edit Modal */}
      <CreateProductModal
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        createMutation={createMutation}
        updateMutation={updateMutation}
        productToEdit={editingProduct}
        isEditMode={!!editingProduct}
      />

      {/* View Modal */}
      <ViewProductModal
        isOpen={!!viewingProduct}
        onClose={() => setViewingProduct(null)}
        product={viewingProduct}
      />
    </div>
  );
}