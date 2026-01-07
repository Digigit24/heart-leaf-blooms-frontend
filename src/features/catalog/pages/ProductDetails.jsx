import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Minus, Plus, ShoppingBag, Heart,
  ArrowLeft, Sun, Droplets,
  Sprout, Thermometer, ChevronLeft, ChevronRight, Share2, Box
} from 'lucide-react';
import { useCartStore } from '@/app/store/cart.store';
import ProductCard from '@/components/common/ProductCard';

// --- Expanded Mock Database ---
const PRODUCTS_DB = [
  {
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
    category: "Indoor Plants",
    images: [
      "/images/hero-1.png",
      "/images/hero-2.png",
      "/images/hero-3.png",
      "/images/hero-1.png",
    ],
    description: "The Monstera Deliciosa, often called the Swiss Cheese Plant, is a favorite for a reason. Its large, glossy, fenestrated leaves make a bold statement in any room. Native to the tropical forests of southern Mexico, this easy-care beauty thrives in indirect light and brings a lush, jungle vibe to your interior.",
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
    ]
  },
  {
    id: 99,
    name: "Artisan Clay Pot",
    scientificName: "Terracotta Series",
    price: 850.00,
    originalPrice: 1200.00,
    sku: "ACC-CLAY-001",
    vendor: "Earth & Fire",
    rating: 4.8,
    reviews: 45,
    availability: "In Stock",
    category: "Flower Pots",
    images: [
      "/images/hero-3.png", // Using existing placeholders
      "/images/hero-1.png"
    ],
    description: "Handcrafted by local artisans, this premium clay pot features excellent breathability for plant roots. The porous material allows air and moisture to penetrate the sides of the pot, preventing soil disease and root rot. A timeless classic for any botanist.",
    // Pots/Sizes irrelevant for a Pot itself usually, but we keep structure empty or generic if needed.
    sizes: [
      { id: 's', label: 'Small', detail: '6 inch', priceMod: 0 },
      { id: 'm', label: 'Medium', detail: '10 inch', priceMod: 400 },
      { id: 'l', label: 'Large', detail: '14 inch', priceMod: 900 }
    ],
    // Pots/Colors for the Pot itself
    pots: [
      { id: 'terracotta', label: 'Terracotta', detail: 'Classic Clay', color: '#E2725B' },
      { id: 'white_stone', label: 'White Stone', detail: 'Matte Finish', color: '#F3F4F6' },
      { id: 'charcoal', label: 'Charcoal', detail: 'Deep Grey', color: '#374151' }
    ],
    care: [
      { icon: Box, label: "Material", value: "Natural Clay" },
      { icon: ShieldCheck, label: "Durability", value: "High Fired" },
      { icon: Droplets, label: "Drainage", value: "Single Hole" },
      { icon: Sun, label: "Usage", value: "Indoor/Outdoor" },
    ]
  }
];

// Helper to get product (fallback to Monstera)
const getProduct = (id) => PRODUCTS_DB.find(p => p.id === parseInt(id)) || PRODUCTS_DB[0];

import { ShieldCheck } from 'lucide-react'; // Added generic icon for pot traits

