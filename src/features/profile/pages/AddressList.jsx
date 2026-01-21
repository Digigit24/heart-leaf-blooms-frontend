import React from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Edit2, Trash2, Home, Briefcase, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_ADDRESSES = [
    {
        id: 1,
        type: 'Home',
        default: true,
        name: 'Jane Doe',
        phone: '+91 98765 43210',
        line1: '123 Green Avenue, Ivy Tower',
        line2: 'Floor 4, Apt 402',
        city: 'Pune',
        state: 'Maharashtra',
        zip: '411001',
        country: 'India'
    },
    {
        id: 2,
        type: 'Work',
        default: false,
        name: 'Jane Doe',
        phone: '+91 98765 09876',
        line1: 'Tech Park, Building B',
        line2: 'Office 204, Hinjewadi Phase 1',
        city: 'Pune',
        state: 'Maharashtra',
        zip: '411057',
        country: 'India'
    }
];

export default function AddressList() {
    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-12 px-4 md:px-8 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-heading font-serif text-[#0F3D2E] mb-2">My Addresses</h1>
                        <p className="text-[#0F3D2E]/50 text-sm">Manage your saved addresses for faster checkout.</p>
                    </div>
                    <Link to="/profile/addresses/new" className="flex items-center gap-2 px-6 py-3 bg-[#0F3D2E] text-white rounded-full font-bold shadow-lg hover:bg-[#1a4f3b] transition-all hover:scale-105 active:scale-95">
                        <Plus size={20} />
                        <span>Add New Address</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_ADDRESSES.map((address, index) => (
                        <motion.div
                            key={address.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative bg-white rounded-[2rem] p-8 border transition-all duration-300 hover:shadow-xl hover:shadow-[#0F3D2E]/10
                    ${address.default ? 'border-[#0F3D2E] ring-1 ring-[#0F3D2E]/10' : 'border-[#0F3D2E]/10'}
                 `}
                        >
                            {/* Default Badge */}
                            {address.default && (
                                <div className="absolute top-8 right-8 flex items-center gap-1 text-[#0F3D2E] bg-[#E6F4EA] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                    <CheckCircle2 size={12} />
                                    <span>Default</span>
                                </div>
                            )}

                            {/* Type Icon */}
                            <div className="w-12 h-12 rounded-2xl bg-[#FDFBF7] flex items-center justify-center text-[#0F3D2E] mb-6 group-hover:bg-[#0F3D2E] group-hover:text-white transition-colors duration-300">
                                {address.type === 'Home' ? <Home size={20} /> : <Briefcase size={20} />}
                            </div>

                            {/* Content */}
                            <div className="space-y-4 mb-8">
                                <div>
                                    <h3 className="text-lg font-bold text-[#0F3D2E]">{address.name} <span className="text-sm font-normal text-[#0F3D2E]/50">- {address.type}</span></h3>
                                    <p className="text-sm font-medium text-[#0F3D2E]/70">{address.phone}</p>
                                </div>
                                <address className="not-italic text-[#0F3D2E]/60 text-sm leading-relaxed">
                                    {address.line1}<br />
                                    {address.line2}<br />
                                    {address.city}, {address.state} - {address.zip}
                                </address>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 pt-6 border-t border-[#0F3D2E]/5">
                                <Link to={`/profile/addresses/edit/${address.id}`} className="flex items-center gap-2 text-sm font-bold text-[#0F3D2E] hover:text-[#C6A15B] transition-colors">
                                    <Edit2 size={16} /> Edit
                                </Link>
                                <button className="flex items-center gap-2 text-sm font-bold text-red-400 hover:text-red-600 transition-colors">
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>

                        </motion.div>
                    ))}

                    {/* Add New Card Slot (Visual Encouragement) */}
                    <Link to="/profile/addresses/new" className="rounded-[2rem] border-2 border-dashed border-[#0F3D2E]/10 flex flex-col items-center justify-center p-8 text-center text-[#0F3D2E]/30 hover:border-[#0F3D2E]/30 hover:bg-white/50 hover:text-[#0F3D2E]/60 transition-all cursor-pointer min-h-[300px]">
                        <div className="w-16 h-16 rounded-full bg-[#0F3D2E]/5 flex items-center justify-center mb-4">
                            <Plus size={32} />
                        </div>
                        <span className="font-bold text-lg">Add Another Address</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
