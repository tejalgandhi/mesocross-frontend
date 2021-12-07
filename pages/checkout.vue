<template>
  <div class="container-fluid mx-auto shipping-tab mb-5 pb-5">
    <div class="row mx-0">
      <div class="col-md-11 mx-auto">
        <div class="w-100 mb-5">
          <CheckoutTab :tab-index="tabIndex" />
        </div>

        <div class="row mx-0">
          <div class="col-lg-9">
            <div class="tab-content">
              <div class="d-flex align-items-center font-16 text-dark w-auto" style="cursor: pointer">
                <img v-if="tabIndex != 1" src="@/assets/img/left-arrow.svg" class="mr-2 left-arr" alt="">
                <p v-if="tabIndex != 1" class="text-dark back-text" @click="back">
                  Back
                </p>
              </div>
              <div v-if="tabIndex == 1" id="shipping" class="tab-pane fade show active shipping">
                <Shipping />
              </div>
              <div v-if="tabIndex == 2" id="payment" class="show shipping">
                <checkout-payment />
              </div>
              <div v-if="tabIndex == 3" id="review" class="show shipping pt-2">
                <checkout-review class="mt-5" />
              </div>
            </div>
          </div>
          <CheckoutOrderSummary @countinue="continueCheckout" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      tabIndex: 1
    }
  },
  computed: {
    ...mapState({
      products: state => state.cart.products
    }),
    ...mapGetters({
      address: 'user/getUserAddress',
      totalProductPrice: 'cart/totalProductPrice',
      getOrderProducts: 'cart/getOrderProducts'
    })
  },
  methods: {
    continueCheckout () {
      if (this.tabIndex === 3) { // PLACE AN ORDER
        const orderPayload = {
          address_id: this.address.id,
          promo_code: '',
          discount_type: '',
          discount_price: 0,
          shipping_price: 0,
          sub_total: this.totalProductPrice,
          total: this.totalProductPrice,
          products: this.getOrderProducts
        }
        this.$axios.post('/order/store', orderPayload).then(({ data }) => {
          if (data.status) {
            this.setCartProduct([])
            this.$toast.success('Order Placed Successfully.', { duration: 3000, position: 'top-right' })
            this.$router.push({ path: '/thankyou' })
          }
        }).catch(() => {})
      } else if (!this.address && this.tabIndex === 1) {
        this.$toast.error('Please Add or select your address.', { duration: 3000, position: 'top-right' })
      } else {
        this.tabIndex++
      }
    },
    back () {
      if (this.tabIndex > 1) {
        this.tabIndex--
      }
    },
    ...mapMutations({
      setCartProduct: 'cart/setCartProduct'
    })
  }
}
</script>

<style>
.back-text {
  text-decoration: underline;
}
.left-arr {
  transform: rotate(270deg);
}
</style>
