<template>
  <div id="payment" class="tab-pane fade show active shipping">
    <h4 class="text-uppercase my-3">
      {{ bodytitle }}
    </h4>
    <p class="mb-3 font-16">
      {{ $t('required_fields') }}*
    </p>
    <div class="d-flex flex-wrap">
      <div class="payment-box mr-3">
        <input
          id="for1"
          v-model="paymentObj.brand"
          value="MasterCard"
          class="form-check-input"
          checked
          type="radio"
          name="flexRadioDefault"
        >
        <label class="address-radio row mx-0 align-items-center mb-3" for="for1">
          <div class="col-12">
            <div class="form-check px-0">
              <label class="form-check-label font-16 text-dark ml-3 py-2" for="for1">
                <img src="@/assets/img/card_mastercard.svg" height="60px" width="90px" alt="image">
              </label>
            </div>
          </div>
        </label>
      </div>
      <div class="payment-box mr-3">
        <input
          id="for2"
          v-model="paymentObj.brand"
          :value="cardNames.visa"
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
        >
        <label class="address-radio row mx-0 align-items-center mb-3" for="for2">
          <div class="col-12">
            <div class="form-check px-0">
              <label class="form-check-label font-16 text-dark ml-3 py-2" for="for2">
                <img src="@/assets/img/card_visa.svg" height="60px" width="90px" alt="image">
              </label>
            </div>
          </div>
        </label>
      </div>
      <div class="payment-box mr-3">
        <input
          id="for3"
          v-model="paymentObj.brand"
          :value="cardNames.american"
          class="form-check-input"
          type="radio"
          name="flexRadioDefault"
        >
        <label class="address-radio row mx-0 align-items-center mb-3" for="for3">
          <div class="col-12">
            <div class="form-check px-0">
              <label class="form-check-label font-16 text-dark ml-3 py-2" for="for3">
                <img src="@/assets/img/card_american_express.svg" height="60px" width="90px" alt="image">
              </label>
            </div>
          </div>
        </label>
      </div>
    </div>
    <div class="row">
      <h6 class="font-18 col-12 font-weight-bold my-4">
        {{ $t('card_details') }}
      </h6>
      <ValidationObserver ref="formObserver" class="w-100">
        <form class="fill-detail-from col-md-9 col-lg-12 col-xl-8 row" @submit.prevent="addPayment">
          <div class="form-group col-lg-9">
            <label for="">{{ $t('checkout.cardholder_name') }} *</label>
            <div class="position-relative" style="height: 40px">
              <ValidationProvider v-slot="{ errors }" :name="$t('checkout.cardholder_name')" rules="required">
                <input id="name" v-model="paymentObj.name" type="text" class="w-100 px-3 h-100 form-control">
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group col-lg-6">
            <label for="">{{ $t('checkout.card_number') }} *</label>
            <div class="position-relative" style="height: 40px">
              <ValidationProvider v-slot="{ errors }" :name="$t('checkout.card_number')" rules="required|check_card_limit">
                <input id="number" v-model="paymentObj.number" type="text" class="w-100 px-3 h-100 form-control" @input="addSpaceInNumber()">
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group col-lg-3">
            <label for="">{{ $t('expiry_date') }} *</label>
            <div class="position-relative" style="height: 40px">
              <ValidationProvider v-slot="{ errors }" :name="$t('expiry_date')" rules="required">
                <input
                  id="expiry_date"
                  v-model="paymentObj.expiry_date"
                  type="text"
                  class="w-100 px-3 h-100 form-control"
                  placeholder="MM/YY"
                  @input="addSlash($event)"
                >
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group col-lg-12">
            <label for="">{{ $t('security_code') }} *</label>
            <div class="position-relative col-lg-6 px-0" style="height: 40px">
              <ValidationProvider v-slot="{ errors }" :name="$t('security_code')" rules="required|digits:3">
                <input id="cvc" v-model="paymentObj.cvc" type="text" class="w-100 px-3 h-100 form-control" style="">
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group col-lg-12 mt-4">
            <b-button variant="primary" type="submit" class="px-lg-5 px-4 my-2 mr-4">
              {{ $t('save') }}
            </b-button>
            <b-button variant="outline-primary" class="px-lg-5 px-4 my-2" @click="setIsAddPayment(false)">
              {{ $t('cancel') }}
            </b-button>
          </div>

          <div class="col-12 text-center mt-3">
            <!-- <a href="#" class="font-16 text-dark font-weight-bold">{{ $t('delete_method') }}</a> -->
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
// import Payment from '@immera/payment-frontend'
export default {
  props: {
    bodytitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      formObserver: '',
      frontPayment: null,
      paymentObj: {
        brand: 'MasterCard',
        name: '',
        number: '',
        expiry_date: '',
        cvc: ''
      }
    }
  },
  computed: {
    ...mapState({
      cardNames: state => state.user.cardNames,
      loggedinUser: state => state.user.loggedinUser,
      paymentInstance: state => state.payment.paymentInstance
    })
  },
  async mounted () {
    this.frontPayment = await this.$store.dispatch('payment/payment')
  },
  methods: {
    ...mapMutations({
      setIsAddPayment: 'user/setIsAddPayment'
    }),
    addSlash (newValue) {
      if (!/^\d{0,2}\/?\d{0,2}$/.test(newValue.target.value)) {
        return
      }

      let input = newValue.target.value

      if (/^\d{3,}$/.test(input)) {
        // eslint-disable-next-line prefer-regex-literals
        input = input.match(new RegExp('.{1,2}', 'g')).join('/')
      }
      this.paymentObj.expiry_date = input
    },
    addSpaceInNumber () {
      const cardNumber = this.paymentObj.number
      if (this.paymentObj.number.length === 20) {
        this.paymentObj.number = this.paymentObj.number.substring(0, this.paymentObj.number.length - 1)
        return false
      }
      const res = [...cardNumber.replace(/ /g, '')].map((d, i) => (i) % 4 === 0 && (i) !== ' ' ? ' ' + d : d).join('').trim()
      this.paymentObj.number = res
    },
    async addPayment () {
      if (await this.$refs.formObserver.validate()) {
        try {
          await this.paymentInstance.createNewCard({
            number: this.paymentObj.number,
            expiry_date: this.paymentObj.expiry_date,
            cvc: this.paymentObj.cvc
          })
          this.$nuxt.$emit('fetch-cards')
          this.setIsAddPayment(false)
          this.$toast.success('Card Added Successfully', { duration: 5000, position: 'top-right', className: 'custom-toast-success-class' })
        } catch (err) {
          this.$toast.error(err?.response?.data?.message || err.message, { duration: 10000, position: 'top-right', className: 'custom-toast-error-class' })
        }
      }
    }
  }
}
</script>
<style scoped>
  .errors {
    color: #cf0000;
  }
</style>
