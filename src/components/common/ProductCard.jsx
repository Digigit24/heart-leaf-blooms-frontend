import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Search } from 'lucide-react';
import { useCartStore } from '@/app/store/cart.store';
import { useAuthStore } from '@/app/store/auth.store';
import { toast } from 'react-hot-toast';
import { PATHS } from '@/app/routes/paths';

export default function ProductCard({ product, ...props }) {
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { user } = useAuthStore();
  const { inStock = true } = product; // Default to true if undefined

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent card click
    if (inStock) {
      if (!user) {
        navigate(PATHS.LOGIN);
        return;
      }
      addItem({ ...product, quantity: 1 }, user?.user_id || user?.id || user?._id);
      toast.success('Added to cart!');
    }
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group relative block bg-transparent transition-all duration-300 ${!inStock ? 'opacity-75 grayscale-[0.5]' : ''} overflow-hidden cursor-pointer`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(); }}
    >
      {/* Steel Shine Effect */}
      <div className="absolute inset-0 z-10 -translate-x-full group-hover:animate-[shine_0.75s_ease-in-out_one] bg-linear-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
      {/* Image Container */}
      <div className="relative aspect-4/5 overflow-hidden rounded-[20px] bg-[#F3F4F1]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted">
            <span className="text-xs">No Image</span>
          </div>
        )}

        {/* Tags / Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {!inStock && (
            <span className="bg-stone-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
              Out of Stock
            </span>
          )}
          {inStock && product.tag && (
            <span className="bg-white/90 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm shadow-sm">
              {product.tag}
            </span>
          )}
        </div>

        {/* Hover Actions */}
        {!props.hideAddToCart && (
          <div className="flex absolute bottom-3 left-3 right-3 translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 z-20 gap-2">

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="h-9 bg-white/80 backdrop-blur-md border border-stone-200 text-stone-800 rounded-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider hover:bg-white hover:text-[#56BA39] transition-all duration-300 shadow-sm flex-1 disabled:cursor-not-allowed disabled:opacity-50"
              title="Add to Cart"
            >
              <ShoppingBag size={14} />
            </button>

            {/* Buy Now */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (!inStock) return;
                if (!user) {
                  navigate(PATHS.LOGIN);
                  return;
                }
                addItem({ ...product, quantity: 1 }, user?.user_id || user?.id || user?._id);
                navigate('/checkout');
              }}
              disabled={!inStock}
              className="h-9 bg-[#0F3D2E] text-white rounded-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-wider hover:bg-[#1a4f3b] shadow-lg hover:shadow-[0_4px_12px_rgba(15,61,46,0.3)] transition-all duration-300 flex-[2] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-stone-400"
            >
              {inStock ? 'Buy Now' : 'Sold Out'}
            </button>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-3 space-y-1">
        <h3 className="font-heading font-medium text-sm md:text-base text-stone-800 leading-tight group-hover:text-primary transition-colors truncate">
          {product.name}
        </h3>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
          <div className="flex flex-col">
            <span className="text-[10px] md:text-xs text-muted/80">{product.category}</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-primary">₹{product.price?.toFixed(0) || 'N/A'}</span>
              {product.originalPrice && (
                <span className="text-[10px] md:text-xs text-muted/60 line-through">₹{product.originalPrice?.toFixed(0)}</span>
              )}
            </div>
            {/* Discount Label like Reference Image */}
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[10px] md:text-xs font-bold text-green-600">
                Min. {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Off
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}