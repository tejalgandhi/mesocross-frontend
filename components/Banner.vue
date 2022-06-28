<template>
  <div class="banner">
    <div v-if="!$fetchState.pending" class="position-relative">
      <div v-if="isMobile()" class="overlay" />
      <div v-if="data" class="banner-content" :class="{white: inverse}">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-6">
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
      </div>
      <nuxt-img
        v-if="data && data.banner"
        preload
        format="webp"
        :src="data.banner"
        alt="banner"
        quality="100"
        sizes="xs:1024 md:1366 lg:1920"
        class="ml-auto d-block"
      />
      <nuxt-img
        v-else-if="data && data.image"
        preload
        format="webp"
        :src="data.image"
        alt="banner"
        quality="100"
        sizes="xs:1024 md:1366 lg:1920"
        class="ml-auto d-block"
      />
      <nuxt-img
        v-else
        preload
        format="webp"
        :src="require(`../assets/img/${defualtImageName}`)"
        alt="banner"
        quality="100"
        sizes="xs:1024 md:1366 lg:1920"
        class="ml-auto d-block"
      />
    </div>
  </div>
</template>

<script>
import isMobile from '@/mixins/isMobile'
export default {
  mixins: [isMobile],

  props: {
    pageName: {
      type: String,
      default: 'blog'
    },
    defualtImageName: {
      type: String,
      default: () => 'CG-EN-MCCM-2020-23.svg'
    },
    inverse: {
      type: Boolean,
      default: () => false
    }
  },

  data () {
    return {
      data: {},
      type: 'product'
    }
  },
  async fetch () {
    let url = `/sliders?type=banner&page=${this.pageName}`
    if (this.$route.params && this.$route.params.treatmentSlug) {
      url = `/get-treatment-banner?treatment_slug=${this.$route.params.treatmentSlug}&page=product`
      this.type = 'tretment'
    } else if (this.$route.params && this.$route.params.categorySlug) {
      url = `get-category-banner?category_slug=${this.$route.params.categorySlug}&page=product`
      this.type = 'category'
    }
    const { data } = await this.$axios.$get(url)
    this.data = this.type === 'product' ? data[0] : data
  }
}
</script>
<style lang="scss" scoped>
.banner-content {
    text-align: center;
    padding: 2rem;
    @media (min-width:992px){
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 0;
        right: 0;
        text-align: left;
      }
  }
</style>
