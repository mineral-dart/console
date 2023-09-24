module.exports = {
  presets: [require('../../tailwind.config')],
  content: ['libs/shared/ui/src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  theme: {
    extend: {},
  },
  plugins: [],
}
