import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, LogOut, Heart, Phone, Truck } from 'lucide-react';
import { useAuthStore } from '@/app/store/auth.store';
import { useCartStore } from '@/app/store/cart.store';
import { useWishlistStore } from '@/app/store/wishlist.store';
import { useUIStore } from '@/app/store/ui.store';
import { PATHS } from '@/app/routes/paths';
import { cn } from '@/utils/cn';
import { useConfig } from '@/context/ConfigContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items); // Get wishlist count
  const { toggleCart, toggleWishlist } = useUIStore(); // Get toggles
  const { isMultivendor } = useConfig();

  useEffect(() => {
    const handleScroll = () => {
      // Just track scroll for background opacity, not size changes
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: PATHS.HOME },
    { name: 'Shop', path: PATHS.PRODUCTS },
    { name: 'Offers', path: PATHS.OFFERS },
    { name: 'Corporate', path: PATHS.CORPORATE_PACKAGE },
    ...(isMultivendor ? [{ name: 'Vendors', path: PATHS.VENDORS }] : []),
    { name: 'About', path: PATHS.ABOUT },
    { name: 'Contact', path: PATHS.CONTACT },
  ];

  const handleLogout = () => {
    logout();
    navigate(PATHS.HOME);
  };

  return (
    <>
      {/* Announcement Bar - Static, does not collapse to avoid jitter */}
      <div className="bg-[#0F3D2E] text-white text-[9px] uppercase tracking-wider py-2 font-medium relative z-50">
        <div className="max-w-container mx-auto px-4 flex justify-between items-center">
          <p className="hidden sm:block text-[11px]">Free shipping on orders over ₹499</p>
          <div className="flex items-center gap-6 mx-auto sm:mx-0">
            <span className="flex items-center gap-1.5"><Truck className="w-3 h-3" /> Fast Delivery</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> Support 24/7</span>
          </div>
        </div>
      </div>

      {/* Main Header - Fixed Top, Stable Height */}
      <div className="sticky top-0 z-40 w-full">
        <header
          className={cn(
            "w-full transition-all duration-300 border-b",
            isScrolled
              ? "bg-white border-border/10 py-2" // Scrolled: Clean solid white
              : "bg-white border-transparent py-4" // Top: Clean solid white
          )}
        >
          <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              {/* Logo - Large & Visible */}
              <div className="flex-shrink-0">
                <Link to={PATHS.HOME} className="flex items-center gap-3 group">
                  <img
                    src="/images/logo.png"
                    alt="Heart Leaf Blooms"
                    className="h-[60px] w-auto object-contain transition-transform group-hover:scale-105"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative group py-2"
                  >
                    <span className={cn(
                      'font-medium transition-colors duration-300 font-heading tracking-wide text-lg',
                      location.pathname === link.path
                        ? 'text-[#2F6E1E] font-bold'
                        : 'text-[#2F6E1E] group-hover:text-brand'
                    )}>
                      {link.name}
                    </span>
                    {/* Simplified Underline Effect */}
                    <span className={cn(
                      "absolute bottom-0 left-0 h-[2px] bg-[#2F6E1E] transition-all duration-300 ease-out",
                      location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </Link>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-2 sm:gap-4">

                <button className="p-2 text-[#2F6E1E] hover:text-brand hover:bg-brand-soft/50 rounded-full transition-all duration-300">
                  <Search className="w-5 h-5 stroke-[1.5px]" />
                </button>

                <button
                  onClick={toggleWishlist}
                  className="p-2 text-[#2F6E1E] hover:text-brand hover:bg-brand-soft/50 rounded-full transition-all duration-300 hidden sm:block relative"
                >
                  <Heart className="w-5 h-5 stroke-[1.5px]" />
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-400 rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={toggleCart}
                  className="p-2 text-[#2F6E1E] hover:text-brand hover:bg-brand-soft/50 rounded-full transition-all duration-300 relative"
                >
                  <ShoppingBag className="w-5 h-5 stroke-[1.5px]" />
                  {cartItems.length > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-[#2F6E1E] rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </button>

                <div className="w-[1px] h-6 bg-border mx-2 hidden sm:block"></div>

                {/* User Profile / Login */}
                {isAuthenticated ? (
                  <div className="relative group hidden sm:block">
                    <button className="flex items-center gap-2 py-1">
                      <div className="w-9 h-9 rounded-full bg-[#0F3D2E] text-white flex items-center justify-center shadow-sm">
                        <span className="font-serif italic font-bold text-sm">{user?.name?.[0] || 'U'}</span>
                      </div>
                    </button>
                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-border/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] p-1">
                      <div className="px-3 py-2 border-b border-border/50 mb-1">
                        <p className="text-xs text-muted">Signed in as</p>
                        <p className="font-medium text-primary truncate">{user?.name}</p>
                      </div>
                      <Link to={PATHS.ORDERS} className="block px-3 py-2 text-sm text-text/80 hover:bg-surface-2 rounded-lg transition-colors">
                        My Orders
                      </Link>
                      {isMultivendor && (
                        <Link to={PATHS.VENDOR_DASHBOARD} className="block px-3 py-2 text-sm text-text/80 hover:bg-surface-2 rounded-lg transition-colors">
                          Vendor Dashboard
                        </Link>
                      )}
                      <div className="h-[1px] bg-border/50 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4 stroke-[1.5px]" />
                        Sign out
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={PATHS.LOGIN}
                    className="hidden sm:inline-flex items-center justify-center h-10 px-6 text-xs font-bold text-white uppercase tracking-widest transition-all bg-[#0F3D2E] hover:bg-[#1C5B45] rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Login
                  </Link>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 -mr-2 text-text hover:text-[#0F3D2E] md:hidden"
                >
                  <Menu className="w-6 h-6 stroke-[1.5px]" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Removed Soft Fade Mask */}
      </div>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden transition-opacity duration-300",
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )} onClick={() => setIsMobileMenuOpen(false)} />

      {/* Mobile Menu Slider */}
      <div className={cn(
        "md:hidden fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-[#FDFCF8] shadow-2xl transition-transform duration-300 ease-in-out transform border-l border-brand/5",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex justify-between items-center bg-brand-soft/30">
            <span className="font-heading font-bold text-xl text-brand-dark">Menu</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full bg-white/50 text-brand-dark">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'block px-5 py-3.5 rounded-2xl text-lg font-heading font-medium transition-all',
                  location.pathname === link.path
                    ? 'bg-[#EAF6E6] text-[#56BA39] font-bold shadow-sm'
                    : 'text-text-secondary hover:bg-[#EAF6E6]/50 hover:text-[#2F6E1E]'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="p-6 border-t border-brand/10 bg-brand-soft/10">
            {!isAuthenticated ? (
              <Link
                to={PATHS.LOGIN}
                className="flex w-full items-center justify-center px-4 py-4 text-sm font-bold text-white uppercase tracking-widest bg-[#0F3D2E] hover:bg-[#1C5B45] rounded-full transition-all shadow-md active:scale-95"
              >
                Sign In
              </Link>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-brand/5 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center font-bold font-heading">
                    {user?.name?.[0]}
                  </div>
                  <div>
                    <p className="font-medium text-brand-dark font-heading">{user?.name}</p>
                    <p className="text-xs text-muted">View Profile</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl flex items-center justify-center gap-2 transition-colors border border-red-100"
                >
                  <span>Sign out</span>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}