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
                    50: '#F4F8F6',
                    100: '#E7F1EC',
                    200: '#CBE0D6',
                    300: '#9FC3B2',
                    400: '#71A892',
                    500: '#4F8F75',
                    600: '#3D7760',
                    700: '#2D5F4C',
                    800: '#1F4D3A',
                    900: '#153D2F',
                    950: '#0F2E24',
                },
                pasca: {
                    darkest: '#0F2E24',
                    dark: '#1F4D3A',
                    primary: '#4F8F75',
                    sage: '#9FC3B2',
                    light: '#E7F1EC',
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
