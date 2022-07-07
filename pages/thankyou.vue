<template>
  <div class="container-fluid mx-auto shipping-tab my-5 py-5">
    <div class="row mx-0">
      <div class="col-md-11 mx-auto text-center">
        <h3 class="text-center thank-you-heading">
          {{ $t('thank_you_for') }} <br> {{ $t('purchasing') }} MESOCROSS!
        </h3>
        <p class="pr-1">
          {{ $t('upload_your_receipt_of_payment_on_the') }} <a href="#" class="text-underline">{{ $t('invoice_history') }}</a> {{ $t('page') }}.
        </p>
        <p class="pr text-secondary">
          {{ $t('orders_will_only_be_considered_paid_after_sending_receipt_of_payment_and_receiving_the_amount_in_question_on_the_account') }}.
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  mounted () {
    this.setCartProduct([])
  },
  methods: {
    ...mapMutations({
      setCartProduct: 'cart/setCartProduct'
    })
  }
}
</script>
<style>
h3 {
  font-size: 22px;
  line-height: 33px;
}
.thank-you-heading {
  font: normal normal 500 34px Work Sans;
  letter-spacing: 0px;
  color: #25282A;
}
.pr-1 {
  font-weight: 500;
  margin: 30px 0 5px 0;
}
.text-underline {
  text-decoration: underline;
}
.pr {
  font: normal normal normal 16px Work Sans;
  letter-spacing: 0px;
  color: #25282A;
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
}
</style>
