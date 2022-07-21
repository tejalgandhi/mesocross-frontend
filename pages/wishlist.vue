<template>
  <div class="wishlist page-space">
    <div class="container">
      <h2 class="text-uppercase font-weight-normal text-center mb-4">
        {{ $t('Wishlist') }}
      </h2>
      <div v-if="!isUserLoggedIn" class="text-center">
        <p class="mx-auto col-lg-4">
          {{ $t('looking_for_your_wishlist') }}? {{ $t('sign_in_to_pick_up_where_you_left_off') }}
        </p>
        <nuxt-link class="btn btn-primary d-block mt-4 mb-5 col-md-3 mx-auto sign-in" to="/login">
          {{ $t('sign_in') }}
        </nuxt-link>
      </div>
      <div v-else class="row justify-content-center my-5">
        <ProductSingle v-for="(product, index) in wish" :key="index" :is-wish-list="true" :product="product" :class-name="'col-lg-4 mb-4'" />
        <div v-if="wish.length == 0" class="text-center">
          <h3 class="mb-5" style="font-size: 22px">
            {{ $t('no_product_is_added_to_wish_list') }}
          </h3>
        </div>
      </div>
    </div>
    <template v-if="recentlyViewedProducts.length">
      <ProductOtherList :products="recentlyViewedProducts" :title="$t('cart.recently_viewed')" />
    </template>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      wishLists: [],
      recentlyViewedProducts: []
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
      this.getRecentlyViewedProducts()
      this.getWishList()
    }
  },
  methods: {
    ...mapActions({
      getWishList: 'cart/getWishList'
    }),
    async getRecentlyViewedProducts () {
      const { data } = await this.$axios.get('/recently-viewed/get')
      this.recentlyViewedProducts = data.data
    }
  }
}
</script>
<style scoped>
/* .sign-in {
  background-color: #25282A;
} */
</style>
