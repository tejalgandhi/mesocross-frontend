<template>
  <div class="col-lg-3 mt-5 pt-5">
    <div class="summary mt-3">
      <h3 class="mb-3 mt-2">
        {{ $t('order_summary') }}
      </h3>
      <!-- <div class="discount">
        <span>Add discount
          <a href="#"><img src="@/assets/img/plus.svg" alt="image"></a>
          <input type="text" name="" style="display: none;">
        </span>
      </div> -->
      <div class="prod_detail">
        <p class="product">
          <label>{{ totalUnits }} {{ $t('units') }} ({{ products.length }} X {{ $t('products') }})</label><span>{{ subTotal }} €</span>
        </p>
        <p><label>{{ $t('discount') }}</label> <span>{{ discount }} €</span></p>
        <p><label>{{ $t('shipping') }}</label> <span>{{ shippingCharge }} €</span></p>
        <p class="total">
          <label>{{ $t('total') }}</label> <span>{{ totalProductPrice }} €</span>
        </p>
        <a href="javascript:void(0)" class="checkout" @click="$emit('countinue')">{{ titleButton }} <i class="fa fa-angle-right ml-3" /></a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    tabindex: {
      type: Number,
      default: 1
    }
  },
  computed: {
    titleButton () {
      return this.tabindex === 3 ? this.$t('checkout.complete_purchase') : this.$t('continue')
    },
    ...mapState({
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
