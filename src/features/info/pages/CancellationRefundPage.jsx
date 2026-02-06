import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Clock, XCircle, CreditCard, CheckCircle } from 'lucide-react';

const CancellationRefundPage = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7] font-sans selection:bg-[#0F3D2E]/20">
            {/* Header Section */}
            <div className="bg-[#0F3D2E] text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#C6A15B]/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E6F4EA]/10 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 tracking-tight">Cancellation & Refunds</h1>
                        <p className="text-white/70 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            We value your trust. Our policies are designed to be fair, transparent, and easy to understand.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-8"
                >
                    {/* Cancellation Policy */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#0F3D2E]/5 shadow-sm">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#0F3D2E] shrink-0">
                                <XCircle size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-[#0F3D2E] mb-2">Cancellation Policy</h2>
                                <p className="text-[#0F3D2E]/60 text-sm uppercase tracking-wider font-bold">When can you cancel?</p>
                            </div>
                        </div>

                        <ul className="space-y-4 text-[#0F3D2E]/80 leading-relaxed font-light">
                            <li className="flex gap-3">
                                <CheckCircle className="text-[#C6A15B] shrink-0 mt-1" size={18} />
                                <span><strong>Before Shipment:</strong> You may cancel your order at any time before it has been dispatched from our nursery. A full refund will be initiated immediately.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle className="text-[#C6A15B] shrink-0 mt-1" size={18} />
                                <span><strong>After Shipment:</strong> Once the order has been handed over to our delivery partners, we cannot process a direct cancellation. You may choose to refuse delivery, and a refund will be processed upon the item's return (minus shipping charges).</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle className="text-[#C6A15B] shrink-0 mt-1" size={18} />
                                <span><strong>Custom Orders:</strong> For customized corporate or bulk orders, cancellations are only accepted within 24 hours of order placement.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Refund Policy */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#0F3D2E]/5 shadow-sm">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-[#FDF0D5] flex items-center justify-center text-[#d97706] shrink-0">
                                <RefreshCw size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-heading font-bold text-[#0F3D2E] mb-2">Refund Policy</h2>
                                <p className="text-[#0F3D2E]/60 text-sm uppercase tracking-wider font-bold">How do we process refunds?</p>
                            </div>
                        </div>

                        <div className="space-y-6 text-[#0F3D2E]/80 leading-relaxed font-light">
                            <p>
                                We stand by our <strong>"Happy Plant Guarantee"</strong>. If your plant arrives damaged or in poor condition, we are here to make it right.
                            </p>

                            <div>
                                <h3 className="font-bold text-[#0F3D2E] mb-2 text-lg">Damaged or Defective Items</h3>
                                <p>
                                    Please verify the condition of your plants immediately upon delivery. If you notice any damage:
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Take clear photos of the damaged plant/pot and the packaging.</li>
                                    <li>Email us at <a href="mailto:heartleafbloomsonline@gmail.com" className="text-[#0F3D2E] underline font-medium">heartleafbloomsonline@gmail.com</a> within <strong>48 hours</strong> of delivery.</li>
                                </ul>
                                <p className="mt-2">
                                    We will assess the issue and offer either a <strong>free replacement</strong> or a <strong>full refund</strong> to your original payment method.
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold text-[#0F3D2E] mb-2 text-lg">Refund Timeline</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-[#F9F8F6] p-4 rounded-xl flex items-center gap-3">
                                        <CreditCard className="text-[#0F3D2E]/50" />
                                        <div>
                                            <p className="font-bold text-[#0F3D2E]">Online Payments</p>
                                            <p className="text-sm">5-7 Business Days</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#F9F8F6] p-4 rounded-xl flex items-center gap-3">
                                        <Clock className="text-[#0F3D2E]/50" />
                                        <div>
                                            <p className="font-bold text-[#0F3D2E]">Wallet/UPI</p>
                                            <p className="text-sm">24-48 Hours</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact for Issues */}
                    <div className="bg-[#0F3D2E] text-white p-8 md:p-10 rounded-[2rem] text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-heading font-bold mb-4">Need Help with an Order?</h3>
                            <p className="text-white/80 mb-8 max-w-lg mx-auto font-light">
                                Our support team is ready to assist you regarding any issues with your shipment or payment.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="mailto:sales@heartleafblooms.com" className="bg-white text-[#0F3D2E] px-8 py-3 rounded-full font-bold hover:bg-[#FDF0D5] transition-colors">
                                    Email Sales
                                </a>
                                <a href="tel:+919011600622" className="bg-transparent border border-white/30 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                                    Call Us
                                </a>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default CancellationRefundPage;
