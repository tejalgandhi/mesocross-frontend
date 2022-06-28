<template>
  <div class="best_seller">
    <div class="container">
      <h2 class="text-uppercase text-center font-weight-normal mb-5 mb-lg-4">
        {{ title }}
      </h2>
      <VueSlickCarousel v-if="products.length" v-bind="settings1" class="pro_slider d-md-none">
        <div v-for="(product, index) in products" :key="index">
          <div class="prod_box">
            <nuxt-link
              class="text-decoration-none"
              :to="`/product-detail/${product.slug}`"
            >
              <nuxt-img
                preload
                format="webp"
                :src="product.feature_image"
                alt="image"
                class="product-image"
                quality="100"
                sizes="xs:256 md:512"
              />
              <div class="desc_box">
                <span>{{ product.name }}</span>
                <p>{{ product.short_description }}</p>
                <span v-if="$auth.loggedIn">{{ productPrice(product) }}€</span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </VueSlickCarousel>
      <div class="row justify-content-center d-none d-md-flex">
        <div v-for="(product, index) in products" :key="index" class="col-lg-4 col-6">
          <div class="productItem">
            <nuxt-link
              :to="`/product-detail/${product.slug}`"
            >
              <nuxt-img
                preload
                format="webp"
                :src="product.feature_image"
                alt="image"
                class="productImage"
                quality="100"
                sizes="xs:256 md:512"
              />
              <div class="desc_box">
                <h3 class="productTitle">
                  {{ product.name }}
                </h3>
                <p class="productDesc">
                  {{ product.short_description }}
                </p>
                <span v-if="$auth.loggedIn">{{ productPrice(product) }}€</span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import { mapState } from 'vuex'

export default {
  components: {
    VueSlickCarousel
  },
  props: {
    title: {
      type: String,
      default: 'Recently Viewed'
    },
    products: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  data () {
    return {
      settings1: {
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        edgeFriction: 0.35
      }
    }
  },
  computed: {
    productPrice () {
      return (product) => {
        if (product && product.price) {
          const prices = product.price
          return prices[0].price || ''
        } else {
          return ''
        }
      }
    },
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
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
@media (max-width: 991px) {
  .pro_slider img {
    height: 260px;
    margin-bottom: 20px;
  }
}
</style>
