import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _11c843a1 = () => interopDefault(import('..\\pages\\about-training.vue' /* webpackChunkName: "pages/about-training" */))
const _061316a5 = () => interopDefault(import('..\\pages\\about-us.vue' /* webpackChunkName: "pages/about-us" */))
const _464fd958 = () => interopDefault(import('..\\pages\\all-equipments.vue' /* webpackChunkName: "pages/all-equipments" */))
const _8aaad14c = () => interopDefault(import('..\\pages\\blogs.vue' /* webpackChunkName: "pages/blogs" */))
const _eedf7932 = () => interopDefault(import('..\\pages\\cart.vue' /* webpackChunkName: "pages/cart" */))
const _d0b9b9e6 = () => interopDefault(import('..\\pages\\checkout.vue' /* webpackChunkName: "pages/checkout" */))
const _23a87998 = () => interopDefault(import('..\\pages\\construction.vue' /* webpackChunkName: "pages/construction" */))
const _67473d12 = () => interopDefault(import('..\\pages\\customize-treatment.vue' /* webpackChunkName: "pages/customize-treatment" */))
const _b3387a46 = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _2f9d7901 = () => interopDefault(import('..\\pages\\documents.vue' /* webpackChunkName: "pages/documents" */))
const _9a69e9a8 = () => interopDefault(import('..\\pages\\equipments.vue' /* webpackChunkName: "pages/equipments" */))
const _34e3bd3f = () => interopDefault(import('..\\pages\\exhibitions-and-events.vue' /* webpackChunkName: "pages/exhibitions-and-events" */))
const _0e869788 = () => interopDefault(import('..\\pages\\expansion.vue' /* webpackChunkName: "pages/expansion" */))
const _4ceebde4 = () => interopDefault(import('..\\pages\\forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */))
const _18ebd5b2 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _ea675a22 = () => interopDefault(import('..\\pages\\mccm-solution.vue' /* webpackChunkName: "pages/mccm-solution" */))
const _7ba64271 = () => interopDefault(import('..\\pages\\medical-spa.vue' /* webpackChunkName: "pages/medical-spa" */))
const _63c49b7d = () => interopDefault(import('..\\pages\\our-story.vue' /* webpackChunkName: "pages/our-story" */))
const _7df8682b = () => interopDefault(import('..\\pages\\products.vue' /* webpackChunkName: "pages/products" */))
const _4aabe42c = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _4a40c340 = () => interopDefault(import('..\\pages\\reset-password.vue' /* webpackChunkName: "pages/reset-password" */))
const _a1ed1988 = () => interopDefault(import('..\\pages\\thankyou.vue' /* webpackChunkName: "pages/thankyou" */))
const _33b409a2 = () => interopDefault(import('..\\pages\\training-checkout.vue' /* webpackChunkName: "pages/training-checkout" */))
const _d5950216 = () => interopDefault(import('..\\pages\\training-pack.vue' /* webpackChunkName: "pages/training-pack" */))
const _6b9a17ca = () => interopDefault(import('..\\pages\\training-static.vue' /* webpackChunkName: "pages/training-static" */))
const _34cacc42 = () => interopDefault(import('..\\pages\\trainingplayer.vue' /* webpackChunkName: "pages/trainingplayer" */))
const _a17b7ebc = () => interopDefault(import('..\\pages\\trainings.vue' /* webpackChunkName: "pages/trainings" */))
const _82562f2c = () => interopDefault(import('..\\pages\\treatment-results.vue' /* webpackChunkName: "pages/treatment-results" */))
const _c1ad6ea6 = () => interopDefault(import('..\\pages\\under-construction.vue' /* webpackChunkName: "pages/under-construction" */))
const _2ed5340c = () => interopDefault(import('..\\pages\\wishlist.vue' /* webpackChunkName: "pages/wishlist" */))
const _775b3bc1 = () => interopDefault(import('..\\pages\\newsletter\\unsubscribe.vue' /* webpackChunkName: "pages/newsletter/unsubscribe" */))
const _38c532b5 = () => interopDefault(import('..\\pages\\blog-detail\\_slug.vue' /* webpackChunkName: "pages/blog-detail/_slug" */))
const _891e3e24 = () => interopDefault(import('..\\pages\\equipment-details\\_slug.vue' /* webpackChunkName: "pages/equipment-details/_slug" */))
const _4d7d8b24 = () => interopDefault(import('..\\pages\\page\\_slug.vue' /* webpackChunkName: "pages/page/_slug" */))
const _d70a04f8 = () => interopDefault(import('..\\pages\\product-detail\\_slug.vue' /* webpackChunkName: "pages/product-detail/_slug" */))
const _54905575 = () => interopDefault(import('..\\pages\\services\\_slug.vue' /* webpackChunkName: "pages/services/_slug" */))
const _bbee4326 = () => interopDefault(import('..\\pages\\training-detail\\_slug.vue' /* webpackChunkName: "pages/training-detail/_slug" */))
const _4f44329b = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about-training",
    component: _11c843a1,
    name: "about-training"
  }, {
    path: "/about-us",
    component: _061316a5,
    name: "about-us"
  }, {
    path: "/all-equipments",
    component: _464fd958,
    name: "all-equipments"
  }, {
    path: "/blogs",
    component: _8aaad14c,
    name: "blogs"
  }, {
    path: "/cart",
    component: _eedf7932,
    name: "cart"
  }, {
    path: "/checkout",
    component: _d0b9b9e6,
    name: "checkout"
  }, {
    path: "/construction",
    component: _23a87998,
    name: "construction"
  }, {
    path: "/customize-treatment",
    component: _67473d12,
    name: "customize-treatment"
  }, {
    path: "/dashboard",
    component: _b3387a46,
    name: "dashboard"
  }, {
    path: "/documents",
    component: _2f9d7901,
    name: "documents"
  }, {
    path: "/equipments",
    component: _9a69e9a8,
    name: "equipments"
  }, {
    path: "/exhibitions-and-events",
    component: _34e3bd3f,
    name: "exhibitions-and-events"
  }, {
    path: "/expansion",
    component: _0e869788,
    name: "expansion"
  }, {
    path: "/forgot-password",
    component: _4ceebde4,
    name: "forgot-password"
  }, {
    path: "/login",
    component: _18ebd5b2,
    name: "login"
  }, {
    path: "/mccm-solution",
    component: _ea675a22,
    name: "mccm-solution"
  }, {
    path: "/medical-spa",
    component: _7ba64271,
    name: "medical-spa"
  }, {
    path: "/our-story",
    component: _63c49b7d,
    name: "our-story"
  }, {
    path: "/products",
    component: _7df8682b,
    name: "products"
  }, {
    path: "/register",
    component: _4aabe42c,
    name: "register"
  }, {
    path: "/reset-password",
    component: _4a40c340,
    name: "reset-password"
  }, {
    path: "/thankyou",
    component: _a1ed1988,
    name: "thankyou"
  }, {
    path: "/training-checkout",
    component: _33b409a2,
    name: "training-checkout"
  }, {
    path: "/training-pack",
    component: _d5950216,
    name: "training-pack"
  }, {
    path: "/training-static",
    component: _6b9a17ca,
    name: "training-static"
  }, {
    path: "/trainingplayer",
    component: _34cacc42,
    name: "trainingplayer"
  }, {
    path: "/trainings",
    component: _a17b7ebc,
    name: "trainings"
  }, {
    path: "/treatment-results",
    component: _82562f2c,
    name: "treatment-results"
  }, {
    path: "/under-construction",
    component: _c1ad6ea6,
    name: "under-construction"
  }, {
    path: "/wishlist",
    component: _2ed5340c,
    name: "wishlist"
  }, {
    path: "/newsletter/unsubscribe",
    component: _775b3bc1,
    name: "newsletter/unsubscribe"
  }, {
    path: "/blog-detail/:slug?",
    component: _38c532b5,
    name: "blog-detail/slug"
  }, {
    path: "/equipment-details/:slug?",
    component: _891e3e24,
    name: "equipment-details/slug"
  }, {
    path: "/page/:slug?",
    component: _4d7d8b24,
    name: "page/slug"
  }, {
    path: "/product-detail/:slug?",
    component: _d70a04f8,
    name: "product-detail/slug"
  }, {
    path: "/services/:slug?",
    component: _54905575,
    name: "services/slug"
  }, {
    path: "/training-detail/:slug?",
    component: _bbee4326,
    name: "training-detail/slug"
  }, {
    path: "/",
    component: _4f44329b,
    name: "index"
  }, {
    path: "/products/ts/:treatmentSlug",
    component: _7df8682b,
    name: "product-treatment"
  }, {
    path: "/products/:categorySlug",
    component: _7df8682b,
    name: "category-product"
  }, {
    path: "/trainings/:trainingSlug",
    component: _bbee4326,
    name: "training-detail"
  }, {
    path: "/equipments/:categorySlug",
    component: _9a69e9a8
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
