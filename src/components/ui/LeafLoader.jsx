import React from 'react';
import { motion } from 'framer-motion';

const LeafLoader = ({ text }) => {
    // Animation Definitions
    const rotationTransition = {
        duration: 4.5,
        ease: "easeInOut",
        repeat: Infinity,
    };

    const shineTransition = {
        duration: 2.8,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
    };

    const shadowPulseTransition = {
        duration: 4.5,
        ease: "easeInOut",
        repeat: Infinity,
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-transparent w-full h-full min-h-[300px]">
            <div className="relative flex flex-col items-center">
                {/* Rotating Leaf Container */}
                <motion.div
                    className="relative w-32 h-32 md:w-40 md:h-40 z-10"
                    animate={{ rotateY: 360 }}
                    transition={rotationTransition}
                    role="img"
                    aria-label="loader"
                    // Added rotate-180 to fix "upside down" issue requested by user
                    // Added perspective and preserve-3d for better 3D rendering
                    style={{ transformStyle: "preserve-3d", perspective: "800px" }}
                >
                    <svg
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-full h-full overflow-visible rotate-180"
                        style={{
                            filter: "drop-shadow(4px 10px 12px rgba(0,0,0,0.3))"
                        }}
                    >
                        <defs>
                            {/* Complex 3D Inner Shadow / Bevel Filter */}
                            <filter id="innerBevel" x="-50%" y="-50%" width="200%" height="200%">
                                {/* 1. Create a blurred alpha mask of the source */}
                                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />

                                {/* 2. Offset it to create the "light" side */}
                                <feOffset in="blur" dx="-2" dy="-2" result="offsetBlur" />

                                {/* 3. Create an inner shadow/highlight composite */}
                                <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75" specularExponent="20" lightingColor="#white" result="specOut">
                                    <fePointLight x="-5000" y="-10000" z="20000" />
                                </feSpecularLighting>
                                <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
                                <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />

                                {/* 4. Add Inner Shadow for depth */}
                                <feFlood floodColor="black" floodOpacity="0.4" result="shadowColor" />
                                <feComposite in="shadowColor" in2="SourceAlpha" operator="in" result="shadow" />
                                <feOffset in="shadow" dx="1" dy="1" result="movedShadow" />
                                <feGaussianBlur in="movedShadow" stdDeviation="1.5" result="blurShadow" />
                                <feComposite in="blurShadow" in2="SourceAlpha" operator="in" result="innerShadow" />
                                <feComposite in="SourceGraphic" in2="innerShadow" operator="over" />
                            </filter>

                            {/* High Contrast 3D Gradient - Left */}
                            <linearGradient id="leafGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#A4EA6F" />
                                <stop offset="50%" stopColor="#6BC441" />
                                <stop offset="100%" stopColor="#2F7A1E" />
                            </linearGradient>

                            {/* High Contrast 3D Gradient - Right */}
                            <linearGradient id="leafGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#C8F89A" />
                                <stop offset="100%" stopColor="#3E8E24" />
                            </linearGradient>

                            <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="white" stopOpacity="0" />
                                <stop offset="45%" stopColor="white" stopOpacity="0.0" />
                                <stop offset="50%" stopColor="white" stopOpacity="0.8" />
                                <stop offset="55%" stopColor="white" stopOpacity="0.0" />
                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                            </linearGradient>

                            <mask id="leafMask">
                                <path d="M 46 8 C 8 8, -5 55, 46 92 C 38 65, 42 35, 46 8 Z" fill="white" />
                                <path d="M 52 14 C 75 14, 85 50, 52 86 C 47 62, 49 38, 52 14 Z" fill="white" />
                            </mask>
                        </defs>

                        <g filter="url(#innerBevel)">
                            {/* Left Leaf Segment */}
                            <path
                                d="M 46 8 C 8 8, -5 55, 46 92 C 38 65, 42 35, 46 8 Z"
                                fill="url(#leafGradientLeft)"
                            />

                            {/* Right Leaf Segment */}
                            <path
                                d="M 52 14 C 75 14, 85 50, 52 86 C 47 62, 49 38, 52 14 Z"
                                fill="url(#leafGradientRight)"
                            />
                        </g>

                        {/* Shine Animation Layer */}
                        <motion.rect
                            x="-100%"
                            y="-100%"
                            width="300%"
                            height="300%"
                            fill="url(#shineGradient)"
                            mask="url(#leafMask)"
                            animate={{
                                x: ["100%", "-100%"],
                                y: ["100%", "-100%"],
                            }}
                            transition={shineTransition}
                            style={{ rotate: 45, transformOrigin: "center" }}
                        />
                    </svg>
                </motion.div>

                {/* Soft Shadow below */}
                <motion.div
                    className="absolute top-full mt-4 w-16 h-2 rounded-full bg-black/20"
                    style={{
                        filter: "blur(6px)",
                        zIndex: 0
                    }}
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scaleX: [1, 0.2, 1],
                    }}
                    transition={shadowPulseTransition}
                />

                {/* Brand Text Reveal */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="mt-16 overflow-hidden" // Increased top margin for elegance
                >
                    <motion.h1
                        className="flex overflow-hidden"
                        style={{
                            color: "#3A8022", // Slightly deeper, more premium green
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "2rem", // Significantly larger size
                            fontWeight: 300,  // lighter weight for luxury feel
                            letterSpacing: "0.2em", // Wider spacing
                            margin: 0,
                            textShadow: "0px 2px 4px rgba(0,0,0,0.1)" // Subtle text shadow
                        }}
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { staggerChildren: 0.1, delayChildren: 0.5 }
                            }
                        }}
                    >
                        {/* Split text for stagger effect */}
                        {(text || "Heartleaf Blooms").split("").map((char, index) => (
                            <motion.span
                                key={index}
                                variants={{
                                    hidden: { y: 40, opacity: 0, filter: "blur(10px)" }, // Add blur to entrance
                                    visible: {
                                        y: 0,
                                        opacity: 1,
                                        filter: "blur(0px)",
                                        transition: {
                                            type: "spring",
                                            damping: 12,
                                            stiffness: 100,
                                            duration: 0.8
                                        }
                                    }
                                }}
                                style={{ display: "inline-block", whiteSpace: "pre" }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h1>
                </motion.div>
            </div>
        </div>
    );
};

export default LeafLoader;
