<template>
  <div>
    <div class="row align-items-center">
      <div class="col-auto pr-0">
        <img class="product_img" :src="product.feature_image" alt="image">
      </div>
      <div class="col">
        <h6 class="mb-1 text-uppercase">
          <nuxt-link :to="`/product-detail/${product.slug}`">
            {{ product.name }}
          </nuxt-link>
        </h6>
        <div class="d-flex cart-option">
          <b-button v-if="product.price" size="sm" variant="default text-light pl-0 border-right font-weight-bold">
            €{{ (product.price * Number(product.qty) ).toFixed(2) }}
          </b-button>
          <b-button v-if="product.size" size="sm" variant="default text-light border-right">
            ({{ product.size }})
          </b-button>
          <b-button v-if="product.qty" size="sm" variant="default text-light">
            QTY: {{ product.qty }}
          </b-button>
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
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
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
