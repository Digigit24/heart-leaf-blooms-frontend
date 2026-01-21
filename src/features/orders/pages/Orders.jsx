import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Truck, ChevronRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ordersApi } from '@/features/orders/api/orders.api';
import { useAuthStore } from '@/app/store/auth.store';

export default function Orders() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FORCE USE MOCK DATA until API is fully reliable
    // FORCE USE MOCK DATA until API is fully reliable
    const MOCK_ORDERS = [
      {
        id: 'HLB-8293-XP',
        createdAt: new Date().toISOString(),
        totalAmount: 4599,
        status: 'Processing',
        items: [
          {
            name: 'Anthurium Red Plant',
            image: 'https://main-bucket-digitech.s3.ap-south-1.amazonaws.com/products/ec5a8eb0-bd8a-4498-84f1-733c3585aaa6/medium.webp',
            price: 4599,
            quantity: 1
          },
        ]
      },
      {
        id: 'HLB-9921-AB',
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        totalAmount: 1198,
        status: 'Delivered',
        items: [
          {
            name: 'African Milk Tree',
            image: 'https://main-bucket-digitech.s3.ap-south-1.amazonaws.com/products/bc8d679b-2cad-44ab-a13b-8d9ca2f2f7db/medium.webp',
            price: 599,
            quantity: 1
          },
          {
            name: 'Tellus Molestie',
            image: 'https://main-bucket-digitech.s3.ap-south-1.amazonaws.com/products/b270dcce-4c4e-4ed8-ad39-5e00d9d4a04d/medium.webp',
            price: 599,
            quantity: 1
          }
        ]
      }
    ];

    setTimeout(() => {
      setOrders(MOCK_ORDERS);
      setLoading(false);
    }, 800);

    /*
    if (user?.id) {
      ordersApi.getUserOrders(user.id)
        .then(res => {
          // Ensure array
          setOrders(Array.isArray(res.data) ? res.data : []);
        })
        .catch(err => console.error("Failed to fetch orders", err))
        .finally(() => setLoading(false));
    }
    */
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] pt-28 flex items-center justify-center">
        <Loader className="animate-spin text-[#0F3D2E]" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-12 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-heading font-serif text-[#0F3D2E] mb-2">My Orders</h1>
            <p className="text-[#0F3D2E]/50 text-sm">Track and manage your recent purchases.</p>
          </div>

          <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-1 md:w-64">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0F3D2E]/30" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full bg-white border border-[#0F3D2E]/10 rounded-full pl-10 pr-4 py-3 text-sm text-[#0F3D2E] focus:outline-hidden focus:border-[#0F3D2E] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-4xl border border-[#0F3D2E]/5">
              <p className="text-[#0F3D2E]/50">No orders found.</p>
              <Link to="/products" className="inline-block mt-4 text-[#C6A15B] font-bold hover:underline">Start Shopping</Link>
            </div>
          ) : (
            orders.map((order, index) => {
              const totalItems = order.items?.length || 0;
              // Assuming API response structure, adjust as needed based on actual API
              const displayedItems = order.items?.slice(0, 2) || [];
              const remaining = totalItems - 2;

              return (
                <motion.div
                  key={order.id || order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-4xl p-6 md:p-8 shadow-lg shadow-[#0F3D2E]/5 border border-[#0F3D2E]/5 group transition-all hover:shadow-xl hover:shadow-[#0F3D2E]/10"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-8">

                    {/* Info & Items */}
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between items-start mb-6 gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-lg text-[#0F3D2E]">#{order.id?.slice(-8).toUpperCase() || order._id?.slice(-8).toUpperCase()}</h3>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                                                    ${order.status === 'Processing' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-gray-50 text-gray-500 border-gray-100'
                              }
                                                `}>
                              {order.status || 'Pending'}
                            </span>
                          </div>
                          <p className="text-sm text-[#0F3D2E]/50">Placed on {new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right lg:text-left">
                          <p className="text-xs font-bold uppercase text-[#0F3D2E]/40 mb-1">Total Amount</p>
                          <p className="font-heading font-black text-xl text-[#0F3D2E]">₹{(order.totalAmount || 0).toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        {displayedItems.map((item, i) => (
                          <div key={i} className="relative group/item cursor-help">
                            {item.image ? (
                              <div className="w-16 h-16 rounded-xl border border-[#0F3D2E]/10 bg-[#FDFBF7] p-1 flex items-center justify-center">
                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-xl border border-[#0F3D2E]/10 bg-[#FDFBF7] flex items-center justify-center text-xs font-bold text-[#0F3D2E]/40">
                                {item.name || 'Item'}
                              </div>
                            )}
                          </div>
                        ))}
                        {remaining > 0 && (
                          <div className="w-16 h-16 rounded-xl border border-[#0F3D2E]/10 bg-[#FDFBF7] flex items-center justify-center text-xs font-bold text-[#0F3D2E]/60">
                            +{remaining} more
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3 pt-6 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#0F3D2E]/5 lg:pl-8 lg:w-48">
                      {/* Track Order - pass order details in state to show real data on tracking page even if API might be laggy/cold */}
                      <Link
                        to={`/orders/track/${order.id || order._id}`}
                        state={{ orderDate: order.createdAt, items: order.items, total: order.totalAmount }}
                        className="w-full bg-[#0F3D2E] text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-[#1a4f3b] transition-all flex items-center justify-center gap-2"
                      >
                        <Truck size={16} /> Track Order
                      </Link>
                      <Link to={`/orders/${order.id || order._id}`} className="w-full bg-white border border-[#0F3D2E]/10 text-[#0F3D2E] px-5 py-3 rounded-xl font-bold text-sm hover:border-[#0F3D2E] transition-all flex items-center justify-center gap-2">
                        View Details <ChevronRight size={14} />
                      </Link>
                    </div>

                  </div>
                </motion.div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}