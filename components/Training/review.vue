<template>
  <div class="accordion accordion-section clearfix mt-3 mb-3" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header v-b-toggle.accordion-1 class="panel panel-default" header-tag="header" role="tab">
        <h3 class="panel-title">
          <a block variant="info">
            {{ $t('plan') }}
          </a>
        </h3>
      </b-card-header>
      <b-collapse id="accordion-1" v-model="accordianCollapse[0]">
        <b-card-body>
          <div class="panel-body mb-4">
            <div class="row border-bottom mb-3">
              <div class="col-md-12 pl-md-0 text-left">
                <h3>{{ $t('title') }} : <small>{{ selectedPlan.title }}</small></h3>
                <h3>{{ $t('month') }} : <small>{{ selectedPlan.month }}</small></h3>
                <h3>{{ $t('price') }} : <small>{{ selectedPlan.price }} €</small></h3>
              </div>
            </div>
          </div>
        </b-card-body>
      </b-collapse>
      <b-card-header v-b-toggle.accordion-2 class="panel panel-default" header-tag="header" role="tab">
        <h3 class="panel-title">
          <a block variant="info">
            {{ $t('payment') }}
          </a>
        </h3>
      </b-card-header>
      <b-collapse id="accordion-2" v-model="accordianCollapse[1]">
        <b-card-body>
          <div v-if="selectedCard == 0" class="panel-body mb-4">
            <p class="font-16 text-dark">
              {{ $t('bank_transfer') }}
            </p>
          </div>
          <div v-else-if="selectedCard == 1" class="panel-body mb-4">
            <p class="font-16 text-dark">
              {{ $t('ali_pay') }}
            </p>
          </div>
          <div v-else-if="selectedCard == 2" class="panel-body mb-4">
            <p class="mb-4 font-14">
              {{ $t('wechat_pay') }}
            </p>
          </div>
          <label v-else class="address-radio row mx-0 align-items-center mb-3">
            <div class="col-12">
              <div class="form-check px-0 d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <img :src="require(`~/assets/img/card_visa.svg`)" class="mx-3" height="30px" width="50px" alt="image">
                  <label class="ml-2 form-check-label font-16 text-dark">
                    <span class="d-block font-weight-bold">{{ getSelectedCardBody.name }}</span>
                    <small>{{ getSelectedCardBody.number }}</small>
                  </label>
                </div>
              </div>
            </div>
          </label>
          <a class="font-16 text-dark pt-4 border-bottom d-inline" @click="editPayment">{{ $t('edit_payments') }}</a>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
// eslint-disable-next-line no-undef
// const stripe = Stripe(process.env.stripePublisableKey)
export default {
  props: {
    selectedPlan: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  data () {
    return {
      accordianCollapse: [true, true]
    }
  },
  computed: {
    ...mapState({
      isUserLoggedIn: state => state.user.loggedIn,
      userCards: state => state.user.userCards,
      selectedCard: state => state.user.selectedCard,
      shippingCharge: state => state.cart.shippingCharge,
      shippingProductName: state => state.cart.shippingProductName,
      shippingDays: state => state.cart.shippingDays
    }),
    getSelectedCardBody () {
      return this.userCards.find(currentValue => currentValue.id === this.selectedCard)
    }
  },
  mounted () {
    this.getCart()
    if (!this.isUserLoggedIn) {
      this.setCartProduct([])
    }
  },
  methods: {
    editPayment () {
      this.$emit('editPayment')
    },
    async aliPay (secret) {
      this.setTrainingModalPopup(true)
      await this.$stripe.confirmAlipayPayment(secret, {
        // Return URL where the customer should be redirected after the authorization
        return_url: `${process.env.frontURL}/trainings`
      })
    },
    async wechatPay (clientSecret) {
      const { paymentIntent } = await this.$stripe.confirmWechatPayPayment(
        clientSecret,
        {
          payment_method_options: {
            wechat_pay: {
              client: 'web'
            }
          }
        }
      )
      if (paymentIntent.status === 'succeeded') {
        // this.setCartProduct([])
        this.setTrainingModalPopup(true)
        this.$router.push({ path: '/trainings' })
      }
    },
    ...mapActions({
      getCart: 'cart/getCart'
    }),
    ...mapMutations({
      setCartProduct: 'cart/setCartProduct',
      setTrainingModalPopup: 'training/setTrainingModalPopup'
    }),
    expandAll () {
      this.collapseStates = this.collapseStates.map(x => true)
    },
    collapseAll () {
      this.collapseStates = this.collapseStates.map(x => false)
    }
  }
}
</script>
