import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Toaster } from 'react-hot-toast';
import { Menu } from 'lucide-react';

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-bg">
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Mobile Header for Sidebar Toggle */}
            <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-16 flex items-center shadow-sm">
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 -ml-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                    <Menu size={24} />
                </button>
                <span className="ml-3 font-bold text-gray-900">Admin Panel</span>
            </div>

            <main className="transition-all duration-300 md:ml-64 min-h-screen">
                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
