<template>
  <article>
    <div class="product">
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
        <div class="name">
          <span>{{ product.name }}</span>
          <span class="desc">{{ product.short_description }}</span>
        </div>
        <div class="final">
          <span class="price">{{ price }}€ </span>
          <span>| {{ product.size }} | QTY: {{ product.qty }}</span>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="quantity">
        <div class="box">
          <span class="less" @click="updateQty(2)" />
          <span class="more" @click="updateQty(1)" />
        </div>
      </div>
      <div class="remove" @click="deleteProduct">
        <span>{{ $t('remove') }}</span>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  computed: {
    price () {
      return Math.round(((this.product.price * this.product.qty) + Number.EPSILON) * 100) / 100
    },
    ...mapState({
      discount_string: state => state.cart.discount_string
    })
  },

  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
      applyDiscount: 'cart/applyDiscount'
    }),

    updateQty (flag) {
      if (flag === 2 && this.product.qty === 1) {
        return
      }
      const product = { ...this.product }
      product.flag = flag
      product.is_update = 1
      this.addToCart(product)
      this.applyDiscount({ code: this.discount_string })
    },

    deleteProduct () {
      const product = { ...this.product }
      product.flag = 3
      this.addToCart(product)
      this.applyDiscount({ code: this.discount_string })
    }
  }
}
</script>

<style lang="scss" scoped>
    article {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 40px 0 0;
        width: 100%;

        &:last-of-type {
            padding-bottom: 40px;
        }

        .product {
            display: flex;
            align-items: center;
            gap: 1rem;

            figure {
                height: 130px;
                width: 130px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .info {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                width: calc(100% - 130px - 1rem);
                text-transform: uppercase;

                .name {
                    display: flex;
                    flex-direction: column;
                    font-weight: 400;
                    font-size: 20px;

                    .desc {
                        font-weight: 200;
                        margin-top: -10px;
                    }
                }

                .final {
                    font-weight: 200;

                    .price {
                        font-weight: 400;
                    }
                }
            }
        }

        .actions {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 1rem;

            .quantity {
                width: 100%;
                display: flex;
                justify-content: center;

                .box {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                    border-radius: 4px;
                    height: fit-content;
                    width: fit-content;
                    width: 100%;

                    .less, .more {
                        width: 50%;
                        height: 2rem;
                        position: relative;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        background: black;
                        transition: 0.2s;

                        &:hover {
                            background: rgba(0, 0, 0, 0.8);
                        }

                        &::before {
                            content: '';
                            position: absolute;
                            width: 0.5rem;
                            height: 2px;
                            background: white;
                        }
                    }

                    .more {
                        &::after {
                            content: '';
                            position: absolute;
                            width: 0.5rem;
                            height: 2px;
                            background: white;
                            transform: rotate(90deg);
                        }
                    }
                }
            }

            .remove {
                border: solid 1px black;
                cursor: pointer;
                color: black;
                display: flex;
                justify-content: center;
                align-items: center;
                text-transform: uppercase;
                width: 100%;
                height: 2rem;
                transition: 0.2s;

                &:hover {
                    background: rgba(0, 0, 0, 0.6);
                    color: white;
                    border-color: transparent;
                }
            }
        }

    }
</style>
