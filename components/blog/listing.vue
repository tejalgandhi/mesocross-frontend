<template>
  <div class="col-lg-9">
    <div class="row">
      <div v-for="(product, index) in blogs" :key="index" class="col-lg-4">
        <div class="product_box">
          <nuxt-link :to="`/blog-detail/${product.slug}`" />
          <div class="img_box">
            <img :src="product.image" alt="">
          </div>
          <div class="content_box">
            <small>{{ product.treatment_solution_name }}</small><br>
            <label>{{ product.title }}</label>
            <p /><div :inner-html.prop="product.content | blogContent" /></p>
            <span>{{ $moment(product.created_at).format('MMMM D, YYYY') }}</span>
          </div>
        </div>
      </div>
      <div v-if="paginate.meta && paginate.meta.last_page > paginate.meta.current_page" class="view_more">
        <a @click="viewMore">View more</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    blogContent (content) {
      return `${content.substring(0, 100)}...`
    }
  },
  props: {
    blogs: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    paginate: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  methods: {
    viewMore () {
      const nextPage = this.paginate.meta.current_page + 1
      this.$emit('fetchBlogs', nextPage)
    }
  }
}
</script>

<style>

</style>
