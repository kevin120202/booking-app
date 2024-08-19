/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        container: {
            padding: {
                DEFAULT: "1rem", // Padding for all screen sizes
                sm: "2rem",      // Padding for small screens (sm) and up
                md: "4rem",      // Padding for medium screens (md) and up
                lg: "8rem",      // Padding for large screens (lg) and up
                xl: "12rem",
            }
        }
    },
    plugins: [],
}

