import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const Contact = () => {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        console.log('Form Submitted:', data);
        toast.dismiss(); // Dismiss any loading toast
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Sending your message...',
                success: 'Message sent successfully! We will get back to you soon.',
                error: 'Something went wrong. Please try again.',
            }
        );
        e.target.reset();
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-sm font-bold tracking-[0.2em] text-brand uppercase mb-3 block">Get in Touch</span>
                    <h1 className="text-5xl md:text-6xl font-heading font-black text-primary mb-6">
                        We'd Love to <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-brand-dark">Hear From You</span>
                    </h1>
                    <p className="text-muted text-lg font-body leading-relaxed">
                        Have a question about a plant, need care advice, or just want to say hello?
                        Fill out the inquiry form below or visit us at our greenhouse.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Contact Info & Map */}
                    <div className="space-y-12">
                        {/* Contact Cards */}
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid sm:grid-cols-2 gap-6"
                        >
                            <ContactCard
                                icon={MapPin}
                                title="Visit Us"
                                content="123 Green Leaf Avenue, Botanical District, New York, NY 10001"
                                delay={0.1}
                            />
                            <ContactCard
                                icon={Phone}
                                title="Call Us"
                                content="+1 (555) 123-4567"
                                subContent="Mon-Fri, 9am - 6pm"
                                delay={0.2}
                            />
                            <ContactCard
                                icon={Mail}
                                title="Email Us"
                                content="hello@heartleafblooms.com"
                                delay={0.3}
                            />
                            <ContactCard
                                icon={Clock}
                                title="Opening Hours"
                                content="Daily: 9:00 AM - 8:00 PM"
                                delay={0.4}
                            />
                        </motion.div>

                        {/* Map Section */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/50"
                        >
                            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869403!2d-74.11976397304603!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1709825481234!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Map"
                                className="relative z-10 grayscale-20 hover:grayscale-0 transition-all duration-700"
                            ></iframe>
                        </motion.div>
                    </div>

                    {/* Right Column: Inquiry Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-border/40 relative overflow-hidden"
                    >
                        {/* Decor */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-brand to-brand-light"></div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-heading font-bold text-primary mb-2 flex items-center gap-2">
                                <MessageSquare className="text-brand w-6 h-6" />
                                Send an Inquiry
                            </h3>
                            <p className="text-muted text-sm">Fill out the form below and our team will get back to you within 24 hours.</p>
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-semibold text-primary ml-1">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="John"
                                        required
                                        className="w-full px-5 py-4 bg-background-page rounded-xl border-border/60 border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-muted/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-semibold text-primary ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Doe"
                                        required
                                        className="w-full px-5 py-4 bg-background-page rounded-xl border-border/60 border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-muted/50"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-primary ml-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="john.doe@example.com"
                                    required
                                    className="w-full px-5 py-4 bg-background-page rounded-xl border-border/60 border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-muted/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-semibold text-primary ml-1">Subject</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full px-5 py-4 bg-background-page rounded-xl border-border/60 border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all text-primary/80"
                                >
                                    <option value="general">General Inquiry</option>
                                    <option value="order">Order Support</option>
                                    <option value="wholesale">Wholesale & Bulk</option>
                                    <option value="care">Plant Care Advice</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-primary ml-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder="How can we help you?"
                                    required
                                    className="w-full px-5 py-4 bg-background-page rounded-xl border-border/60 border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all placeholder:text-muted/50 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 px-6 bg-brand hover:bg-brand-dark text-white font-bold rounded-xl shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const ContactCard = ({ icon: Icon, title, content, subContent, delay }) => (
    <motion.div
        variants={fadeInUp}
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-all duration-300 group"
    >
        <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand group-hover:text-white transition-colors duration-300 text-brand">
            <Icon className="w-6 h-6" />
        </div>
        <h4 className="text-lg font-bold text-primary mb-2">{title}</h4>
        <p className="text-muted text-sm leading-snug">{content}</p>
        {subContent && <p className="text-muted/80 text-xs mt-1">{subContent}</p>}
    </motion.div>
);

export default Contact;
