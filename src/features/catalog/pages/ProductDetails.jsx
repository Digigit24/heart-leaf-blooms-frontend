import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Minus, Plus, ShoppingBag, Heart,
  Truck, ShieldCheck, ArrowLeft, Sun, Droplets,
  Sprout, Thermometer, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useCartStore } from '@/app/store/cart.store';
import ProductCard from '@/components/common/ProductCard';

// --- Mock Data ---
const PRODUCT_DATA = {
  id: 1,
  name: "Monstera Deliciosa",
  scientificName: "Monstera deliciosa",
  price: 1450.00,
  originalPrice: 1850.00,
  sku: "PLNT-MNST-001",
  vendor: "Nature@Home",
  rating: 4.9,
  reviews: 124,
  availability: "In Stock",
  images: [
    "/images/hero-1.png",
    "/images/hero-2.png",
    "/images/hero-3.png",
    "/images/hero-1.png",
  ],
  description: "The Monstera Deliciosa, often called the Swiss Cheese Plant, is a favorite for a reason. Its large, glossy, fenestrated leaves make a bold statement in any room. Native to the tropical forests of southern Mexico, this easy-care beauty thrives in indirect light and brings a lush, jungle vibe to your interior. It's also an excellent air purifier, helping to remove toxins from your home.",

  sizes: [
    { id: 's', label: 'Small', detail: '10-15" (Tabletop)', priceMod: 0 },
    { id: 'm', label: 'Medium', detail: '20-30" (Floor)', priceMod: 800 },
    { id: 'l', label: 'Large', detail: '40"+ (Statement)', priceMod: 1500 }
  ],
  pots: [
    { id: 'grower', label: 'Grower Pot', detail: 'Plastic Nursery Pot', color: '#5C6B63' },
    { id: 'ceramic_w', label: 'Ceramic White', detail: 'Premium Glazed', color: '#FFFFFF' },
    { id: 'terracotta', label: 'Terracotta', detail: 'Classic Clay', color: '#E2725B' },
    { id: 'stone', label: 'Stone Grey', detail: 'Modern Matte', color: '#9CA3AF' }
  ],
  care: [
    { icon: Sun, label: "Light", value: "Bright Indirect" },
    { icon: Droplets, label: "Water", value: "Every 1-2 Weeks" },
    { icon: Thermometer, label: "Temp", value: "18°C - 30°C" },
    { icon: Sprout, label: "Growth", value: "Fast Growing" },
  ],
  tags: ["Air Purifier", "Pet Friendly", "Low Maintenance"],
  category: "Indoor Plants"
};

