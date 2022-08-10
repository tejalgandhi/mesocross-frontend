<template>
  <div>
    <div class="select-text my-3 pb-2">
      {{ bodytitle }}
    </div>
    <input
      id="for10"
      name="paymethod"
      class="form-check-input"
      :checked="selectedCard == 1"
      type="radio"
      @change="setSelectedCard(1)"
    >
    <label class="address-radio row mx-0 align-items-center mb-3" for="for10">
      <div class="col-12">
        <div class="form-check px-0">
          <div class="d-flex align-items-center">
            <img src="~/assets/img/Alipay.svg" class="mx-3" alt="image">
            <label class="ml-2 form-check-label font-16 text-dark" for="for10">
              <span class="d-block font-weight-bold">{{ $t('ali_pay') }}</span>
            </label>
          </div>
        </div>
      </div>
    </label>
    <input
      id="for11"
      name="paymethod"
      class="form-check-input"
      :checked="selectedCard == 2"
      type="radio"
      @change="setSelectedCard(2)"
    >
    <label class="address-radio row mx-0 align-items-center mb-3" for="for11">
      <div class="col-12">
        <div class="form-check px-0">
          <div class="d-flex align-items-center">
            <div class="d-flex align-items-center">
              <img src="~/assets/img/Wechatpay.svg" class="mx-3" alt="image">
              <label class="ml-2 form-check-label font-16 text-dark" for="for11">
                <span class="d-block font-weight-bold">{{ $t('wechat_pay') }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </label>
    <input
      id="for5"
      name="paymethod"
      class="form-check-input"
      :checked="selectedCard == 0"
      type="radio"
      @change="setSelectedCard(0)"
    >
    <label class="address-radio row mx-0 align-items-center mb-3" for="for5">
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
              <img :src="require(`~/assets/img/${setBrandImage(card.brand)}`)" class="mx-3" height="30px" width="50px" alt="image">
              <label class="ml-2 form-check-label font-16 text-dark" :for="`for${index}`">
                <span class="d-block font-weight-bold">{{ card.name }}</span>
                <small>{{ card.number }}</small>
              </label>
            </div>
            <p class="font-16 text-dark m-0 border-bottom d-inline text-right" @click="deleteCard(card.id)">{{ $t('checkout.delete_method') }}</p>
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
          <input id="forAddcart" name="paymethod" class="form-check-input" type="radio" @change="setSelectedCard('add_card')">
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
  mounted () {
    this.getUserCards()
  },
  methods: {
    async deleteCard (card) {
      const { data } = await this.$axios.post('/stripe/delete-card', { card_id: card })
      this.$toast.success(data.message, { duration: 5000, position: 'top-right', className: 'custom-toast-success-class' })
      if (card === this.selectedCard) {
        this.setSelectedCard(0)
      }

      this.getUserCards()
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
