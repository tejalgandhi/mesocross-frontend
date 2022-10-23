<template>
  <div class="col-lg-12">
    <div class="row">
      <div v-for="(product, index) in products" :key="index" class="col-lg-4 col-6 position-relative">
        <a v-if="$auth.$state.loggedIn" href="javascript:void(0)" class="fav-icon" @click="addToWishlist(product)">
          <img v-if="isInWhishlist(product)" :src="require('@/assets/img/Heart_icon_selected.svg')" alt="image" class="wishicon">
          <img v-else src="@/assets/img/heart-icon.svg" alt="image" class="wishicon">
        </a>
        <nuxt-link class="article" :to="`/product-detail/${product.slug}` + (segmentId ? `?segment=${segmentId}` : '')">
          <div
            class="product_box"
            @mouseover="hoveredImage = index"
            @mouseleave="hoveredImage = '' "
          >
            <div class="img_box">
              <nuxt-img
                v-show="hoveredImage !== index"
                preload
                format="webp"
                :src="product.feature_image"
                alt="image"
                quality="100"
                sizes="xs:256 md:512"
              />
              <nuxt-img
                v-show="hoveredImage === index"
                preload
                format="webp"
                :src="product.hover_image"
                alt="image"
                quality="100"
                sizes="xs:256 md:512"
              />
            </div>
            <div class="content_box d-flex align-items-end justify-content-center text-center text-uppercase">
              <div class="product-info">
                <span class="category">{{ product.category }}</span>
                <label>{{ product.name }}</label>
                <hr>
                <span class="desc">{{ product.short_description }}</span>
                <span v-if="$auth.$state.loggedIn">{{ productPrice(product) }}€</span>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div v-if="products.length === 0" class="my-5 col-12 text-center">
        <h3>{{ $t('no_product_found') }}</h3>
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
      default: () => []
    },
    loadingFinish: {
      type: Boolean,
      default: false
    },
    segmentId: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      hoveredImage: null
    }
  },

  computed: {
    ...mapState({
      wishList: state => state.cart.wishList,
      isLoggedin: state => state.user.loggedIn
    }),

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
      return this.isWished
    }
  },

  methods: {
    ...mapActions({
      fetchProducts: 'product/fetchProducts',
      addWishList: 'cart/addWishList'
    }),

    productLink (slug) {
      return `/product-detail/${slug}` + (this.segmentId ? `?segment=${this.segmentId}` : '')
    },

    addToWishlist (product) {
      const singleProduct = {
        name: product.name,
        slug: product.slug,
        product_id: product.id,
        price: product.price,
        short_description: product.short_description,
        product_size_price_id: product.price[0].product_size_price_id,
        feature_image: product.feature_image,
        flag: !this.isInWhishlist(product) ? 1 : 2
      }
      this.addWishList(singleProduct)
    },

    goTo (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style lang="scss" scoped>
.fav-icon {
  position: absolute;
  top: 25px;
  right: 20px;
  z-index: 1;

  @media (max-width:767px) {
    top: 13px;
  }
}
.product-title{
  font: normal normal normal 20px/28px Arquitecta;
    letter-spacing: 1.25px;
  color: #FFFFFF;
  text-transform: uppercase;
  opacity: 1;
}

.article {
    cursor: pointer;

    .img_box {
        height: 400px;
        margin-bottom: 2rem;
        overflow: hidden;
        transition: 0.6s;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: 0.6s;
            transform: scale(1.0);
        }
    }

    .product-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .category {
            width: fit-content;
            font-weight: 100;
            font-size: 16px;
            position: relative;
            display: flex;
            align-items: center;
            transition: 0.2s;

            &::before, &::after {
                content: '';
                position: absolute;
                width: 4px;
                height: 4px;
                background: white;
                transform: rotate(45deg);
            }

            &::before {
                left: -12px;
            }

            &::after {
                right: -12px;
            }
        }

        label {
            font-weight: 600;
            font-size: 20px;
            text-transform: uppercase;
            margin-top: 8px;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            transition: 0.2s;
        }

        hr {
            margin: 0;
            border: none;
            width: 3rem;
            height: 1px;
            background: white;
        }

        .desc {
            margin-top: 10px;
            font-weight: 400;
            font-size: 20px;
        }
    }
}

</style>
