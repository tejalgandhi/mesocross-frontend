<template>
  <div class="col-lg-auto">
    <div class="summary mt-3">
      <h5 class="mb-3 text-uppercase">
        {{ $t('order_summary') }}
      </h5>
      <div v-if="discount <= 0" class="discount coupon_code p-2 mb-3">
        <label class="block" for="">{{ $t('checkout.add_promo_code') }}</label>
        <ValidationObserver ref="formObserver">
          <form id="discountForm" enctype="multipart/form-data" @submit.prevent="submit">
            <input
              v-model="form.code"
              type="text"
              :placeholder="`${$t(`order_discount`)}...`"
            >
            <div class="row mt-2">
              <div class="col-12">
                <button type="submit" class="submit">
                  {{ $t('Send') }}
                </button>
              </div>
            </div>
          </form>
        </validationobserver>
      </div>
    </div>
    <div class="prod_detail">
      <p class="product d-flex justify-content-between">
        <label class="font-weight-bold text-uppercase">{{ products.length }} {{ $t('products') }}</label><span class="font-weight-bold">{{ subTotal }} €</span>
      </p>
      <p class="d-flex justify-content-between">
        <label>{{ $t('discount') }}</label> <span class="font-weight-bold">{{ discount }} €</span>
      </p>
      <p class="total d-flex justify-content-between">
        <label>{{ $t('shipping') }}</label> <span class="font-weight-bold">{{ shippingCharge }} €</span>
      </p>
      <hr>
      <p class="total d-flex justify-content-between">
        <label>{{ $t('total') }}</label> <span class="font-weight-bold text-right">
          {{ totalProductPrice }} € <br>
          <small>VAT included</small>
        </span>
      </p>
      <b-button v-show="selectedCard != 5 || tabindex != 3" variant="primary" class="checkout filter-invert btn-block my-4" @click="$emit('countinue')">
        {{ titleButton }} <i class="fa fa-angle-right ml-3" />
      </b-button>
      <paypal-btn v-if="selectedCard == 5 && tabindex == 3" :amount="Number(totalProductPrice)" :order-payload="orderPayload" />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import PaypalBtn from '../common/PaypalBtn'
export default {
  components: { PaypalBtn },
  props: {
    tabindex: {
      type: Number,
      default: 1
    },
    orderPayload: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: {
        code: ''
      }
    }
  },
  computed: {
    titleButton () {
      return this.tabindex === 3 ? this.$t('checkout.complete_purchase') : this.$t('continue')
    },
    ...mapState({
      selectedCard: state => state.user.selectedCard,
      products: state => state.cart.products,
      shippingCharge: state => state.cart.shippingCharge,
      discount: state => state.cart.discount
    }),
    ...mapGetters({
      totalProductPrice: 'cart/totalProductPrice',
      totalUnits: 'cart/totalUnits',
      subTotal: 'cart/subTotal',
      getDiscount: 'cart/getDiscount'
    })
  },
  methods: {
    async submit () {
      // eslint-disable-next-line no-unreachable
      try {
        const url = `discount/check?code=${this.form.code}`
        const { code, data, message } = await this.$axios.$get(url)

        if (code === 422) {
          this.$toast.error(message, { duration: 5000, position: 'top-right', className: 'custom-toast-success-class' })
        } else if (code === 200) {
          if (data.valid_coupon) {
            this.$toast.success(message, { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })

            this.setDiscount(data.discount_amount)
          } else {
            this.$toast.error(message, { duration: 5000, position: 'top-right', className: 'custom-toast-success-class' })
          }
        } else {
          this.$toast.error(message, { duration: 5000, position: 'top-right', className: 'custom-toast-success-class' })
        }
      } catch (e) {
        console.log(e.message)
      }
    },
    ...mapMutations({
      setDiscount: 'cart/setDiscount'
    })
  }
}
</script>
<style lang="scss" scoped>
.coupon_code{
  background: rgba(0, 0, 0, 0.04);
  input {
    width: 100%;
    border: 1px solid black;
    margin-top: 1rem !important;
    padding: .5rem 1rem;
  }
  .submit{
      display: block;
      text-align: center;
      margin: 10px 0;
      width: 100%;
      padding: 12px 0px;
      background: #25282A;
      color: #fff;
      border-radius: 4px;
  }
}

</style>
