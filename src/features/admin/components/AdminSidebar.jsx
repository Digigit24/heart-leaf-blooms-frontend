import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingBag, Store, LogOut, ChevronRight, Settings, HelpCircle, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/app/store/auth.store';
import { PATHS } from '@/app/routes/paths';

const NAV_ITEMS = [
    { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Vendors', href: '/admin/vendors', icon: Users },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
];

const SECONDARY_ITEMS = [
    { label: 'Settings', href: '/admin/settings', icon: Settings }, // Placeholder route
    { label: 'Help Center', href: '/admin/help', icon: HelpCircle }, // Placeholder route
];

export default function AdminSidebar({ isOpen, onClose }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate(PATHS.ADMIN_LOGIN);
    };

    return (
        <>
            {/* Mobile Backdrop */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 w-64 bg-[#0F3D2E] text-white z-50 shadow-xl transition-transform duration-300 ease-in-out border-r border-[#1C5B45]",
                    "md:translate-x-0", // Always visible on desktop
                    isOpen ? "translate-x-0" : "-translate-x-full" // Toggle on mobile
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="h-20 flex items-center justify-between px-6 border-b border-[#1C5B45] shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-primary shadow-lg shadow-black/20">
                                <Store size={18} />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold tracking-tight text-white leading-none font-serif italic">Heart Leaf</h1>
                                <p className="text-[10px] text-[#8FAF9B] font-medium tracking-widest uppercase mt-1">Admin Portal</p>
                            </div>
                        </div>
                        {/* Mobile Close Button */}
                        <button onClick={onClose} className="md:hidden text-[#8FAF9B] hover:text-white">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 py-8 px-3 space-y-8 overflow-y-auto custom-scrollbar">
                        <div>
                            <h3 className="px-3 text-xs font-semibold text-[#5C6B63] uppercase tracking-wider mb-2">Main Menu</h3>
                            <div className="space-y-1">
                                {NAV_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.href;

                                    return (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            onClick={() => onClose && onClose()} // Close sidebar on navigate (mobile)
                                            className={cn(
                                                "group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-[#1C5B45] text-white shadow-md shadow-black/10 border border-[#1C5B45]"
                                                    : "text-[#8FAF9B] hover:text-white hover:bg-[#1C5B45]/50 border border-transparent"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon size={18} className={cn("transition-colors", isActive ? "text-[#C6A15B]" : "text-[#5C6B63] group-hover:text-[#C6A15B]")} />
                                                <span>{item.label}</span>
                                            </div>
                                            {isActive && <ChevronRight size={14} className="opacity-50 text-[#C6A15B]" />}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="px-3 text-xs font-semibold text-[#5C6B63] uppercase tracking-wider mb-2">Support</h3>
                            <div className="space-y-1">
                                {SECONDARY_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.href}
                                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#8FAF9B] hover:text-white hover:bg-[#1C5B45]/50 transition-all duration-200 cursor-not-allowed opacity-60"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon size={18} className="text-[#5C6B63]" />
                                                <span>{item.label}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </nav>

                    {/* User Profile */}
                    <div className="p-4 border-t border-[#1C5B45] bg-[#0A2F23] shrink-0">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#0F3D2E] hover:bg-[#1C5B45] transition-colors border border-[#1C5B45] mb-3 group cursor-pointer shadow-sm">
                            <div className="w-9 h-9 rounded-full bg-linear-to-tr from-[#C6A15B] to-[#F1EFE7] p-px">
                                <div className="w-full h-full rounded-full bg-[#0F3D2E] flex items-center justify-center text-xs font-bold text-[#C6A15B]">
                                    AD
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-medium text-white truncate group-hover:text-[#C6A15B] transition-colors">Admin User</p>
                                <p className="text-xs text-[#8FAF9B] truncate">admin@heartleaf.com</p>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-xs font-medium text-[#FF8585] hover:text-white hover:bg-[#B65B5B] hover:border-[#B65B5B] rounded-lg transition-all border border-[#B65B5B]/30"
                        >
                            <LogOut size={14} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
