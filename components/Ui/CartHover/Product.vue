<template>
  <article>
    <figure>
      <nuxt-img
        preload
        format="webp"
        :src="product.feature_image"
        alt="product"
        quality="100"
        sizes="md:256"
      />
    </figure>
    <div class="info">
      <span class="name">{{ product.name }}</span>
      <span class="ref">Ref.{{ product.ref_number }}</span>
    </div>
    <figure class="remove" @click="deleteProduct">
      <img src="@/assets/img/trash.png" alt="image">
    </figure>
    <div class="quantity">
      <div class="box">
        <span class="less" @click="updateQty(2)" />
        <span class="qty">{{ product.qty }}</span>
        <span class="more" @click="updateQty(1)" />
      </div>
    </div>
    <hr>
    <span class="total">{{ Math.round(((product.price * product.qty) + Number.EPSILON) * 100) / 100 }}€</span>
  </article>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart'
    }),

    updateQty (flag) {
      if (flag === 2 && this.product.qty === 1) {
        return
      }
      const product = { ...this.product }
      product.flag = flag
      product.is_update = 1
      this.addToCart(product)
    },

    deleteProduct () {
      const product = { ...this.product }
      product.flag = 3
      this.addToCart(product)
    }
  }
}
</script>

<style lang="scss" scoped>
    article {
        display: grid;
        grid-template-columns: 25% 65% 10%;
        grid-template-rows: 1fr 50px;
        padding: 20px 0 0;

        &:not(&:first-of-type) {
            border-top: solid 1px #0000001F;
        }

        .info {
            display: flex;
            flex-direction: column;
            span {
                display: flex;
                justify-content: flex-start;
                max-width: 80%;

                &.name {
                    font-weight: 600;
                    font-size: 1.1rem;
                }

                &.ref {
                    font-weight: 500;
                    font-size: 0.8rem;
                    color: #0000001F;
                }
            }
        }

        span, figure {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .remove {
            width: 100%;
            height: fit-content;
            cursor: pointer;

            img {
                width: 15px;
                height: 15px;
            }
        }

        .quantity {
            width: 100%;
            display: flex;
            justify-content: center;

            .box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: solid 1px #0000001F;
                border-radius: 4px;
                height: fit-content;
                width: fit-content;
                padding: 8px 10px;
                width: 100%;

                .qty {
                    width: 80%;
                }

                .less, .more {
                    width: 20%;
                    width: 0.5rem;
                    height: 0.5rem;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;

                    &::before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        background: black;
                    }
                }

                .more {
                    &::after {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        background: black;
                        transform: rotate(90deg);
                    }
                }
            }

        }
    }
    // article {
    //     max-width: 100%;
    //     display: flex;
    //     align-items: center;
    //     gap: 1rem;

    //     &:not(:first-of-type) {
    //         border-top: solid 1px #16161540;
    //     }

    //     figure {
    //         width: 150px;
    //     }

    //     .info {
    //         width: calc(100% - 150px);
    //         display: flex;
    //         flex-direction: column;
    //         align-items: flex-start;
    //         text-align: left;

    //         .name {
    //             font-weight: 500;
    //         }

    //         .remove {
    //             color: rgba(0,0,0,0.5);
    //             cursor: pointer;

    //             &:hover {
    //                 text-decoration: underline
    //             }
    //         }
    //     }
    // }
</style>
