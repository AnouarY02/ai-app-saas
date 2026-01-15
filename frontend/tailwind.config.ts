import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {"50":"#fef7f0","100":"#fdeee0","200":"#fad9c1","300":"#f6be96","400":"#f19969","500":"#ed7544","600":"#de5a2c","700":"#b94622","800":"#933a22","900":"#76321f","950":"#40180f"},
        secondary: {"50":"#f8fafc","100":"#f1f5f9","200":"#e2e8f0","300":"#cbd5e1","400":"#94a3b8","500":"#64748b","600":"#475569","700":"#334155","800":"#1e293b","900":"#0f172a","950":"#020617"},
        neutral: {"50":"#fafaf9","100":"#f5f5f4","200":"#e7e5e4","300":"#d6d3d1","400":"#a8a29e","500":"#78716c","600":"#57534e","700":"#44403c","800":"#292524","900":"#1c1917","950":"#0c0a09"},
        success: {"50":"#f0fdf4","500":"#22c55e","700":"#15803d"},
        warning: {"50":"#fffbeb","500":"#f59e0b","700":"#b45309"},
        error: {"50":"#fef2f2","500":"#ef4444","700":"#b91c1c"},
        info: {"50":"#eff6ff","500":"#3b82f6","700":"#1d4ed8"}
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {"xs":"0.75rem","sm":"0.875rem","base":"1rem","lg":"1.125rem","xl":"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem","5xl":"3rem"},
      spacing: {"0":"0","1":"0.25rem","2":"0.5rem","3":"0.75rem","4":"1rem","5":"1.25rem","6":"1.5rem","8":"2rem","10":"2.5rem","12":"3rem","16":"4rem","20":"5rem","24":"6rem","32":"8rem"},
      borderRadius: {"none":"0","sm":"0.125rem","md":"0.375rem","lg":"0.5rem","xl":"0.75rem","2xl":"1rem","full":"9999px"},
      boxShadow: {"sm":"0 1px 2px 0 rgba(0, 0, 0, 0.05)","md":"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)","lg":"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)","xl":"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"},
      transitionDuration: {"fast":"150ms","normal":"300ms","slow":"500ms"},
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
      }
    }
  },
  plugins: []
};

export default config;
