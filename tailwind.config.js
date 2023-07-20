/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/views/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	theme: {
		fontFamily: {
			sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
		},
		extend: {
			backgroundImage: {
				'gradient-190': 'linear-gradient(190deg, var(--tw-gradient-stops))',
			},
			colors: {
				green: {
					charleston: '#252833',
				},
				blue: {
					tiffany: '#18CAB9',
					yankees: '#1a2d42',
				},

				dark: {
					light: '#121A2A',
					medium: '#121625',
					hard: '#0d111c',
					gunmetal: '#1B1E29',
					purple: '#320930',
					turquoise: '#00DACC',
					crayola: '#313042',
				},
			},
		},
	},
	plugins: [],
}
