// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    scanPageMeta: 'after-resolve',
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    normalizeComponentNames: false,
    spaLoadingTemplateLocation: 'within',
    defaults: {
      useAsyncData: {
        deep: true,
      },
    },
  },

  features: {
    inlineStyles: true,
  },

  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false,
    },
  },

  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxt/icon', '@nuxt/image', '@nuxt/eslint', '@vueuse/motion/nuxt'],

  eslint: {
    // options here
  },

  googleFonts: {
    families: {
      Montserrat: true,
    },
  },

  css: ['@/assets/css/global.css'],

  typescript: {
    tsConfig: {
      types: ['@vueuse/motion/nuxt'],
    },
  },
});
