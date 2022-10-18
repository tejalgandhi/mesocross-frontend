<template>
  <div class="cart-product row">
    <div class="product-info">
      <figure>
        <nuxt-img
          preload
          format="webp"
          :src="product.feature_image"
          alt="image"
          quality="100"
          class="product_img"
        />
      </figure>
      <div class="product-data">
        <span class="title"> {{ product.slug }} </span>
        <span class="desc">{{ product.short_description }}</span>
        <span class="ref">Ref.{{ product.ref_number }}</span>
      </div>
    </div>
    <div class="qty">
      <div class="box">
        <b-button size="sm" variant="light" block @click="updateQty(2)">
          <b-icon-dash />
        </b-button>
        <span>{{ product.qty }}</span>
        <b-button size="sm" variant="light" block @click="updateQty(1)">
          <b-icon-plus />
        </b-button>
      </div>
    </div>
    <div class="price">
      {{ product.price }}€
    </div>
    <div class="total">
      {{ (product.price * Number(product.qty) ).toFixed(2) }}€
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters({
      isWished: 'cart/isWished'
    }),

    isProductInWishList () {
      return this.isWished(this.product)
    },

    ...mapState({
      wishList: state => state.cart.wishList
    })
  },

  methods: {
    deletecart () {
      const product = { ...this.product }
      product.flag = 3
      this.addToCart(product)
      this.$toast.success('Product Deleted from cart successfully.', { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
    },
    updateQty (flag) {
      if (flag === 2 && this.product.qty === 1) {
        return false
      }
      const product = { ...this.product }
      product.flag = flag
      product.is_update = 1
      this.addToCart(product)
      this.$toast.success('Product Quantity is updated.', { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
    },
    addToWishlist () {
      const singleProduct = {
        name: this.product.name,
        slug: this.product.slug,
        product_id: this.product.product_id,
        price: this.product.price,
        short_description: this.product.short_description,
        product_size_price_id: this.product.product_size_price_id,
        feature_image: this.product.feature_image,
        flag: !this.isProductInWishList ? 1 : 2
      }
      this.addWishList(singleProduct)
    },
    ...mapActions({
      addToCart: 'cart/addToCart',
      addWishList: 'cart/addWishList'
    })
  }
}
</script>
<style lang="scss" scoped>
.cart-product {
    display: flex;
    width: 100%;
    margin: 0 auto;

    .product-info {
        width: 33.33333333%;
        display: flex;
        gap: 1rem;

        figure {
            height: 130px;
            width: 130px;
            overflow: hidden;
            margin: 0;
            .product_img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                -webkit-user-drag: none;
            }
        }

        .product-data {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: calc(100% - 130px - 1rem);
            text-transform: uppercase;
            font-size: 16px;

            span {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .title {
                font-size: 18px;
                font-weight: 400;
            }

            .ref {
                font-size: 12px;
            }
        }
    }

    .qty {
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;

        .box {
            width: 100%;
            max-width: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: solid 1px white;
        }
    }
    .price {
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .total {
        width: 16.66666667%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.cart-option{
  .btn{
    border-radius: 0;
    padding: 0 .75rem 0 .75rem;
    border-right: 1px solid rgba(0, 0, 0, 0.25) !important;
    &:last-child{
      border-right: 0 !important;
    }
  }
}

.ws-product {
    margin-bottom: 1.5rem;
    cursor: pointer;
    display: flex;
}

.product-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 130px;

    .main {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        font-size: 20px;
        text-transform: uppercase;

        .title {
            font-weight: 500;
        }

        .desc {
            font-weight: 300;
            margin-top: -10px;
        }
    }

    .prices {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 16px;

        .price {
            font-weight: 500;
        }

        hr {
            margin: 0;
            border: none;
            height: 16px;
            width: 2px;
            background: black;
        }

        .size {
            font-weight: 300;
        }
    }
}
</style>
