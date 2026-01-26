/**
 * Padel Club Pro Design Tokens
 * Padel Club Pro embodies the energy and precision of padel sports through a sophisticated color palette inspired by tennis court greens and clay court terracotta. The design balances athletic dynamism with professional SaaS aesthetics, creating a trustworthy yet energetic brand identity.
 */

export const designTokens = {
  "colors": {
    "brand": {
      "primary": {
        "50": "#f0f9f4",
        "100": "#dcf2e3",
        "200": "#bce5ca",
        "300": "#8dd3a6",
        "400": "#57ba7b",
        "500": "#2d9d5f",
        "600": "#247d4a",
        "700": "#1e633c",
        "800": "#1a4f32",
        "900": "#16412a",
        "950": "#0a2416"
      },
      "secondary": {
        "50": "#fdf6f0",
        "100": "#faeadb",
        "200": "#f4d2b7",
        "300": "#ecb388",
        "400": "#e18d57",
        "500": "#d2691e",
        "600": "#c4541a",
        "700": "#a34118",
        "800": "#82351a",
        "900": "#692d17",
        "950": "#38160a"
      },
      "accent": {
        "50": "#fefdf2",
        "100": "#fefbe8",
        "200": "#fef7c3",
        "300": "#feef8e",
        "400": "#fde047",
        "500": "#eab308",
        "600": "#ca8a04",
        "700": "#a16207",
        "800": "#854d0e",
        "900": "#713f12",
        "950": "#422006"
      }
    },
    "neutral": {
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
    "semantic": {
      "success": {
        "50": "#f0fdf4",
        "100": "#dcfce7",
        "500": "#22c55e",
        "600": "#16a34a",
        "700": "#15803d",
        "900": "#14532d"
      },
      "warning": {
        "50": "#fffbeb",
        "100": "#fef3c7",
        "500": "#f59e0b",
        "600": "#d97706",
        "700": "#b45309",
        "900": "#78350f"
      },
      "error": {
        "50": "#fef2f2",
        "100": "#fee2e2",
        "500": "#ef4444",
        "600": "#dc2626",
        "700": "#b91c1c",
        "900": "#7f1d1d"
      },
      "info": {
        "50": "#f0f9ff",
        "100": "#e0f2fe",
        "500": "#0891b2",
        "600": "#0e7490",
        "700": "#155e75",
        "900": "#164e63"
      }
    }
  },
  "typography": {
    "fonts": {
      "sans": "Inter",
      "display": "Outfit",
      "mono": "JetBrains Mono"
    },
    "scale": {
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
    "lineHeight": {
      "tight": "1.25",
      "snug": "1.375",
      "normal": "1.5",
      "relaxed": "1.625",
      "loose": "2"
    },
    "weights": {
      "light": 300,
      "normal": 400,
      "medium": 500,
      "semibold": 600,
      "bold": 700,
      "extrabold": 800
    }
  },
  "spacing": {
    "scale": {
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
    }
  },
  "radius": {
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
  "shadows": {
    "xs": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "sm": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
  },
  "animations": {
    "durations": {
      "instant": "0ms",
      "fast": "150ms",
      "normal": "300ms",
      "slow": "500ms",
      "slower": "750ms"
    },
    "easings": {
      "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      "snappy": "cubic-bezier(0.4, 0, 1, 1)",
      "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      "elastic": "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    }
  }
} as const;

export const { colors, typography, spacing, radius, shadows, animations } = designTokens;