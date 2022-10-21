<template>
  <div class="product-info">
    <h2>{{ data.category }}</h2>
    <span class="subtitle">{{ data.name }}</span>
    <hr>
    <div class="description">
      <span class="desc">{{ data.short_description }}</span>
      <div class="size">
        <template v-for="(size, i) in data.product_size">
          <span :key="i" :class="{active: selectedSize === i}" @click="selectedSize = i">{{ size.name }}</span>
        </template>
      </div>
    </div>
    <div class="price" :class="{'space-between': priceHover && isLoggedin}" @mouseenter="priceHover = true" @mouseleave="priceHover = false" @click="addToBag">
      <span v-if="isLoggedin">{{ data.product_size[selectedSize].price }}€</span>
      <span v-else>{{ $t('log_in_to_see_price') }}</span>
      <div v-if="priceHover && isLoggedin">
        <span>{{ $t('add_to_cart') }}</span>
        <span class="arrow" />
      </div>
    </div>
    <div class="data">
      <span class="wishlist" @click="addToWishlist">{{ isProductInWishList ? $t('added_to_wishlist') : $t('add_to_wishlist') }}</span>
      <span>REF: {{ data.product_size[selectedSize].ref_number }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      selectedSize: 0,
      priceHover: false
    }
  },

  computed: {
    ...mapGetters({
      isWished: 'cart/isWished'
    }),

    ...mapState({
      wishList: state => state.cart.wishList,
      pricePopup: state => state.pricePopup,
      isLoggedin: state => state.user.loggedIn,
      loggedinUser: state => state.user.loggedinUser
    }),

    isProductInWishList () {
      return this.isWished(this.data)
    }
  },

  watch: {
    selectedSize: {
      immediate: true,
      handler (val) {
        this.$emit('selectedSize', val)
      }
    }
  },

  methods: {
    ...mapActions({
      addToCart: 'cart/addToCart',
      addWishList: 'cart/addWishList'
    }),

    addToBag () {
      if (!this.isLoggedin) {
        this.$bvModal.show('price')
        return false
      }

      const singleProduct = {
        name: this.data.name,
        slug: this.data.slug,
        price: this.data.product_size[this.selectedSize].price,
        size_id: this.data.product_size[this.selectedSize].size_id,
        product_size_price_id: this.data.product_size[this.selectedSize].product_size_id,
        feature_image: this.data.feature_image,
        size: this.data.product_size[this.selectedSize].name,
        product_id: this.data.id,
        ref_number: this.data.product_size[this.selectedSize].ref_number,
        domestic_price: this.data.product_size[this.selectedSize].domestic_price,
        international_price: this.data.product_size[this.selectedSize].international_price,
        flag: 1,
        qty: 1
      }

      this.addToCart(singleProduct)
      this.$toast.success(this.$t('product_added_to_cart_successfully'), { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
    },

    addToWishlist () {
      if (!this.isLoggedin) {
        this.$bvModal.show('price')
        return false
      }

      const singleProduct = {
        name: this.data.name,
        slug: this.data.slug,
        price: this.data.product_size[this.selectedSize].price,
        short_description: this.data.short_description,
        product_id: this.data.id,
        product_size_price_id: this.data.product_size[this.selectedSize].product_size_id,
        feature_image: this.data.feature_image,
        flag: !this.isProductInWishList ? 1 : 2
      }
      this.addWishList(singleProduct)
    }
  }
}
</script>

<style lang="scss" scoped>
    .product-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100%;
        transition: 0.4s;
        text-transform: uppercase;

        h2 {
            font-weight: 900;
            font-size: 44px;
            margin: 0;
        }

        .subtitle {
            font-size: 40px;
            font-weight: 500;
            text-align: center;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        hr {
            margin: 0.2rem 0 0.6rem ;
            border: none;
            height: 1px;
            width: 2rem;
            background: white;
        }

        .description {
            font-weight: 200;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            .desc {
                text-transform: uppercase;
                font-size: 24px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .price {
                font-size: 20px;
            }

            .size {
                span {
                    user-select: none;
                    cursor: pointer;
                    &.active {
                        text-decoration: underline;
                    }
                }
            }
        }

        .price {
            margin-top: 20px;
            border: solid 1px white;
            display: flex;
            justify-content: center;
            width: 20rem;
            padding: 5px 10px;
            user-select: none;
            cursor: pointer;

            &.space-between {
                justify-content: space-between;
            }

            div {
                display: flex;
                align-items: center;
                gap: 0.2rem;

                .arrow {
                    width: 8px;
                    height: 8px;
                    border: solid 1px;
                    border-color: white white transparent transparent;
                    transform: rotate(45deg);
                }
            }
        }

        .data {
            margin-top: 8px;
            width: 20rem;
            display: flex;
            justify-content: space-between;
            font-weight: 200;
            text-transform: uppercase;
            font-size: 14px;
            padding-inline: 10px;

            .wishlist {
                user-select: none;
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
</style>
