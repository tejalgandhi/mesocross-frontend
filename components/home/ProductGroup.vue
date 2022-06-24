<template>
  <main v-if="newProducts.length > 0">
    <div class="container-fluid">
      <h2 class="text-uppercase font-weight-normal mb-4 mb-lg-5 text-center">
        {{ $t(title) }}
      </h2>
      <div class="row justify-content-center">
        <div v-for="(item,index) in newProducts" :key="index" class="col-md-4" @click="$router.push(`/product-detail/${item.slug}`)">
          <article class="productItem p-4 text-center cursor-pointer">
            <figure>
              <nuxt-img
                preload
                format="webp"
                :src="uploadPath + item.feature_image"
                alt="product"
                class="product"
                quality="100"
                sizes="xs:256 md:512"
              />
            </figure>
            <!-- <img v-if="isNew" src="@/assets/img/new-badge.png" alt="badge" class="badge_new"> -->
            <div class="desc_box p-4">
              <div class="product-title mb-3">
                {{ item.name }}
              </div>
              <p>{{ item.short_description }}</p>
              <span v-if="$auth.loggedIn">{{ item.product_size.price }}€</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    api: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    isNew: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      newProducts: [],
      settings1: {
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        edgeFriction: 0.35,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      }
    }
  },
  async fetch () {
    const { data } = await this.$axios.get(`/products/${this.api}`)
    this.newProducts = data.data
  },
  fetchOnServer: true,
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    }),
    uploadPath () {
      return process.env.uploadURL
    }
  }
}
</script>
<style lang="scss" scoped>
.product-title{
  font: normal normal normal 18px/16px Arial;
    letter-spacing: 1.25px;
  color: #FFFFFF;
  text-transform: uppercase;
  opacity: 1;
}
p {
  color: #FFFFFF;
  opacity: 0.6;
  font: normal normal normal 16px/16px Arial;

}
.productItem{
 img{
  max-height: 310px;
 }
}
</style>
