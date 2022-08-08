import customRoutes from './customRoutes'
global.HTMLDivElement =
  typeof window === 'undefined' ? Object : window.HTMLDivElement
global.HTMLImageElement =
  typeof window === 'undefined' ? Object : window.HTMLImageElement
export default {
  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mesocross',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'mesocross' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [
      { src: 'https://js.stripe.com/v3/' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href: 'http://fonts.cdnfonts.com/css/arquitecta'
      }
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
    '@/assets/css/slick.css',
    '@/assets/scss/global.scss'
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
    { src: '@/plugins/persistedstate.js', mode: 'client' },
    { src: '@/plugins/vue-country-dial-code.js' },
    // { src: '@/plugins/social-share.js' },
    { src: '@/plugins/vue-add-to-calendar.js' },
    // { src: '@/plugins/vue-swiper.js', mode: 'client' },
    { src: '@/plugins/stripePlugins.js', mode: 'client' },
    { src: '@/plugins/vClickOutside', ssr: false },
    { src: '@/plugins/chat.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxt/image'
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
    // 'vue-social-sharing/nuxt',
    '@nuxtjs/recaptcha',
    '@nuxt/image',
    'vue-social-sharing/nuxt'
  ],
  recaptcha: {
    hideBadge: false, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: process.env.RECAPTCHA_SITE_KEY, // Site key for requests
    version: 2, // Version
    size: 'normal' // Size: 'compact', 'normal', 'invisible' (v2)
  },
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
      }
    ],
    defaultLocale: 'es',
    lazy: true,
    langDir: 'lang/',
    strategy: 'no_prefix'
  },

  toast: {
    position: 'top-right'
  },

  image: {
    domains: ['https://dev.admin.mesosystem.connectgeneration.app', 'https://admin.mesosystem.connectgeneration.app']
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
    crispWebsiteId: process.env.CRISP_WEBSITE_ID,
    baseUrl: process.env.BASE_URL,
    uploadURL: process.env.UPLOAD_URL,
    frontURL: process.env.FRONT_END_URL,
    stripePublisableKey: process.env.STRIPE_PUBLISABLE_KEY,
    siteCaptchaKey: process.env.RECAPTCHA_SITE_KEY,
    stripeAccount: process.env.STRIPE_ACCOUNT,
    stripeVersion: process.env.STRIPE_VERSION,
    stripeCommisionPer: process.env.STRIPE_COMMISION_PER,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    STRIPE_PUBLIC: process.env.STRIPE_PUBLISABLE_KEY,
    THANKYOU_PAGE: process.env.THANKYOU_PAGE,
    BACKEND_API: process.env.BACKEND_API,
    TELEPHONE: '351789505960'
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL,
    proxyHeaders: false,
    credentials: false
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
    },
    babel: {
      compact: true
    },
    extend (config) {
      config.resolve.alias.vue = 'vue/dist/vue.common'
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
  ssr: true,
  publicRuntimeConfig: {
    recaptcha: {
      /* reCAPTCHA options */
      siteKey: process.env.RECAPTCHA_SITE_KEY // for example
    }
  },

  buildDir: 'build-dir'
}
