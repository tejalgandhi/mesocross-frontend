import Vue from 'vue'
import Vuex from 'vuex'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_plugin_5fc61f87 from 'nuxt_plugin_plugin_5fc61f87' // Source: .\\components\\plugin.js (mode: 'all')
import nuxt_plugin_bootstrapvue_625f0b4e from 'nuxt_plugin_bootstrapvue_625f0b4e' // Source: .\\bootstrap-vue.js (mode: 'all')
import nuxt_plugin_vuesocialsharingplugin_4fb1e823 from 'nuxt_plugin_vuesocialsharingplugin_4fb1e823' // Source: .\\vue-social-sharing-plugin.js (mode: 'all')
import nuxt_plugin_recaptcha_478660ce from 'nuxt_plugin_recaptcha_478660ce' // Source: .\\recaptcha.js (mode: 'all')
import nuxt_plugin_moment_37561ea4 from 'nuxt_plugin_moment_37561ea4' // Source: .\\moment.js (mode: 'all')
import nuxt_plugin_toast_4ef3b2d9 from 'nuxt_plugin_toast_4ef3b2d9' // Source: .\\toast.js (mode: 'client')
import nuxt_plugin_workbox_6152f8c6 from 'nuxt_plugin_workbox_6152f8c6' // Source: .\\workbox.js (mode: 'client')
import nuxt_plugin_metaplugin_74b3c746 from 'nuxt_plugin_metaplugin_74b3c746' // Source: .\\pwa\\meta.plugin.js (mode: 'all')
import nuxt_plugin_iconplugin_795b6cba from 'nuxt_plugin_iconplugin_795b6cba' // Source: .\\pwa\\icon.plugin.js (mode: 'all')
import nuxt_plugin_axios_fa7933ac from 'nuxt_plugin_axios_fa7933ac' // Source: .\\axios.js (mode: 'all')
import nuxt_plugin_pluginutils_360ee184 from 'nuxt_plugin_pluginutils_360ee184' // Source: .\\nuxt-i18n\\plugin.utils.js (mode: 'all')
import nuxt_plugin_pluginrouting_b845c462 from 'nuxt_plugin_pluginrouting_b845c462' // Source: .\\nuxt-i18n\\plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_215a3800 from 'nuxt_plugin_pluginmain_215a3800' // Source: .\\nuxt-i18n\\plugin.main.js (mode: 'all')
import nuxt_plugin_image_6dca6325 from 'nuxt_plugin_image_6dca6325' // Source: .\\image.js (mode: 'all')
import nuxt_plugin_veevalidate_21716614 from 'nuxt_plugin_veevalidate_21716614' // Source: ..\\plugins\\vee-validate.js (mode: 'client')
import nuxt_plugin_i18n_66ff12a5 from 'nuxt_plugin_i18n_66ff12a5' // Source: ..\\plugins\\i18n.js (mode: 'all')
import nuxt_plugin_axios_397e53b5 from 'nuxt_plugin_axios_397e53b5' // Source: ..\\plugins\\axios.js (mode: 'all')
import nuxt_plugin_persistedstate_38254ec5 from 'nuxt_plugin_persistedstate_38254ec5' // Source: ..\\plugins\\persistedstate.js (mode: 'client')
import nuxt_plugin_vuecountrydialcode_3cf7403f from 'nuxt_plugin_vuecountrydialcode_3cf7403f' // Source: ..\\plugins\\vue-country-dial-code.js (mode: 'all')
import nuxt_plugin_vueaddtocalendar_3b160eee from 'nuxt_plugin_vueaddtocalendar_3b160eee' // Source: ..\\plugins\\vue-add-to-calendar.js (mode: 'all')
import nuxt_plugin_stripePlugins_331fec78 from 'nuxt_plugin_stripePlugins_331fec78' // Source: ..\\plugins\\stripePlugins.js (mode: 'client')
import nuxt_plugin_vClickOutside_6739adc2 from 'nuxt_plugin_vClickOutside_6739adc2' // Source: ..\\plugins\\vClickOutside (mode: 'client')
import nuxt_plugin_auth_53345474 from 'nuxt_plugin_auth_53345474' // Source: .\\auth.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Object.defineProperty(Vue.prototype, '$nuxt', {
  get() {
    const globalNuxt = this.$root.$options.$nuxt
    if (process.client && !globalNuxt && typeof window !== 'undefined') {
      return window.$nuxt
    }
    return globalNuxt
  },
  configurable: true
})

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

const originalRegisterModule = Vuex.Store.prototype.registerModule

function registerModule (path, rawModule, options = {}) {
  const preserveState = process.client && (
    Array.isArray(path)
      ? !!path.reduce((namespacedState, path) => namespacedState && namespacedState[path], this.state)
      : path in this.state
  )
  return originalRegisterModule.call(this, path, rawModule, { preserveState, ...options })
}

