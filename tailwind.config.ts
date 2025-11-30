import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#D92E74',
                secondary: '#00A99D',
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
export default config;