<template>
  <section>
    <div class="head">
      <div class="back" @click="$emit('back')">
        <span class="arrow" />
        <span>{{ $t('back') }}</span>
      </div>
      <h2>{{ $t('add_new_card') }}</h2>
    </div>

    <form @submit.prevent="sendData">
      <UiDashboardPaymentsNewCard :data="{brand: card.type}" @selected="handleSelected" />
      <button type="submit">
        <span>{{ $t('add') }}</span>
        <span class="arrow" />
      </button>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    }
  },

  data () {
    return {
      types: [
        {
          name: 'Visa',
          icon: '/icons/visa.svg'
        },
        {
          name: 'Mastercard',
          icon: '/icons/mastercard.svg'
        },
        {
          name: 'American Express',
          icon: '/icons/amex.svg'
        }
      ],
      card: {
        type: {
          name: 'Visa',
          icon: '/icons/visa.svg'
        }
      }
    }
  },

  methods: {
    handleSelected (data) {
      for (const key in data) {
        this.card[key] = data[key]
      }
    },

    handleChange (data) {
      this.card.type = data
    },

    async sendData () {
      console.log('new')
      const form = this.card
      form.type = form.type.name.toLowerCase()

      const response = await this.$axios.post('/stripe/create-card', this.card)

      console.log('response')
      console.log(response)
      console.log(response.status)

      if (response.status !== 200) {
        this.$toast.error(response.data.message, { duration: 5000 }, 'top-right')
        return
      }

      this.$toast.success(response.data.message, { duration: 5000, position: 'top-right', className: 'custom-toast-success-class' })
      this.$emit('back')
      this.$emit('update')
    }
  }
}
</script>

<style lang="scss" scoped>
    .head {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .back {
            display: flex;
            align-items: center;
            gap: 0.2rem;
            font-weight: 500;
            user-select: none;
            cursor: pointer;
            width: fit-content;

            &:hover {
                span {
                    text-decoration: underline;
                }
            }
            .arrow {
                width: 8px;
                height: 8px;
                border: solid 1px;
                border-color: #25282A #25282A transparent transparent;
                transform: rotate(-135deg);
                transition: 0.2s;
            }
        }

        h2 {
            font-weight: 600;
            font-size: 20px;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;

        .type {
            display: flex;
            gap: 1rem;
            width: 100%;
            .item {
                position: relative;
                display: flex;
                flex-wrap: wrap;
                width: 100%;
                max-width: 20rem;

                &.active {
                    background: #E0E0E0;
                }

                input {
                    display: none;
                }

                label {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    width: 100%;
                    border: solid 1px #E0E0E0;
                    padding: 20px;
                    cursor: pointer;

                    figure {
                        width: 4rem;
                        aspect-ratio: 2/1;

                        img {
                            width: 100%;
                            object-fit: contain;
                        }
                    }
                }
            }
        }

        .field {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            h2 {
                font-weight: 600;
                font-size: 20px;
            }
        }

        button {
            margin: 10px 0 40px;
            width: 12rem;
            background: #25282A;
            color: white;
            padding: 10px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            transition: 0.2s;

            &:hover {
                background: #25282ad0;
                .arrow {
                    margin-left: 5px;
                }
            }

            .arrow {
                width: 8px;
                height: 8px;
                border: solid 1px;
                border-color: white white transparent transparent;
                transform: rotate(45deg);
                transition: 0.2s;
            }
        }

    }
</style>