async function createApp(ssrContext, config = {}) {
  const router = await createRouter(ssrContext, config)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  store.registerModule = registerModule

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"mccm","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"mccm"},{"name":"format-detection","content":"telephone=no"}],"script":[{"src":"https:\u002F\u002Fjs.stripe.com\u002Fv3\u002F"}],"link":[{"rel":"icon","type":"image\u002Fpng","href":"\u002Ffavicon.png"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss2?family=Work+Sans:wght@300;400;500&display=swap"}],"style":[]},

    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  function inject(key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value
    // Add into context
    if (!app.context[key]) {
      app.context[key] = value
    }

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue.prototype, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Inject runtime config as $config
  inject('config', config)

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Add enablePreview(previewData = {}) in context for plugins
  if (process.static && process.client) {
    app.context.enablePreview = function (previewData = {}) {
      app.previewData = Object.assign({}, previewData)
      inject('preview', previewData)
    }
  }
  // Plugin execution

  if (typeof nuxt_plugin_plugin_5fc61f87 === 'function') {
    await nuxt_plugin_plugin_5fc61f87(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_625f0b4e === 'function') {
    await nuxt_plugin_bootstrapvue_625f0b4e(app.context, inject)
  }

  if (typeof nuxt_plugin_vuesocialsharingplugin_4fb1e823 === 'function') {
    await nuxt_plugin_vuesocialsharingplugin_4fb1e823(app.context, inject)
  }

  if (typeof nuxt_plugin_recaptcha_478660ce === 'function') {
    await nuxt_plugin_recaptcha_478660ce(app.context, inject)
  }

  if (typeof nuxt_plugin_moment_37561ea4 === 'function') {
    await nuxt_plugin_moment_37561ea4(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_toast_4ef3b2d9 === 'function') {
    await nuxt_plugin_toast_4ef3b2d9(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_workbox_6152f8c6 === 'function') {
    await nuxt_plugin_workbox_6152f8c6(app.context, inject)
  }

  if (typeof nuxt_plugin_metaplugin_74b3c746 === 'function') {
    await nuxt_plugin_metaplugin_74b3c746(app.context, inject)
  }

  if (typeof nuxt_plugin_iconplugin_795b6cba === 'function') {
    await nuxt_plugin_iconplugin_795b6cba(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_fa7933ac === 'function') {
    await nuxt_plugin_axios_fa7933ac(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginutils_360ee184 === 'function') {
    await nuxt_plugin_pluginutils_360ee184(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_b845c462 === 'function') {
    await nuxt_plugin_pluginrouting_b845c462(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_215a3800 === 'function') {
    await nuxt_plugin_pluginmain_215a3800(app.context, inject)
  }

  if (typeof nuxt_plugin_image_6dca6325 === 'function') {
    await nuxt_plugin_image_6dca6325(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_veevalidate_21716614 === 'function') {
    await nuxt_plugin_veevalidate_21716614(app.context, inject)
  }

  if (typeof nuxt_plugin_i18n_66ff12a5 === 'function') {
    await nuxt_plugin_i18n_66ff12a5(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_397e53b5 === 'function') {
    await nuxt_plugin_axios_397e53b5(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_persistedstate_38254ec5 === 'function') {
    await nuxt_plugin_persistedstate_38254ec5(app.context, inject)
  }

  if (typeof nuxt_plugin_vuecountrydialcode_3cf7403f === 'function') {
    await nuxt_plugin_vuecountrydialcode_3cf7403f(app.context, inject)
  }

  if (typeof nuxt_plugin_vueaddtocalendar_3b160eee === 'function') {
    await nuxt_plugin_vueaddtocalendar_3b160eee(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_stripePlugins_331fec78 === 'function') {
    await nuxt_plugin_stripePlugins_331fec78(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vClickOutside_6739adc2 === 'function') {
    await nuxt_plugin_vClickOutside_6739adc2(app.context, inject)
  }

  if (typeof nuxt_plugin_auth_53345474 === 'function') {
    await nuxt_plugin_auth_53345474(app.context, inject)
  }

  // Lock enablePreview in context
  if (process.static && process.client) {
    app.context.enablePreview = function () {
      console.warn('You cannot call enablePreview() outside a plugin.')
    }
  }

  // Wait for async component to be resolved first
  await new Promise((resolve, reject) => {
    // Ignore 404s rather than blindly replacing URL in browser
    if (process.client) {
      const { route } = router.resolve(app.context.route.fullPath)
      if (!route.matched.length) {
        return resolve()
      }
    }
    router.replace(app.context.route.fullPath, resolve, (err) => {
      // https://github.com/vuejs/vue-router/blob/v3.4.3/src/util/errors.js
      if (!err._isRouter) return reject(err)
      if (err.type !== 2 /* NavigationFailureType.redirected */) return resolve()

      // navigated to a different route in router guard
      const unregister = router.afterEach(async (to, from) => {
        if (process.server && ssrContext && ssrContext.url) {
          ssrContext.url = to.fullPath
        }
        app.context.route = await getRouteData(to)
        app.context.params = to.params || {}
        app.context.query = to.query || {}
        unregister()
        resolve()
      })
    })
  })

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
