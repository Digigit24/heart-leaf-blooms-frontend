import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, Send, MessageSquare, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

// --- Animations ---
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

const floatingAnimation = {
    animate: {
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    }
};

// --- Custom Components ---

const InputField = ({ label, type = "text", id, placeholder, required = false }) => (
    <div className="space-y-1.5 group">
        <label htmlFor={id} className="text-xs font-bold text-primary/70 ml-1 uppercase tracking-wider group-focus-within:text-brand transition-colors">
            {label} {required && <span className="text-brand">*</span>}
        </label>
        <motion.div whileFocusWithin={{ scale: 1.01 }} className="relative">
            <input
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                required={required}
                className="w-full px-5 py-3.5 bg-white/70 backdrop-blur-md rounded-2xl border-none focus:ring-2 focus:ring-brand/20 outline-none transition-all placeholder:text-muted/40 shadow-xs font-medium"
            />
        </motion.div>
    </div>
);

const TextAreaField = ({ label, id, placeholder, rows = 5, required = false }) => (
    <div className="space-y-1.5 group">
        <label htmlFor={id} className="text-xs font-bold text-primary/70 ml-1 uppercase tracking-wider group-focus-within:text-brand transition-colors">
            {label} {required && <span className="text-brand">*</span>}
        </label>
        <motion.div whileFocusWithin={{ scale: 1.01 }} className="relative">
            <textarea
                id={id}
                name={id}
                rows={rows}
                placeholder={placeholder}
                required={required}
                className="w-full px-5 py-3.5 bg-white/70 backdrop-blur-md rounded-2xl border-none focus:ring-2 focus:ring-brand/20 outline-none transition-all placeholder:text-muted/40 shadow-xs font-medium resize-none"
            ></textarea>
        </motion.div>
    </div>
);

