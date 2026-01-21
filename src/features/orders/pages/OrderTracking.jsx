import React from 'react';
import { motion } from 'framer-motion';
import { Check, Truck, Package, MapPin, ArrowRight } from 'lucide-react';
import { useLocation, Link, Navigate } from 'react-router-dom';

export default function OrderTracking() {
    const location = useLocation();
    const { orderDate, items, total } = location.state || {}; // Get data passed from Payment

    // Fallback if accessed directly without an order
    const date = orderDate ? new Date(orderDate) : new Date();

    // Helper to format date
    const formatDate = (d) => {
        return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // Calculate dynamic dates
    const placedDate = formatDate(date);

    const shippedDateObj = new Date(date);
    shippedDateObj.setDate(date.getDate() + 2);
    const shippedDate = formatDate(shippedDateObj);

    const deliveryDateObj = new Date(date);
    deliveryDateObj.setDate(date.getDate() + 4);
    const deliveryDate = formatDate(deliveryDateObj);


    const steps = [
        { id: 1, title: 'Order Placed', date: placedDate, status: 'completed', icon: Package },
        { id: 2, title: 'Shipped', date: shippedDate, status: 'pending', icon: Truck },
        { id: 3, title: 'Out for Delivery', date: deliveryDate, status: 'pending', icon: MapPin },
        { id: 4, title: 'Delivered', date: deliveryDate, status: 'pending', icon: Check },
    ];

    if (!items && !location.state) {
        // Optional: Redirect if no state, but for demo we can show placeholder or just empty
        // return <Navigate to="/" />
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-12 px-4 md:px-8 font-sans">
            <div className="max-w-4xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-heading font-serif text-[#0F3D2E]">Order Info</h1>
                    <p className="text-[#0F3D2E]/60 text-sm mt-1">Order #HLB-8293-XP &bull; {placedDate}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Timeline */}
                    <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-[#0F3D2E]/5">
                        <h2 className="text-lg font-bold text-[#0F3D2E] mb-8">Delivery Status</h2>

                        <div className="relative pl-4">
                            {/* Vertical Line */}
                            <div className="absolute left-[27px] top-4 bottom-10 w-0.5 bg-[#0F3D2E]/10"></div>

                            <div className="space-y-10">
                                {steps.map((step, index) => {
                                    const isCompleted = index === 0; // Just for demo "Placed" is done
                                    const isCurrent = index === 1;   // "Shipped" is next

                                    return (
                                        <div key={step.id} className="relative flex gap-6 items-start group">
                                            <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1
                                                ${isCompleted ? 'bg-[#0F3D2E] text-white' : isCurrent ? 'bg-[#C6A15B] ring-4 ring-[#C6A15B]/20' : 'bg-[#E5E7EB]'}`
                                            }>
                                                {isCompleted ? <Check size={14} /> : <div className="w-2 h-2 rounded-full bg-white"></div>}
                                            </div>

                                            <div className="flex-1">
                                                <h3 className={`text-base font-bold ${isCompleted || isCurrent ? 'text-[#0F3D2E]' : 'text-[#0F3D2E]/40'}`}>
                                                    {step.title}
                                                </h3>
                                                <p className="text-xs text-[#0F3D2E]/60 mt-1 font-medium">{step.date}</p>
                                                {isCurrent && (
                                                    <p className="text-xs text-[#C6A15B] mt-2 font-bold uppercase tracking-wider">Expected by {step.date}</p>
                                                )}
                                            </div>

                                            <div className={`p-2 rounded-full bg-[#FAFAFA] text-[#0F3D2E]/40 group-hover:bg-[#0F3D2E]/5 transition-colors`}>
                                                <step.icon size={20} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="mt-10 pt-8 border-t border-[#0F3D2E]/10">
                            <h3 className="text-sm font-bold text-[#0F3D2E] uppercase tracking-wider mb-2">Shipping To</h3>
                            <p className="text-[#0F3D2E]/70 text-sm leading-relaxed">
                                Jane Doe<br />
                                123 Green Avenue, Apt 402<br />
                                Pune, MH 411001
                            </p>
                        </div>
                    </div>

                    {/* Right: Items */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#0F3D2E]/5">
                            <h2 className="text-lg font-bold text-[#0F3D2E] mb-6">Items Ordered</h2>
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {items && items.length > 0 ? (
                                    items.map(item => (
                                        <div key={item.id} className="flex gap-3 items-center">
                                            <div className="w-12 h-12 bg-[#F2F8F5] rounded-lg p-1 shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-bold text-[#0F3D2E] truncate">{item.name}</h4>
                                                <p className="text-xs text-[#0F3D2E]/50">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-[#0F3D2E]/50">Order details not available.</p>
                                )}
                            </div>

                            {total && (
                                <div className="mt-6 pt-4 border-t border-[#0F3D2E]/10 flex justify-between items-center">
                                    <span className="font-bold text-[#0F3D2E]">Total Paid</span>
                                    <span className="font-heading font-black text-xl text-[#0F3D2E]">₹{total.toLocaleString()}</span>
                                </div>
                            )}
                        </div>

                        <Link to="/" className="block w-full bg-[#0F3D2E] text-white font-bold py-4 rounded-xl text-center shadow-lg hover:bg-[#1a4f3b] transition-all">
                            Continue Shopping
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
