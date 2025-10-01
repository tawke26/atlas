/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        discipline: {
          technology: '#3B82F6',
          philosophy: '#8B5CF6',
          economics: '#10B981',
          psychology: '#F59E0B',
          climate: '#059669',
          politics: '#DC2626',
          science: '#6366F1',
          culture: '#EC4899',
          justice: '#EF4444',
          history: '#78716C',
        }
      }
    },
  },
  plugins: [],
}