const RELATED_PRODUCTS = [
  { id: 2, name: 'Fiddle Leaf Fig', price: 2999.00, originalPrice: 3500, rating: 4, reviews: 85, image: '/images/hero-3.png', tag: 'Popular', category: 'Large Plants', brand: 'Green Life', color: 'dark_green', inStock: true },
  { id: 3, name: 'Rubber Plant', price: 899.00, rating: 5, reviews: 150, image: '/images/hero-2.png', category: 'Indoor Plants', brand: 'Nature@Home', color: 'dark_green', inStock: true },
  { id: 4, name: 'Golden Pothos', price: 499.00, rating: 5, reviews: 200, image: '/images/hero-1.png', category: 'Hanging Plants', brand: 'Plant Co', color: 'lime', inStock: true },
  { id: 99, name: 'Artisan Clay Pot', price: 850.00, rating: 5, reviews: 45, image: '/images/hero-3.png', category: 'Flower Pots', brand: 'Earth & Fire', color: 'terracotta', inStock: true }, // Added link to pot
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartStore();

  const [product, setProduct] = useState(getProduct(id));

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('care guide');

  // Initialize selectors only if available
  const [activeSize, setActiveSize] = useState(product.sizes?.[0] || null);
  const [activePot, setActivePot] = useState(product.pots?.[0] || null);

  // Update product when ID changes
  useEffect(() => {
    const newProduct = getProduct(id);
    setProduct(newProduct);
    setActiveSize(newProduct.sizes?.[0] || null);
    setActivePot(newProduct.pots?.[0] || null);
    setSelectedImageIndex(0);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id]);

  // Derived State
  const basePrice = product.price;
  const sizeMod = activeSize ? activeSize.priceMod : 0;
  const potMod = (activePot && activePot.id !== 'grower') ? 350 : 0;
  const currentPrice = basePrice + sizeMod + potMod;

  // Auto-Carousel Logic
  useEffect(() => {
    let interval;
    if (!isPaused && product.images.length > 1) {
      interval = setInterval(() => {
        setSelectedImageIndex(prev => (prev + 1) % product.images.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPaused, product.images.length]);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: currentPrice,
      image: product.images[0],
      quantity: quantity,
      variant: activeSize && activePot ? `${activeSize.label} - ${activePot.label}` : activeSize ? activeSize.label : 'Standard',
    });
  };

  const tabContent = {
    "care guide": (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-text">
        {product.category === 'Flower Pots' ? (
          // Flower Pot Specific Content
          [
            { title: "Material Care", icon: Box, text: "Wipe clean with a damp cloth. Avoid harsh chemicals that might degrade the natural clay finish." },
            { title: "Outdoor Use", icon: Sun, text: "Frost resistant down to -5°C. For extreme winters, we recommend bringing it indoors." },
            { title: "Drainage", icon: Droplets, text: "Ensure the drainage hole is not blocked to prevent waterlogging." },
            { title: "Aging", icon: ShieldCheck, text: "Natural terracotta will develop a beautiful patina over time as it interacts with water and soil mineral salts." }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-heading font-bold text-base text-primary flex items-center gap-2">
                <item.icon size={18} /> {item.title}
              </h3>
              <p className="text-muted">{item.text}</p>
            </div>
          ))
        ) : (
          // Plant Specific Content
          [
            { title: "Light Requirements", icon: Sun, text: "Thrives in bright to medium indirect light. Not suited for intense, direct sun but can be extensively acclimated to withstand it." },
            { title: "Watering Schedule", icon: Droplets, text: "Water every 1-2 weeks, allowing soil to dry out between waterings. Expect to water more often in brighter light." },
            { title: "Humidity & Temp", icon: Thermometer, text: "Normal room humidity is fine. Keep away from drafts and vents." },
            { title: "Bio-Facts", icon: Sprout, text: `${product.name} is a species native to tropical forests, bringing a lush, jungle vibe to your interior.` }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <h3 className="font-heading font-bold text-base text-primary flex items-center gap-2">
                <item.icon size={18} /> {item.title}
              </h3>
              <p className="text-muted">{item.text}</p>
            </div>
          ))
        )}
      </div>
    ),
    "reviews": (
      <div className="space-y-8">
        <div className="flex items-center gap-4 p-6 bg-surface-2/30 rounded-xl">
          <div className="text-center">
            <span className="block text-4xl font-serif font-black text-primary">{product.rating}</span>
            <div className="flex text-yellow-500 text-xs mt-1 justify-center">
              {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
            </div>
            <span className="text-xs text-muted mt-1 block">{product.reviews} Reviews</span>
          </div>
          <div className="h-12 w-[1px] bg-border/20"></div>
          <p className="text-sm text-muted italic">"Based on honest reviews from our verified plant parents."</p>
        </div>
        {[1, 2].map(i => (
          <div key={i} className="pb-6 border-b border-border/10 last:border-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shadow-inner">JD</div>
                <div>
                  <p className="font-bold text-sm text-primary">Jane Doe</p>
                  <div className="flex text-yellow-500"><Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /> <Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                </div>
              </div>
              <span className="text-xs text-muted">2 weeks ago</span>
            </div>
            <p className="text-sm text-text/80">Excellent quality! Exactly what I was looking for to spruce up my living room.</p>
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Navigation Bar */}
      <div className="pt-6 pb-2 px-4 max-w-container mx-auto flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-white border border-border/50 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
            <ArrowLeft size={12} />
          </div>
          Back
        </button>
        <button className="text-muted hover:text-primary transition-colors cursor-pointer">
          <Share2 size={18} />
        </button>
      </div>

      <main className="max-w-container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-24">

          {/* --- Left: Image Carousel --- */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-[550px] flex flex-col gap-6 sticky top-24">

              {/* Main Carousel Frame */}
              <div
                className="relative aspect-[4/5] lg:aspect-square bg-[#F3F4F1] rounded-[40px] overflow-hidden group shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] cursor-zoom-in"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIndex}
                    src={product.images[selectedImageIndex]}
                    alt={product.name}
                    initial={{ opacity: 0.85, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover object-center mix-blend-multiply"
                  />
                </AnimatePresence>

                {/* Floating Tags */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                  {product.category === 'Indoor Plants' && (
                    <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 w-fit">
                      <Sprout size={14} className="text-success" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Air Purifier</span>
                    </div>
                  )}
                  <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 w-fit">
                    <Star size={14} className="text-yellow-500 fill-current" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{product.rating} Rated</span>
                  </div>
                </div>

                {/* Controls (visible on hover) */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(i => (i - 1 + product.images.length) % product.images.length); }}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-primary flex items-center justify-center pointer-events-auto opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(i => (i + 1) % product.images.length); }}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur text-primary flex items-center justify-center pointer-events-auto opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/5 px-3 py-2 rounded-full backdrop-blur-sm">
                  {product.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${idx === selectedImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${selectedImageIndex === idx
                      ? 'border-primary shadow-lg scale-105 opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                      }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- Right: Information --- */}
          <div className="lg:col-span-5 flex flex-col h-full justify-center lg:pr-8 xl:pr-12">
            <div className="mb-6 relative">
              <span className="inline-block px-3 py-1 rounded-md bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest mb-3">
                {product.category}
              </span>
              <h1 className="font-serif font-medium text-5xl md:text-6xl text-primary leading-[1] mb-4 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm font-medium italic text-muted/80">{product.scientificName}</p>
            </div>

            <div className="flex items-center justify-between mb-8 pb-8 border-b border-border/20">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary tracking-tight">₹{currentPrice.toFixed(0)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted/40 line-through decoration-1">₹{product.originalPrice.toFixed(0)}</span>
                )}
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-border/30">
                <div className={`w-2 h-2 rounded-full ${product.availability === 'In Stock' ? 'bg-success animate-pulse' : 'bg-danger'}`}></div>
                <span className="text-xs font-bold text-text uppercase tracking-wider">{product.availability}</span>
              </div>
            </div>

            {/* Smart Attributes Row */}
            <div className="flex flex-wrap items-start gap-y-6 gap-x-10 mb-10">
              {product.care.map((item, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-default">
                  <div className="w-10 h-10 rounded-full bg-surface-2 text-primary flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary group-hover:text-white">
                    <item.icon size={18} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted/60 mb-0.5">{item.label}</span>
                    <span className="text-xs font-bold text-text group-hover:text-primary transition-colors">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-text/80 text-sm leading-relaxed mb-10 font-medium">
              {product.description}
            </p>

            {/* Selectors Section */}
            {(product.category !== 'Flower Pots' && activeSize && activePot) ? (
              <div className="space-y-8 mb-10">

                {/* Size Selector */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-sm font-heading font-bold text-primary uppercase tracking-wider">Size</span>
                    <span className="text-xs font-medium text-primary/60 bg-surface-2 px-2 py-1 rounded">{activeSize.detail}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.sizes.map(size => {
                      const isActive = activeSize.id === size.id;
                      const abbr = size.label === 'Small' ? 'S' : size.label === 'Medium' ? 'M' : 'L';
                      return (
                        <button
                          key={size.id}
                          onClick={() => setActiveSize(size)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer ${isActive
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-110'
                            : 'bg-white border border-border/40 text-muted hover:border-primary hover:text-primary'
                            }`}
                          title={`${size.label} (+₹${size.priceMod})`}
                        >
                          {abbr}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pot Selector */}
                <div>
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-sm font-heading font-bold text-primary uppercase tracking-wider">Pot</span>
                    <span className="text-xs font-medium text-primary/60">{activePot.detail}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.pots.map(pot => {
                      const isActive = activePot.id === pot.id;
                      return (
                        <button
                          key={pot.id}
                          onClick={() => setActivePot(pot)}
                          className={`group relative pl-2 pr-4 py-1.5 rounded-full border transition-all duration-300 flex items-center gap-3 cursor-pointer overflow-hidden ${isActive
                            ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                            : 'border-border/40 bg-white text-muted hover:border-primary/50'
                            }`}
                        >
                          {isActive && <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary/20" />}
                          <span
                            className="w-5 h-5 rounded-full shadow-inner border border-black/5"
                            style={{ backgroundColor: pot.color }}
                          />
                          <span className="text-xs font-bold">{pot.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            ) : product.category === 'Flower Pots' && product.sizes ? (
              // Only Size selector for Pots
              <>
                <div className="mb-10">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-sm font-heading font-bold text-primary uppercase tracking-wider">Dimension</span>
                    <span className="text-xs font-medium text-primary/60">{activeSize?.detail}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.sizes.map(size => {
                      const isActive = activeSize?.id === size.id;
                      return (
                        <button
                          key={size.id}
                          onClick={() => setActiveSize(size)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${isActive
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-white border border-border/40 text-muted hover:border-primary hover:text-primary hover:bg-white'
                            }`}
                        >
                          {size.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Color Selector for Pots */}
                {product.pots && product.pots.length > 0 && (
                  <div className="mb-10">
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-sm font-heading font-bold text-primary uppercase tracking-wider">Color</span>
                      <span className="text-xs font-medium text-primary/60">{activePot?.detail}</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {product.pots.map(pot => {
                        const isActive = activePot?.id === pot.id;
                        return (
                          <button
                            key={pot.id}
                            onClick={() => setActivePot(pot)}
                            className={`group relative pl-2 pr-4 py-1.5 rounded-full border transition-all duration-300 flex items-center gap-3 cursor-pointer overflow-hidden ${isActive
                              ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary/20'
                              : 'border-border/40 bg-white text-muted hover:border-primary/50'
                              }`}
                          >
                            {isActive && <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary/20" />}
                            <span
                              className="w-5 h-5 rounded-full shadow-inner border border-black/5"
                              style={{ backgroundColor: pot.color }}
                            />
                            <span className="text-xs font-bold">{pot.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : null}


            {/* Action Bar */}
            <div className="flex gap-4 mt-auto">
              <div className="flex items-center bg-white border border-border/40 rounded-full h-14 px-2 shadow-sm shrink-0">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center text-muted hover:text-primary hover:bg-black/5 transition-all rounded-full cursor-pointer active:scale-95"><Minus size={16} /></button>
                <span className="w-8 text-center font-bold text-lg text-primary tabular-nums">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center text-muted hover:text-primary hover:bg-black/5 transition-all rounded-full cursor-pointer active:scale-95"><Plus size={16} /></button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-primary text-white font-heading font-black uppercase tracking-widest text-sm rounded-full shadow-xl shadow-primary/20 hover:bg-primary-2 hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 group cursor-pointer active:scale-[0.98]"
              >
                <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="w-px h-4 bg-white/20 mx-1"></span>
                <span>₹{(currentPrice * quantity).toFixed(0)}</span>
              </button>

              <button className="h-14 w-14 rounded-full bg-white border border-border/40 text-primary/80 flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all group cursor-pointer active:scale-95 shadow-sm">
                <Heart size={20} className="group-hover:fill-current transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* --- Bottom Tabs --- */}
        <div className="mt-12 lg:mt-16 max-w-4xl mx-auto border-t border-border/20 pt-8">
          <div className="flex justify-center gap-10 mb-8">
            {['Care Guide', 'Reviews'].map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t.toLowerCase())}
                className={`text-lg font-serif italic transition-all relative px-4 py-2 cursor-pointer ${activeTab === t.toLowerCase()
                  ? 'text-primary font-bold'
                  : 'text-muted/60 hover:text-primary'
                  }`}
              >
                {t}
                {activeTab === t.toLowerCase() && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 mb-8">
          <div className="flex items-center justify-center mb-8 relative">
            <h3 className="text-3xl font-serif text-primary relative z-10 px-6 bg-[#FDFBF7]">You May Also Like</h3>
            <div className="absolute inset-0 flex items-center z-0">
              <div className="w-full h-px bg-border/20"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_PRODUCTS.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}