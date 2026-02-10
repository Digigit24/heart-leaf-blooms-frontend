import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, User, Mail, Phone, Calendar, MoreHorizontal } from 'lucide-react';
import { adminApi } from '@/features/admin/api/admin.api';

export default function ManageUsers() {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: async () => {
            const res = await adminApi.getAllUsers();
            return res.data.users || res.data || [];
        }
    });

    const filteredUsers = Array.isArray(users) ? users.filter(user =>
        (user.username || user.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.user_email || user.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto p-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <User className="text-primary" size={32} />
                        Manage Users
                    </h1>
                    <p className="text-gray-500 mt-1">View and manage registered users.</p>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-semibold border-b border-gray-200">
                            <tr>
                                <th className="p-4 pl-6">User</th>
                                <th className="p-4">Contact Info</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500">Loading users...</td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-500">No users found.</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user, index) => (
                                    <tr key={user._id || index} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                                                    {(user.username || user.name || 'U').charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{user.username || user.name || 'Unknown User'}</p>
                                                    <p className="text-xs text-gray-400">ID: {(user._id || user.id || '').substring(0, 8)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Mail size={14} className="text-gray-400" />
                                                    {user.user_email || user.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone size={14} className="text-gray-400" />
                                                    {user.mobile_number || user.phone || 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                    user.role === 'vendor' ? 'bg-orange-100 text-orange-800' :
                                                        'bg-blue-100 text-blue-800'}
                                            `}>
                                                {user.role || 'User'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(user.createdAt || user.created_at || Date.now()).toLocaleDateString()}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
