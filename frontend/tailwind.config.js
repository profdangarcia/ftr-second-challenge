  /** @type {import('tailwindcss').Config} */
  import tailwindcssAnimate from "tailwindcss-animate"

  export default {
    darkMode: ["class"],
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx}',
      './src/**/*.{ts,tsx}',
    ],
    theme: {
    	fontFamily: {
    		sans: ['Inter', 'system-ui', 'sans-serif'],
    	},
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			/* Grayscale */
    			gray: {
    				100: 'hsl(var(--gray-100))',
    				200: 'hsl(var(--gray-200))',
    				300: 'hsl(var(--gray-300))',
    				400: 'hsl(var(--gray-400))',
    				500: 'hsl(var(--gray-500))',
    				600: 'hsl(var(--gray-600))',
    				700: 'hsl(var(--gray-700))',
    				800: 'hsl(var(--gray-800))'
    			},
    			/* Feedback */
    			danger: 'hsl(var(--danger))',
    			success: 'hsl(var(--success))',
    			/* Brand */
    			brand: { dark: 'hsl(var(--brand-dark))', base: 'hsl(var(--brand-base))' },
    			/* Palette (dark, base, light) */
    			blue: { dark: 'hsl(var(--blue-dark))', base: 'hsl(var(--blue-base))', light: 'hsl(var(--blue-light))' },
    			purple: { dark: 'hsl(var(--purple-dark))', base: 'hsl(var(--purple-base))', light: 'hsl(var(--purple-light))' },
    			pink: { dark: 'hsl(var(--pink-dark))', base: 'hsl(var(--pink-base))', light: 'hsl(var(--pink-light))' },
    			red: { dark: 'hsl(var(--red-dark))', base: 'hsl(var(--red-base))', light: 'hsl(var(--red-light))' },
    			orange: { dark: 'hsl(var(--orange-dark))', base: 'hsl(var(--orange-base))', light: 'hsl(var(--orange-light))' },
    			yellow: { dark: 'hsl(var(--yellow-dark))', base: 'hsl(var(--yellow-base))', light: 'hsl(var(--yellow-light))' },
    			green: { dark: 'hsl(var(--green-dark))', base: 'hsl(var(--green-base))', light: 'hsl(var(--green-light))' }
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
    plugins: [tailwindcssAnimate, require("tailwindcss-animate")],
  }

