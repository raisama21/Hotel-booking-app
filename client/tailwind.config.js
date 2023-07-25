/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            maxWidth: {
                xxl: "1764px",
            },
            padding: {
                1.5: "0.375rem",
                4.5: "1.125rem",
            },
            colors: {
                'text': '#17020c',
                'background': '#fffafc',
                'primary-button': '#f5918f',
                'secondary-button': '#fceede',
                'accent': '#f5c38f',
                'input-background': '#e6e6e6',
                'error': '#e7195a',
                'error-bg': '#ffefef',
                'primary-border': 'rgba(57,76,96,.15)',
                'dark': '#1D2231',
                'khalti-button': '#5c2d91',
            },
            aspectRatio: {
                "1/1.5": "1 / 1.5",
            },
        },
    },
    plugins: [],
}

