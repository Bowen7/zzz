import animate from 'tailwindcss-animate'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'gradient-shape-1': {
          '33%': { transform: 'translate(-12px, 0)' },
        },
        'gradient-shape-2': {
          '33%': { transform: 'translate(-12px, -12px)' },
        },
        'gradient-shape-3': {
          '33%': { transform: 'translate(12px, 12px)' },
        },
        'gradient-shape-4': {
          '33%': { transform: 'translate(12px, 0)' },
        },
      },
      animation: {
        'gradient-shape-1': 'gradient-shape-1 6s 1s ease-out infinite',
        'gradient-shape-2': 'gradient-shape-2 6s ease-in infinite',
        'gradient-shape-3': 'gradient-shape-3 6s ease-out infinite',
        'gradient-shape-4': 'gradient-shape-4 6s 1s ease-in infinite',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  plugins: [animate],
}
export default config
