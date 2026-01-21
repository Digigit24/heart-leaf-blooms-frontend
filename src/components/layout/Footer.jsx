import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin } from 'lucide-react';
import { PATHS } from '@/app/routes/paths';

export default function Footer() {
  return (
    <footer className="bg-[#1a2e25] text-white pt-20 pb-10 font-sans relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C6A15B]/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-container mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-24 mb-16 border-b border-white/10 pb-16">

          {/* Brand Section */}
          <div className="max-w-sm space-y-8">
            <Link to="/" className="block">
              {/* White Logo Concept or just Text if specific white logo isn't available */}
              <h2 className="text-3xl font-heading font-serif italic text-white tracking-wide">Heart Leaf Blooms</h2>
            </Link>
            <p className="text-white/60 leading-relaxed font-light">
              Cultivating serenity in every corner. We bring the rarest, most beautiful botanicals from our nursery to your sanctuary.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="https://www.instagram.com/heartleaf_blooms/" icon={<Instagram size={18} />} />
              <SocialLink href="https://www.facebook.com/profile.php?id=61586220700903" icon={<Facebook size={18} />} />
              <SocialLink href="https://www.youtube.com/@HeartleafBlooms" icon={<Youtube size={18} />} />
            </div>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20 w-full md:w-auto">

            <div>
              <h4 className="font-heading font-bold text-white mb-6 tracking-wide text-sm uppercase">Shop</h4>
              <ul className="space-y-4">
                <FooterLink to={PATHS.PRODUCTS}>All Plants</FooterLink>
                <FooterLink to="/category/indoor">Indoor</FooterLink>
                <FooterLink to="/category/outdoor">Outdoor</FooterLink>
                <FooterLink to="/offers">Offers</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-white mb-6 tracking-wide text-sm uppercase">Company</h4>
              <ul className="space-y-4">
                <FooterLink to="/about">Our Story</FooterLink>
                <FooterLink to="/contact">Contact</FooterLink>
                <FooterLink to="/careers">Careers</FooterLink>
                <FooterLink to="/blog">Journal</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-bold text-white mb-6 tracking-wide text-sm uppercase">Support</h4>
              <ul className="space-y-4">
                <FooterLink to="/faq">FAQs</FooterLink>
                <FooterLink to="/shipping">Shipping</FooterLink>
                <FooterLink to="/returns">Returns</FooterLink>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/30 font-medium">
          <p>&copy; {new Date().getFullYear()} Heart Leaf Blooms. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Pune, MH, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#C6A15B] hover:border-[#C6A15B] hover:text-[#0F3D2E] transition-all duration-300"
    >
      {icon}
    </a>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="text-white/60 hover:text-[#C6A15B] transition-colors text-sm font-light block">
        {children}
      </Link>
    </li>
  )
}