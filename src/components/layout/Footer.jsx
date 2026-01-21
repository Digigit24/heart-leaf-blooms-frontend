import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FDFBF7] pt-16 pb-8 border-t border-[#0F3D2E]/5 font-sans relative overflow-hidden">
      {/* Subtle Background Decor */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-32 mb-12">

          {/* Column 1: Brand & Identity */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/images/logo.png"
                alt="Heart Leaf Blooms"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <div className="space-y-4 max-w-md">
              <p className="text-[#0F3D2E]/70 text-sm leading-relaxed text-justify">
                Elevating your living spaces with nature's finest creations. Sustainably sourced, carefully curated, and delivered with love to Pune and beyond.
              </p>

              <div className="flex items-center gap-2 text-[#0F3D2E] font-medium text-sm bg-white/50 w-fit px-3 py-1.5 rounded-full border border-[#0F3D2E]/5">
                <MapPin className="w-4 h-4 text-brand" />
                <span>Pune, India</span>
              </div>
            </div>

            {/* Social Icons (Compact) */}
            <div className="flex gap-3 pt-2">
              <a href="https://www.instagram.com/heartleaf_blooms/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#0F3D2E]/10 flex items-center justify-center text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white hover:border-[#0F3D2E] transition-all shadow-sm">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61586220700903" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#0F3D2E]/10 flex items-center justify-center text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white hover:border-[#0F3D2E] transition-all shadow-sm">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@HeartleafBlooms" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-[#0F3D2E]/10 flex items-center justify-center text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white hover:border-[#0F3D2E] transition-all shadow-sm">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col justify-center lg:items-end">
            <div className="text-left">
              <h4 className="font-heading font-bold text-[#0F3D2E] text-lg mb-6 flex items-center gap-2">
                Quick Links <span className="h-px w-8 bg-[#0F3D2E]/10 ml-2"></span>
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-sm font-medium text-[#0F3D2E]/70 hover:text-brand hover:translate-x-1 transition-all flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-sm font-medium text-[#0F3D2E]/70 hover:text-brand hover:translate-x-1 transition-all flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Shop
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="text-sm font-medium text-[#0F3D2E]/70 hover:text-brand hover:translate-x-1 transition-all flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Offers
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm font-medium text-[#0F3D2E]/70 hover:text-brand hover:translate-x-1 transition-all flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm font-medium text-[#0F3D2E]/70 hover:text-brand hover:translate-x-1 transition-all flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Simple Bottom Bar */}
        <div className="pt-6 border-t border-[#0F3D2E]/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#0F3D2E]/40 text-[10px] font-medium">
            © {new Date().getFullYear()} Heart Leaf Blooms.
          </p>
          <p className="text-[#0F3D2E]/40 text-[10px] flex items-center gap-1">
            Made with <span className="text-red-400">♥</span> in Pune
          </p>
        </div>
      </div>
    </footer>
  );
}