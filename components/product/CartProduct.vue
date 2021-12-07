<template>
  <div class="cart_prod cart-product">
    <div class="cart_img">
      <img :src="product.feature_image" alt="">
    </div>
    <div class="cart_desc">
      <nuxt-link :to="`/product-detail/${product.slug}`">
        {{ product.name }} ({{ product.size }})
      </nuxt-link>
      <label>Ref:{{ product.ref_number }}</label>
      <div class="cart-qty mt-3">
        <button type="button" @click="updateQty(2)">
          -
        </button>
        <input type="number" disabled :value="product.qty" class="col-md-1 col-3 py-1">
        <button type="button" @click="updateQty(1)">
          +
        </button>
      </div>
      <div class="act">
        <span>{{ product.price }}€</span>
        <div class="act_btn">
          <a href="javascript:void(0)" class="del d-flex align-items-center justify-content-center" @click="deletecart">
            <img src="@/assets/img/trash.png" class="mr-2" alt="">
            Delete</a>
          <a href="javascript:void(0)" class="wish px-0" @click="addToWishlist">
            <img :src="isProductInWishList ? require('@/assets/img/Heart_icon_selected.svg') : require('@/assets/img/heart-icon.svg')" alt="" class="fav">Save to wishlist
          </a>
        </div>
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
      return this.wishList.findIndex(pr => pr.product_id === this.product.product_id) > -1
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
      this.$toast.success('Product Deleted from cart successfully.', { duration: 3000, position: 'top-right' })
    },
    updateQty (flag) {
      if (flag === 2 && this.product.qty === 1) {
        return false
      }
      const product = { ...this.product }
      product.flag = flag
      product.is_update = 1
      this.addToCart(product)
      this.$toast.success('Product Quantity is updated.', { duration: 3000, position: 'top-right' })
    },
    addToWishlist () {
      const singleProduct = {
        name: this.product.name,
        slug: this.product.slug,
        product_id: this.product.product_id,
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

<style>
.cart-product .act_btn a.wish {
  background: none !important;
}
.fav {
  height: 20px;
  width: 20px;
  margin-right: 10px;
}
</style>
