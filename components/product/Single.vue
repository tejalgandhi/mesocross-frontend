<template>
  <div :class="className === 'col-lg-4' ? 'col-lg-4' : className">
    <div class="product-item">
      <img v-if="isWishList" src="@/assets/img/close.svg" alt="image" class="close cursor-pointer" @click="removeWishlist">
      <nuxt-link class="text-decoration-none" :to="`/product-detail/${product.slug}`">
      <img :src="product.feature_image" class="product-image" alt="image"></img>
        <div class="desc_box py-4">
          <div class="prodcut-title">
            {{ product.name }}
          </div>
          <p class="product-desc">
            {{ product.short_description }}
          </p>
          {{product.price}}
          <span v-if="productPrice">{{ productPrice }}€</span>
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
      if (this.product.price) {
        // console.log(typeof this.product.price)
        const prices = this.product.price
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
.product-item{
    padding: 3rem;
    text-align: center;
     @media (max-width:991px) {
      padding: 1rem;
     }
    .product-image{
        height: 315px;
        object-fit: contain;
        margin-bottom: 1.5rem;
        @media (max-width:991px) {
          height: 200px;
        }
    }
    .prodcut-title{
        font: normal normal normal 20px/28px Arial;
        text-transform: uppercase;
        margin-bottom: .5rem;
    }
    .product-desc{
        color: #FFFFFF;
        opacity: 0.6;
        font: normal normal normal 16px/24px Arial;
    }
}
</style>
