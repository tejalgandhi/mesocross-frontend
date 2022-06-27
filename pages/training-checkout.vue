<template>
  <div class="container-fluid mx-auto shipping-tab mb-5 pb-5">
    <div class="row mx-0">
      <div class="col-md-11 mx-auto">
        <div class="w-100 my-5">
          <TrainingTab :tab-index="tabIndex" />
        </div>
        <div class="row mx-0">
          <div class="col-lg-9">
            <div class="tab-content">
              <div class="d-flex align-items-center font-16 text-dark w-auto" style="cursor: pointer">
                <img v-if="tabIndex != 1" src="@/assets/img/left-arrow.svg" class="mr-2 left-arr" alt="image" @click="back">
                <p class="text-dark back-text" @click="back">
                  {{ $t('back') }}
                </p>
              </div>
              <!-- <div v-if="tabIndex == 1" id="shipping" class="tab-pane fade show active shipping">
                <Shipping />
              </div> -->
              <div v-if="tabIndex == 1" id="payment" class="show shipping">
                <training-add-payment-method v-if="isAddPayment" :bodytitle="$t('add_payment_method')" />
                <training-payment v-else :bodytitle="$t('checkout.select_your_payment_method')" />
              </div>
              <div v-if="tabIndex == 2" id="review" class="show shipping pt-3">
                <training-review ref="reviewComponent" :selected-plan="selectedPlan" class="mt-5" @editPayment="callToSecondTab" />
              </div>
            </div>
          </div>
          <training-Summary :tabindex="tabIndex" :selected-plan="selectedPlan" @countinue="continueCheckout" />
        </div>
      </div>
    </div>
    <b-modal
      id="trainingModal"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      centered
      hide-footer
      hide-header
    >
      <template #default="">
        <div class="welcome my-3">
          <img src="@/assets/img/close.svg" alt="image" class="close" @click="hideModal()">
          <client-only>
            <div class="container my-5 text-center training-modal-content">
              <h4>Welcome to MCCM trainings!</h4>
              <p class="my-4">
                You have just signed up for MCCM’s <b>basic training package</b>. If you change your mind, you can change your package in the <a href="#" class="text-underline font-weight-bold">Trainings panel</a>.
                <b class="d-block mt-3">Let’s go learn together!</b>
              </p>
              <div class="row">
                <div class="col-12">
                  <button class="my-4 d-block col-12 btn btn-dark">
                    Start learning
                  </button>
                  <a href="#" class="text-underline">Change plan</a>
                </div>
              </div>
            </div>
          </client-only>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      tabIndex: 1,
      reviewComponent: '',
      selectedPlan: {
        title: '',
        month: '',
        price: 0
      }
    }
  },
  computed: {
    ...mapState({
      selectedPlanId: state => state.training.selectedPlanId,
      isLoggedin: state => state.user.loggedIn,
      isAddPayment: state => state.user.isAddPayment,
      selectedCard: state => state.user.selectedCard
    })
  },
  mounted () {
    if (!this.isLoggedin) {
      this.$router.push('/login')
    }

    this.getSelectedPlan()

    this.$axios.get('/stripe/create-customer')
    this.$store.dispatch('cart/applyDiscount', false)
  },
  methods: {
    continueCheckout () {
      if (this.tabIndex === 2) { // PLACE AN ORDER
        const orderPayload = {
          selectedPlanId: this.selectedPlanId,
          selected_card: this.selectedCard,
          promo_code: '',
          discount_type: '',
          ali_pay: this.selectedCard === 1,
          wechat_pay: this.selectedCard === 2
        }
        this.$axios.post('/subscription/plan/store', orderPayload).then(({ data }) => {
          if (orderPayload.ali_pay || orderPayload.wechat_pay) {
            this.handlePayment(data, orderPayload)
          } else if (data.status) {
            this.setTrainingModalPopup(true)
            // this.setCartProduct([])
            this.$toast.success(this.$t('plan_created_successfully'), { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
            this.$router.push({ path: '/trainings' })
          }
        }).catch((err) => {
          this.$toast.error(err.response.data.message, { duration: 5000 }, 'top-right')
        })
      } else if (this.tabIndex === 1) {
        if (this.selectedPlanId === 0) {
          this.$toast.error(this.$t('please_select_your_plan'), { duration: 3000, position: 'top-right' })
        } else if (this.selectedCard === 'add_card') {
          this.$toast.error(this.$t('checkout.please_add_or_select_your_card'), { duration: 3000, position: 'top-right' })
        } else {
          this.tabIndex++
        }
      }
      // else if (this.tabIndex === 2 && this.selectedCard === 0) {
      // this.$toast.error(this.$t('checkout.please_add_or_select_your_card'), { duration: 3000, position: 'top-right' })
      // }
      // this.tabIndex++
    },
    handlePayment (data, orderPayload) {
      if (orderPayload.ali_pay) {
        this.$refs.reviewComponent.aliPay(data.client_secret)
      } else if (orderPayload.wechat_pay) {
        this.$refs.reviewComponent.wechatPay(data.client_secret)
      }
    },
    callToSecondTab () {
      this.setIsAddPayment(false)
      this.tabIndex = 1
    },
    back () {
      // this.tabIndex
      if (this.tabIndex === 1) { this.$router.push('/training-pack') }
      if (this.tabIndex === 2) { this.setIsAddPayment(false) }

      if (this.tabIndex > 1) {
        this.tabIndex--
      }
    },
    async getSelectedPlan () {
      const url = '/training/get-plans'
      const { data } = await this.$axios.$get(url)
      this.plans = data
      this.selectedPlan = this.plans.find(item => item.id === this.selectedPlanId)
    },
    ...mapMutations({
      setIsAddPayment: 'user/setIsAddPayment',
      setTrainingModalPopup: 'training/setTrainingModalPopup'
    })
  }
}
</script>

<style>
.back-text {
  text-decoration: underline;
}
.left-arr {
  transform: rotate(270deg);
}

.training-modal-content h4 {
  text-align: center;
  font: normal normal 500 34px Work Sans;
  letter-spacing: 0px;
  color: #25282A;
}
.training-modal-content p {
  text-align: center;
  font: normal normal normal 16px Work Sans;
  color: #25282A;
  max-width: 376px !important;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.training-modal-content {
  max-width: 384px !important;
  width: 100% !important;
}
.text-underline {
  text-decoration: underline;
}
</style>
