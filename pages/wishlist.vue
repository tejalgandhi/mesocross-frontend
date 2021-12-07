<template>
  <div class="wishlist">
    <div class="container">
      <h2>Wishlist</h2>
      <div v-if="!isUserLoggedIn">
        <h3>Looking for your wishlist? Sign in to pick up where you left off</h3>
        <nuxt-link class="btn" to="/login">
          Sign In
        </nuxt-link>
      </div>
      <div v-else class="row justify-content-center">
        <ProductSingle v-for="(product, index) in wish" :key="index" :is-wish-list="true" :product="product" :class-name="'col-lg-3 mb-4'" />
        <div v-if="wish.length == 0" class="text-center">
          <h3 class="mb-5" style="font-size: 22px">
            No Product is added to wish list
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      wishLists: []
    }
  },
  computed: {
    ...mapState({
      wish: state => state.cart.wishList,
      isUserLoggedIn: state => state.user.loggedIn
    })
    // isUserLoggedIn () {
    //   return this.$auth.user
    // }
  },
  mounted () {
    if (this.isUserLoggedIn) {
      this.getWishList()
    }
  },
  methods: {
    ...mapActions({
      getWishList: 'cart/getWishList'
    })
  }
}
</script>
