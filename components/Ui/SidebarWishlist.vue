<template>
  <div>
    <b-sidebar id="wishlist-sidebar" shadow right no-header body-class="p-4">
      <template #default="{ hide }">
        <div class="text-light fixed-total">
          <div class="">
            <h2 class="font-weight-normal mb-4 mt-2 h4 sidebar-title text-uppercase border-bottom border-light pb-3 d-flex align-items-center justify-content-between">
              <div>
                <img class="filter-invert sicon mr-3" src="@/assets/img/star.svg">
                {{ $t('Wishlist') }} ({{ wish.length > 0 ? wish.length: 0 }})
              </div>
              <a href="javascript:void(0)" class="filter-invert" @click="hide"><img width="18" src="@/assets/img/close.svg"></a>
            </h2>
            <div v-if="!isUserLoggedIn" class="text-center p-4">
              <p class="mx-auto col-lg-12">
                {{ $t('looking_for_your_wishlist') }}? {{ $t('sign_in_to_pick_up_where_you_left_off') }}
              </p>
              <nuxt-link class="btn btn-primary d-block mt-4 mb-5 mx-auto filter-invert" to="/login">
                {{ $t('sign_in') }}
              </nuxt-link>
            </div>
            <div v-else-if="wish.length > 0">
              <template v-for="(product, index) in wish">
                <ProductWishlistProduct :key="index" :is-wish-list="true" :product="product" class="my-4" />
              </template>
              <div v-if="wish.length == 0" class="text-center">
                <h3 class="mb-5">
                  {{ $t('no_product_is_added_to_wish_list') }}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </template>
    </b-sidebar>
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
<style lang="scss" scoped>
.sidebar-title{
  @media (max-width:767px) {
      font-size: 1.25rem;
  }
}
</style>
