<template>
  <div>
    <div v-for="(ship, index) in shippings" :key="index">
      <input
        :id="`shipmode${index}`"
        class="form-check-input"
        type="radio"
        name="shippingRadio"
        :checked="shippingProductCode === ship.productCode"
        @change="setUserShippingCharge(ship)"
      >
      <label class="address-radio row mx-0 align-items-center mb-3" :for="`shipmode${index}`">
        <div class="col-6 col-md-3">
          <div class="form-check px-0">
            <label class="form-check-label font-16 text-dark" :for="`shipmode${index}`">
              {{ ship.productName }} - {{ ship.totalPrice }}€
            </label>
          </div>
        </div>
        <div class="col-6 col-md-6">
          <p class="font-16 text-dark m-0"  v-if="ship.isSingleDay"> {{  formatDate(ship.estimatedDeliveryTime) }} - {{  formatDay(ship.estimatedDays) }}</p>
          <p class="font-16 text-dark m-0" v-else> {{  formatDate(ship.estimatedDeliveryTime) }}</p>
        </div>
      </label>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      shippings: state => state.cart.shippings,
      shippingProductCode: state => state.cart.shippingProductCode
    }),
    formatDate () {
      return (date) => {
        return this.$moment(date).format('dddd D, MMMM')
      }
    },
    formatDay () {
      return (shippingDays) => {
        return this.$moment().add(parseInt(shippingDays) + 1, 'days').format('dddd D, MMMM')
      }
    }
  },
  methods: {
    ...mapMutations({
      setUserShippingCharge: 'cart/setUserShippingCharge'
    })
  }
}
</script>
