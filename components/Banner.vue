<template>
  <div :class="(data.page == 'home')?' banner home-banner':'banner'">
    <div v-if="!$fetchState.pending" class="position-relative">
      <div v-if="isMobile()" class="overlay" />
    </div>
    <nuxt-img
      v-if="data && data.banner"
      preload
      format="webp"
      :src="data.banner"
      alt="banner"
      quality="100"
      class="mx-auto d-block"
    />
    <nuxt-img
      v-else-if="data && data.image"
      preload
      format="webp"
      :src="data.image"
      alt="banner"
      quality="100"
      class="mx-auto d-block"
    />
    <div v-if="data" class="banner-content">
      <div class="container-fluid">
        <div class="row">
          <div v-if="data.page !== 'home'" class="col-md-10 text-center mx-auto">
            <h1 v-if="data.title" class="text-uppercase font-weight-bold mb-3">
              {{ data.title }}
            </h1>
            <h1 v-else class="text-uppercase font-weight-bold mb-3">
              {{ data.name }}
            </h1>
            <p v-if="data.message" class="px-lg-5 mb-4">
              {{ data.message }}
            </p>
            <p v-else class="px-lg-5 mb-4">
              {{ data.description }}
            </p>
          </div>
          <div v-if="data.page == 'home'" class="mx-auto">
            <HomeLinkSetByType :item="data" :title="'VIEW LINES'" class="btn-bnr" />
          </div>
        </div>
      </div>
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
      default: () => 'banner.png'
    },
    inverse: {
      type: Boolean,
      default: () => false
    },
    heroBanner: {
      type: Boolean,
      default: () => false
    }
  },

  data () {
    return {
      data: {},
      type: 'product',
      bannerNew: 'bannerNew.jpg'
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
    if (this.type === 'category') {
      this.$emit('get-segment-id', this.data.id)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.banner.home-banner{
  img{
    width: 100%;
    height: 76vh;
    object-fit: contain;
  }
}
.banner {
  padding: 60px 0;
  .banner-content {
    text-align: center;
    padding: 2rem;
    color: #FFF;
    p{
      margin-top: 40px;
      font-size: 30px;
      font-weight: normal;
    }
    a.btn-bnr{
      border: 1px solid #FFFFFF;
      width: 320px;
      padding: 15px;
    }
  }
}
</style>
