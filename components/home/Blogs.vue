<template>
  <div v-if="blogs.length > 0" class="home_category py-5 mb-lg-5 mt-5">
    <div class="container-fluid">
      <h3>SEGMENTATION</h3>
      <div class="row">
        <div v-for="(item, index) in blogs" :key="index" class="col align-self-center">
          <article class="box text-center">
            <nuxt-link v-if="item.slug" :to="item | slug ">
            <figure>
              <nuxt-img
                preload
                format="webp"
                :src="item.image"
                alt="image"
                quality="100"
              />
            </figure>
            </nuxt-link>

          <!-- <div class="desc_box">
            <h2 class="text-uppercase mb-3 font-weight-normal">
              {{ item.title }}
            </h2>
            <p class="mb-4" v-html="item.description" />

          </div> -->
<!--            <HomeLinkSetByType class="mx-auto btn-outline-primary" :center="true" :item="item" />-->
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      blogs: []
    }
  },
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
