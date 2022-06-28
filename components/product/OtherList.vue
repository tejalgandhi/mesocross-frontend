<template>
  <div class="best_seller">
    <div class="container">
      <h2 class="text-uppercase text-center font-weight-normal mb-5 mb-lg-4">
        {{ title }}
      </h2>
      <VueSlickCarousel v-if="products.length" v-bind="settings1" class="pro_slider d-md-none">
        <ProductSingle v-for="(product, index) in products" :key="index+product.id" :product="product" :class-name="'product-slide'" />
      </VueSlickCarousel>
      <div class="row justify-content-center d-none d-md-flex">
        <ProductSingle v-for="(product, index) in products" :key="index" :product="product" :class-name="'col-lg-4 col-md-6'" />
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
