import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-2 border-t border-border mt-auto">
      <div className="max-w-container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-heading font-bold text-lg">
                H
              </div>
              <span className="font-heading font-bold text-xl text-primary">
                Heart Leaf Blooms
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Bringing nature's elegance to your doorstep with premium plants and floral arrangements.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="font-heading font-bold text-primary mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/products" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/products?category=flowers" className="hover:text-primary transition-colors">Flowers</Link></li>
              <li><Link to="/products?category=plants" className="hover:text-primary transition-colors">Plants</Link></li>
              <li><Link to="/vendors" className="hover:text-primary transition-colors">Our Vendors</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="font-heading font-bold text-primary mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-primary mb-4">Stay Connected</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Blossom Lane, Garden City</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@heartleaf.com</span>
              </li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-border text-muted hover:text-primary hover:border-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-border text-muted hover:text-primary hover:border-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-border text-muted hover:text-primary hover:border-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} Heart Leaf Blooms. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}