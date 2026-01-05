import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useCartStore } from '@/app/store/cart.store';

export default function ProductCard({ product }) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({ ...product, quantity: 1 });
  };

  return (
    <Link to={`/products/${product.id}`} className="group relative block bg-surface rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-transparent hover:border-border">
      {/* Image container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-2">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted bg-[#F1EFE7]">
            <span className="text-sm">No Image</span>
          </div>
        )}

        {/* Badges */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm rounded-sm">
            {product.tag}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button className="p-2 rounded-full bg-white text-text hover:text-danger hover:bg-white shadow-md transition-colors" title="Add to Wishlist">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart Overlay (Mobile/Desktop variation) */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-white/95 backdrop-blur-sm text-primary font-medium text-sm uppercase tracking-wide rounded shadow-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        {/* Reviews */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-[#C6A15B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("w-3 h-3", i < product.rating ? "fill-current" : "text-border fill-transparent")} />
            ))}
          </div>
          <span className="text-[10px] text-muted ml-1">({product.reviews})</span>
        </div>

        <h3 className="font-heading font-bold text-lg text-text group-hover:text-primary transition-colors mb-1 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-primary font-body">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}