<template>
  <article>
    <figure>
      <img src="/icons/visa.svg" alt="card_company">
      <img src="/icons/mastercard.svg" alt="card_company">
      <img src="/icons/amex.svg" alt="card_company">
    </figure>
    <div class="info">
      <input
        v-model="card.number"
        type="text"
        pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
        :placeholder="$t('checkout.card_number')"
        maxlength="19"
      >
      <div class="row">
        <input
          v-model="card.expiry_date"
          type="text"
          placeholder="MM/YY"
          pattern="[0-9]{2}/[0-9]{2}"
          maxlength="5"
        >
        <input
          v-model="card.cvc"
          type="text"
          placeholder="CVC"
          pattern="[0-9]{3}"
          maxlength="3"
        >
      </div>
      <input
        v-model="card.name"
        class="name"
        :placeholder="$t('checkout.cardholder_name')"
        type="text"
      >
    </div>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      card: {
        name: undefined,
        number: undefined,
        expiry_date: undefined,
        cvc: undefined
      }
    }
  },

  watch: {
    'card.number' (val) {
      this.card.number = val.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
    },
    'card.expiry_date' (val) {
      this.card.expiry_date = val.replace(/[^\dA-Z]/g, '').replace(/(.{2})/, '$1/').trim()
    },
    'card.cvc' (val) {
      this.card.cvc = val.replace(/[^\dA-Z]/g, '').replace(/(.{3})/, '$1').trim()
    },
    card: {
      deep: true,
      handler (val) {
        this.$emit('selected', {
          name: val.name,
          number: val.number ? val.number.replaceAll(' ', '') : '',
          expiry_date: val.expiry_date,
          cvc: val.cvc
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    article {
        border: solid 1px;
        border-color: #E0E0E0;
        border-radius: 4px;
        width: 100%;
        max-width: 24rem;
        aspect-ratio: 16/9;
        padding: 10px;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
        transition: 0.4s;
        background: rgb(201,201,201);
        background: linear-gradient(326deg, rgba(201,201,201,0.038252801120448154) 0%, rgba(184,184,184,0.09987745098039214) 15%, rgba(221,221,221,0.3211659663865546) 47%, rgba(201,201,201,0.038252801120448154) 100%);
        background-size: 200% 200%;
        background-position: 0% 0%;

        &:hover {
            background-position: 100% 100%;
        }

        figure {
            display: flex;
            align-items: center;
            position: absolute;
            width: 32px;
            height: 32px;
            user-select: none;
            gap: 0.5rem;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                -webkit-user-drag: none;
            }
        }

        .info {
            margin: 40px 0;
            display: flex;
            flex-direction: column;
            width: 100%;
            user-select: none;
            align-items: center;
            gap: 0.5rem;

            input {
                width: 100%;
                background: none;
                border: none;
                background: white;
                padding: 5px 10px;
                font-weight: 400;
                border-radius: 2px;
                font-size: 12px;
                color: #25282A;
            }

            .row {
                display: flex;
                width: 100%;
                justify-content: space-between;

                input {
                    width: 4.5rem;
                }
            }

            .name {
                margin-top: 1.5rem;
            }
        }
    }
</style>
