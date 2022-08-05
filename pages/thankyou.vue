<template>
  <div class="container-fluid mx-auto shipping-tab my-5 py-5">
    <div class="row mx-0">
      <div class="col-md-11 mx-auto text-center">
        <h3 class="text-center thank-you-heading">
          {{ $t('thank_you_for') }} <br> {{ $t('purchasing_with') }}!
        </h3>
        <p class="pr text-secondary">
          {{ $t('thank_you_page_receive_msg') }}.
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
  font: normal normal 500 34px Arquitecta;
  letter-spacing: 0px;
  color: #FFFFFF;
}
.pr-1 {
  font-weight: 500;
  margin: 30px 0 5px 0;
}
.text-underline {
  text-decoration: underline;
}
.pr {
  font: normal normal normal 16px Arquitecta;
  letter-spacing: 0px;
  color: #FFFFFF;
  max-width: 540px;
  width: 100%;
  margin: 0 auto;
}
</style>
