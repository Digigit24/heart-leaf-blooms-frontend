import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, ArrowRight, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FDFBF7] pt-24 pb-12 border-t border-[#0F3D2E]/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Section: Brand & Newsletter */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">

          {/* Brand Area */}
          <div className="lg:col-span-5 space-y-6">
            <Link to="/" className="inline-block group">
              <img
                src="/images/logo.png"
                alt="Heart Leaf Blooms"
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="text-[#0F3D2E]/70 leading-relaxed max-w-md text-lg font-light">
              Elevating your living spaces with nature's finest creations. Sustainably sourced, carefully curated, and delivered with love to Pune and beyond.
            </p>

            <div className="flex items-center gap-4 text-sm text-[#0F3D2E]/80 font-medium pt-2">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand" /> Pune, India
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand" /> heartleafbloomsonline@gmail.com
              </span>
            </div>
          </div>

          {/* Newsletter - Glassmorphism */}
          <div className="lg:col-span-7 lg:pl-12 flex flex-col justify-center">
            <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-brand/10 shadow-lg shadow-brand/5">
              <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                <div>
                  <h4 className="font-heading text-2xl font-bold text-[#0F3D2E] mb-2">Join our Green Community</h4>
                  <p className="text-[#0F3D2E]/60 text-sm">Get plant care tips and exclusive offers.</p>
                </div>
                <div className="w-full md:w-auto flex-1 max-w-sm">
                  <div className="flex bg-white rounded-2xl px-2 py-2 shadow-sm border border-brand/10 focus-within:ring-2 ring-brand/20 transition-all">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full bg-transparent border-none px-4 py-2 text-[#0F3D2E] placeholder-[#0F3D2E]/40 focus:ring-0 text-sm font-medium outline-none"
                    />
                    <button className="bg-[#0F3D2E] hover:bg-brand text-white rounded-xl px-4 py-2 transition-colors flex items-center justify-center">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-linear-to-r from-transparent via-[#0F3D2E]/10 to-transparent mb-16"></div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center md:text-left">
          <div className="space-y-6">
            <h4 className="font-heading font-bold text-[#0F3D2E] text-lg">Shop</h4>
            <ul className="space-y-3 text-sm text-[#0F3D2E]/70 font-medium">
              <li><Link to="/products" className="hover:text-brand transition-colors">All Plants</Link></li>
              <li><Link to="/products?category=new" className="hover:text-brand transition-colors">New Arrivals</Link></li>
              <li><Link to="/products?category=bestsellers" className="hover:text-brand transition-colors">Bestsellers</Link></li>
              <li><Link to="/accessories" className="hover:text-brand transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-bold text-[#0F3D2E] text-lg">Learn</h4>
            <ul className="space-y-3 text-sm text-[#0F3D2E]/70 font-medium">
              <li><Link to="/care" className="hover:text-brand transition-colors">Plant Care Guide</Link></li>
              <li><Link to="/blog" className="hover:text-brand transition-colors">The Journal</Link></li>
              <li><Link to="/about" className="hover:text-brand transition-colors">Our Story</Link></li>
              <li><Link to="/workshops" className="hover:text-brand transition-colors">Workshops</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-bold text-[#0F3D2E] text-lg">Support</h4>
            <ul className="space-y-3 text-sm text-[#0F3D2E]/70 font-medium">
              <li><Link to="/contact" className="hover:text-brand transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-brand transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="hover:text-brand transition-colors">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-brand transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-heading font-bold text-[#0F3D2E] text-lg">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href="https://www.instagram.com/heartleaf_blooms/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white border border-brand/10 flex items-center justify-center text-[#0F3D2E] hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61586220700903"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white border border-brand/10 flex items-center justify-center text-[#0F3D2E] hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@HeartleafBlooms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-2xl bg-white border border-brand/10 flex items-center justify-center text-[#0F3D2E] hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#0F3D2E]/5">
          <p className="text-[#0F3D2E]/50 text-xs font-medium">
            © {new Date().getFullYear()} Heart Leaf Blooms. All rights reserved.
          </p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="/privacy" className="text-[#0F3D2E]/50 text-xs font-bold uppercase tracking-wider hover:text-brand transition-colors">Privacy Policy</Link>
            <Link to="/cookie" className="text-[#0F3D2E]/50 text-xs font-bold uppercase tracking-wider hover:text-brand transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}