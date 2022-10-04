<template>
  <div>
    <div class="row align-items-center ws-product">
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
        <div class="main">
          <span class="title"> {{ product.slug }} </span>
          <span class="desc">{{ product.short_description }}</span>
        </div>
        <div v-if="product.price && $auth.$state.loggedIn" class="prices">
          <span class="price">{{ (product.price * Number(product.qty) ).toFixed(2) }}€</span>
          <hr>
          <span class="size">{{ product.size }}</span>
          <hr>
          <span class="size"> QTY: {{ product.qty }}</span>
        </div>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-6">
        <b-button size="sm" variant="light" block @click="updateQty(2)">
          <b-icon-dash />
        </b-button>
      </div>
      <div class="col-6">
        <b-button size="sm" variant="light" block @click="updateQty(1)">
          <b-icon-plus />
        </b-button>
      </div>
    </div>
    <b-button size="sm" variant="outline-light" block @click="deletecart">
      {{ $t('delete') }}
    </b-button>
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

figure {
    height: 130px;
    width: 130px;
    overflow: hidden;
    margin: 0;
    .product_img {
        height: 100%;
        object-fit: cover;
        -webkit-user-drag: none;
    }
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
