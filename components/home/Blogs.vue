<template>
  <div v-if="blogs.length > 0" class="home_category py-5 mb-lg-5 mt-5">
    <div class="container-fluid">
      <h3>{{ $t('segmentation') }}</h3>
      <div class="row align-items-center justify-content-center">
        <div v-for="(item, index) in blogs" :key="index" class="col-4 col-lg align-self-center">
          <article class="box text-center">
            <nuxt-link v-if="item.slug" :to="item | slug ">
              <figure
                @mouseover="hoveredImage = index"
                @mouseleave="hoveredImage = '' "
              >
                <nuxt-img
                  v-show="hoveredImage !== index"
                  preload
                  format="webp"
                  :src="item.image"
                  alt="image"
                  quality="100"
                />
                <nuxt-img
                  v-show="hoveredImage === index"
                  preload
                  format="webp"
                  :src="item.hover_image"
                  alt="image"
                  quality="100"
                />
              </figure>
            </nuxt-link>
          </article>
        </div>
      </div>
    </div>
  </div>
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
  data () {
    return {
      blogs: [],
      hoveredImage: null
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('/home/blogs/')
      this.blogs = data.data
    } catch (e) {

    }
  },
  fetchOnServer: true
}
</script>

<style lang="scss" scoped>
.home_category {
    h3{
      letter-spacing: 0px;
      color: #FFFFFF;
      font-size: 40px;
      text-align:center;
      margin-bottom:100px;
      font-weight:300;
      @media (max-width: 767px) {
          font-size: 24px;
          text-align:center;
          margin-bottom:40px;
      }
    }
}
.box {
    align-items: center;

    &.left {
        flex-direction: row;
        @media screen and (max-width: 768px){
            flex-direction: column;
        }
    }

    @media screen and (max-width: 768px){
        flex-direction: column;
    }

    figure {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: auto;
        }

        @media screen and (max-width: 768px){
            height: 400px;
        }
    }

    .desc_box {
        @media screen and (max-width: 768px){
            text-align: center;
        }
    }
}
</style>
