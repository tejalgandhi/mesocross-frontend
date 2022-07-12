<template>
  <div class="accordion accordion-section clearfix mt-3 mb-3" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header v-b-toggle.accordion-1 class="panel panel-default" header-tag="header" role="tab">
        <h3 class="panel-title">
          <a block variant="info">
            {{ $t('Products') }}
          </a>
        </h3>
      </b-card-header>
      <b-collapse id="accordion-1" v-model="accordianCollapse[0]">
        <b-card-body>
          <div v-for="(product, index) in products" :key="index" class="panel-body mb-4">
            <div class="row border-bottom mb-3">
              <div class="col-md-3 align-self-center pr-md-0 mx-auto text-center">
                <img :src="product.feature_image" class="img-fluid product-thumb" alt="image">
              </div>
              <div class="col-md-9 pl-md-0 text-left">
                <div class="mt-4">
                  <nuxt-link :to="`/product-detail/${product.slug}`">
                    <p class="font-20 text-dark" style="font-weight: 600">
                      {{ product.name }} ({{ product.size }})
                    </p>
                  </nuxt-link>
                  <p class="font-16">
                    Ref:{{ product.ref_number }}
                  </p>
                  <div class="counter px-3 py-2 my-4 d-flex align-items-center justify-content-between">
                    <a href="javascript:void(0)"><i class="fa fa-minus text-muted font-weight-light" aria-hidden="true" /></a>
                    <span class="mx-2">{{ product.qty }}</span>
                    <a href="javascript:void(0)"><i class="fa fa-plus text-muted font-weight-light" aria-hidden="true" /></a>
                  </div>
                  <p class="font-20 text-dark">
                    {{ product.price }}€
                  </p>
                </div>
              </div>
            </div>
          </div>
        </b-card-body>
      </b-collapse>
      <b-card-header v-b-toggle.accordion-2 class="panel panel-default" header-tag="header" role="tab">
        <h3 class="panel-title">
          <a block variant="info">
            {{ $t('shipping') }} 11
          </a>
        </h3>
      </b-card-header>
      <b-collapse id="accordion-2" v-model="accordianCollapse[1]">
        <b-card-body>
          <div class="panel-body mb-4">
            <div class="mt-4">
              <p class="font-16 text-dark">
                {{ address.company_name }}
              </p>
              <p class="font-14">
                {{ address.address_first_line }} {{ address.address_second_line }} <br> {{ address.post_code }}, {{ address.city }}
              </p>
              <p class="font-14">
                {{ address.country }}
              </p>
            </div>

            <div class="mt-4">
              <p class="font-16 text-dark">
                {{ shippingProductName }}  - <span class="text-success">{{ shippingCharge }} </span>
              </p>
              <p class="mb-4 font-14">
                {{ deliveryDateFrom }} — {{ deliveryDateTo }}
              </p>
            </div>
          </div>
        </b-card-body>
      </b-collapse>
      <b-card-header v-b-toggle.accordion-3 class="panel panel-default" header-tag="header" role="tab">
        <h3 class="panel-title">
          <a block variant="info">
            {{ $t('payment') }}
          </a>
        </h3>
      </b-card-header>
      <b-collapse id="accordion-3" v-model="accordianCollapse[2]">
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
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
// eslint-disable-next-line no-undef
// const stripe = Stripe(process.env.stripePublisableKey)
export default {
  data () {
    return {
      accordianCollapse: [true, true, true]
    }
  },
  computed: {
    totalProductPrice () {
      return this.products.map(val => val.price).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    },
    ...mapState({
      products: state => state.cart.products,
      isUserLoggedIn: state => state.user.loggedIn,
      userCards: state => state.user.userCards,
      selectedCard: state => state.user.selectedCard,
      shippingCharge: state => state.cart.shippingCharge,
      shippingProductName: state => state.cart.shippingProductName,
      shippingDays: state => state.cart.shippingDays
    }),
    getSelectedCardBody () {
      return this.userCards.find(currentValue => currentValue.id === this.selectedCard)
    },
    ...mapGetters({
      address: 'user/getUserAddress'
    }),
    deliveryDateFrom () {
      return this.$moment().add(this.shippingDays, 'days').format('dddd D, MMMM')
    },
    deliveryDateTo () {
      return this.$moment().add(parseInt(this.shippingDays) + 1, 'days').format('dddd D, MMMM')
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
      await this.$stripe.confirmAlipayPayment(secret, {
        // Return URL where the customer should be redirected after the authorization
        return_url: `${process.env.frontURL}/thankyou`
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
        this.setCartProduct([])
        this.$router.push({ path: '/thankyou' })
      }
    },
    ...mapActions({
      getCart: 'cart/getCart'
    }),
    ...mapMutations({
      setCartProduct: 'cart/setCartProduct'
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
<style scoped>
.product-thumb{
  max-height: 150px;
  max-width: 150px;
  margin-left: auto;
  margin-right: auto;
}
</style>
