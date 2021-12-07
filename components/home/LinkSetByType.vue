<template>
  <div>
    <nuxt-link v-if="item.slug && item.slug" :to="item | slug ">
      {{ title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  filters: {
    slug (value) {
      switch (value.type) {
        case 'product':
          return `product-detail/${value.slug}`
        case 'treatment':
          return `/products/ts/${value.slug}`
        case 'category':
          return `/products/${value.slug}`
        default:
          return ''
      }
    }
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: 'View More'
    }
  }
}
</script>

<style>

</style>
