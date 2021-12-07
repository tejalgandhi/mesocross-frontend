<template>
  <div>
    <span>Thank you for your answers!</span>
    <h2 class="my-3">
      Your personalized treatment
    </h2>
    <span class="text-muted">{{ treatmentStr }} <a class="text-dark" style="text-decoration: underline" @click="$emit('changeDetail')">Change details</a></span>
    <div class="row answer-item py-5 border-bottom">
      <div class="col-12 text-center pt-4 pb-3 answer-text">
        <h2 v-if="products.length">
          {{ products.length }}
        </h2>
        <p>{{ treatment.treatments[selectedTreatment] }}</p>
      </div>

      <div class="row text-center">
        <div v-for="(product, index) in products" :key="index" class="col-3 answer-box">
          <div class="mx-4 my-4">
            <nuxt-link :to="`/product-detail/${product.slug}`">
              <div class="my-3">
                <img :src="product.feature_image" alt="">
              </div>
              <div class="customize-product-content">
                <p class="font-18 text-dark mb-2">
                  {{ product.name }}
                </p>
                <p class="font-16">
                  {{ product.short_description }}
                </p>
                <p v-if="isLoggedin" class="font-14 text-dark my-4">
                  {{ productPrice(product) }}€
                </p>
              </div>
            </nuxt-link>
            <div v-if="isLoggedin">
              <button v-if="!isThisProductIsInCart(product.id)" class="w-100 mb-3 d-block btn btn-dark text-white" @click="cart(product)">
                Add to Cart
              </button>
              <nuxt-link v-else class="w-100 mb-3 d-block btn btn-dark text-white" to="/cart">
                Go To Cart
              </nuxt-link>
              <button class="w-100 mb-3 d-block btn btn-outline-dark" @click="addToWishlist(product)">
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
        <div v-if="products.length == 0">
          No Product found
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    treatment: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    selectedTreatment: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default () {
        return []
      }
    }
  },
  computed: {
    treatmentStr () {
      return `${this.treatment.gender[this.treatment.gender.value]} / ${this.treatment.ageGroup[this.treatment.ageGroup.value]} / ${this.treatment.partsOfBody[this.treatment.partsOfBody.value]} / ${this.treatment.skinTypes[this.treatment.skinTypes.value]} / ${this.treatment.treatments[this.selectedTreatment]}`
    },
    productPrice () {
      return (product) => {
        const prices = JSON.parse(product.price)
        return prices[0].price || ''
      }
    },
    isThisProductIsInCart () {
      return (productId) => {
        return this.cartProducts.findIndex(val => val.product_id === productId) > -1
      }
    },
    isProductInWishList () {
      return (productId) => {
        return this.wishList.findIndex(pr => pr.product_id === productId) > -1
      }
    },
    ...mapState({
      cartProducts: state => state.cart.products,
      wishList: state => state.cart.wishList,
      isLoggedin: state => state.user.loggedIn
    })
  },
  created () {
    if (this.isLoggedin) {
      this.getCart()
      this.getWishList()
    }
  },
  methods: {
    cart (product) {
      const size = JSON.parse(product.price)
      const singleProduct = {
        name: product.name,
        slug: product.slug,
        price: size[0].price,
        size_id: product.productSize[0].id,
        feature_image: product.feature_image,
        size: product.productSize[0].name,
        product_id: product.id,
        ref_number: product.ref_number,
        flag: 1,
        qty: 1
      }
      this.addToCart(singleProduct)
      this.$toast.success('Product Added to cart successfully.', { duration: 3000, position: 'top-right' })
    },
    addToWishlist (product) {
      const singleProduct = {
        name: product.name,
        slug: product.slug,
        product_id: product.id,
        feature_image: product.feature_image,
        flag: !this.isProductInWishList(product.id) ? 1 : 2
      }
      this.addWishList(singleProduct)
    },
    ...mapActions({
      addToCart: 'cart/addToCart',
      addWishList: 'cart/addWishList',
      getCart: 'cart/getCart',
      getWishList: 'cart/getWishList'
    })
  }
}
</script>
