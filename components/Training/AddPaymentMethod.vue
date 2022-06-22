<template>
  <div id="payment" class="tab-pane fade show active shipping">
    <div class="my-3">
      <p class="font-weight-bold text-dark font-18">
        {{ bodytitle }}
      </p>
      <p class="mt-2 mb-2 font-16">
        {{ $t('required_fields') }}*
      </p>
    </div>
    <div class="d-flex">
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
    <div class="row mx-0">
      <h6 class="font-18 col-12 font-weight-bold px-0 my-4">
        {{ $t('card_details') }}
      </h6>
      <ValidationObserver ref="formObserver">
        <form class="fill-detail-from col-md-9 col-lg-12 col-xl-8 row px-0" @submit.prevent="addPayment">
          <div class="form-group col-lg-9">
            <label for="">{{ $t('checkout.cardholder_name') }} *</label>
            <div class="position-relative" style="height: 40px">
              <ValidationProvider v-slot="{ errors }" :name="$t('checkout.cardholder_name')" rules="required">
                <input id="name" v-model="paymentObj.name" type="text" class="w-100 px-3 h-100">
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group col-lg-6">
            <label for="">{{ $t('checkout.card_number') }} *</label>
            <div class="position-relative" style="height: 40px">
              <ValidationProvider v-slot="{ errors }" :name="$t('checkout.card_number')" rules="required">
                <input id="number" v-model="paymentObj.number" type="text" class="w-100 px-3 h-100" @input="addSpaceInNumber()">
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
                  class="w-100 px-3 h-100"
                  placeholder="MM/YY"
                  @input="addSlash($event)"
                >
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group col-lg-12">
            <label for="">{{ $t('security_code') }} *</label>
            <div class="position-relative col-lg-3 pl-0" style="height: 40px">
              <ValidationProvider v-slot="{ errors }" :name="$t('security_code')" rules="required">
                <input id="cvc" v-model="paymentObj.cvc" type="text" class="w-100 px-3 h-100" style="background: #e5e6e6 0% 0% no-repeat padding-box;">
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group col-lg-6 mt-3">
            <button type="submit" class="btn w-100 bg-dark text-white">
              {{ $t('save') }}
            </button>
          </div>
          <div class="form-group col-lg-6 mt-3">
            <button class="btn w-100 btn-outline-dark" @click="setIsAddPayment(false)">
              {{ $t('cancel') }}
            </button>
          </div>

          <div class="col-12 text-center my-3">
            <!-- <a href="#" class="font-16 text-dark font-weight-bold">{{ $t('delete_method') }}</a> -->
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
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
      cardNames: state => state.user.cardNames
    })
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
      const res = [...cardNumber.replace(/ /g, '')].map((d, i) => (i) % 4 === 0 && (i) !== ' ' ? ' ' + d : d).join('').trim()
      this.paymentObj.number = res
    },
    async addPayment () {
      if (await this.$refs.formObserver.validate()) {
        try {
          const response = await this.$axios.post('/stripe/create-card', this.paymentObj)
          this.$toast.success(response.data.message, { duration: 5000, position: 'top-right', className: 'custom-toast-success-class' })
          this.setIsAddPayment(false)
        } catch (err) {
          if (err.response.data.status === 402) {
            this.$toast.error(err.response.data.message, { duration: 5000 }, 'top-right')
          } else {
            this.$toast.error(this.$t('something_went_wrong'), { duration: 3000 })
            this.setIsAddPayment(false)
          }
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
