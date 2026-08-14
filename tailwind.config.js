/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/screens/**/*.{js,jsx}",
    "./src/comp/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Brand taupe — updated from CBG color card (03) ───────────── */
        leaf: {
          50: "#F8F7F6",
          100: "#F3F1EE",
          200: "#EEEBE6",
          300: "#E9E5DF",
          400: "#E5E0D9",
          500: "#CAC5BF",
          600: "#A5A19C",
          700: "#7E7B77",
          800: "#575552",
          900: "#323130",
        },
        /* ── Brand marine blue — updated from CBG color card (03) ───────── */
        blush: {
          50: "#EAEEF3",
          100: "#D0D9E5",
          200: "#AABACF",
          300: "#849BBA",
          400: "#5A78A2",
          500: "#2B5288",
          600: "#234370",
          700: "#1C3558",
          800: "#13253D",
          900: "#0C1726",
        },

        /* ── Legacy aliases: existing sections repaint automatically ────── */
        ember: {
          50: "#EAEEF3",
          100: "#D0D9E5",
          200: "#AABACF",
          300: "#849BBA",
          400: "#5A78A2",
          500: "#2B5288",
          600: "#234370",
          700: "#1C3558",
          800: "#13253D",
        },
        moss: {
          50: "#F8F7F6",
          100: "#F3F1EE",
          200: "#EEEBE6",
          300: "#E9E5DF",
          400: "#E5E0D9",
          500: "#CAC5BF",
          600: "#A5A19C",
          700: "#7E7B77",
          800: "#575552",
          900: "#323130",
        },

        ink: {
          0: "#FFFFFF",
          300: "#7F8F87",
          500: "#41544B",
          700: "#1C2C24",
          800: "#111E18",
          900: "#0A1310",
        },
        mist: {
          50: "#FBFCFB",
          100: "#F3F6F4",
          200: "#E6ECE8",
        },
        sand: {
          50: "#FDFAF8",
          100: "#F7EFEB",
          200: "#EFE1DA",
        },
        dusk: {
          400: "#5A78A2",
          500: "#2B5288",
          600: "#234370",
          800: "#13253D",
          900: "#0C1726",
        },

        /* ── NEW: found hardcoded in comps/screens, now centralized ─────── */
        teal: {
          500: "#2A9D8F",
          600: "#24857A",
          700: "#1F6F54",
        },
        coral: {
          200: "#AABACF",
          300: "#849BBA",
          400: "#5A78A2",
          500: "#2B5288",
          550: "#284B7D",
          560: "#274A7A",
          600: "#234370",
        },
        gold: {
          500: "#C9A227",
        },
        carbon: {
          500: "#0F4A2E",
          600: "#10231A",
          700: "#0F241D",
          800: "#0B1512",
          900: "#0A0F0D",
          950: "#080C0A",
        },
        paper: {
          50: "#FAFBFA",
          100: "#F6F4EF",
          150: "#F0F8F3",
          200: "#F1EEE7",
          250: "#EDEFEC",
        },
        whatsapp: "#25D366",

        /* ── NEW: status/feedback colors (errors, success, warnings, info) ── */
        "status-red": {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
        },
        "status-green": {
          50: "#ECFDF5",
          200: "#BBF7D0",
          300: "#A7F3D0",
          400: "#4ADE80",
          500: "#10B981",
          600: "#059669",
          700: "#1C7A4A",
          800: "#065F46",
          mint: "#6FCF9E",
          "mint-light": "#7FD3A3",
          leafy: "#34A96C",
        },
        "status-amber": {
          50: "#FEF3DC",
          200: "#FDE68A",
          500: "#F59E0B",
          700: "#B45309",
          800: "#92400E",
        },
        "status-blue": {
          200: "#BFDBFE",
          500: "#3B82F6",
        },
        "status-gray": {
          100: "#F5F5F5",
          200: "#E5E7EB",
          300: "#CBD5E0",
          400: "#9CA3AF",
          500: "#6B7280",
          700: "#374151",
          950: "#111111",
        },
      },

      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },

      backgroundImage: {
        "leaf-blush":
          "linear-gradient(118deg, #7E7B77 0%, #A5A19C 34%, #E9E5DF 62%, #5A78A2 100%)",
        "blush-leaf":
          "linear-gradient(100deg, #2B5288 0%, #5A78A2 40%, #E9E5DF 100%)",
        "radial-fade":
          "radial-gradient(ellipse at top right, rgba(165,161,156,0.16), transparent 62%)",
        "hero-scrim":
          "linear-gradient(180deg, rgba(10,19,16,0.34) 0%, rgba(10,19,16,0.04) 26%, rgba(10,19,16,0.10) 48%, rgba(10,19,16,0.52) 80%, rgba(10,19,16,0.88) 100%)",
        "hero-wash":
          "linear-gradient(90deg, rgba(10,19,16,0.80) 0%, rgba(10,19,16,0.44) 34%, rgba(10,19,16,0.08) 58%, rgba(10,19,16,0) 72%)",
        "glass-sheen":
          "linear-gradient(135deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 42%, rgba(255,255,255,0) 100%)",
      },

      boxShadow: {
        panel: "0 60px 120px -40px rgba(10,19,16,0.65), 0 18px 44px -22px rgba(10,19,16,0.45)",
        glass: "0 24px 48px -18px rgba(10,19,16,0.55), inset 0 1px 0 rgba(255,255,255,0.28)",
        lift: "0 18px 40px -16px rgba(165,161,156,0.45)",
        "lift-blush": "0 18px 40px -16px rgba(43,82,136,0.45)",
      },

      transitionDuration: {
        400: "400ms",
      },

      /* Tailwind's default opacity scale jumps 5 → 10 → 20, so modifiers like
         `/8` or `/55` match nothing. In JSX that fails silently (the class
         emits no CSS at all); inside `@apply` it's a hard build error. These
         are every off-scale step the design actually uses. */
      opacity: {
        6: "0.06",
        8: "0.08",
        12: "0.12",
        14: "0.14",
        15: "0.15",
        18: "0.18",
        22: "0.22",
        35: "0.35",
        45: "0.45",
        55: "0.55",
        62: "0.62",
        65: "0.65",
        72: "0.72",
        85: "0.85",
        92: "0.92",
      },

      keyframes: {
        drift: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(20px,-24px) scale(1.05)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "orbit-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        rise: {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        pulseDot: {
          "0%,100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.35, transform: "scale(0.75)" },
        },
        aurora: {
          "0%,100%": { transform: "translate3d(0,0,0) rotate(0deg)" },
          "33%": { transform: "translate3d(3%,-4%,0) rotate(6deg)" },
          "66%": { transform: "translate3d(-3%,3%,0) rotate(-5deg)" },
        },
      },

      animation: {
        drift: "drift 9s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        orbit: "orbit 26s linear infinite",
        "orbit-reverse": "orbit-reverse 34s linear infinite",
        rise: "rise 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        marquee: "marquee 28s linear infinite",
        sheen: "sheen 4.5s ease-in-out infinite",
        "pulse-dot": "pulseDot 1.8s ease-in-out infinite",
        aurora: "aurora 22s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};