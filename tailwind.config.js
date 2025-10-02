// tailwind.config.js
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}", // make sure your React files are included
	],
	theme: {
		extend: {
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				slideUp: {
					"0%": { opacity: "0", transform: "translateY(15px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.6s ease-in-out",
				slideUp: "slideUp 0.5s ease forwards",
			},
		},
	},
	plugins: [],
}
