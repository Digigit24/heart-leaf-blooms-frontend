import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, LogOut, Heart, Phone, Truck } from 'lucide-react';
import { useAuthStore } from '@/app/store/auth.store';
import { useCartStore } from '@/app/store/cart.store';
import { useWishlistStore } from '@/app/store/wishlist.store'; // Add import
import { useUIStore } from '@/app/store/ui.store'; // Add import
import { PATHS } from '@/app/routes/paths';
import { cn } from '@/utils/cn';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuthStore();
  const cartItems = useCartStore((state) => state.items);
  const wishlistItems = useWishlistStore((state) => state.items); // Get wishlist count
  const { toggleCart, toggleWishlist } = useUIStore(); // Get toggles

  useEffect(() => {
    const handleScroll = () => {
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
    { name: 'Vendors', path: PATHS.VENDORS },
    { name: 'About', path: PATHS.ABOUT },
  ];

  const handleLogout = () => {
    logout();
    navigate(PATHS.HOME);
  };

  return (
    <>
      {/* Announcement Bar - Premium Touch */}
      <div className="bg-[#0F3D2E] text-white text-[11px] uppercase tracking-wider py-2 font-medium">
        <div className="max-w-container mx-auto px-4 flex justify-between items-center">
          <p className="hidden sm:block">Free shipping on orders over $75</p>
          <div className="flex items-center gap-6 mx-auto sm:mx-0">
            <span className="flex items-center gap-1.5"><Truck className="w-3 h-3" /> Fast Delivery</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> Support 24/7</span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 border-b ${isScrolled
          ? 'bg-[#F7F4EE] shadow-sm border-border/60 py-2'
          : 'bg-[#F7F4EE] border-transparent py-4'
          }`}
      >
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to={PATHS.HOME} className="flex items-center gap-3 group">
                <div className={cn(
                  "w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary bg-surface transition-transform duration-500 ease-out group-hover:rotate-12 group-hover:border-primary/50",
                  isScrolled ? "scale-90" : "scale-100"
                )}>
                  <span className="font-serif font-black text-xl italic">H</span>
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    "font-serif font-bold text-primary tracking-tight leading-none transition-all duration-300",
                    isScrolled ? "text-xl" : "text-2xl"
                  )}>
                    Heart Leaf
                  </span>
                  <span className={cn(
                    "font-sans text-[10px] tracking-[0.2em] text-muted uppercase transition-all duration-300",
                    isScrolled ? "hidden opacity-0" : "block opacity-100"
                  )}>
                    Blooms
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative group py-2"
                >
                  <span className={cn(
                    'text-sm font-medium transition-colors duration-300 font-heading tracking-wide',
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-text/90 group-hover:text-primary'
                  )}>
                    {link.name}
                  </span>
                  <span className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-300 ease-out",
                    location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">

              <button className="p-2 sm:p-2.5 text-text/80 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300 group">
                <Search className="w-5 h-5 stroke-[1.5px] group-hover:stroke-2" />
              </button>

              <button
                onClick={toggleWishlist}
                className="p-2 sm:p-2.5 text-text/80 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300 group hidden sm:block relative"
              >
                <Heart className="w-5 h-5 stroke-[1.5px] group-hover:stroke-2" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold text-white bg-red-400 rounded-full ring-2 ring-bg animate-in zoom-in spin-in-6">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              <button
                onClick={toggleCart}
                className="p-2 sm:p-2.5 text-text/80 hover:text-primary hover:bg-primary/5 rounded-full transition-all duration-300 group relative"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5px] group-hover:stroke-2" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center text-[10px] font-bold text-red-600 animate-in zoom-in">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <div className="w-[1px] h-6 bg-border mx-1 hidden sm:block"></div>

              {/* User Profile / Login */}
              {isAuthenticated ? (
                <div className="relative group hidden sm:block">
                  <button className="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-surface transition-all border border-transparent hover:border-border/50 hover:shadow-sm">
                    <div className="w-8 h-8 rounded-full bg-primary text-surface flex items-center justify-center shadow-inner">
                      <span className="font-serif italic font-bold">{user?.name?.[0] || 'U'}</span>
                    </div>
                    <span className="text-xs font-medium text-text uppercase tracking-wider max-w-[80px] truncate">
                      Account
                    </span>
                  </button>

                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-border/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right p-2 z-[60]">
                    <div className="px-3 py-2 border-b border-border/50 mb-1">
                      <p className="text-xs text-muted">Signed in as</p>
                      <p className="font-medium text-primary truncate">{user?.name}</p>
                    </div>
                    <Link to={PATHS.ORDERS} className="block px-3 py-2 text-sm text-text/80 hover:text-primary hover:bg-surface-2 rounded-lg transition-colors">
                      My Orders
                    </Link>
                    <Link to={PATHS.VENDOR_DASHBOARD} className="block px-3 py-2 text-sm text-text/80 hover:text-primary hover:bg-surface-2 rounded-lg transition-colors">
                      Vendor Dashboard
                    </Link>
                    <div className="h-[1px] bg-border/50 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-danger/5 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4 stroke-[1.5px]" />
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to={PATHS.LOGIN}
                  className="hidden sm:inline-flex items-center justify-center h-10 px-6 text-xs font-bold text-white uppercase tracking-widest transition-all bg-[#0F3D2E] hover:bg-[#1C5B45] rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -mr-2 text-text hover:text-primary md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 stroke-[1.5px]" />
                ) : (
                  <Menu className="w-6 h-6 stroke-[1.5px]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden fixed inset-x-0 bg-surface/95 backdrop-blur-xl border-b border-border transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-[400px] opacity-100 visible" : "max-h-0 opacity-0 invisible"
        )}>
          <div className="px-4 pt-4 pb-8 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'block px-4 py-3 text-lg font-serif font-medium border-l-2 transition-all',
                  location.pathname === link.path
                    ? 'border-accent text-primary bg-primary/5 pl-6'
                    : 'border-transparent text-text hover:text-primary hover:bg-surface-2 hover:pl-6'
                )}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-6 mt-6 border-t border-border/50 px-2">
              {!isAuthenticated ? (
                <Link
                  to={PATHS.LOGIN}
                  className="flex w-full items-center justify-center px-4 py-4 text-sm font-bold text-white uppercase tracking-widest bg-[#0F3D2E] hover:bg-[#1C5B45] rounded-xl transition-all shadow-md active:scale-95"
                >
                  Sign In
                </Link>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center text-primary font-bold font-serif">
                      {user?.name?.[0]}
                    </div>
                    <div>
                      <p className="font-medium text-text">{user?.name}</p>
                      <p className="text-xs text-muted">View Profile</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-danger hover:bg-danger/5 rounded-xl border border-danger/10 flex items-center justify-between gap-2 transition-colors"
                  >
                    <span>Sign out</span>
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}