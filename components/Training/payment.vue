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
      v-if="isActive('multibanco')"
      id="for12"
      name="paymethod"
      class="form-check-input"
      :checked="selectedCard == 3"
      type="radio"
      @change="setSelectedCard(3)"
    >
    <label v-if="isActive('multibanco')" class="address-radio row mx-0 align-items-center mb-3" for="for12">
      <div class="col-12">
        <div class="form-check px-0">
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <img src="~/assets/img/mb-icon.svg" class="mx-3" alt="image">
              <label class="ml-2 form-check-label font-16 text-dark" for="for12">
                <span class="d-block font-weight-bold">{{ $t('multibanco') }}</span>
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
    <label v-if="isActive('cash')" class="address-radio row mx-0 align-items-center mb-3" for="for5">
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
    <input
      v-if="isActive('paypal')"
      id="for13"
      name="paymethod"
      class="form-check-input"
      :checked="selectedCard == 5"
      type="radio"
      @change="setSelectedCard(5)"
    >
    <label v-if="isActive('paypal')" class="address-radio row mx-0 align-items-center mb-3" for="for13">
      <div class="col-12">
        <div class="form-check px-0 d-flex">
          <div class="d-flex align-items-center">
            <img src="~/assets/img/paypal-icon.svg" class="mx-3" alt="image">
            <label class="ml-2 form-check-label font-16 text-dark" for="for13">
              <span class="d-block font-weight-bold">{{ $t('paypal') }}</span>
            </label>
          </div>
        </div>
      </div>
    </label>
    <div v-if="isActive('card')">
      <div v-for="(card, index) in userCards" :key="index">
        <input
          :id="`for${index}`"
          name="paymethod"
          class="form-check-input"
          type="radio"
          :checked="selectedCard === card.id"
          @change="setSelectedCard(card.id)"
        >
        <label class="address-radio row mx-0 align-items-center mb-3" :for="`for${index}`">
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
      <div v-if="userCards.length > 0" class="col-md-4 py-4 mx-auto">
        <button class="w-100 d-block btn btn-light" @click="setIsAddPayment(true)">
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
            <button class="d-block btn btn-light" @click="setIsAddPayment(true)">
              {{ $t('checkout.add_new_method') }}
            </button>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapMutations, mapState, mapActions } from 'vuex'
  export default {
    props: {
      bodytitle: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        activePaymentMethods: [],
        frontPayment: null
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
      this.frontPayment.enabledPaymentMethods('subscription')
        .then(({ data }) => {
          console.log('Activated Payment methods = ', data)
          this.activePaymentMethods = data
        })
        .catch(console.error)
    },
    methods: {
      isActive (m) {
        return this.activePaymentMethods.includes(m)
      },
      fetchCards () {
        this.frontPayment.cardList().then(({ data }) => {
          console.log(data)
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
