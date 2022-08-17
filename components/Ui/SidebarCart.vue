<template>
  <div>
    <b-sidebar id="card-sidebar" shadow right no-header body-class="p-4">
      <template #default="{ hide }">
        <div class="text-light fixed-total">
          <div class="">
            <h2 class="font-weight-normal mb-4 mt-2 h4 text-uppercase border-bottom border-light pb-3 d-flex align-items-center justify-content-between">
              <div>
                <img class="filter-invert mr-3" src="@/assets/img/basket.svg">
                {{ $t('cart.shopping_bag') }} ({{ products.length }})
              </div>
              <a href="javascript:void(0)" class="filter-invert" @click="hide"><img width="18" src="@/assets/img/close.svg"></a>
            </h2>
            <div v-if="!isUserLoggedIn" class="text-center">
              <p class="mb-1">
                {{ $t('cart.your_bag_is_empty') }}
              </p>
              <p>
                <nuxt-link class="sign-in-text" to="/login">
                  {{ $t('cart.sign_in_or_register') }}
                </nuxt-link>
                {{ $t('cart.to_add_products_to_the_bag') }}
              </p>
              <nuxt-link class="btn btn-primary mt-4 mb-5 col-md-2 mx-auto " to="/login">
                {{ $t('buy_products') }}
              </nuxt-link>
            </div>
            <div v-else-if="products.length > 0">
              <div class="">
                <div v-for="(product, index) in products" :key="index" class="mb-4">
                  <ProductCartProduct :product="product" />
                </div>
                <div class="go-cart p-4 text-dark text-center">
                  <div class="total mb-2 text-uppercase h5 font-weight-normal">
                    <span class="subtotal">{{ $t('Subtotal') }}</span>
                    <span class="value">{{ subTotal || 0 }}€</span>
                  </div>
                  <b-button size="sm" block to="/checkout">
                    {{ $t('purchase') }}
                  </b-button>
                </div>
              </div>
            </div>
            <div v-else class="text-center">
              <h5 class="text-center mt-5 text-uppercase p-5">
                {{ $t('cart.no_product_added_to_your_cart') }}
              </h5>
            </div>
          </div>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data () {
    return {
      recentlyViewedProducts: []
    }
  },
  computed: {
    ...mapState({
      products: state => state.cart.products,
      isUserLoggedIn: state => state.user.loggedIn
    }),
    ...mapGetters({
      totalProductPrice: 'cart/totalProductPrice',
      subTotal: 'cart/subTotal',
      totalUnits: 'cart/totalUnits'
    })
  },
  mounted () {
    if (!this.isUserLoggedIn) {
      this.setCartProduct([])
    } else {
      this.getCart()
      this.getRecentlyViewedProducts()
    }
  },
  methods: {
    async getRecentlyViewedProducts () {
      const { data } = await this.$axios.get('/recently-viewed/get')
      this.recentlyViewedProducts = data.data
    },
    ...mapActions({
      getCart: 'cart/getCart'
    }),
    ...mapMutations({
      setCartProduct: 'cart/setCartProduct'
    })
  }
}
</script>
<style lang="scss" scoped>
.go-cart {
    background: #000;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
.fixed-total{
  padding-bottom: 100px;
}
</style>
