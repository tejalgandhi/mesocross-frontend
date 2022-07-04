<template>
  <div class="row border-top py-3 align-items-center justify-content-center">
    <div class="col-lg-4 col-md-6 col-12">
      <div class="row align-items-center">
        <div class="col-4">
          <div class="cart_img">
            <img :src="product.feature_image" alt="image">
          </div>
        </div>
        <div class="col-8">
          <nuxt-link :to="`/product-detail/${product.slug}`">
            {{ product.name }} ({{ product.size }})
          </nuxt-link>
          <label class="ref d-block">Ref:{{ product.ref_number }}</label>
        </div>
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-4">
      <div class="position-relative cart-qty mx-auto">
        <button type="button" class="btn btn-1 position-absolute" @click="updateQty(2)">
          -
        </button>
        <input type="number" disabled :value="product.qty" class="text-center py-1">
        <button type="button" class="btn btn-2 position-absolute" @click="updateQty(1)">
          +
        </button>
      </div>
    </div>
    <div class="col-lg-3 col-md-4 col-4 text-center">
      <span>{{ product.price }}€</span>
    </div>
    <div class="col-lg-2 col-md-3 col-4 text-center">
      <span>{{ (product.price * Number(product.qty) ).toFixed(2) }}€</span>
    </div>
    <div class="col-12">
      <div class="d-flex justify-content-end action-buttons">
        <button class="btn px-0 mr-4" @click="deletecart">
          {{ $t('delete') }}
        </button>
        <button class="btn px-0 text-decoration-line" @click="addToWishlist">
          {{ isProductInWishList ? 'ADDED TO WISHLIST' : 'SAVE TO WISHLIST' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  computed: {
    isProductInWishList () {
      return this.wishList.findIndex(pr => pr.product_id === this.product.product_id && this.product.product_size_price_id === pr.product_size_price_id) > -1
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
.cart-qty {
  width: fit-content !important;
}
.cart-product .act_btn a.wish {
  background: none !important;
}
.fav {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}
.btn-2 {
  right: 0;
}
a img.mr-2 {
  height: 20px;
}
.cart_img img{
  width: 77px;
  height: 106px;
  object-fit: contain;
}
.ref{
  font: normal normal normal 14px/16px Work Sans;
  color: rgba( #fff, 0.4);
}
.cart-qty > * {
  height: 40px;
}
.cart-qty input{
  height: 45px;
    width: 110px;
    background: transparent;
    border-color: rgba( #fff, 0.2) ;
    color: #FFF;
}
.action-buttons{
  .btn{
    text-decoration: underline;
  }
}
</style>
