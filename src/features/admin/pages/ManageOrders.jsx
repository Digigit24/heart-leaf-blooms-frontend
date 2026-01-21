import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ShoppingBag, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import { adminApi } from '@/features/admin/api/admin.api';
import { Link } from 'react-router-dom';

export default function ManageOrders() {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: orders = [], isLoading } = useQuery({
        queryKey: ['adminOrders'],
        queryFn: async () => {
            const res = await adminApi.getAllOrders();
            return res.data || [];
        }
    });

    const filteredOrders = orders.filter(o =>
        o.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user_id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-primary">Orders</h1>
                <p className="text-text/60 mt-2">Manage customer orders</p>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text/40" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-white">
                        <thead className="bg-surface-2 text-text/60 text-xs uppercase tracking-wider font-semibold border-b border-border">
                            <tr>
                                <th className="p-4 pl-6">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-text/60">Loading orders...</td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-text/60">No orders found.</td>
                                </tr>
                            ) : (
                                filteredOrders.map((order, key) => (
                                    <tr key={key} className="hover:bg-bg/50 transition-colors">
                                        <td className="p-4 pl-6 font-mono text-xs text-text/70">
                                            {(order.id || order.order_id || 'N/A').toString().substring(0, 8)}...
                                        </td>
                                        <td className="p-4 text-sm font-medium">
                                            Customer {order?.user_id?.substring(0, 4)}

                                        </td>
                                        <td className="p-4 font-medium text-primary">
                                            ₹{order.total_amount || order.sub_total_amount || 0}
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={order.order_status || 'pending'} />
                                        </td>
                                        <td className="p-4 text-sm text-text/60">
                                            {new Date(order.created_at || Date.now()).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right pr-6">
                                            <Link to={`/orders/${order.id}`} className="p-2 text-text/50 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors inline-flex">
                                                <Eye size={16} />
                                            </Link>
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

function StatusBadge({ status }) {
    const styles = {
        pending: "bg-yellow-100 text-yellow-700",
        processing: "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    return (
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] || styles.pending}`}>
            {status}
        </span>
    );
}
