export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mesocross',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/layout.scss',
    '@/assets/scss/colors.scss',
    '@/assets/scss/typography.scss',
  ],

  styleResources: {
    scss: ['./assets/scss/*.scss']
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/i18n'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  i18n: {
    locales: [
      { code: 'pt', file: 'pt.js' },
      { code: 'en', file: 'en.js' },
    ],
    lazy: true,
    defaultLocale: 'en',
    langDir: 'langs/',
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
