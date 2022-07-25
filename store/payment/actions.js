import Payment from '@immera/payment-frontend'

export default {
  payment ({ commit, state, rootGetters }) {
    /* eslint-disable camelcase */
    if (state.paymentInstance != null) {
      // verify customer with given email and name.
      return state.paymentInstance
    }
    const { email, full_name } = rootGetters['user/getLoggedinUser']
    const customer = { email, name: full_name }
    commit('setPaymentInstance', new Payment({
      key: process.env.STRIPE_PUBLIC,
      api: process.env.BACKEND_API,
      callback: process.env.THANKYOU_PAGE,
      paypalClientId: process.env.PAYPAL_CLIENT_ID,
      customer
    }, this.$axios))
    return state.paymentInstance
  }
}
