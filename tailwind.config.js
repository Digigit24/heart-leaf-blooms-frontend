// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--bg)",
                surface: "var(--surface)",
                surface2: "var(--surface-2)",
                text: "var(--text)",
                muted: "var(--muted)",
                primary: "var(--primary)",
                primary2: "var(--primary-2)",
                sage: "var(--sage)",
                accent: "var(--accent)",
                border: "var(--border)",
                ring: "var(--ring)",
                success: "var(--success)",
                warning: "var(--warning)",
                danger: "var(--danger)",
            },
            borderRadius: {
                sm: "var(--radius-sm)",
                md: "var(--radius-md)",
                lg: "var(--radius-lg)",
            },
            maxWidth: {
                container: "var(--container)",
            },
            fontFamily: {
                body: ["var(--font-body)"],
                heading: ["var(--font-heading)"],
                serif: ["var(--font-serif)"],
            },
        },
    },
    plugins: [],
};
