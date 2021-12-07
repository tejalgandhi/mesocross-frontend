<template>
  <div>
    <div class="cart">
      <div class="container">
        <h2>Shopping Bag</h2>
        <div v-if="!isUserLoggedIn">
          <h3>Your Bag is Empty</h3>
          <p>
            <nuxt-link class="btn" to="/login">
              Sign In or Register
            </nuxt-link>
            to add products to the bag
          </p>
        </div>
        <div v-else class="row justify-content-center">
          <h3 v-if="products.length > 0">
            Your products
          </h3>
          <div class="col-lg-9">
            <div v-for="(product, index) in products" :key="index">
              <ProductCartProduct :product="product" />
            </div>
          </div>
          <div v-if="products.length > 0" class="col-lg-3">
            <div class="summary">
              <h3>Order summary</h3>
              <div class="prod_detail">
                <p class="product">
                  <label> {{ totalUnits }} Units ({{ products.length }} X products)</label> <span>{{ totalProductPrice }} €</span>
                </p>
                <p><label>Dicount</label> <span>0 €</span></p>
                <p><label>Shipping</label> <span>0 €</span></p>
                <p class="total">
                  <label>Total</label> <span>{{ totalProductPrice }} €</span>
                </p>
                <nuxt-link to="/checkout" class="checkout">
                  Go to checkout
                </nuxt-link>
                <nuxt-link to="/checkout" class="continue">
                  Continue to buy
                </nuxt-link>
              </div>
            </div>
          </div>
          <div v-else class="text-center">
            <h3 class="text-center mt-5">
              No Product added to your cart
            </h3>
          </div>
        </div>
      </div>
    </div>
    <template v-if="recentlyViewedProducts.length">
      <ProductOtherList :products="recentlyViewedProducts" :title="`Recently Viewed`" />
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
