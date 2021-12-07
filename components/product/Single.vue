<template>
  <div :class="className === 'col-lg-3' ? 'col-lg-3' : className">
    <div class="prod_box">
      <img :src="product.feature_image" alt="">
      <img v-if="isWishList" src="@/assets/img/close.svg" alt="" class="close" @click="removeWishlist">
      <nuxt-link :to="`/product-detail/${product.slug}`">
        <div class="desc_box">
          {{ product.name }}
          <p>{{ product.short_description }}</p>
          <span>{{ productPrice }}€</span>
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
        const prices = JSON.parse(this.product.price)
        return prices[0].price || ''
      }
      return 35
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
        product_id: this.product.product_id,
        flag: 2
      }
      this.addWishList(singleProduct)
    }
  }
}
</script>
