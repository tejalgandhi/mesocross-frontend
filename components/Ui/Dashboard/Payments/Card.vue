<template>
  <article :class="{valid: isValid}">
    <span class="triangle" />
    <div class="triangle-content">
      <span v-if="isValid" class="checkmark">
        <div class="checkmark_stem" />
        <div class="checkmark_kick" />
      </span>
      <span v-else class="invalid" />
    </div>
    <figure>
      <img v-if="data.brand.toLowerCase() === 'visa'" src="@/assets/img/visa.svg" alt="card_company">
      <img v-if="data.brand.toLowerCase() === 'amex'" src="@/assets/img/amex.svg" alt="card_company">
      <img v-if="data.brand.toLowerCase() === 'mastercard'" src="@/assets/img/mastercard.svg" alt="card_company">
    </figure>
    <div class="info">
      <span class="card_number">**** **** **** {{ data.last4 }}</span>
      <span>{{ data.exp_month }}/{{ data.exp_year.toString().slice(-2) }}</span>
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

  computed: {
    isValid () {
      const d = new Date()
      const month = d.getMonth() + 1
      const year = d.getFullYear()

      return this.data.exp_month >= month && this.data.exp_year >= year
    }
  }
}
</script>

<style lang="scss" scoped>
    article {
        border: solid 1px;
        border-color: #9c1111;
        border-radius: 4px;
        width: 100%;
        max-width: 20rem;
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

        &.valid {
            border-color: #2b772b;

            .triangle {
                border-color: transparent transparent #2b772b transparent;
            }
        }

        .triangle {
            position: absolute;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 52px 52px;
            border-color: transparent transparent #9c1111 transparent;
            bottom: 0;
            right: 0;
            transition: 0.4s;
        }

        .triangle-content {
            position: absolute;
            width: calc(52px / 1.5);
            height: calc(52px / 1.5);
            bottom: 0;
            right: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            .checkmark {
                display:inline-block;
                width: 22px;
                height:22px;
                transform: rotate(45deg);

                .checkmark_stem {
                    position: absolute;
                    width:2px;
                    height:12px;
                    background-color:white;
                    left:12px;
                    top:3px;
                }

                .checkmark_kick {
                    position: absolute;
                    width:3px;
                    height:3px;
                    background-color:white;
                    left:9px;
                    top:12px;
                }
            }

            .invalid {
                width: 10px;
                height: 10px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;

                &::before, &::after {
                    position: absolute;
                    content: '';
                    width: 12px;
                    height: 2px;
                    background: white;
                }

                &::before {
                    transform: rotate(45deg);
                }
                &::after {
                    transform: rotate(135deg);
                }
            }
        }

        figure {
            height: 1rem;
            user-select: none;

            img {
                height: 100%;
                object-fit: contain;
                -webkit-user-drag: none;
            }
        }

        .info {
            margin: 40px 0;
            display: flex;
            flex-direction: column;
            width: fit-content;
            user-select: none;

            .card_number {
                font-weight: 500;
                font-size: 18px;
            }

            span {
                width: 100%;
                display: flex;
                font-weight: 100;
            }
        }
    }
</style>
