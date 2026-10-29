import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
                        colors: {
                emerald: {
                    50: '#F4F7FC',
                    100: '#D9E1F1',
                    200: '#C2D1E8',
                    300: '#8FB3E2',
                    400: '#5F8BC6',
                    500: '#4368A6',
                    600: '#31487A',
                    700: '#263B66',
                    800: '#1E2E4F',
                    900: '#192338',
                    950: '#0E1626',
                },
                pasca: {
                    darkest: '#0E1626',
                    dark: '#192338',
                    navy: '#1E2E4F',
                    primary: '#31487A',
                    accent: '#8FB3E2',
                    light: '#D9E1F1',
                },
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
                arabic: ['Amiri', ...defaultTheme.fontFamily.serif],
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-down': {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
                'slide-down': 'slide-down 0.3s ease-in-out forwards',
            },
        },
    },

    plugins: [forms],
};
