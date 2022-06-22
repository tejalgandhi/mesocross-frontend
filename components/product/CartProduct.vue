<template>
  <div class="cart_prod cart-product">
    <div class="cart_img">
      <img :src="product.feature_image" alt="image">
    </div>
    <div class="cart_desc">
      <nuxt-link :to="`/product-detail/${product.slug}`">
        {{ product.name }} ({{ product.size }})
      </nuxt-link>
      <label>Ref:{{ product.ref_number }}</label>
      <div class="position-relative mr-3 cart-qty mt-3">
        <button type="button" class="btn btn-1 position-absolute" @click="updateQty(2)">
          -
        </button>
        <input type="number" disabled :value="product.qty" class="text-center py-1" style="height: 45px; width: 110px">
        <button type="button" class="btn btn-2 position-absolute" @click="updateQty(1)">
          +
        </button>
      </div>
      <div class="act">
        <span>{{ product.price }}€</span>
        <div class="act_btn">
          <a href="javascript:void(0)" class="del d-flex align-items-center justify-content-center my-2 my-md-0 mx-0 mx-md-2" @click="deletecart">
            <img src="@/assets/img/delete.jpeg" class="mr-2" alt="image">
            {{ $t('delete') }}</a>
          <a href="javascript:void(0)" class="wish px-0 mx-auto mx-md-2" @click="addToWishlist">
            <img :src="isProductInWishList ? require('@/assets/img/Heart_icon_selected.svg') : require('@/assets/img/heart-icon.svg')" alt="image" class="fav">{{ $t('save_to_wishlist') }}
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

<style>
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

/* .btn:focus {
  outline: none !important;
  box-shadow: none !important;
}
.btn {
  height: 45px;
} */
.btn-2 {
  right: 0;
}
a img.mr-2 {
  height: 20px;
}
</style>
