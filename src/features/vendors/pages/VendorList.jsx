
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, ArrowRight, ShieldCheck, X, Leaf, Sprout, Crown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useVendors } from '@/features/vendors/hooks/useVendors';

export default function VendorList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: vendors = [], isLoading: loading } = useVendors();

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800 pb-20">

      {/* --- New Clean Hero Section --- */}
      <header className="relative pt-32 pb-16 md:pb-24 px-4 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#0F3D2E" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold uppercase tracking-widest mb-6">
              <Sprout size={14} /> Partner Network
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-[#0F3D2E] mb-6 tracking-tight leading-tight">
              Meet Our <span className="italic text-[#4FAF2E]">Growers</span>
            </h1>
            <p className="text-[#5C6B5F] text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Connecting you directly with the best independent nurseries and expert botanists from around the country.
            </p>
          </motion.div>

          {/* Clean Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-xl mx-auto relative group"
          >
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#0F3D2E] transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-full text-[#0F3D2E] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 focus:border-[#0F3D2E] transition-all font-medium text-base shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-lg"
              placeholder="Find a grower by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        </div>
      </header>

      {/* --- Main Content Grid --- */}
      <main className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Stats Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/50">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {filteredVendors.length} Active Partners
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-10 md:gap-y-12">
          <AnimatePresence mode="popLayout">
            {filteredVendors.map((vendor) => (
              <motion.div
                layout
                key={vendor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                onClick={() => navigate(`/products?vendor=${vendor.id}`)}
                className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              >
                {/* --- Cover Image Area (50%) --- */}
                <div className="h-64 relative bg-gray-100 overflow-hidden capitalize">
                  <motion.img
                    layoutId={`image-${vendor.id}`}
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">

                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10">
                      {vendor.featured && (
                        <div className="bg-amber-400/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-amber-900 shadow-sm flex items-center gap-1">
                          <Crown className="w-3 h-3 fill-current" /> Featured
                        </div>
                      )}
                    </div>

                    <div className="absolute top-4 right-4 z-10">
                      {vendor.verified && (
                        <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0F3D2E] shadow-sm flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-[#4FAF2E]" /> Verified
                        </div>
                      )}
                    </div>

                    {/* SVG Curve - Smooth Transition */}
                    <div className="absolute -bottom-px left-0 w-full overflow-hidden leading-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="block w-full h-[40px] fill-white">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="hidden"></path>
                        <path d="M0,0 L0,120 L1200,120 L1200,0 L700,0 Q600,80 500,0 Z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* --- Card Body --- */}
                <div className="relative px-6 pb-6 text-center z-10 -mt-10 flex flex-col flex-grow">
                  {/* Avatar */}
                  <div className="inline-block relative mb-3 mx-auto">
                    <div className="p-1.5 bg-white rounded-full shadow-lg">
                      <img
                        src={vendor.logo}
                        alt={vendor.name}
                        className="w-20 h-20 rounded-full object-cover border border-gray-100 bg-gray-50"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mb-4">
                    <h3 className="font-serif text-2xl text-[#0F3D2E] mb-1 capitalize group-hover:text-[#4FAF2E] transition-colors">
                      {vendor.name}
                    </h3>
                    <p className="text-xs text-[#8BA190] font-bold uppercase tracking-widest mb-3">
                      {vendor.specialty} • {vendor.location}
                    </p>

                    {/* Added Description Back */}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 px-2 h-10 mb-2">
                      {vendor.description}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="mb-8">
                    <button
                      className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-[#F4F7F4] text-[#0F3D2E] text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#0F3D2E] hover:text-white hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                    >
                      Visit Store <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-dashed border-gray-200 mb-6"></div>

                  {/* Stats Grid - Inset Style */}
                  <div className="grid grid-cols-3 gap-2 bg-[#F9FAFB] rounded-xl p-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] border border-gray-100/50">
                    <div className="flex flex-col items-center">
                      <span className="font-serif text-lg font-bold text-[#0F3D2E]">{vendor.rating}</span>
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">Rating</span>
                    </div>
                    <div className="flex flex-col items-center border-l border-gray-200 border-r">
                      <span className="font-serif text-lg font-bold text-[#0F3D2E]">{vendor.reviews}</span>
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">Reviews</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-serif text-lg font-bold text-[#0F3D2E]">{(vendor.reviews * 8.5).toFixed(0)}</span>
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">Sales</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredVendors.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 text-center bg-white rounded-3xl border border-gray-100 shadow-sm"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8F5E9] mb-6 text-[#2E7D32]">
              <Leaf size={24} />
            </div>
            <h3 className="text-xl font-serif text-[#0F3D2E] mb-2">No growers found</h3>
            <p className="text-gray-500 mb-8">Try adjusting your search terms.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#0F3D2E] font-bold border-b-2 border-[#4FAF2E] hover:text-[#4FAF2E] transition-colors"
            >
              View All Growers
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}