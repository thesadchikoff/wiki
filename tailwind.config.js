/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			textColor: {
				invert: '#ffffff',
				primary: '#14AEFF',
				secondary: '#344051',
				tertiary: '#637083',
				quartenery: '#97a1af',
				error: '#f64c4c',
				danger: {
					DEFAULT: '#FF1414',
					disabled: '#FF5A5A',
				},
				success: {},
				brand: {
					DEFAULT: '#1975ff',
					hover: '#0052CC',
					disabled: '#cce0ff',
					accent: '#0136FF',
				},
			},
			backgroundColor: {
				dark: {
					DEFAULT: '#000000',
					foreground: '#090909',
				},
				primary: {
					DEFAULT: '#14AEFF',
				},
				danger: {
					DEFAULT: '#FD605B',
				},
				success: {
					DEFAULT: '#58DF95',
				},
				'light-grey': '#F5F5F5',
				grey: '#CCCACA',
				light: {
					DEFAULT: '#FAFBFF',
					foreground: '#F5F6FF',
				},
			},
			outlineColor: {
				active: '#14AEFF',
				red: 'red',
			},
			borderColor: {
				dark: {
					DEFAULT: '#2C2C2C',
					active: '#14AEFF',
				},
			},
			colors: {
				brand: '#3401FE',
				border: 'hsl(240 5.9% 90%)',
				input: 'hsl(240 5.9% 90%)',
				ring: 'hsl(240 10% 3.9%)',
				background: 'hsl(0 0% 100%)',
				foreground: 'hsl(240 10% 3.9%)',
				primary: {
					DEFAULT: 'hsl(240 5.9% 10%)',
					foreground: 'hsl(0 0% 98%)',
				},
				secondary: {
					DEFAULT: 'hsl(240 4.8% 95.9%)',
					foreground: 'hsl(240 5.9% 10%)',
				},
				destructive: {
					DEFAULT: 'hsl(0 84.2% 60.2%)',
					foreground: 'hsl(0 0% 98%)',
				},
				muted: {
					DEFAULT: 'hsl(240 4.8% 95.9%)',
					foreground: 'hsl(240 3.8% 46.1%)',
				},
				accent: {
					DEFAULT: 'hsl(240 4.8% 95.9%)',
					foreground: 'hsl(240 5.9% 10%)',
				},
				popover: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(240 10% 3.9%)',
				},
				card: {
					DEFAULT: 'hsl(0 0% 100%)',
					foreground: 'hsl(240 10% 3.9%)',
				},
			},
			borderRadius: {
				lg: '0.5rem',
				md: 'calc(0.5rem - 2px)',
				sm: 'calc(0.5rem - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
