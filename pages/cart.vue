<template>
  <div>
    <div class="cart">
      <div class="container">
        <h2>{{ $t('cart.shopping_bag') }}</h2>
        <div v-if="!isUserLoggedIn" class="text-center">
          <h4 class="mb-0">
            {{ $t('cart.your_bag_is_empty') }}
          </h4>
          <p>
            <nuxt-link class="sign-in-text" to="/login">
              {{ $t('cart.sign_in_or_register') }}
            </nuxt-link>
            {{ $t('cart.to_add_products_to_the_bag') }}
          </p>
          <nuxt-link class="btn d-block mt-4 mb-5 col-md-3 mx-auto sign-in text-white" to="/login">
            {{ $t('buy_products') }}
          </nuxt-link>
        </div>
        <div v-else class="row justify-content-center">
          <h3 v-if="products.length > 0">
            {{ $t('your_products') }}
          </h3>
          <div class="col-lg-9">
            <div v-for="(product, index) in products" :key="index">
              <ProductCartProduct :product="product" />
            </div>
          </div>
          <div v-if="products.length > 0" class="col-lg-3">
            <div class="summary">
              <h3>{{ $t('order_summary') }}</h3>
              <div class="prod_detail">
                <p class="product">
                  <label> {{ totalUnits }} {{ $t('units') }} ({{ products.length }} X {{ $t('products') }})</label> <span>{{ subTotal }} €</span>
                </p>
                <p><label>{{ $t('discount') }}</label> <span>0 €</span></p>
                <p class="total">
                  <label>{{ $t('total') }}</label> <span>{{ subTotal }} €</span>
                </p>
                <nuxt-link to="/checkout" class="checkout">
                  {{ $t('cart.go_to_checkout') }}
                </nuxt-link>
                <nuxt-link to="/checkout" class="continue">
                  {{ $t('cart.continue_to_buy') }}
                </nuxt-link>
              </div>
            </div>
          </div>
          <div v-else class="text-center">
            <h3 class="text-center mt-5">
              {{ $t('cart.no_product_added_to_your_cart') }}
            </h3>
          </div>
        </div>
      </div>
    </div>
    <template v-if="recentlyViewedProducts.length">
      <ProductOtherList :products="recentlyViewedProducts" :title="$t('cart.recently_viewed')" />
    </template>
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

<style>
.sign-in-text {
  text-decoration: underline;
  font-weight: 500;
  color: #25282A;
}

.sign-in {
  background-color: #25282A;
}
</style>
