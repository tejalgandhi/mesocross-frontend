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
  components: { PaypalBtn },
  async asyncData ({ params, $axios }) {
    const { data } = await $axios.get(`/orders/${params.slug}`)
    return {
      amount: data.total,
      additionalInfo: { additional_info: { order: data } }
    }
  }
}
</script>
