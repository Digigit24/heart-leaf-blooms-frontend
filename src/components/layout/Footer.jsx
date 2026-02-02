import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Send
} from 'lucide-react';
import { PATHS } from '@/app/routes/paths';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#1a3c2f] to-[#0d211a] text-white pt-24 pb-12 font-sans relative overflow-hidden border-t border-[#ffffff10]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#56BA39]/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C6A15B]/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Top Section: CTA / Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 pb-12 border-b border-white/10">
          <div>
            <h3 className="text-3xl font-heading font-serif text-white mb-4">Join Our Green Community</h3>
            <p className="text-white/60 text-lg font-light max-w-md">
              Subscribe for plant care tips, new arrivals, and exclusive offers delivered straight to your inbox.
            </p>
          </div>
          <div className="w-full">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#C6A15B] transition-colors"
                required
              />
              <button
                type="button" // Change to 'submit' when functionality is added
                className="bg-[#C6A15B] hover:bg-[#b08d4b] text-[#0F2F24] font-semibold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#C6A15B]/20"
              >
                Subscribe
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Column 1: Brand & About */}
          <div className="space-y-8">
            <Link to="/" className="block">
              <h2 className="text-3xl font-heading font-serif italic text-white tracking-wide">Heart Leaf Blooms</h2>
            </Link>
            <p className="text-white/60 leading-relaxed font-light">
              Cultivating serenity in every corner. We bring the rarest, most beautiful botanicals from our nursery to your sanctuary.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <SocialLink href="https://www.instagram.com/heartleaf_blooms/" icon={<Instagram size={20} />} label="Instagram" />
              <SocialLink href="https://www.facebook.com/profile.php?id=61586220700903" icon={<Facebook size={20} />} label="Facebook" />
              <SocialLink href="https://www.youtube.com/@HeartleafBlooms" icon={<Youtube size={20} />} label="YouTube" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-8 tracking-wider text-sm uppercase flex items-center gap-2">
              <span className="w-8 h-px bg-[#C6A15B]"></span> Explore
            </h4>
            <ul className="space-y-4">
              <FooterLink to={PATHS.PRODUCTS}>Shop All Plants</FooterLink>
              <FooterLink to="/category/indoor">Indoor Collection</FooterLink>
              <FooterLink to="/category/outdoor">Outdoor Garden</FooterLink>
              <FooterLink to={PATHS.OFFERS} isHighlight>Exclusive Offers</FooterLink>
              <FooterLink to={PATHS.CORPORATE_PACKAGE}>Corporate Gifts</FooterLink>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-heading font-bold text-white mb-8 tracking-wider text-sm uppercase flex items-center gap-2">
              <span className="w-8 h-px bg-[#C6A15B]"></span> Company
            </h4>
            <ul className="space-y-4">
              <FooterLink to={PATHS.ABOUT}>Our Story</FooterLink>
              <FooterLink to={PATHS.CONTACT}>Contact Us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/blog">Plant Journal</FooterLink>
              <FooterLink to="/sustainability">Sustainability</FooterLink>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-white mb-8 tracking-wider text-sm uppercase flex items-center gap-2">
              <span className="w-8 h-px bg-[#C6A15B]"></span> Get in Touch
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-white/70 font-light hover:text-white transition-colors group">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#C6A15B]/20 transition-colors mt-[-4px]">
                  <MapPin size={18} className="text-[#C6A15B]" />
                </div>
                <span>123 Botanical Garden St,<br />Pune, MH 411001, India</span>
              </li>
              <li className="flex items-center gap-4 text-white/70 font-light hover:text-white transition-colors group">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#C6A15B]/20 transition-colors">
                  <Mail size={18} className="text-[#C6A15B]" />
                </div>
                <a href="mailto:hello@heartleafblooms.com">hello@heartleafblooms.com</a>
              </li>
              <li className="flex items-center gap-4 text-white/70 font-light hover:text-white transition-colors group">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#C6A15B]/20 transition-colors">
                  <Phone size={18} className="text-[#C6A15B]" />
                </div>
                <a href="tel:+919876543210">+91 987 654 3210</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40 font-light">
          <p>&copy; {currentYear} Heart Leaf Blooms. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:bg-[#C6A15B] hover:border-[#C6A15B] hover:text-[#0F2F24] hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-[#C6A15B]/25"
    >
      {icon}
    </a>
  )
}

function FooterLink({ to, children, isHighlight }) {
  return (
    <li>
      <Link
        to={to}
        className={`group flex items-center gap-2 text-sm font-light transition-all duration-300 ${isHighlight ? 'text-[#C6A15B] hover:text-[#e0b970] font-medium' : 'text-white/60 hover:text-white hover:translate-x-1'
          }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isHighlight ? 'bg-[#C6A15B]' : 'bg-transparent group-hover:bg-[#C6A15B]'} transition-all`} />
        {children}
      </Link>
    </li>
  )
}