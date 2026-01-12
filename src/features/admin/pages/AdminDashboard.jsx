import { Link } from 'react-router-dom';
import { Package, Users, ShoppingBag, TrendingUp, DollarSign, Store, ArrowRight, Activity, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { label: 'Total Sales', value: '₹1,24,500', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: '+12.5%' },
  { label: 'Active Orders', value: '24', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+4.2%' },
  { label: 'Total Products', value: '145', icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', trend: '+0.8%' },
  { label: 'Total Vendors', value: '18', icon: Store, color: 'text-purple-600', bg: 'bg-purple-50', trend: '+2' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Creative Welcome Banner (Light Version) */}
      <div className="relative overflow-hidden rounded-3xl bg-white text-text p-8 sm:p-12 shadow-sm border border-border">
        {/* Background Blobs (subtle) */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-medium mb-4 text-text/70">
              <Calendar size={14} />
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-2 text-primary">Welcome back, Admin</h1>
            <p className="text-text/70 max-w-lg text-lg">Here's what's happening in your store today. You have <span className="font-bold text-primary">12 new orders</span> pending processing.</p>
          </div>
          <Link to="/admin/orders" className="group flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-2 transition-all shadow-lg shadow-primary/20 active:scale-95">
            View Orders
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={stat.label}
              className="group bg-white p-6 rounded-2xl shadow-sm border border-border/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3.5 rounded-xl ${stat.bg} ${stat.color} transition-colors group-hover:scale-110 duration-300`}>
                  <Icon size={24} />
                </div>
                <span className="flex items-center text-xs font-bold px-2 py-1 rounded-lg bg-green-50 text-green-700 border border-green-100">
                  <TrendingUp size={12} className="mr-1" />
                  {stat.trend}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-text tracking-tight">{stat.value}</h3>
                <p className="text-sm font-medium text-text/50">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-border/40 overflow-hidden">
          <div className="p-6 border-b border-border/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/5 text-primary rounded-lg">
                <Activity size={20} />
              </div>
              <h2 className="text-lg font-bold text-text">Recent Activity</h2>
            </div>
            <button className="text-sm font-bold text-primary hover:text-primary-2">View All</button>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start gap-4 pb-6 last:pb-0 border-b border-border/20 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center shrink-0 text-text/60">
                    <ShoppingBag size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-text">New Order #1234{i}</p>
                      <span className="text-xs text-text/40">2 mins ago</span>
                    </div>
                    <p className="text-sm text-text/60 mt-1">Order placed by <span className="text-primary font-medium">John Doe</span> for <span className="text-text font-medium">₹2,499</span>.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-border/40 flex flex-col h-full">
          <h2 className="text-lg font-bold text-text mb-6">Quick Actions</h2>
          <div className="flex-1 space-y-3">
            <Link to="/admin/products" className="group flex items-center justify-between w-full p-4 rounded-2xl bg-surface-2/50 border border-border/50 hover:bg-primary hover:border-primary transition-all duration-300">
              <span className="font-medium text-text group-hover:text-white transition-colors">Add Product</span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                <Package size={16} />
              </div>
            </Link>
            <Link to="/admin/vendors" className="group flex items-center justify-between w-full p-4 rounded-2xl bg-surface-2/50 border border-border/50 hover:bg-primary hover:border-primary transition-all duration-300">
              <span className="font-medium text-text group-hover:text-white transition-colors">Verify Vendor</span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                <Users size={16} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}