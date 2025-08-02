/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2196f3',
        'primary-dark': '#1976d2',
        secondary: '#f5f7fa',
        accent: '#e3f2fd',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        'text-primary': '#222222',
        'text-secondary': '#666666',
        'text-muted': '#999999',
        border: '#e0e0e0',
        'border-light': '#f0f0f0',
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'Helvetica', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'xl': '12px',
      },
      boxShadow: {
        'soft': '0 1px 8px rgba(0, 0, 0, 0.05)',
        'medium': '0 2px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} 