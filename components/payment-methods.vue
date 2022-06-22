<template>
  <div class="shipping">
    <checkout-add-payment-method v-if="isAddPayment" :bodytitle="$t('payment_methods')" />
    <dashboard-payment v-else :bodytitle="$t('payment_methods')" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isAddPayment: state => state.user.isAddPayment
    })
  }
}
</script>
