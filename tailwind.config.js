/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563eb',
                    50:  '#eff6ff',
                    100: '#dbeafe',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                    dark:  '#1e40af',
                    light: '#60a5fa',
                },
                secondary: {
                    DEFAULT: '#0f172a',
                    light: '#334155',
                },
                accent: {
                    DEFAULT: '#f43f5e',
                    glow: '#fb7185',
                },
                violet: {
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                },
                surface: {
                    DEFAULT: '#ffffff',
                    dark: '#f8fafc',
                },
            },
            fontFamily: {
                sans:    ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'sans-serif'],
            },
            backgroundImage: {
                'hero-glow':    'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.3), transparent)',
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'dot-pattern':  'radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1px)',
                'grid-dark':    'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
            },
            backgroundSize: {
                'dot-sm': '20px 20px',
                'dot-md': '28px 28px',
                'grid-40': '40px 40px',
            },
            boxShadow: {
                'glow-sm': '0 0 15px rgba(37, 99, 235, 0.25)',
                'glow':    '0 0 30px rgba(37, 99, 235, 0.35)',
                'glow-lg': '0 0 60px rgba(37, 99, 235, 0.4)',
                'card':    '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                'card-md': '0 4px 16px rgba(0,0,0,0.08)',
                'card-lg': '0 10px 32px rgba(0,0,0,0.10)',
                'card-xl': '0 20px 60px rgba(0,0,0,0.13)',
            },
            keyframes: {
                fadeInUp: {
                    '0%':   { opacity: '0', transform: 'translateY(28px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%':   { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%':   { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%':   { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%':      { transform: 'translateY(-12px)' },
                },
                marquee: {
                    '0%':   { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                shimmer: {
                    '0%':   { backgroundPosition: '-200% center' },
                    '100%': { backgroundPosition: '200% center' },
                },
                orbFloat: {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%':      { transform: 'translate(40px, -30px) scale(1.06)' },
                    '66%':      { transform: 'translate(-25px, 20px) scale(0.96)' },
                },
                orbFloatAlt: {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%':      { transform: 'translate(-35px, 25px) scale(1.04)' },
                    '66%':      { transform: 'translate(30px, -20px) scale(0.97)' },
                },
                glowPulse: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(37,99,235,0.25)' },
                    '50%':      { boxShadow: '0 0 40px rgba(37,99,235,0.55), 0 0 80px rgba(99,102,241,0.25)' },
                },
                pingDot: {
                    '75%, 100%': { transform: 'scale(2)', opacity: '0' },
                },
            },
            animation: {
                'fade-in-up':          'fadeInUp 0.8s ease-out forwards',
                'fade-in':             'fadeIn 0.6s ease-out forwards',
                'slide-up':            'slideUp 0.7s ease-out forwards',
                'scale-in':            'scaleIn 0.5s ease-out forwards',
                'float':               'float 6s ease-in-out infinite',
                'marquee':             'marquee 25s linear infinite',
                'shimmer':             'shimmer 2.5s linear infinite',
                'glow-pulse':          'glowPulse 3s ease-in-out infinite',
                'orb-float':           'orbFloat 14s ease-in-out infinite',
                'orb-float-alt':       'orbFloatAlt 18s ease-in-out infinite',
                'spin-slow':           'spin 20s linear infinite',
                'pulse-slow':          'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'ping-dot':            'pingDot 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
        },
    },
    plugins: [],
}
