<template>
  <div class="container-fluid mx-auto shipping-tab mb-0 pb-5">
    <div class="row">
      <div class="col-md-12 mx-auto">
        <div class="w-100 my-5">
          <CheckoutTab :tab-index="tabIndex" />
        </div>
        <div class="row">
          <div class="col-lg pr-lg-4">
            <div class="tab-content">
              <div v-if="tabIndex != 1" class="d-flex align-items-center font-16 text-dark w-auto mb-4" style="cursor: pointer">
                <img
                  src="@/assets/img/left-arrow.svg"
                  class="mr-2 left-arr"
                  width="15"
                  alt="image"
                  @click="back"
                >
                <p class="text-dark text-uppercase back-text" @click="back">
                  {{ $t('back') }}
                </p>
              </div>
              <div v-if="tabIndex == 1" id="shipping" class="tab-pane fade show active shipping">
                <Shipping />
              </div>
              <div v-if="tabIndex == 2" id="payment" class="show shipping">
                <checkout-add-payment-method v-if="isAddPayment" :bodytitle="$t('add_payment_method')" />
                <checkout-payment v-else :bodytitle="$t('checkout.select_your_payment_method')" />
              </div>
              <div v-if="tabIndex == 3" id="review" class="show shipping">
                <checkout-review ref="reviewComponent" @editPayment="callToSecondTab" />
              </div>
            </div>
          </div>
          <!-- <div id="card" /> -->
          <CheckoutOrderSummary :tabindex="tabIndex" :order-payload="orderPayload" @countinue="continueCheckout" />
          <b-modal
            id="multibancoModal"
            class="modal fade multibanco-modal"
            tabindex="-1"
            aria-hidden="true"
            hide-footer
            hide-header
            centered
          >
            <template #default="">
              <div class="welcome">
                <div class="container">
                  <div id="myTabContent">
                    <h4 class="my-3">
                      MultiBanco
                    </h4>
                    <p class="my-1">
                      Entity:  {{ multiBancoResponse.entity }}
                    </p>
                    <p class="my-1">
                      Reference: {{ multiBancoResponse.reference }}
                    </p>
                    <p class="my-1">
                      Amount: {{ multiBancoResponse.amount }} €
                    </p>
                    <b-button class="mt-3" block @click="goTo()">
                      Ok
                    </b-button>
                  </div>
                </div>
              </div>
            </template>
          </b-modal>
          <b-modal
            id="bankTransferModal"
            class="modal fade cash-modal"
            tabindex="-1"
            aria-hidden="true"
            hide-footer
            hide-header
            centered
          >
            <template #default="">
              <div class="welcome">
                <div class="container">
                  <div id="myTabContent">
                    <h4 class="my-3">
                      Bank Transfer
                    </h4>
                    <p class="my-3">
                      We have sent you an bank detail, Please check your mail and pay before conditional day
                    </p>
                    <strong>Thank you</strong>
                    <b-button class="mt-3" block @click="goTo()">
                      Ok
                    </b-button>
                  </div>
                </div>
              </div>
            </template>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  layout: 'dashboard',
  middleware: 'auth',

  data () {
    return {
      tabIndex: 1,
      reviewComponent: '',
      payment: null
    }
  },

  computed: {
    orderPayload () {
      return {
        address_id: this.address?.id,
        selected_card: this.selectedCard,
        productCode: this.shippingProductCode,
        localproductCode: this.shippingLocalProductCode,
        code: this.discountCode,
        shipping_price: this.shippingCharge,
        sub_total: this.subTotal,
        total: this.totalProductPrice,
        products: this.getOrderProducts,
        ali_pay: this.selectedCard === 1,
        wechat_pay: this.selectedCard === 2,
        shipping_mode: this.shippingProductName
      }
    },
    ...mapState({
      products: state => state.cart.products,
      isLoggedin: state => state.user.loggedIn,
      isAddPayment: state => state.user.isAddPayment,
      selectedCard: state => state.user.selectedCard,
      shippingProductCode: state => state.cart.shippingProductCode,
      shippingCharge: state => state.cart.shippingCharge,
      shippingLocalProductCode: state => state.cart.shippingLocalProductCode,
      discountPrice: state => state.cart.discount,
      discountCode: state => state.cart.discount_string,
      shippingProductName: state => state.cart.shippingProductName
    }),
    ...mapGetters({
      address: 'user/getUserAddress',
      totalProductPrice: 'cart/totalProductPrice',
      subTotal: 'cart/subTotal',
      getOrderProducts: 'cart/getOrderProducts'
    })
  },

  async mounted () {
    if (!this.$auth.$state.loggedIn) {
      this.$router.push('/login')
    }
    // this.$axios.get('/stripe/create-customer')
    this.frontPayment = await this.$store.dispatch('payment/payment')
  },
  methods: {
    getSelectedMethod () {
      const methods = ['alipay', 'wechat_pay', 'multibanco', 'cash', 'paypal']
      const index = this.selectedCard - 1
      return methods.length > index ? methods[index] : 'card'
    },
    getPaymentObject () {
      const paymentMethod = this.getSelectedMethod()
      const temporaryPaymentObject = {
        payment_method: paymentMethod,
        amount: this.orderPayload.total * 100, // here the amount will be in the smallest unit of currency.
        currency: 'eur'
      }

      if (paymentMethod === 'card') {
        temporaryPaymentObject.source = this.selectedCard
      }
      return temporaryPaymentObject
    },
    goTo () {
      this.$router.push({ path: '/thankyou' })
    },
    continueCheckout () {
      if (this.tabIndex === 3) {
        this.$store.commit('setLoading', true, { root: true })
        this.$axios.post('/order/store', this.orderPayload).then(({ data }) => {
          return this.frontPayment.pay({
            ...this.getPaymentObject(),
            ...{ additional_info: { order: data.order } }
          }).then((paymentResponse) => {
            if (this.orderPayload.ali_pay || this.orderPayload.wechat_pay) {
              this.handlePayment(data)
            } else if (data.status) {
              // this.setCartProduct([])
              this.setDiscount(0)
              this.setDiscountString('')
              this.$router.push({ path: '/thankyou' })
              this.$toast.success(this.$t('checkout.order_placed_successfully'), { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
            }
          }).catch((err) => {
            this.$toast.error(err?.response?.data?.message || err.message, { duration: 10000, position: 'top-right', className: 'custom-toast-error-class' })
          })
        }).catch((err) => {
          this.$toast.error(err.response.data.message, { duration: 5000, position: 'top-right', className: 'custom-toast-error-class' })
        }).finally(() => {
          this.$store.commit('setLoading', false, { root: true })
        })
      } else if (this.tabIndex === 1 && !this.address) {
        this.$toast.error(this.$t('checkout.please_add_or_select_your_address'), { duration: 3000, position: 'top-right', className: 'custom-toast-error-class' })
      } else if (this.tabIndex === 1 && (!this.address.address_first_line || !this.address.post_code)) {
        this.$toast.error(this.$t('checkout.please_select_a_valid_address'), { duration: 3000, position: 'top-right' })
      } else if (!this.address && this.tabIndex === 1) {
        this.$toast.error(this.$t('checkout.please_select_a_shipping_mode'), { duration: 3000, position: 'top-right' })
      } else if (this.tabIndex === 2 && this.selectedCard === 'add_card') {
        this.$toast.error(this.$t('checkout.please_add_or_select_your_card'), { duration: 3000, position: 'top-right', className: 'custom-toast-error-class' })
      } else {
        this.tabIndex++
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    },
    handlePayment (data) {
      if (this.orderPayload.ali_pay) {
        this.$refs.reviewComponent.aliPay(data.client_secret)
      } else if (this.orderPayload.wechat_pay) {
        this.$refs.reviewComponent.wechatPay(data.client_secret)
      }
    },
    callToSecondTab () {
      this.setIsAddPayment(false)
      this.tabIndex = 2
    },
    back () {
      // this.tabIndex
      if (this.tabIndex === 2) { this.setIsAddPayment(false) }

      if (this.tabIndex > 1) {
        this.tabIndex--
      }
    },
    ...mapMutations({
      setCartProduct: 'cart/setCartProduct',
      setIsAddPayment: 'user/setIsAddPayment',
      setDiscount: 'cart/setDiscount',
      setDiscountString: 'cart/setDiscountString'
    })
  }
}
</script>

<style lang="scss" scoped>
    #card {
        position: absolute;
        width: 100%;
    }
</style>

<style>
.back-text {
  text-decoration: underline;
}
.left-arr {
  transform: rotate(270deg);
}
</style>
