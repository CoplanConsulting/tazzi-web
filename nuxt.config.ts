import tailwindcss from "@tailwindcss/vite";

import "./lib/env";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "shadcn-nuxt", "@nuxt/icon", "@nuxtjs/color-mode", "@vee-validate/nuxt"],

  veeValidate: {
    autoImports: true,
  },

  /* eslint-disable node/no-process-env -- Nuxt runtimeConfig requires process.env */
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    supabaseDbUrl: process.env.SUPABASE_DB_URL,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  /* eslint-enable node/no-process-env */
  css: ["./assets/css/main.css"],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
      "autoprefixer": {},
    },
  },
  eslint: {
    config: {
      standalone: false,
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    classSuffix: "",
  },
  shadcn: {
    prefix: "",
    componentDir: "@/components/ui",
  },
});
