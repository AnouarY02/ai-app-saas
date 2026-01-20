/**
 * FitTrack Pro Design Tokens
 * FitTrack Pro embodies energy and achievement through a dynamic color palette of vibrant emerald green representing growth and vitality, paired with warm amber accents that convey motivation and success. The design system emphasizes clarity and performance with clean typography and purposeful spacing that supports users in their fitness journey.
 */

export const designTokens = {
  "colors": {
    "brand": {
      "primary": {
        "50": "#ecfdf5",
        "100": "#d1fae5",
        "200": "#a7f3d0",
        "300": "#6ee7b7",
        "400": "#34d399",
        "500": "#10b981",
        "600": "#059669",
        "700": "#047857",
        "800": "#065f46",
        "900": "#064e3b",
        "950": "#022c22"
      },
      "secondary": {
        "50": "#fffbeb",
        "100": "#fef3c7",
        "200": "#fde68a",
        "300": "#fcd34d",
        "400": "#fbbf24",
        "500": "#f59e0b",
        "600": "#d97706",
        "700": "#b45309",
        "800": "#92400e",
        "900": "#78350f",
        "950": "#451a03"
      },
      "accent": {
        "50": "#fef7ee",
        "100": "#fdedd3",
        "200": "#fbd7a5",
        "300": "#f8bb6d",
        "400": "#f59533",
        "500": "#f3760b",
        "600": "#e45a06",
        "700": "#bd4309",
        "800": "#97360f",
        "900": "#7a2e0e",
        "950": "#421504"
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