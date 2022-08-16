<template>
  <div class="col-lg-9">
    <div class="row">
      <div v-for="(product, index) in products" :key="index" class="col-lg-4 col-6 position-relative">
        <a v-if="$auth.loggedIn" href="javascript:void(0)" class="fav-icon" @click="addToWishlist(product)">
          <img v-if="isInWhishlist(product)" :src="require('@/assets/img/Heart_icon_selected.svg')" alt="image" class="wishicon">
          <img v-else src="@/assets/img/heart-icon.svg" alt="image" class="wishicon">
        </a>
        <nuxt-link
          :to="`/equipment-details/${product.slug}`"
        >
          <div
            class="product_box"
            @mouseover="hoveredImage = index"
            @mouseleave="hoveredImage = '' "
          >
            <div class="img_box">
              <nuxt-img
                preload
                format="webp"
                :src=" hoveredImage !== index ? product.feature_image : product.hover_image"
                alt="image"
                quality="100"
                sizes="xs:256 md:512"
              />
            </div>

            <div class="content_box d-flex align-items-end justify-content-center text-center text-uppercase">
              <div class="inline-box">
                <label>{{ product.name }}</label>
                <p>{{ product.short_description }}</p>
                <span v-show="$auth.loggedIn">{{ productPrice(product) }}€</span>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div v-if="products.length == 0 && loadingFinish">
        <h3>{{ $t('no_product_found') }}</h3>
      </div>
      <div v-if="paginate.meta && paginate.meta.last_page > paginate.meta.current_page" class="view_more">
        <a @click="viewMore">{{ $t('view_more') }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
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
    ...mapGetters({
      isWished: 'cart/isWished'
    }),
    productImage () {
      return (product) => {
        return product.feature_image ? `${process.env.uploadURL}${product.feature_image}` : ''
      }
    },
    productPrice () {
      return (product) => {
        if (product && product.price) {
          const prices = product.price
          return prices[0].price || ''
        } else {
          return ''
        }
      }
    },
    isInWhishlist () {
      return (product) => {
        return this.isWished(product)
      }
    },
    ...mapState({
      wishList: state => state.cart.wishList,
      isLoggedin: state => state.user.loggedIn
    })
  },
  methods: {
    viewMore () {
      const nextPage = this.paginate.meta.current_page + 1
      this.$emit('fetchProducts', nextPage)
    },
    addToWishlist (product) {
      const singleProduct = {
        name: product.name,
        slug: product.slug,
        product_id: product.id,
        price: product.price[0].price,
        short_description: product.short_description,
        product_size_price_id: product.price[0].product_size_price_id,
        feature_image: product.feature_image,
        flag: !this.isInWhishlist(product) ? 1 : 2
      }
      this.addWishList(singleProduct)
    },
    ...mapActions({
      fetchProducts: 'product/fetchProducts',
      addWishList: 'cart/addWishList'
    })
  }
}
</script>

<style type="text/css">
.fav-icon {
  position: absolute;
  top: 25px;
  right: 20px;
  z-index: 1;
}
.img_box img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: 0.6s;
    transform: scale(1.0);
}
</style>
</style>
