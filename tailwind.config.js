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
                    50: '#F5F4F0',
                    100: '#DAD7CD',
                    200: '#BFCAB0',
                    300: '#A3B18A',
                    400: '#7D9B70',
                    500: '#588157',
                    600: '#4B704A',
                    700: '#3F5E3E',
                    800: '#3A5A40',
                    900: '#344E41',
                    950: '#22332B',
                },
                pasca: {
                    darkest: '#344E41',
                    dark: '#3A5A40',
                    primary: '#588157',
                    sage: '#A3B18A',
                    light: '#DAD7CD',
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
