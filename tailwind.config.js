/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
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
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		// ...
	],
}
