import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-bg">
            <AdminSidebar />

            <main className="ml-64 min-h-screen">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>

            {/* Admin specific toaster if needed, or rely on global one. 
                If global one is outside, we might overlap. 
                For now we can assume global Toaster in App.jsx covers this.
            */}
        </div>
    );
}
