/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // brand: {
        //   DEFAULT: '#02b290',
        //   dark: '#000000',
        //   light: '#ffffff',
        //   muted: '#595959',
        //   tree: '#6fb48e',
        //   'tree-dark': '#0B4635',
        //   danger: '#dc2626',
        // },
        brand: {
          DEFAULT: '#6D4440',
          dark: '#291d1a',
          light: '#FFFFFF',
          black: '#000',
          light2: '#4B2E2B',
          light3: '#553D3A',
          // contrast: '#291d1a',
          muted: '#595959',
          tree: '#6fb48e',
          'tree-dark': '#0B4635',
          danger: '#dc2626',
        },
        yellow: {
          DEFAULT: '#f98f14',
          50: '#FAE642',
          100: '#f3b81f',
          200: '#ffc33c',
          300: '#edc537',
        },
        fill: {
          base: '#f3f6f9',
          // secondary: '#f8f9fb',
          secondary: '#4B2E2B',
          thumbnail: '#f3f6fa',
          'dropdown-hover': '#f6f9fc',
          one: '#f1f6f9',
          two: '#f2f2f2',
          three: '#e8ebf0',
          four: '#e5eaf1',
        },
        border: {
          base: '#6D4440',
          one: '#e3e8ec',
          two: '#e2e8f0',
          three: '#e6e6e6',
          four: '#dee5ea',
          five: '#5A5A5A',
          
        },
      },
      fontSize: {
        '10px': '.625rem',
        '13px': '13px',
        '15px': '15px',
      },
      screens: {
        '3xl': '1780px',
        '4xl': '1921px',
      },
      spacing: {
        '430px': '430px',
        '450px': '450px',
        '500px': '500px',
        '64vh': '64vh',
      },
      minHeight: {
        '50px': '50px',
      },
      scale: {
        80: '0.8',
        85: '0.85',
        300: '3',
        400: '4',
      },
      width: {
        '1/9': '11.1111111%',
        '100+30': 'calc(100% + 30px)',
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        shine: 'shine 0.8s ease-in',
        ping: 'ping 3s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      fontFamily: {
        body: ['var(--font-inter)'],
        manrope: ['var(--font-manrope)'],
      },
      boxShadow: {
        card: '0px 0px 6px rgba(79, 95, 120, 0.1)',
        cardHover: '0px 0px 8px rgba(79, 95, 120, 0.18)',
        category: '0px 1px 6px rgba(79, 95, 120, 0.12)',
        category2: '0px 10px 20px rgba(88, 110, 125, 0.1)',
        navigation: '0 3px 6px rgba(115, 125, 144, 0.25)',
        counter: '0px 4px 10px rgba(79, 95, 120, 0.15)',
        featured: '0px 4px 8px rgba(70, 84, 111, 0.06)',
        cart: '0 3px 6px rgba(0,0,0,0.12)',
        switch: '0 2px 5px rgba(21,35,49,0.4)',
        dropDown: '0px 10px 40px rgba(41, 50, 68, 0.15)',
        carouselButton: '0px 2px 15px rgba(115, 125, 144, 0.25)',
        listProduct: '0 2px 4px rgba(0,0,0,.08)',
        navigationReverse: '0 -3px 6px rgba(0, 0, 0, 0.16)',
        header: '0 2px 3px rgba(0, 0, 0, 0.08)',
        subMenu: '1px 2px 3px rgba(0, 0, 0, 0.08)',
        bottomNavigation: '0 -2px 3px rgba(0, 0, 0, 0.06)',
        cookies: '0 -2px 3px rgba(0, 0, 0, 0.04)',
        contact: '0 1px 10px rgba(75, 90, 130, 0.1)',
        vendorCard: '0px 2px 3px rgba(0, 0, 0, 0.06)',
        vendorCardHover: '0px 1px 15px rgba(0, 0, 0, 0.06)',
        vendorSidebar:
          '0px 1px 2px rgba(0, 0, 0, 0.03), 0px 1px 3px rgba(0, 0, 0, 0.05)',
        searchBox: '0px 4px 4px rgba(99, 113, 134, 0.1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
