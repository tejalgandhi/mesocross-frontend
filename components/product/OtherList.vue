<template>
  <div class="best_seller">
    <div class="container">
      <h2>{{ title }}</h2>
      <div class="row justify-content-center">
        <div v-for="(product, index) in products" :key="index" class="col-lg-3">
          <div class="prod_box">
            <nuxt-link
              :to="`/product-detail/${product.slug}`"
            >
              <img :src="product.feature_image" alt="">
              <div class="desc_box">
                <span>{{ product.name }}</span>
                <p>{{ product.short_description }}</p>
                <span v-if="isLoggedin">{{ productPrice(product) }}€</span>
              </div>
            </nuxt-link>
          </div>
        </div>
        <!-- <div class="col-lg-3">
          <div class="prod_box">
            <img src="@/assets/img/p2.png" alt="">
            <div class="desc_box">
              <a href="#">Sun cream 50+</a>
              <p>Cream for oily skin</p>
              <span>35€</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: 'Recently Viewed'
    },
    products: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  computed: {
    productPrice () {
      return (product) => {
        if (product && product.price) {
          const prices = JSON.parse(product.price)
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
