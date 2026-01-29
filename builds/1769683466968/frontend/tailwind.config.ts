import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
                "50": "#f0f4ff",
                "100": "#e0e9ff",
                "200": "#c7d6ff",
                "300": "#a5b8ff",
                "400": "#8191ff",
                "500": "#1e3a8a",
                "600": "#1a3278",
                "700": "#162a66",
                "800": "#122254",
                "900": "#0e1a42",
                "950": "#0a1230"
        },
        secondary: {
                "50": "#f7f8f5",
                "100": "#eff1eb",
                "200": "#dfe3d7",
                "300": "#cfd5c3",
                "400": "#bfc7af",
                "500": "#8a9a7b",
                "600": "#7a8a6b",
                "700": "#6a7a5b",
                "800": "#5a6a4b",
                "900": "#4a5a3b",
                "950": "#3a4a2b"
        },
        accent: {
                "50": "#fffbf0",
                "100": "#fff7e0",
                "200": "#ffefc7",
                "300": "#ffe7a5",
                "400": "#ffdf81",
                "500": "#f59e0b",
                "600": "#dc8e0a",
                "700": "#c37e09",
                "800": "#aa6e08",
                "900": "#915e07",
                "950": "#784e06"
        },
        neutral: {
                "50": "#fafafa",
                "100": "#f5f5f5",
                "200": "#e5e5e5",
                "300": "#d4d4d4",
                "400": "#a3a3a3",
                "500": "#737373",
                "600": "#525252",
                "700": "#404040",
                "800": "#262626",
                "900": "#171717",
                "950": "#0a0a0a"
        },
        success: {
                "50": "#f0fdf4",
                "100": "#dcfce7",
                "500": "#22c55e",
                "600": "#16a34a",
                "700": "#15803d",
                "900": "#14532d"
        },
        warning: {
                "50": "#fffbeb",
                "100": "#fef3c7",
                "500": "#f59e0b",
                "600": "#d97706",
                "700": "#b45309",
                "900": "#78350f"
        },
        error: {
                "50": "#fef2f2",
                "100": "#fee2e2",
                "500": "#ef4444",
                "600": "#dc2626",
                "700": "#b91c1c",
                "900": "#7f1d1d"
        },
        info: {
                "50": "#f0f9ff",
                "100": "#e0f2fe",
                "500": "#0284c7",
                "600": "#0369a1",
                "700": "#0c4a6e",
                "900": "#0c4a6e"
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
              "xs": "0.75rem",
              "sm": "0.875rem",
              "base": "1rem",
              "lg": "1.125rem",
              "xl": "1.25rem",
              "2xl": "1.5rem",
              "3xl": "1.875rem",
              "4xl": "2.25rem",
              "5xl": "3rem",
              "6xl": "3.75rem",
              "7xl": "4.5rem"
      },
      lineHeight: {
              "tight": "1.25",
              "snug": "1.375",
              "normal": "1.5",
              "relaxed": "1.625",
              "loose": "2"
      },
      fontWeight: {
              "light": 300,
              "normal": 400,
              "medium": 500,
              "semibold": 600,
              "bold": 700,
              "extrabold": 800
      },
      spacing: {
              "0": "0rem",
              "1": "0.25rem",
              "2": "0.5rem",
              "3": "0.75rem",
              "4": "1rem",
              "5": "1.25rem",
              "6": "1.5rem",
              "8": "2rem",
              "10": "2.5rem",
              "12": "3rem",
              "16": "4rem",
              "20": "5rem",
              "24": "6rem",
              "32": "8rem",
              "40": "10rem",
              "48": "12rem",
              "56": "14rem",
              "64": "16rem",
              "72": "18rem",
              "80": "20rem",
              "96": "24rem"
      },
      borderRadius: {
              "none": "0rem",
              "sm": "0.125rem",
              "base": "0.25rem",
              "md": "0.375rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "2xl": "1rem",
              "3xl": "1.5rem",
              "full": "9999rem"
      },
      boxShadow: {
              "xs": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
              "sm": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
              "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
              "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
              "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
      },
      transitionDuration: {
              "instant": "0ms",
              "fast": "150ms",
              "normal": "300ms",
              "slow": "500ms",
              "slower": "750ms"
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        snappy: 'cubic-bezier(0.4, 0, 1, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    }
  },
  plugins: []
};

export default config;