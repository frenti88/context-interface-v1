/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      borderRadius: {
        'card': '12px',
        'btn': '8px',
        'input': '8px',
        'chip': '9999px',
      },
      colors: {
        brand: {
          50: '#F5F7FA',
          100: '#E4E7EB',
          200: '#CBD2D9',
          500: '#323F4B',
          800: '#1F2933',
          900: '#0F172A',
        },
        surface: {
          ground: '#FAFAFB',
          card: '#FFFFFF',
          subtle: '#F4F5F7',
          border: '#E5E7EB',
          'border-subtle': '#F0F1F3',
        },
        evidence: {
          level1: {
            bg: '#ECFDF5',
            text: '#065F46',
            border: '#A7F3D0',
          },
          level2: {
            bg: '#FFFBEB',
            text: '#92400E',
            border: '#FDE68A',
          },
          level3: {
            bg: '#EEF2FF',
            text: '#3730A3',
            border: '#C7D2FE',
          },
        },
      },
    },
  },
  plugins: [],
}
