<template>
  <nuxt-link v-if="item.slug" :to="item | slug " class="btn">
    {{ title }}
  </nuxt-link>
</template>

<script>
export default {
  filters: {
    slug (value) {
      switch (value.type) {
        case 'product':
          return `/product-detail/${value.slug}`
        case 'treatment':
          return `/products/ts/${value.slug}`
        case 'category':
          return `/products/${value.slug}`
        case 'blog':
          return `/blog-detail/${value.slug}`
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
    },
    center: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.btn{
  min-width: 215px;
}
</style>