const RELATED_PRODUCTS = [
  { id: 2, name: 'Fiddle Leaf Fig', price: 2999.00, originalPrice: 3500, rating: 4, reviews: 85, image: '/images/hero-3.png', tag: 'Popular', category: 'Large Plants', brand: 'Green Life', color: 'dark_green', inStock: true },
  { id: 3, name: 'Rubber Plant', price: 899.00, rating: 5, reviews: 150, image: '/images/hero-2.png', category: 'Indoor Plants', brand: 'Nature@Home', color: 'dark_green', inStock: true },
  { id: 4, name: 'Golden Pothos', price: 499.00, rating: 5, reviews: 200, image: '/images/hero-1.png', category: 'Hanging Plants', brand: 'Plant Co', color: 'lime', inStock: true },
  { id: 5, name: 'Bird of Paradise', price: 3499.00, rating: 4, reviews: 64, image: '/images/hero-3.png', tag: 'New', category: 'Large Plants', brand: 'Green Life', color: 'green', inStock: true },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('care guide');
  const [activeSize, setActiveSize] = useState(PRODUCT_DATA.sizes[0]);
  const [activePot, setActivePot] = useState(PRODUCT_DATA.pots[0]);

  // Derived State
  const currentPrice = PRODUCT_DATA.price + activeSize.priceMod + (activePot.id !== 'grower' ? 350 : 0);

  // Auto-Carousel Logic
  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        setSelectedImageIndex(prev => (prev + 1) % PRODUCT_DATA.images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    addItem({
      id: PRODUCT_DATA.id,
      name: PRODUCT_DATA.name,
      price: currentPrice,
      image: PRODUCT_DATA.images[0],
      quantity: quantity,
      variant: `${activeSize.label} - ${activePot.label}`,
    });
  };

  const tabContent = {
    "care guide": (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-text/80">
        {[
          { title: "Light Requirements", icon: Sun, text: "Thrives in bright to medium indirect light. Not suited for intense, direct sun but can be extensively acclimated to withstand it." },
          { title: "Watering Schedule", icon: Droplets, text: "Water every 1-2 weeks, allowing soil to dry out between waterings. Expect to water more often in brighter light and less often in lower light." },
          { title: "Humidity & Temp", icon: Thermometer, text: "Normal room humidity is fine, but prefers higher humidity if possible. Keep away from drafts and vents." },
          { title: "Bio-Facts", icon: Sprout, text: "Monstera deliciosa is a species of flowering plant native to tropical forests of southern Mexico, south to Panama." }
        ].map((item, i) => (
          <div key={i} className="space-y-3">
            <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
              <item.icon size={20} /> {item.title}
            </h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    ),
    "reviews": (
      <div className="space-y-8">
        <div className="flex items-center gap-4 p-6 bg-surface-2/50 rounded-xl border border-border/50">
          <div className="text-center">
            <span className="block text-4xl font-black text-primary">{PRODUCT_DATA.rating}</span>
            <div className="flex text-warning text-xs mt-1 justify-center">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
            </div>
            <span className="text-xs text-muted mt-1 block">{PRODUCT_DATA.reviews} Reviews</span>
          </div>
          <div className="h-12 w-[1px] bg-border/50"></div>
          <p className="text-sm text-muted italic">"Based on honest reviews from our verified plant parents."</p>
        </div>
        {[1, 2].map(i => (
          <div key={i} className="pb-6 border-b border-border/30 last:border-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">JD</div>
                <div>
                  <p className="font-bold text-sm text-primary">Jane Doe</p>
                  <div className="flex text-warning"><Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                </div>
              </div>
              <span className="text-xs text-muted">2 weeks ago</span>
            </div>
            <p className="text-sm text-text/80">My Monstera arrived healthy and the packaging was excellent. No damage to the leaves at all!</p>
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="pt-4 pb-2 px-4 max-w-container mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft size={14} /> Back to Shop
        </button>
      </div>

      <main className="max-w-container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20">

          {/* --- Left: Image Carousel (Reduced Size) --- */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-[600px] flex flex-col gap-6"> {/* Constrained Width for 60% feel */}

              {/* Main Carousel */}
              <div
                className="relative aspect-[4/5] lg:aspect-auto lg:h-[500px] bg-[#F3F4F1] rounded-[2.5rem] overflow-hidden shadow-sm group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIndex}
                    src={PRODUCT_DATA.images[selectedImageIndex]}
                    alt={PRODUCT_DATA.name}
                    initial={{ opacity: 0.8, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 w-full h-full object-cover object-center mix-blend-multiply"
                  />
                </AnimatePresence>

                {/* Overlay Badge */}
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm flex items-center gap-2 z-10">
                  <Sprout size={16} className="text-secondary" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Natural Air Purifier</span>
                </div>

                {/* Carousel Controls */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(i => (i - 1 + PRODUCT_DATA.images.length) % PRODUCT_DATA.images.length); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg z-20"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(i => (i + 1) % PRODUCT_DATA.images.length); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur text-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg z-20"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Progress Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {PRODUCT_DATA.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${idx === selectedImageIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/30 hover:bg-primary/50'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails (Bottom) */}
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar justify-center">
                {PRODUCT_DATA.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${selectedImageIndex === idx
                        ? 'border-primary shadow-lg scale-105'
                        : 'border-transparent opacity-60 hover:opacity-100 grayscale hover:grayscale-0'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- Right: Information --- */}
          <div className="lg:col-span-5 flex flex-col h-full justify-center">
            <div className="mb-2">
              <h2 className="text-sm font-serif italic text-muted mb-1">{PRODUCT_DATA.scientificName}</h2>
              <h1 className="font-heading font-black text-4xl md:text-5xl text-primary leading-[1.1] mb-2">
                {PRODUCT_DATA.name}
              </h1>
            </div>

            <div className="flex items-center justify-between mb-8 border-b border-border/40 pb-6">
              <div className="flex items-center gap-2">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(PRODUCT_DATA.rating) ? "currentColor" : "none"} />)}
                </div>
                <span className="text-xs font-bold text-muted underline decoration-muted/30 underline-offset-2">
                  {PRODUCT_DATA.reviews} Reviews
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">₹{currentPrice.toFixed(2)}</span>
                {PRODUCT_DATA.originalPrice && (
                  <span className="text-lg text-muted/50 line-through">₹{PRODUCT_DATA.originalPrice.toFixed(0)}</span>
                )}
              </div>
            </div>

            {/* Quick Care */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {PRODUCT_DATA.care.map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-2 p-3 rounded-2xl bg-white border border-border/30 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
                  <item.icon size={20} className="text-accent" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-muted/70 mb-0.5">{item.label}</span>
                    <span className="block text-[11px] font-bold text-primary leading-tight">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-text/80 text-sm leading-relaxed mb-8">
              {PRODUCT_DATA.description}
            </p>

            {/* Selectors - Fixed High Contrast Logic */}
            <div className="space-y-6 mb-8 bg-white/50 p-6 rounded-3xl border border-border/40">

              {/* Plant Size */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold uppercase tracking-wider text-primary">Select Size</span>
                  <span className="text-xs font-medium text-accent">{activeSize.detail}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {PRODUCT_DATA.sizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setActiveSize(size)}
                      className={`relative py-3 px-2 rounded-xl text-center transition-all duration-300 ${activeSize.id === size.id
                          ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                          : 'bg-white border border-border text-text hover:border-primary hover:text-primary'
                        }`}
                    >
                      <span className="block font-bold text-sm mb-0.5">{size.label}</span>
                      {size.priceMod > 0 && <span className={`block text-[10px] ${activeSize.id === size.id ? 'text-white/80' : 'text-muted'}`}>+₹{size.priceMod}</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pot Style */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold uppercase tracking-wider text-primary">Pot Style</span>
                  <span className="text-xs font-medium text-accent">{activePot.detail}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {PRODUCT_DATA.pots.map(pot => (
                    <button
                      key={pot.id}
                      onClick={() => setActivePot(pot)}
                      className={`group relative pl-3 pr-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-3 ${activePot.id === pot.id
                          ? 'border-primary bg-primary/10 ring-1 ring-primary/20 text-primary'
                          : 'border-border bg-white hover:border-primary text-text hover:text-primary'
                        }`}
                    >
                      <div className="w-6 h-6 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: pot.color }}></div>
                      <span className="text-sm font-bold">{pot.label}</span>
                      {pot.id !== 'grower' && activePot.id === pot.id && (
                        <span className="text-[10px] font-bold ml-1">+₹350</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <div className="flex items-center bg-white border border-border rounded-full h-14 px-1 shadow-sm shrink-0">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center text-muted hover:text-primary hover:bg-black/5 transition-all rounded-full"><Minus size={18} /></button>
                <span className="w-10 text-center font-black text-lg text-primary">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center text-muted hover:text-primary hover:bg-black/5 transition-all rounded-full"><Plus size={18} /></button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-primary text-white font-heading font-black uppercase tracking-widest text-sm rounded-full shadow-xl shadow-primary/30 hover:bg-primary-2 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group"
              >
                <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Add to Cart -</span>
                <span>₹{(currentPrice * quantity).toFixed(2)}</span>
              </button>

              <button className="h-14 w-14 rounded-full bg-surface-2 border border-border/50 text-primary flex items-center justify-center hover:bg-danger/10 hover:text-danger hover:border-danger/30 transition-all group">
                <Heart size={22} strokeWidth={2} className="group-hover:fill-current" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Bottom Tabs & Related --- */}
        <div className="mt-20 lg:mt-32 max-w-5xl mx-auto">
          <div className="mb-12">
            <div className="flex justify-center gap-12 border-b border-border/30 mb-8">
              {['Care Guide', 'Reviews'].map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t.toLowerCase())}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === t.toLowerCase()
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted hover:text-primary'
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mb-24">
            <h3 className="text-2xl font-heading font-bold text-primary mb-8 text-center">You May Also Like</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {RELATED_PRODUCTS.slice(0, 4).map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>

          {/* NEW: Custom Collection Section */}
          <div>
            <h3 className="text-2xl font-heading font-black text-primary mb-8 text-center uppercase tracking-wider relative inline-block w-full">
              <span className="relative z-10 bg-[#FDFBF7] px-8">Custom Collection</span>
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-border/40 -z-0"></div>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Reusing products for mock content, reversed */}
              {[...RELATED_PRODUCTS].reverse().map((prod) => (
                <ProductCard key={`custom-${prod.id}`} product={prod} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}