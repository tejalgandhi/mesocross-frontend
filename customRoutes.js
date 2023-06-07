const routes = [
  {
    name: 'product-treatment',
    path: '/products/ts/:treatmentSlug',
    component: 'pages/products.vue'
  },
  {
    name: 'category-product',
    path: '/products/:categorySlug',
    component: 'pages/products.vue'
  }
]
export default routes
