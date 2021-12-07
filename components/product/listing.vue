<template>
  <div class="col-lg-9">
    <div class="row">
      <div v-for="(product, index) in products" :key="index" class="col-lg-4">
        <div
          class="product_box"
          @mouseover="hoveredImage = index"
          @mouseleave="hoveredImage = '' "
        >
          <nuxt-link
            :to="`/product-detail/${product.slug}`"
          />
          <div class="img_box">
            <img
              :src="hoveredImage === index ? product.hover_image : product.feature_image"
              alt=""
            >
          </div>
          <div class="content_box d-flex align-items-end justify-content-center">
            <div style="min-height: 120px; display: inline-grid">
              <label>{{ product.name }}</label>
              <p>{{ product.short_description }}</p>
              <span v-if="isLoggedin">{{ productPrice(product) }}€</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="products.length == 0 && loadingFinish">
        <h3>No Products found</h3>
      </div>
      <div v-if="paginate.meta && paginate.meta.last_page > paginate.meta.current_page" class="view_more">
        <a @click="viewMore">View more</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    products: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    paginate: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    loadingFinish: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hoveredImage: null
    }
  },
  computed: {
    productImage () {
      return (product) => {
        return product.feature_image ? `${process.env.uploadURL}${product.feature_image}` : ''
      }
    },
    productPrice () {
      return (product) => {
        if (product && product.price) {
          const prices = JSON.parse(product.price)
          return prices[0].price || ''
        } else {
          return ''
        }
      }
    },
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
  },
  methods: {
    viewMore () {
      const nextPage = this.paginate.meta.current_page + 1
      this.$emit('fetchProducts', nextPage)
    },
    ...mapActions({
      fetchProducts: 'product/fetchProducts'
    })
  }
}
</script>
