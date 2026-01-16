// tailwind.config.js
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "oklch(var(--background))",
        "foreground": "oklch(var(--foreground))",
        "primary": "oklch(var(--primary))",
        "primary-foreground": "oklch(var(--primary-foreground))",
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
    },
  },
};
