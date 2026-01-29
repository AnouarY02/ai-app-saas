/**
 * WeatherApp Design Tokens
 * WeatherApp embraces the natural beauty of atmospheric conditions through a sophisticated color palette inspired by stormy skies and golden sunlight. The design balances professional meteorological precision with approachable, nature-inspired warmth that reflects the ever-changing beauty of weather patterns.
 */

export const designTokens = {
  "colors": {
    "brand": {
      "primary": {
        "50": "#f1f5f9",
        "100": "#e2e8f0",
        "200": "#cbd5e1",
        "300": "#94a3b8",
        "400": "#64748b",
        "500": "#475569",
        "600": "#334155",
        "700": "#1e293b",
        "800": "#0f172a",
        "900": "#020617",
        "950": "#010409"
      },
      "secondary": {
        "50": "#fef7ed",
        "100": "#fef0db",
        "200": "#fcddb7",
        "300": "#fac388",
        "400": "#f7a157",
        "500": "#f4803c",
        "600": "#e85d1c",
        "700": "#c1441a",
        "800": "#9a371c",
        "900": "#7c2f1a",
        "950": "#43160b"
      },
      "accent": {
        "50": "#f0fdf4",
        "100": "#dcfce7",
        "200": "#bbf7d0",
        "300": "#86efac",
        "400": "#4ade80",
        "500": "#22c55e",
        "600": "#16a34a",
        "700": "#15803d",
        "800": "#166534",
        "900": "#14532d",
        "950": "#052e16"
      }
    },
    "neutral": {
      "50": "#fafafa",
      "100": "#f4f4f5",
      "200": "#e4e4e7",
      "300": "#d4d4d8",
      "400": "#a1a1aa",
      "500": "#71717a",
      "600": "#52525b",
      "700": "#3f3f46",
      "800": "#27272a",
      "900": "#18181b",
      "950": "#09090b"
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
        "500": "#0284c7",
        "600": "#0369a1",
        "700": "#0c4a6e",
        "900": "#0c4a6e"
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