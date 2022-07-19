<template>
  <div id="paypal-container"></div>
</template>
<script>
export default {
  props: {
    amount: Number,
    orderPayload: {
      type: Object,
      default: null
    },
    storeUrl: {
      type: String,
      default: '/order/store'
    },
    additionalInfo: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      frontPayment: null
    }
  },
  async mounted () {
    this.frontPayment = await this.$store.dispatch('payment/payment')
    this.frontPayment.initPaypalBtn('#paypal-container', {
      currency: 'eur',
      amount: this.amount * 100,
      callback: this.callback
    })
  },
  methods: {
    callback () {
      if (this.orderPayload != null) {
        return this.$axios
          .post(this.storeUrl, this.orderPayload)
          .then(({ data }) => {
            const { order, subscription } = data
            const additionalInfo = {
              ...(order ? { order } : {}),
              ...(subscription ? { subscription } : {})
            }
            return { additional_info: additionalInfo }
          })
      }
      if (this.additionalInfo != null) {
        return Promise.resolve({ additional_info: this.additionalInfo })
      }
      return Promise.resolve({})
    }
  }
}
</script>
