import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit2, LogOut, Package, Heart, Loader2, Save, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/app/store/auth.store';
import { authApi } from '@/features/auth/api/auth.api';
import { toast } from 'react-hot-toast';
import { PATHS } from '@/app/routes/paths';

export default function ProfileDashboard() {
    const { user, logout, login } = useAuthStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        mobile_number: '',
        user_email: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const userId = user._id || user.id;
                const response = await authApi.getUserProfile(userId);
                const data = response.data.user || response.data;
                setUserData(data);
                setFormData({
                    username: data.username || data.name || '',
                    mobile_number: data.mobile_number || data.phone || '',
                    user_email: data.user_email || data.email || ''
                });
            } catch (error) {
                console.error("Failed to load profile", error);
                toast.error("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userId = user._id || user.id;
            // Only send updatable fields
            const payload = {
                username: formData.username,
                mobile_number: formData.mobile_number,
                // user_email usually not editable or requires verification, but included if backend allows
            };

            const response = await authApi.updateUser(userId, payload);
            const updatedUser = response.data.user || response.data;

            setUserData(updatedUser);
            login(updatedUser); // Update store
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Update failed", error);
            toast.error(error.response?.data?.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate(PATHS.LOGIN);
        toast.success("Logged out successfully");
    };

    if (loading && !userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
                <Loader2 className="animate-spin text-[#0F3D2E]" size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-12 px-4 md:px-8 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-heading font-serif text-[#0F3D2E] mb-2">My Profile</h1>
                        <p className="text-[#0F3D2E]/50">Manage your personal information and account settings.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-600 rounded-full font-bold hover:bg-red-100 transition-colors text-sm"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Stats/Menu */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* User Card */}
                        <div className="bg-white rounded-4xl p-8 shadow-xl shadow-[#0F3D2E]/5 border border-[#0F3D2E]/5 flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-[#0F3D2E] text-white flex items-center justify-center text-3xl font-serif mb-4">
                                {userData?.username?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <h2 className="text-xl font-bold text-[#0F3D2E]">{userData?.username || 'User'}</h2>
                            <p className="text-[#0F3D2E]/50 text-sm mb-6">{userData?.user_email}</p>

                            <div className="w-full grid grid-cols-2 gap-4">
                                <div className="bg-[#F8F9FA] rounded-2xl p-4 flex flex-col items-center gap-2">
                                    <Package size={20} className="text-[#C6A15B]" />
                                    <span className="text-xs font-bold text-[#0F3D2E]/60 uppercase tracking-wider">Orders</span>
                                    <span className="text-xl font-serif text-[#0F3D2E]">{userData?.orders?.length || 0}</span>
                                </div>
                                <div className="bg-[#F8F9FA] rounded-2xl p-4 flex flex-col items-center gap-2">
                                    <Heart size={20} className="text-[#C6A15B]" />
                                    <span className="text-xs font-bold text-[#0F3D2E]/60 uppercase tracking-wider">Wishlist</span>
                                    <span className="text-xl font-serif text-[#0F3D2E]">{userData?.wishlist?.length || 0}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-4xl p-6 shadow-xl shadow-[#0F3D2E]/5 border border-[#0F3D2E]/5 space-y-2">
                            <Link to={PATHS.ORDERS} className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-[#F8F9FA] transition-colors text-[#0F3D2E] font-medium">
                                <Package size={18} />
                                My Orders
                            </Link>
                            <Link to={PATHS.WISHLIST} className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-[#F8F9FA] transition-colors text-[#0F3D2E] font-medium">
                                <Heart size={18} />
                                My Wishlist
                            </Link>
                            <Link to="/profile/addresses" className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-[#F8F9FA] transition-colors text-[#0F3D2E] font-medium">
                                <MapPin size={18} />
                                Manage Addresses
                            </Link>
                        </div>

                    </div>

                    {/* Right Column: Personal Info Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-4xl p-8 md:p-12 shadow-xl shadow-[#0F3D2E]/5 border border-[#0F3D2E]/5 min-h-[500px]"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-serif text-[#0F3D2E]">Personal Information</h3>
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                              ${isEditing ? 'bg-red-50 text-red-600' : 'bg-[#0F3D2E]/5 text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white'}
                            `}
                                >
                                    {isEditing ? <><X size={14} /> Cancel</> : <><Edit2 size={14} /> Edit</>}
                                </button>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="space-y-6">
                                {/* Name */}
                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#0F3D2E]/40 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F3D2E]/30" size={18} />
                                        <input
                                            type="text"
                                            disabled={!isEditing}
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            className={`w-full h-12 pl-12 pr-4 rounded-xl border transition-all outline-none font-medium
                                        ${isEditing
                                                    ? 'bg-white border-[#0F3D2E]/20 focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]'
                                                    : 'bg-[#F8F9FA] border-transparent text-[#0F3D2E]/70 cursor-default'}
                                     `}
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#0F3D2E]/40 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F3D2E]/30" size={18} />
                                        <input
                                            type="email"
                                            disabled={true} // Usually email is generic identifier, restrict edit for now or need specialized flow
                                            value={formData.user_email}
                                            className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F8F9FA] border border-transparent text-[#0F3D2E]/50 cursor-not-allowed font-medium"
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold text-[#0F3D2E]/30">Read Only</span>
                                    </div>
                                </div>

                                {/* Mobile */}
                                <div className="group">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-[#0F3D2E]/40 mb-2">Mobile Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F3D2E]/30" size={18} />
                                        <input
                                            type="tel"
                                            disabled={!isEditing}
                                            value={formData.mobile_number}
                                            onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                                            className={`w-full h-12 pl-12 pr-4 rounded-xl border transition-all outline-none font-medium
                                        ${isEditing
                                                    ? 'bg-white border-[#0F3D2E]/20 focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B]'
                                                    : 'bg-[#F8F9FA] border-transparent text-[#0F3D2E]/70 cursor-default'}
                                     `}
                                        />
                                    </div>
                                </div>

                                {/* Save Button */}
                                {isEditing && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="pt-4"
                                    >
                                        <button
                                            type="submit"
                                            className="w-full h-14 bg-[#0F3D2E] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a4f3b] shadow-lg shadow-[#0F3D2E]/20 transition-all hover:scale-[1.01] active:scale-[0.99]"
                                        >
                                            <Save size={20} />
                                            <span>Save Changes</span>
                                        </button>
                                    </motion.div>
                                )}

                            </form>
                        </motion.div>
                    </div>
                </div>

            </div>
        </div>
    );
}
