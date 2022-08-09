<template>
  <div>
    <div class="text-light product-sidebar">
      <nuxt-link class="text-decoration-none row align-items-center" :to="`/product-detail/${product.slug}`">
        <div class="col-auto pr-0">
          <img :src="product.feature_image" class="product-img" alt="image">
        </div>
        <div class="col">
          <h6 class="text-uppercase">
            {{ product.name }}
          </h6>
          <span v-if="productPrice && $auth.loggedIn" class="price">{{ productPrice }}€</span>
        </div>
      </nuxt-link>
    </div>
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
    }
  },
  methods: {
    ...mapActions({
      addWishList: 'cart/addWishList'
    }),
    removeWishlist () {
      const singleProduct = {
        name: this.product.name,
        slug: this.product.slug,
        product_size_price_id: this.product.product_size_price_id,
        product_id: this.product.product_id,
        flag: 2
      }
      this.addWishList(singleProduct)
    }
  }
}
</script>
<style lang="scss" scoped>
.product-img{
  height: 100px;
  object-fit: contain;
  width: 100px;
  padding: 10px;
}
.product-sidebar {
  a{
    color: #000;
  }
}
</style>
