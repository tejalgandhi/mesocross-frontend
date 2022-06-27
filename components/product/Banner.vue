<template>
  <div class="banner">
    <div class="container-fluid position-relative px-0 px-md-3">
      <img v-if="data.banner" :src="data.banner" alt="image">
      <img v-else :src="data.image" alt="image">
      <div class="content">
        <h1 v-if="data.title">
          {{ data.title }}
        </h1>
        <h1 v-else>
          {{ data.name }}
        </h1>
        <p v-if="data.message">
          {{ data.message }}
        </p>
        <p v-else>
          {{ data.description }}
        </p>
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
    if (this.$route.params && this.$route.params.treatmentSlug) {
      url = `/get-treatment-banner?treatment_slug=${this.$route.params.treatmentSlug}&page=product`
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
