<template>
  <div :class="className === 'col-lg-4' ? 'col-lg-4' : className">
    <div class="product-item">
      <img v-if="isWishList" src="@/assets/img/close.svg" alt="image" class="close cursor-pointer" @click="removeWishlist">
      <nuxt-link class="text-decoration-none" :to="`/product-detail/${product.slug}`">
        <img :src="product.feature_image" class="product-image" alt="image">
        <div class="desc_box py-4">
          <!-- temporary condition added " v-if="className=='product-slide'" " -->
          <div v-if="className=='product-slide'" class="product-type">
            <span>core</span>
          </div>
          <div class="prodcut-title">
            {{ product.name }}
          </div>
          <p class="product-desc">
            {{ product.short_description }}
          </p>
          <div v-if="className=='product-slide'" class="seperator" />
          <div v-if="className=='product-slide'" class="product-categoty">
            rejuvenating cream
          </div>
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
        color: #ffffff;
        font-size: 20px;
        text-transform: uppercase;
        margin-bottom: .3rem;
        @media (max-width:767px) {
          font:normal normal normal 16px/22px Arquitecta;
        }
    }
    .product-desc{
      text-transform: uppercase;
      color: #FFFFFF;
      font-weight: 300;
    }
    .price{
      display: block;
      font-size: 20px;
      margin-top: 1rem;
    }
    .product-type{
      position: relative;
      margin-bottom: 8px;
      span{
        position: relative;
        text-transform: uppercase;
        font-size: 13px;
        &::after, &::before{
          position: relative;
          display: inline-block;
          vertical-align: middle;
          content: '';
          width: 3px;
          height: 3px;
          border:unset;
          border-radius: 0;
          background: #ffffff;
          transform: rotate(45deg);
          transform-origin: center;
        }
        &::after{
          margin-left: 10px;
        }
        &::before{
          margin-right: 10px;
        }
      }
    }
    .product-categoty{
      position: relative;
      color: rgba($color: #ffffff, $alpha: 0.6);
      text-transform: uppercase;
    }
}

.seperator{
  position: relative;
  margin: 10px auto;
  &::before{
    position: relative;
    content: '';
    display: block;
    background: rgba($color: #ffffff, $alpha: 0.6);
    width: 30px;
    height: 1px;
    margin: 0 auto;
  }
}
</style>
