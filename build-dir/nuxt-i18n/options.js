

export const Constants = {
  COMPONENT_OPTIONS_KEY: "nuxtI18n",
  STRATEGIES: {"PREFIX":"prefix","PREFIX_EXCEPT_DEFAULT":"prefix_except_default","PREFIX_AND_DEFAULT":"prefix_and_default","NO_PREFIX":"no_prefix"},
  REDIRECT_ON_OPTIONS: {"ALL":"all","ROOT":"root","NO_PREFIX":"no prefix"},
}
export const nuxtOptions = {
  isUniversalMode: true,
  trailingSlash: undefined,
}
export const options = {
  vueI18n: {},
  vueI18nLoader: false,
  locales: [{"code":"en","file":"en.js","name":"English"},{"code":"pt","file":"pt.js","name":"Portuguese"},{"code":"es","file":"es.js","name":"Spanish"}],
  defaultLocale: "es",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  defaultLocaleRouteNameSuffix: "default",
  sortRoutes: true,
  strategy: "no_prefix",
  lazy: true,
  langDir: "C:\\laragon\\www\\mesocross-frontend\\lang",
  rootRedirect: null,
  detectBrowserLanguage: {"alwaysRedirect":false,"cookieCrossOrigin":false,"cookieDomain":null,"cookieKey":"i18n_redirected","cookieSecure":false,"fallbackLocale":"","redirectOn":"root","useCookie":true},
  differentDomains: false,
  baseUrl: "",
  vuex: {"moduleName":"i18n","syncRouteParams":true},
  parsePages: true,
  pages: {},
  skipSettingLocaleOnNavigate: false,
  onBeforeLanguageSwitch: () => {},
  onLanguageSwitched: () => null,
  normalizedLocales: [{"code":"en","file":"en.js","name":"English"},{"code":"pt","file":"pt.js","name":"Portuguese"},{"code":"es","file":"es.js","name":"Spanish"}],
  localeCodes: ["en","pt","es"],
  additionalMessages: [],
}

export const localeMessages = {
  'en.js': () => import('../..\\lang\\en.js' /* webpackChunkName: "lang-en.js" */),
  'pt.js': () => import('../..\\lang\\pt.js' /* webpackChunkName: "lang-pt.js" */),
  'es.js': () => import('../..\\lang\\es.js' /* webpackChunkName: "lang-es.js" */),
}
