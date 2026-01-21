import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, ChevronLeft, MapPin, Briefcase, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddressForm() {
    const navigate = useNavigate();
    const [type, setType] = useState('Home');
    const [formData, setFormData] = useState({
        name: 'Jane Doe',
        phone: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        zip: '',
        default: false
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save address
        navigate('/profile/addresses');
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] pt-28 pb-12 px-4 md:px-8 font-sans">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/profile/addresses" className="w-10 h-10 rounded-full border border-[#0F3D2E]/10 flex items-center justify-center text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white transition-colors">
                        <ChevronLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-heading font-serif text-[#0F3D2E]">Add New Address</h1>
                        <p className="text-[#0F3D2E]/50 text-sm">Fill in the details for your delivery location.</p>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-[#0F3D2E]/5 border border-[#0F3D2E]/5"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Type Selection */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#0F3D2E]/40 mb-4">Address Type</label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setType('Home')}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${type === 'Home' ? 'bg-[#0F3D2E] text-white border-[#0F3D2E]' : 'bg-transparent border-[#0F3D2E]/10 text-[#0F3D2E]/60 hover:border-[#0F3D2E]/30'}`}
                                >
                                    <Home size={18} />
                                    <span className="font-bold text-sm">Home</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setType('Work')}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all ${type === 'Work' ? 'bg-[#0F3D2E] text-white border-[#0F3D2E]' : 'bg-transparent border-[#0F3D2E]/10 text-[#0F3D2E]/60 hover:border-[#0F3D2E]/30'}`}
                                >
                                    <Briefcase size={18} />
                                    <span className="font-bold text-sm">Work</span>
                                </button>
                            </div>
                        </div>

                        {/* Personal Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#0F3D2E]">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-[#FDFBF7] border border-[#0F3D2E]/10 rounded-xl px-4 py-3 text-[#0F3D2E] focus:outline-hidden focus:border-[#C6A15B] transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#0F3D2E]">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-[#FDFBF7] border border-[#0F3D2E]/10 rounded-xl px-4 py-3 text-[#0F3D2E] focus:outline-hidden focus:border-[#C6A15B] transition-colors"
                                    placeholder="+91 0000 000000"
                                />
                            </div>
                        </div>

                        {/* Address Lines */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#0F3D2E]">Address Line 1</label>
                            <input
                                type="text"
                                name="line1"
                                value={formData.line1}
                                onChange={handleChange}
                                className="w-full bg-[#FDFBF7] border border-[#0F3D2E]/10 rounded-xl px-4 py-3 text-[#0F3D2E] focus:outline-hidden focus:border-[#C6A15B] transition-colors"
                                placeholder="House No., Building Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#0F3D2E]">Address Line 2 (Optional)</label>
                            <input
                                type="text"
                                name="line2"
                                value={formData.line2}
                                onChange={handleChange}
                                className="w-full bg-[#FDFBF7] border border-[#0F3D2E]/10 rounded-xl px-4 py-3 text-[#0F3D2E] focus:outline-hidden focus:border-[#C6A15B] transition-colors"
                                placeholder="Area, Landmark"
                            />
                        </div>

                        {/* City/State/Zip */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#0F3D2E]">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full bg-[#FDFBF7] border border-[#0F3D2E]/10 rounded-xl px-4 py-3 text-[#0F3D2E] focus:outline-hidden focus:border-[#C6A15B] transition-colors"
                                    placeholder="Pune"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#0F3D2E]">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full bg-[#FDFBF7] border border-[#0F3D2E]/10 rounded-xl px-4 py-3 text-[#0F3D2E] focus:outline-hidden focus:border-[#C6A15B] transition-colors"
                                    placeholder="Maharashtra"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#0F3D2E]">Zip Code</label>
                                <input
                                    type="text"
                                    name="zip"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    className="w-full bg-[#FDFBF7] border border-[#0F3D2E]/10 rounded-xl px-4 py-3 text-[#0F3D2E] focus:outline-hidden focus:border-[#C6A15B] transition-colors"
                                    placeholder="411001"
                                />
                            </div>
                        </div>

                        {/* Default Toggle */}
                        <div className="flex items-center gap-3 pt-4">
                            <input
                                type="checkbox"
                                id="default"
                                name="default"
                                checked={formData.default}
                                onChange={handleChange}
                                className="w-5 h-5 accent-[#0F3D2E] rounded cursor-pointer"
                            />
                            <label htmlFor="default" className="text-[#0F3D2E] font-medium cursor-pointer select-none">Make this my default address</label>
                        </div>

                        <div className="pt-6">
                            <button type="submit" className="w-full bg-[#0F3D2E] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#0F3D2E]/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                                <Save size={20} />
                                <span>Save Address</span>
                            </button>
                        </div>

                    </form>
                </motion.div>

            </div>
        </div>
    );
}
