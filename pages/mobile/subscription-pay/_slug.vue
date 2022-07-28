<template>
  <div class="container text-center p-10">
    <br><br>
    <h2>Pay €{{ amount }}</h2>
    <br>
    <paypal-btn :amount="amount" :additional-info="additionalInfo" />
    <br><br>
  </div>
</template>

<script>
import PaypalBtn from '~/components/common/PaypalBtn.vue'
export default {
  layout: 'empty',
  components: { PaypalBtn },
  async asyncData ({ params, $axios, req, $auth }) {
    try {
      const { authorization } = req.headers
      if (authorization) {
        $auth.setUserToken(authorization)
      }
      const { data } = await $axios.get(`/subscription/user-plans/${params.slug}`)
      console.log(data)
      return {
        amount: Number(data.subscription.price),
        additionalInfo: { additional_info: { subscription: data } }
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
