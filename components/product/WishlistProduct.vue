<template>
  <div class="text-light">
    <div class="row align-items-center">
      <div class="col-auto pr-0">
        <img class="product_img" :src="product.feature_image" alt="image">
      </div>
      <div class="col">
        <h6 class="mb-1 text-uppercase">
          <nuxt-link class="text-light" :to="`/product-detail/${product.slug}`">
            {{ product.name }}
          </nuxt-link>
        </h6>
        <div class="d-flex cart-option">
          <b-button size="sm" variant="default text-light pl-0 border-right font-weight-bold">
            <span v-if="productPrice && $auth.loggedIn">{{ productPrice }}€</span>
          </b-button>
          <b-button v-if="productSize" size="sm" variant="default text-light border-right">
            ({{ productSize.name }})
          </b-button>
        </div>
      </div>
    </div>
    <b-button size="sm" variant="light" block @click="onAddToCart">
      {{ $t('add_to_cart') }}
    </b-button>
    <b-button size="sm" variant="outline-light" block @click="removeWishlist">
      {{ $t('remove') }}
    </b-button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    className: {
      type: String,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: 'col-lg-3'
    },
    product: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    isWishList: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    productPrice () {
      if (this.product && (this.product.price || this.product.product_size)) {
        const prices = this.product.price || this.product.product_size
        return typeof prices === 'object' ? prices[0].price : prices
      }
      return ''
    },
    productImage () {
      return this.product.feature_image ? `${process.env.uploadURL}${this.product.feature_image}` : ''
    },
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
    onAddToCart () {
      const singleProduct = {
        name: this.product.name,
        slug: this.product.slug,
        price: this.productSize.price,
        size_id: this.productSize.size_id,
        product_size_price_id: this.productSize.product_size_id,
        feature_image: this.product.feature_image,
        size: this.productSize.name,
        product_id: this.product.id,
        ref_number: this.ref_number,
        domestic_price: this.productSize.domestic_price,
        international_price: this.productSize.domestic_price,
        flag: 1,
        qty: 1
      }
      this.addToCart(singleProduct)
    },
    removeWishlist () {
      const singleProduct = {
        product_id: this.product.id || this.product.product_id,
        flag: 2
      }
      this.addWishList(singleProduct)
    }
  }
}
</script>
<style lang="scss" scoped>
.product_img{
  height: 100px;
  object-fit: contain;
  width: 100px;
  padding: 10px;
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
</style>
