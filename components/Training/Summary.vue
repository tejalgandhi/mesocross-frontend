<template>
  <div class="col-lg-auto mt-5 pt-5">
    <div class="summary mt-3">
      <h3 class="mb-3 mt-2">
        {{ $t('order_summary') }}
      </h3>
      <div class="prod_detail">
        <p><label>{{ $t('title') }}</label> <span>{{ selectedPlan.title }} </span></p>
        <p><label>{{ $t('months') }}</label> <span>{{ selectedPlan.month }} </span></p>
        <p><label>{{ $t('price') }}</label> <span>{{ selectedPlan.price }} €</span></p>
        <a href="javascript:void(0)" class="checkout" @click="$emit('countinue')">{{ titleButton }} <i class="fa fa-angle-right ml-3" /></a>
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
      selectedPlanId: state => state.training.selectedPlanId
    })
  }
}
</script>
