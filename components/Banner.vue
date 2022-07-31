<template>
  <div class="banner" :class="{'hero-banner':heroBanner}">
    <template v-if="!$fetchState.pending">
      <div v-if="isMobile()" class="overlay" />
      <div v-if="data && !heroBanner" class="banner-content" :class="{white: inverse}">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-5 text-center">
              <h1 v-if="data.title" class="text-uppercase font-weight-normal mb-3">
                {{ data.title }}
              </h1>
              <h1 v-else class="text-uppercase font-weight-normal mb-3">
                {{ data.name }}
              </h1>
              <p class="px-lg-5 mb-4" v-if="data.message">
                {{ data.message }}
              </p>
              <p class="px-lg-5 mb-4" v-else>
                {{ data.description }}
              </p>
              <HomeLinkSetByType :item="data" :title="'Discover'" class="btn-primary" />
            </div>
          </div>
        </div>
      </div>
      <template v-if="!heroBanner">
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
      </template>
      <template v-if="heroBanner">
        <div class="hero-banner-image">
          <div class="image-container">
            <img       
              :src="require(`../assets/img/${bannerNew}`)"
              alt="banner"
            />
          </div>
        </div>
        <div class="banner-link">
          <nuxt-link to=''><span>View Lines</span></nuxt-link>
        </div> 
      </template>           
    </template>
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
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/scss/mixins.scss';
.banner {
  position: relative;
  min-height: 400px;
  .banner-content {
    text-align: center;
    padding: 2rem;
    color: #FFF;
    @media (min-width:992px){
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 0;
        right: 0;
        text-align: left;
      }
  }
  &.hero-banner{
    position: relative;
    height: 500px;
    min-height: 500px;
    @media screen and (min-width:768px){
      height: 400px;
      min-height: 400px;
    }
    @media screen and (min-width:1024px){
      height: 100vh;
      min-height: 100vh;
    }    
    .hero-banner-image{
      height: 100%;
      @include aspect-ratio(59.94,90);
      @media screen and (min-width:768px){
          @include aspect-ratio(48,25);
      }
      @media screen and (min-width:1024px){
        @include aspect-ratio(90,59.94);
      }
    }
    .banner-link{
      position: absolute;      
      left: 0;
      right: 0;
      bottom: 0;
      @media screen and (min-width:767px){
        bottom: 10%;
      }
      z-index: 1;
      text-align: center;
      overflow: hidden;
      a{
        position: relative;      
        display: inline-block;
        color: white;
        font-size: 13px;
        min-width: 150px;
        @media screen and (min-width:991px){
          min-width: 250px;
          max-height: 40px;
        }        
        text-align: center;
        padding: 8px;
        border: 1px solid white;
        text-decoration: none;
        text-transform: uppercase;
      }
    }
  }
}
</style>
