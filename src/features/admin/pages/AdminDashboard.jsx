import { Link } from 'react-router-dom';
import { Package, Users, ShoppingBag, TrendingUp, DollarSign, Store, ArrowRight, Activity, Calendar, MoreHorizontal, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { label: 'Total Revenue', value: '₹1,24,500', icon: DollarSign, trend: '+12.5% this week', trendUp: true },
  { label: 'Active Orders', value: '24', icon: ShoppingBag, trend: '+4 new today', trendUp: true },
  { label: 'Products', value: '145', icon: Package, trend: 'Stock healthy', trendUp: true },
  { label: 'Vendors', value: '18', icon: Users, trend: '2 pending approval', trendUp: false },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your store's performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-white rounded-lg border border-gray-200 text-sm font-medium text-gray-600 flex items-center gap-2 shadow-sm">
            <Calendar size={16} />
            {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <Link to="/admin/products" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Package size={16} />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={stat.label}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-gray-200 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                  <Icon size={20} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trendUp ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Main Content Area - Recent Orders Table */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <ShoppingBag size={18} className="text-primary" />
              Recent Orders
            </h2>
            <Link to="/admin/orders" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
              View All
            </Link>
          </div>


          {/* Recent Orders Content - Responsive */}
          <div className="flex-1">

            {/* Mobile View: Compact Cards */}
            <div className="md:hidden space-y-3 p-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="bg-gray-50/50 p-4 rounded-xl border border-gray-100 flex flex-col gap-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xs font-bold text-gray-600 border border-gray-200">
                        JD
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">#ORD-2024-{1000 + i}</p>
                        <p className="text-xs text-gray-500">John Doe</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${i === 0 ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                      i === 1 ? 'bg-green-50 text-green-700 border-green-100' :
                        'bg-white text-gray-600 border-gray-200'
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      {i === 0 ? 'Pending' : i === 1 ? 'Completed' : 'Processing'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm border-t border-gray-200/60 pt-3">
                    <span className="font-bold text-gray-900">₹{2450 * (i + 1)}</span>
                    <span className="text-xs text-gray-400">Oct {20 - i}, 2024</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 text-gray-500 font-medium uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-gray-600">#ORD-2024-{1000 + i}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                            JD
                          </div>
                          <span className="font-medium text-gray-900">John Doe</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">₹{2450 * (i + 1)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${i === 0 ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                          i === 1 ? 'bg-green-50 text-green-700 border-green-100' :
                            'bg-gray-50 text-gray-600 border-gray-100'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                          {i === 0 ? 'Pending' : i === 1 ? 'Completed' : 'Processing'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-500">Oct {20 - i}, 2024</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Management</h3>
            <div className="space-y-2">
              <Link to="/admin/products" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-md group-hover:bg-blue-100 transition-colors">
                    <Package size={18} />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">Manage Inventory</span>
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-600" />
              </Link>
              <Link to="/admin/vendors" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-md group-hover:bg-purple-100 transition-colors">
                    <Users size={18} />
                  </div>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">Verify Vendors</span>
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-600" />
              </Link>
            </div>
          </div>

          {/* Platform Health / Activity */}
          <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Activity size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-1">System Status</h3>
              <p className="text-indigo-200 text-sm mb-6">All systems operational</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm border-b border-indigo-800 pb-2">
                  <span className="text-indigo-200">Server Response</span>
                  <span className="font-mono text-green-400">45ms</span>
                </div>
                <div className="flex items-center justify-between text-sm border-b border-indigo-800 pb-2">
                  <span className="text-indigo-200">Last Backup</span>
                  <span>2 hours ago</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-indigo-200">Disk Usage</span>
                  <div className="w-24 h-1.5 bg-indigo-950 rounded-full overflow-hidden">
                    <div className="w-[30%] h-full bg-green-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}