const Contact = () => {
    const formRef = useRef(null);
    // containerRef removed as it was unused and potentially causing confusion with useScroll

    // Parallax effect for scroll
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
    const y2 = useTransform(scrollY, [0, 1000], [0, 150]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        console.log('Form Submitted:', data);
        toast.dismiss();
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Creating your request...',
                success: 'Sent! We will be in touch soon.',
                error: 'Could not send. Please try again.',
            }
        );
        e.target.reset();
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden selection:bg-brand/20 font-sans">

            {/* --- Oil Paint Background Layer --- */}
            <div className="absolute inset-0 z-0 opacity-[0.12] mix-blend-multiply pointer-events-none">
                <img
                    src="/images/contact-bg.png"
                    alt="Oil Painted Texture"
                    className="w-full h-full object-cover grayscale-10 scale-105"
                />
            </div>

            {/* --- Floating Gradient Orbs (Enhanced Parallax) --- */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-linear-to-b from-brand/10 to-transparent rounded-full blur-[120px] pointer-events-none"
            ></motion.div>
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-linear-to-t from-accent/10 to-transparent rounded-full blur-[100px] pointer-events-none"
            ></motion.div>

            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    variants={floatingAnimation}
                    animate="animate"
                    custom={i}
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 1.5}s`,
                        opacity: 0.4
                    }}
                    className="absolute w-3 h-3 bg-brand/20 rounded-full blur-md pointer-events-none"
                />
            ))}

            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">

                {/* --- Hero Section --- */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center max-w-4xl mx-auto mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full shadow-sm border border-brand/5 mb-6 text-brand-dark font-medium text-xs tracking-widest uppercase"
                    >
                        <Sparkles className="w-3 h-3 text-brand" />
                        <span>Nature's Inbox</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-heading font-black text-primary mb-8 leading-tight drop-shadow-sm">
                        Let's Grow <br className="hidden md:block" />
                        <span className="relative inline-block">
                            <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-[#2F6E1E] to-[#56BA39]">Something Beautiful</span>
                        </span>
                    </h1>

                    <p className="text-text/70 text-lg md:text-xl font-body leading-relaxed max-w-2xl mx-auto font-medium">
                        "Communication is the root of all growth." <br />
                        <span className="text-sm font-normal opacity-80">- The Gardener's Creed</span>
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">

                    {/* --- Left Column: Info & Map (Compact) --- */}
                    <div className="lg:col-span-12 xl:col-span-5">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="bg-white/60 backdrop-blur-xl p-6 rounded-4xl shadow-xl shadow-brand/5 overflow-hidden h-full flex flex-col"
                        >
                            <h3 className="text-xl font-heading font-bold text-primary mb-6 ml-2 flex items-center gap-2 shrink-0">
                                <MapPin className="text-brand w-5 h-5" />
                                Visit Our Greenhouse
                            </h3>

                            <div className="space-y-4 mb-8 shrink-0">
                                <ContactItem
                                    icon={MapPin}
                                    title="Address"
                                    content="123 Botanical Garden St, Pune, MH 411001, India"
                                    href="https://maps.google.com/?q=Pune"
                                />
                                <ContactItem
                                    icon={Phone}
                                    title="Phone"
                                    content="+91 9011600622"
                                    sub="Mon-Fri, 9am - 6pm IST"
                                    href="tel:+919011600622"
                                />
                                <ContactItem
                                    icon={Mail}
                                    title="Email"
                                    content="heartleafbloomsonline@gmail.com"
                                    sub="sales@heartleafblooms.com | enquiry@heartleafblooms.com"
                                    href="mailto:heartleafbloomsonline@gmail.com"
                                />
                            </div>

                            {/* Integrated Map */}
                            <div className="relative w-full rounded-2xl overflow-hidden group flex-1 min-h-[250px]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360432742!2d73.79296687483734!3d18.52456485989721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709825481234!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Google Map"
                                    className="relative z-10 grayscale-20 group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100 h-full"
                                ></iframe>

                                {/* Overlay Label */}
                                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 group-hover:-translate-y-1 transition-transform">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Live</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* --- Right Column: Inquiry Form (Minimalist) --- */}
                    <div className="lg:col-span-12 xl:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                            className="bg-white/60 backdrop-blur-xl p-8 md:p-12 rounded-4xl shadow-xl shadow-brand/5 relative overflow-hidden h-full"
                        >
                            <div className="relative z-10 mb-8">
                                <h3 className="text-3xl font-heading font-black text-primary mb-2">
                                    Send us a Message
                                </h3>
                                <p className="text-text/60 text-sm font-medium">We usually respond within 24 hours.</p>
                            </div>

                            <form ref={formRef} onSubmit={handleSubmit} className="relative z-10 space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <InputField id="firstName" label="First Name" placeholder="Jane" required />
                                    <InputField id="lastName" label="Last Name" placeholder="Doe" required />
                                </div>

                                <InputField id="email" label="Email Address" type="email" placeholder="jane.doe@example.com" required />

                                <div className="space-y-1.5 group">
                                    <label htmlFor="subject" className="text-xs font-bold text-primary/70 ml-1 uppercase tracking-wider group-focus-within:text-brand transition-colors">Subject</label>
                                    <div className="relative">
                                        <select
                                            id="subject"
                                            name="subject"
                                            className="w-full px-5 py-3.5 bg-white/70 backdrop-blur-md rounded-2xl border-none focus:ring-2 focus:ring-brand/20 outline-none transition-all text-primary/80 appearance-none shadow-xs font-medium cursor-pointer"
                                        >
                                            <option value="general">General Inquiry</option>
                                            <option value="order">Order Support</option>
                                            <option value="wholesale">Wholesale & Partnership</option>
                                            <option value="care">Plant Care Advice</option>
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                </div>

                                <TextAreaField id="message" label="Message" placeholder="How can we help?" required />

                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full py-4 px-8 mt-2 bg-primary hover:bg-primary-dark text-primary font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <span>Send Message</span>
                                    <Send className="w-4 h-4" />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Sub-components for Cleaner Code ---

const ContactItem = ({ icon: Icon, title, content, sub, action, href }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variants={fadeInUp}
        className="flex items-start gap-5 p-4 rounded-2xl hover:bg-white/50 transition-colors group cursor-pointer border border-transparent hover:border-white/60"
    >
        <div className="w-12 h-12 bg-white/80 border border-brand/10 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:border-brand/30 group-hover:shadow-md transition-all duration-300 text-brand shrink-0">
            <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
            <h4 className="text-lg font-bold text-primary mb-1">{title}</h4>
            <p className="text-muted text-sm font-medium leading-relaxed">{content}</p>
            {sub && <p className="text-muted/60 text-xs mt-1">{sub}</p>}
            <span className="inline-block mt-3 text-xs font-bold text-brand uppercase tracking-wider border-b border-transparent group-hover:border-brand transition-colors">
                {action}
            </span>
        </div>
    </motion.a>
);

export default Contact;
