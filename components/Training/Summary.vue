<template>
  <div class="col-lg-3 mt-5 pt-5">
    <div class="summary mt-3">
      <h3 class="mb-3 mt-2">
        {{ $t('order_summary') }}
      </h3>
      <div class="prod_detail">
        <p><label>{{ $t('title') }}</label> <span>{{ selectedPlan.title }} </span></p>
        <p><label>{{ $t('months') }}</label> <span>{{ selectedPlan.month }} </span></p>
        <p><label>{{ $t('price') }}</label> <span>{{ selectedPlan.price }} €</span></p>
<!--        <a href="javascript:void(0)" class="checkout" @click="$emit('countinue')">{{ titleButton }} <i class="fa fa-angle-right ml-3" /></a>-->
        <a v-show="selectedCard != 5 || tabindex != 2" href="javascript:void(0)" class="checkout" @click="$emit('countinue')">{{ titleButton }} <i class="fa fa-angle-right ml-3" /></a>
        <paypal-btn v-if="selectedCard == 5 && tabindex == 2" :amount="Number(selectedPlan.price)" :order-payload="orderPayload" store-url="/subscription/plan/store" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    tabindex: {
      type: Number,
      default: 1
    },
    orderPayload: {
      type: Object,
      default: null
    },
    selectedPlan: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  computed: {
    titleButton () {
      return this.tabindex === 3 ? this.$t('checkout.complete_purchase') : this.$t('continue')
    },
    ...mapState({
      selectedCard: state => state.user.selectedCard,
      selectedPlanId: state => state.training.selectedPlanId
    })
  }
}
</script>
