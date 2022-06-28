<template>
  <div :class="className === 'col-lg-3' ? 'col-lg-3' : className">
    <div class="productItem">
      <nuxt-link :to="`/product-detail/${product.slug}`">
        <img :src="product.feature_image" class="productImage" alt="image">
      </nuxt-link>
      <img v-if="isWishList" src="@/assets/img/close.svg" alt="image" class="close" @click="removeWishlist">
      <nuxt-link class="text-decoration-none" :to="`/product-detail/${product.slug}`">
        <div class="desc_box p-4">
          <div class="prodcutTitle">
            {{ product.name }}
          </div>
          <p class="productDesc">
            {{ product.short_description }}
          </p>
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
