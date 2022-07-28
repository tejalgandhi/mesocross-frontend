<template>
  <div class="col-lg-auto">
    <div class="summary mt-3">
      <h3 class="mb-3">
        {{ $t('order_summary') }}
      </h3>
      <!-- <div class="discount">
        <span>Add discount
          <a href="#"><img src="@/assets/img/plus.svg" alt="image"></a>
          <input type="text" name="" style="display: none;">
        </span>
      </div> -->
      <div class="prod_detail">
        <p class="product d-flex justify-content-between">
          <label>{{ totalUnits }} {{ $t('units') }} ({{ products.length }} X {{ $t('products') }})</label><span>{{ subTotal }} €</span>
        </p>
        <p class="d-flex justify-content-between">
          <label>{{ $t('discount') }}</label> <span>{{ discount }} €</span>
        </p>
        <p class="total d-flex justify-content-between">
          <label>{{ $t('shipping') }}</label> <span>{{ shippingCharge }} €</span>
        </p>
        <p class="total">
          <label>{{ $t('total') }}</label> <span>{{ totalProductPrice }} €</span>
        </p>
        <a v-show="selectedCard != 5 || tabindex != 3" href="javascript:void(0)" class="checkout" @click="$emit('countinue')">{{ titleButton }} <i class="fa fa-angle-right ml-3" /></a>
        <paypal-btn v-if="selectedCard == 5 && tabindex == 3" :amount="Number(totalProductPrice)" :order-payload="orderPayload" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
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
  computed: {
    titleButton () {
      return this.tabindex === 3 ? this.$t('checkout.complete_purchase') : this.$t('continue')
    },
    ...mapState({
      selectedCard: state => state.user.selectedCard,
      products: state => state.cart.products,
      shippingCharge: state => state.cart.shippingCharge,
      discount: state => state.cart.discount,
      isUserLoggedIn: state => state.user.loggedIn
    }),
    ...mapGetters({
      totalProductPrice: 'cart/totalProductPrice',
      totalUnits: 'cart/totalUnits',
      subTotal: 'cart/subTotal'
      // discount: 'cart/getDiscount'
    })
    // isUserLoggedIn () {
    //   return this.$auth.user
    // }
  }
}
</script>
