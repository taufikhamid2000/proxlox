import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Enables dark mode using a class
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        ring: 'var(--ring)',
        navBg: 'var(--nav-bg)',
        navFg: 'var(--nav-fg)',
        navFgMuted: 'var(--nav-fg-muted)',
        navBorder: 'var(--nav-border)',
        navActiveBg: 'var(--nav-active-bg)',
        navHoverBg: 'var(--nav-hover-bg)',
      },
      fontFamily: {
        sans: ['"Fira Sans"', 'Arial', 'Helvetica', 'sans-serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
