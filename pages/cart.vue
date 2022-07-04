<template>
  <div>
    <div class="cart">
      <div class="container-fluid">
        <h2 class="text-uppercase font-weight-normal text-center mb-lg-5 mb-4">
          {{ $t('cart.shopping_bag') }}
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
          <nuxt-link class="btn btn-primary mt-4 mb-5 col-md-3 mx-auto " to="/login">
            {{ $t('buy_products') }}
          </nuxt-link>
        </div>
        <div v-else class="row justify-content-center">
          <div class="col-lg-9 pr-lg-5">
            <div class="row text-center">
              <div class="col-4">
                <label class="th-head">
                  Item info
                </label>
              </div>
              <div class="col-3">
                <label class="th-head">
                  Quantity
                </label>
              </div>
              <div class="col-3">
                <label class="th-head">
                  Price
                </label>
              </div>
              <div class="col-2">
                <label class="th-head">
                  Total
                </label>
              </div>
            </div>

            <div v-for="(product, index) in products" :key="index">
              <ProductCartProduct :product="product" />
            </div>
          </div>
          <div v-if="products.length > 0" class="col-lg-3">
            <div class="summary">
              <h5 class="mb-3">
                {{ $t('order_summary') }}
              </h5>
              <div class="promo-code p-4 mb-4">
                <label>Insert your promo code</label>
                <input type="text" class="form-control border-0" placeholder="Enter promo code">
              </div>
              <div class="prod_detail">
                <div class="product d-flex justify-content-between font-weight-bold">
                  <label> {{ totalUnits }} {{ $t('units') }} ({{ products.length }} X {{ $t('products') }})</label> <strong>{{ subTotal }} €</strong>
                </div>
                <div class="d-flex justify-content-between">
                  <label>{{ $t('discount') }}</label> <span>0 €</span>
                </div>
                <div class="d-flex justify-content-between py-2 mt-2 mb-4 border-top">
                  <label>{{ $t('total') }}</label> <strong>{{ subTotal }} €</strong>
                </div>
                <nuxt-link to="/checkout" class="btn btn-primary btn-block">
                  {{ $t('cart.go_to_checkout') }}
                </nuxt-link>
                <!-- <nuxt-link to="/checkout" class="continue">
                  {{ $t('cart.continue_to_buy') }}
                </nuxt-link> -->
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

<style lang="scss" scoped>
.cart{
  margin: 84px 0;
  @media (max-width:768px) {
    margin: 42px 0;
  }
}
.promo-code {
  background: rgba(#fff, 0.12) ;
}
.th-head{
  font: normal normal normal 14px/16px Arial;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 0.4;
}
</style>
