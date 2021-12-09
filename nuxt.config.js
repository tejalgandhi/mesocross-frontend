import customRoutes from './customRoutes'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mesocross ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  loading: {
    color: '#25282A'
  },
  server: {
    host: process.env.HOST, // default: localhost
    port: process.env.PORT
  },
  css: [

    '@/assets/css/style.css',
    '@/assets/css/slick.css'
  ],
  script: [
    { src: '@/assets/js/jquery.min.js' },
    { src: 'https://use.fontawesome.com/88555a91d8.js' }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vee-validate.js', mode: 'client' },
    { src: '@/plugins/i18n.js' },
    { src: '@/plugins/axios.js' },
    { src: '@/plugins/persistedstate.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/i18n',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    '@nuxtjs/moment',
    'vue-social-sharing/nuxt'
  ],
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.js',
        name: 'English'
      },
      {
        code: 'pt',
        file: 'pt.js',
        name: 'Portuguese'
      },
      {
        code: 'es',
        file: 'es.js',
        name: 'Spanish'
      }],
    defaultLocale: 'es',
    lazy: true,
    langDir: 'lang/',
    strategy: 'no_prefix'
  },

  toast: {
    position: 'top-center'

  },
  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token'
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get' }
        }
      }
    },
    redirect: false
  },

  bootstrapVue: {
    icons: true
  },

  env: {
    baseUrl: process.env.BASE_URL,
    uploadURL: process.env.UPLOAD_URL

    // uploadURL: process.env.UPLOAD_URL
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate'],
    html: {
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }
  },
  router: {
    linkActiveClass: 'active',
    middleware: ['route-guard'],
    base: '/',
    routeNameSplitter: '/',
    extendRoutes (routes, resolve) {
      customRoutes.forEach((val) => {
        routes.push({
          name: val.name,
          path: val.path,
          component: resolve(__dirname, val.component)
        })
      })
    }
  },
  ssr: true
}
