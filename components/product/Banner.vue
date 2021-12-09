<template>
  <div class="banner">
    <div class="position-relative product-banner">
      <div class="row mx-0">
        <div class="col-md-6 pl-md-5 align-self-center text-center text-white banner-text">
          <h1>Lorem ipsum dolor</h1>
        </div>
        <div class="col-md-6 px-0">
          <img src="@/assets/img/product-banner.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {},
      type: 'product'
    }
  },
  async fetch () {
    let url = '/sliders?type=banner&page=product'
    if (this.$route.params && this.$route.params.tretmentSlug) {
      url = `/get-treatment-banner?treatment_slug=${this.$route.params.tretmentSlug}&page=product`
      this.type = 'tretment'
    } else if (this.$route.params && this.$route.params.categorySlug) {
      url = `get-category-banner?category_slug=${this.$route.params.categorySlug}&page=product`
      this.type = 'category'
    }
    const { data } = await this.$axios.$get(url)
    this.data = this.type === 'product' ? data[0] : data
  },
  fetchOnServer: true
}
</script>
