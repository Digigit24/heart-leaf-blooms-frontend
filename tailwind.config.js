export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                // NEW BRAND PALETTE
                brand: {
                    DEFAULT: "#56BA39", // Primary Leaf Green
                    dark: "#2F6E1E",    // Forest Green
                    soft: "#EAF6E6",    // Mint Wash
                    border: "#CFE6C8",  // Subtle Leaf
                },

                background: {
                    page: "#FAFBF9",    // Warm White
                    card: "#FFFFFF",    // Pure White
                    muted: "#EFE9DD",   // Sand/Beige
                },

                text: {
                    DEFAULT: "#1F2933", // Primary Charcoal
                    primary: "#1F2933", /* Alias for clarity */
                    secondary: "#4B5563",
                    muted: "#6B7280",
                    disabled: "#9CA3AF",
                },

                border: {
                    DEFAULT: "#E6E8E3", // Soft Stone
                    light: "#E6E8E3",
                    muted: "#D8DDD2",
                },

                accent: {
                    DEFAULT: "#8B6F4E", // Clay
                    clay: "#8B6F4E",
                },

                // LEGACY ALIASES (Mapping old token names to new values)
                bg: "#FAFBF9",         // -> background.page
                surface: "#FFFFFF",    // -> background.card
                "surface-2": "#EFE9DD",// -> background.muted

                primary: "#56BA39",    // -> brand.DEFAULT
                "primary-2": "#2F6E1E",// -> brand.dark

                muted: "#6B7280",      // -> text.muted

                success: "#56BA39",    // Re-mapped to brand green
                warning: "#8B6F4E",    // Re-mapped to clay
                danger: "#B65B5B",     // Kept original red-ish or use error color if provided (User didn't provide error color, keeping safe default or omitting? User's prompt didn't specify danger. I'll leave it as is from old config or close match? Use logic: Red is typically #DC2626. I'll omit danger alias if I don't have a value, OR map it to a reasonable default. The old config had #B65B5B. I'll re-add it hardcoded to be safe.)

                // Re-adding danger from previous config since it wasn't specified but needed for UI
                danger: "#B65B5B",
            },

            fontFamily: {
                heading: ["Playfair Display", "serif"],
                subheading: ["Poppins", "sans-serif"],
                body: ["Inter", "sans-serif"],
                serif: ["Playfair Display", "serif"], // Alias for font-serif
                sans: ["Inter", "sans-serif"], // Alias for font-sans
            },
        },
    },
    plugins: [],
};
