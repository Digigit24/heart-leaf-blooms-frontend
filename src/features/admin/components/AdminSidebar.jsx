import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingBag, Store, LogOut } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAuthStore } from '@/app/store/auth.store';
import { PATHS } from '@/app/routes/paths';

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Vendors', href: '/admin/vendors', icon: Store },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
];

export default function AdminSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate(PATHS.ADMIN_LOGIN);
    };

    return (
        <aside className="w-64 bg-white text-text h-screen fixed left-0 top-0 flex flex-col border-r border-border z-50">
            <div className="h-20 flex items-center px-8 border-b border-border/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Store size={20} />
                    </div>
                    <span className="text-lg font-heading font-bold tracking-wide text-primary">Heart Leaf</span>
                </div>
            </div>

            <nav className="flex-1 py-8 px-4 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "group flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden",
                                isActive
                                    ? "bg-primary text-white shadow-md shadow-primary/20 hover:bg-white hover:text-primary hover:ring-1 hover:ring-primary/20"
                                    : "text-text/70 hover:text-primary hover:bg-surface-2"
                            )}
                        >
                            <Icon size={20} className={cn("relative z-10 transition-transform duration-300 group-hover:scale-110", isActive ? "text-current" : "text-text/50 group-hover:text-primary")} />
                            <span className="relative z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-border/50 bg-surface-2/30">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-accent to-yellow-400 p-[2px]">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xs font-bold text-primary">
                            AD
                        </div>
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-text truncate">Admin User</p>
                        <p className="text-xs text-text/50 truncate">admin@heartleaf.com</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium text-text/70 hover:text-danger hover:bg-danger/5 rounded-lg transition-colors border border-border"
                >
                    <LogOut size={16} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
