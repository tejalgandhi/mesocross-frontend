<template>
  <div>
    <div class="select-text my-3 pb-2">
      {{ bodytitle }}
    </div>
    <input
      v-if="isActive('alipay')"
      id="for10"
      name="paymethod"
      class="form-check-input"
      :checked="selectedCard == 1"
      type="radio"
      @change="setSelectedCard(1)"
    >
    <label v-if="isActive('alipay')" class="address-radio row mx-0 align-items-center mb-3" for="for10">
      <div class="col-12">
        <div class="form-check px-0">
          <div class="d-flex align-items-center">
            <img src="~/assets/img/alipay.svg" class="mx-3" alt="image">
            <label class="ml-2 form-check-label font-16 text-dark" for="for10">
              <span class="d-block font-weight-bold">{{ $t('ali_pay') }}</span>
            </label>
          </div>
        </div>
      </div>
    </label>
    <input
      v-if="isActive('wechat_pay')"
      id="for11"
      name="paymethod"
      class="form-check-input"
      :checked="selectedCard == 2"
      type="radio"
      @change="setSelectedCard(2)"
    >
    <label v-if="isActive('wechat_pay')" class="address-radio row mx-0 align-items-center mb-3" for="for11">
      <div class="col-12">
        <div class="form-check px-0">
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <img src="~/assets/img/wechatpay.svg" class="mx-3" alt="image">
              <label class="ml-2 form-check-label font-16 text-dark" for="for11">
                <span class="d-block font-weight-bold">{{ $t('wechat_pay') }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </label>
    <input
      v-if="isActive('bank_transfer')"
      id="for5"
      name="paymethod"
      class="form-check-input"
      :checked="selectedCard == 4"
      type="radio"
      @change="setSelectedCard(4)"
    >
    <label v-if="isActive('bank_transfer')" class="address-radio row mx-0 align-items-center mb-3" for="for5">
      <div class="col-12">
        <div class="form-check px-0 d-flex">
          <div class="d-flex align-items-center">
            <img src="~/assets/img/Banktranfer.svg" class="mx-3" alt="image">
            <label class="ml-2 form-check-label font-16 text-dark" for="for5">
              <span class="d-block font-weight-bold">{{ $t('bank_transfer') }}</span>
            </label>
          </div>
        </div>
      </div>
    </label>
    <div v-for="(card, index) in userCards" :key="index">
      <input
        v-if="isActive('card')"
        :id="`for${index}`"
        name="paymethod"
        class="form-check-input"
        type="radio"
        :checked="selectedCard === card.id"
        @change="setSelectedCard(card.id)"
      >
      <label v-if="isActive('card')" class="address-radio row mx-0 align-items-center mb-3" :for="`for${index}`">
        <div class="col-12">
          <div class="form-check px-0 d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <img
                :src="require(`~/assets/img/${setBrandImage(card.brand)}`)"
                class="mx-3"
                height="30px"
                width="50px"
                alt="image"
              >
              <label class="ml-2 form-check-label font-16 text-dark" :for="`for${index}`">
                <span class="d-block font-weight-bold">{{ card.name }}</span>
                <small>**** **** **** {{ card.last4 }}</small>
              </label>
            </div>
            <p class="font-16 text-dark m-0 border-bottom d-inline text-right" @click="deleteCard(card.id)">{{
              $t('checkout.delete_method')
            }}</p>
          </div>
        </div>
      </label>
    </div>
    <div v-if="isActive('card')">
      <div v-if="userCards.length > 0" class="col-md-4 py-4 mx-auto">
        <button class="w-100 d-block btn btn-outline-dark" @click="setIsAddPayment(true)">
          {{ $t('checkout.add_new_method') }}
        </button>
      </div>
      <div v-else>
        <label class="address-radio row mx-0 align-items-center mb-3 without-card">
          <div class="addcard">
            <input
              id="forAddcart"
              name="paymethod"
              class="form-check-input"
              type="radio"
              @change="setSelectedCard('add_card')"
            >
            <label class="ml-2 form-check-label font-16 text-dark" for="forAddcart">
              <img src="@/assets/img/card_mastercard.svg" alt="image">
              <img src="@/assets/img/card_visa.svg" alt="image">
              <img src="@/assets/img/card_american_express.svg" alt="image">
            </label>
            <button class="d-block btn btn-outline-dark" @click="setIsAddPayment(true)">
              {{ $t('checkout.add_new_method') }}
            </button>
          </div>
        </label>
      </div>
    </div>
    <div v-if="isActive('paypal')">
      <!--
      <input
        id="for13"
        name="paymethod"
        class="form-check-input d-none"
        disabled
        :checked="selectedCard == 5"
        type="radio"
        @change="setSelectedCard(5)"
      >
      -->
      <label class="address-radio row mx-0 align-items-center mb-3 disabled-payment" for="for13">
        <div class="col-12">
          <div class="form-check px-0 d-flex">
            <div class="d-flex align-items-center">
              <img src="~/assets/img/paypal.svg" class="mx-3 paypal" alt="image">
            </div>
            <span class="font-18 disable-msg">({{ $t('checkout.available_soon') }})</span>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>
<script scoped>
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  props: {
    bodytitle: {
      type: String,
      default: ''
    }
    // frontPayment: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  data () {
    return {
      frontPayment: null,
      activePaymentMethods: []
    }
  },
  computed: {
    ...mapState({
      userCards: state => state.user.userCards,
      selectedCard: state => state.user.selectedCard,
      cardNames: state => state.user.cardNames
    }),
    setBrandImage () {
      return (brand) => {
        switch (brand) {
          case this.cardNames.master:
            return 'card_mastercard.svg'
          case this.cardNames.visa:
            return 'card_visa.svg'
          case this.cardNames.american:
            return 'card_american_express.svg'
          default:
            return 'card_mastercard.svg'
        }
      }
    }

  },
  async mounted () {
    this.frontPayment = await this.$store.dispatch('payment/payment')
    this.fetchCards()
    this.frontPayment.enabledPaymentMethods()
      .then(({ data }) => {
        this.activePaymentMethods = data
      })
      .catch(console.error)
    this.$nuxt.$on('fetch-cards', () => {
      this.fetchCards()
    })
  },
  // beforeUpdate () {
  //   this.fetchCards()
  // },
  methods: {
    isActive (m) {
      return this.activePaymentMethods.includes(m)
    },
    fetchCards () {
      this.frontPayment.cardList().then(({ data }) => {
        this.getUserCards({ data })
      })
    },
    async deleteCard (card) {
      await this.frontPayment.deleteCard(card)
      this.fetchCards()
    },
    ...mapMutations({
      setIsAddPayment: 'user/setIsAddPayment',
      setSelectedCard: 'user/setSelectedCard'
    }),
    ...mapActions({
      getUserCards: 'user/getUserCards'
    })
  }
}
</script>
<style scoped>
  .address-radio.disabled-payment {
    background: #f5f5f5;
    border: #dcdcdc 1px solid;
  }
  .disabled-payment .disable-msg {
    /* width: -webkit-fill-available; */
    padding-left: 10px;
    text-align: right;
  }

  .paypal {
    filter: invert(1)
  }
</style>
