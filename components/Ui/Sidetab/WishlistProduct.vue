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
        <div class="category">
          <span>{{ product.category }}</span>
        </div>
        <div class="name">
          <span>{{ product.name }}</span>
          <span class="desc">{{ product.short_description }}</span>
        </div>
        <div class="final">
          <span class="price">{{ product.product_size[0].price }}€ </span>
          <span>| {{ product.product_size[0].name }}</span>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="tab-btn add" @click="toCart">
        <span>{{ $t('add_to_cart') }}</span>
      </div>
      <div class="tab-btn remove" @click="deleteProduct">
        <span>{{ $t('remove') }}</span>
      </div>
    </div>
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

  computed: {
    productSize () {
      if (this.product && (this.product.product_size && this.product.product_size.length !== 0)) {
        return this.product.product_size[0]
      }
      return null
    }
  },

  methods: {
    ...mapActions({
      addWishList: 'cart/addWishList',
      addToCart: 'cart/addToCart'
    }),

    deleteProduct () {
      const product = {
        product_id: this.product.id || this.product.product_id,
        flag: 2
      }
      this.addWishList(product)
    },

    toCart () {
      const product = {
        name: this.product.name,
        slug: this.product.slug,
        price: this.productSize.price,
        size_id: this.productSize.size_id,
        product_size_price_id: this.productSize.product_size_id,
        feature_image: this.product.feature_image,
        size: this.productSize.name,
        product_id: this.product.id,
        ref_number: this.productSize.ref_number,
        domestic_price: this.productSize.domestic_price,
        international_price: this.productSize.domestic_price,
        flag: 1,
        qty: 1
      }

      this.addToCart(product)

      this.$toast.success('Product Added to cart successfully.', { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
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

                .category {
                    position: relative;
                    display: flex;
                    align-items: center;

                    &::before, &::after {
                        content: '';
                        width: 4px;
                        height: 4px;
                        background: black;
                        transform: rotate(45deg);
                    }

                    &::before {
                        left: 0;
                    }

                    &::after {
                        right: 0;
                    }

                    span {
                        padding-inline: 10px;
                        text-transform: uppercase;
                        font-size: 16px;
                        font-weight: 200;
                    }
                }

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

            .tab-btn {
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

                &.add {
                    color: white;
                    background: black;

                    &:hover {
                        background: rgba(0, 0, 0, 0.8);
                    }
                }
            }
        }

    }
</style>
