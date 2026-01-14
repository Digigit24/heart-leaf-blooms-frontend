import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F5F3EF] pt-24 pb-12">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Section: Newsletter & Brand */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          {/* Brand Area */}
          <div className="max-w-md">
            <Link to="/" className="inline-block group">
              <span className="font-serif text-3xl font-bold text-[#0F3D2E] mb-2 block group-hover:opacity-80 transition-opacity">
                Heart Leaf Blooms
              </span>
            </Link>
            <p className="text-[#0F3D2E]/70 leading-relaxed mt-4">
              Elevating your living spaces with nature's finest creations. Sustainably sourced, carefully curated, and delivered with love.
            </p>
          </div>

          {/* Newsletter - Minimal */}
          <div className="w-full max-w-sm">
            <h4 className="font-serif text-lg font-medium text-[#0F3D2E] mb-2">Join our newsletter</h4>
            <div className="flex bg-white/50 rounded-full px-4 py-2 mt-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent border-none p-0 text-[#0F3D2E] placeholder-[#0F3D2E]/40 focus:ring-0 text-sm"
              />
              <button className="text-[#0F3D2E] hover:text-[#C6A15B] transition-colors">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div>
            <h4 className="font-bold text-[#0F3D2E] text-sm uppercase tracking-wider mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-[#0F3D2E]/70">
              <li><Link to="/products" className="hover:text-[#0F3D2E] transition-colors">All Plants</Link></li>
              <li><Link to="/products?category=new" className="hover:text-[#0F3D2E] transition-colors">New Arrivals</Link></li>
              <li><Link to="/products?category=bestsellers" className="hover:text-[#0F3D2E] transition-colors">Bestsellers</Link></li>
              <li><Link to="/accessories" className="hover:text-[#0F3D2E] transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0F3D2E] text-sm uppercase tracking-wider mb-6">Learn</h4>
            <ul className="space-y-3 text-sm text-[#0F3D2E]/70">
              <li><Link to="/care" className="hover:text-[#0F3D2E] transition-colors">Plant Care Guide</Link></li>
              <li><Link to="/blog" className="hover:text-[#0F3D2E] transition-colors">The Journal</Link></li>
              <li><Link to="/about" className="hover:text-[#0F3D2E] transition-colors">Our Story</Link></li>
              <li><Link to="/workshops" className="hover:text-[#0F3D2E] transition-colors">Workshops</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0F3D2E] text-sm uppercase tracking-wider mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-[#0F3D2E]/70">
              <li><Link to="/contact" className="hover:text-[#0F3D2E] transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-[#0F3D2E] transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-[#0F3D2E] transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-[#0F3D2E] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#0F3D2E] text-sm uppercase tracking-wider mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white transition-all shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white transition-all shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white transition-all shadow-sm">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-12">
          <p className="text-[#0F3D2E]/50 text-xs">
            © {new Date().getFullYear()} Heart Leaf Blooms. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-[#0F3D2E]/50 text-xs hover:text-[#0F3D2E] transition-colors">Privacy Policy</Link>
            <Link to="/cookie" className="text-[#0F3D2E]/50 text-xs hover:text-[#0F3D2E] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}