// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs'] }],
    '@nuxt/content'
  ],

  imports: {
    dirs: ['stores']
  },

  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  alias: {
    '@': '.',
    '~': '.'
  },

  compatibilityDate: '2025-01-08',

  // pinia configuration moved to modules
})
