<template>
  <div>
    <h2 class="text-uppercase mb-4">
      {{ bodytitle }}
    </h2>
    <div v-for="(card, index) in userCards" :key="index">
      <input :id="`for${index}`" class="form-check-input" type="radio" :checked="selectedCard === card.id" @change="setSelectedCard(card.id)">
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

    <div class="col-md-4 pt-4 mx-auto">
      <button class="w-100 d-block btn btn-light filter-invert" @click="setIsAddPayment(true)">
        {{ $t('checkout.add_new_method') }}
      </button>
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
  async mounted () {
    this.frontPayment = await this.$store.dispatch('payment/payment')
    this.fetchCards()
    // this.getUserCards()
  },
  methods: {
    fetchCards () {
      this.frontPayment.cardList().then(({ data }) => {
        console.log(data)
        this.getUserCards({ data })
      })
    },
    async deleteCard (card) {
      await this.frontPayment.deleteCard(card)
      this.fetchCards()

      // const { data } = await this.$axios.post('/stripe/delete-card', { card_id: card })
      // this.$toast.success(data.message, { duration: 5000, position: 'top-right', className: 'custom-toast-success-class' })
      // if (card === this.selectedCard) {
      //   this.setSelectedCard(0)
      // }

      // this.getUserCards()
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
