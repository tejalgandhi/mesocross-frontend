<template>
  <div class="product">
    <section v-if="Object.keys(product).length">
      <div class="gallery">
        <figure @mouseenter="hoverImage = !hoverImage" @mouseleave="hoverImage = !hoverImage">
          <nuxt-img
            v-show="!hoverImage"
            preload
            format="webp"
            :src="product.feature_image"
            alt="product_image"
            quality="100"
            width="600"
            height="600"
          />
          <nuxt-img
            v-show="hoverImage"
            preload
            format="webp"
            :src="hoverImg"
            alt="product_image"
            quality="100"
            width="600"
            height="600"
          />
        </figure>
      </div>
      <div class="content">
        <UiProductDetails :data="product" @hoverImage="handleHoverImage" @selectedSize="handleSelectedSize" />
      </div>
    </section>
    <div class="add-bar">
      <div class="items">
        <div class="product-info">
          <figure v-if="product.category_image">
            <nuxt-img :src="product.category_image" alt="category_icon" />
          </figure>
          <div class="info">
            <span class="bold">{{ product.category }}</span>
            <span>{{ product.name }}</span>
            <hr>
            <span>{{ selectedSize.name }}</span>
          </div>
        </div>
        <figure class="icon">
          <nuxt-img :src="product.feature_image || ''" alt="product_image" />
        </figure>
        <div class="price" :class="{'space-between': priceHover && isLoggedin}" @mouseenter="priceHover = true" @mouseleave="priceHover = false" @click="addToBag">
          <span v-if="isLoggedin">{{ selectedSize.price }}€</span>
          <span v-else>{{ $t('log_in_to_see_price') }}</span>
          <div v-if="priceHover && isLoggedin">
            <span>{{ $t('add_to_cart') }}</span>
            <span class="arrow" />
          </div>
        </div>
      </div>
    </div>
    <HomeProductGroup v-if="product && product.slug" :title="'related_products'" :api="`/get-related-products?slug=${product.slug}`" :is-new="true" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      product: {},
      spacesURL: process.env.uploadURL,
      hoverImage: false,
      selectedSize: {},
      priceHover: false
    }
  },

  computed: {
    hoverImg () {
      if (!Object.keys(this.product).length) { return '' }
      const parsed = JSON.parse(this.product.product_images)
      return this.spacesURL + parsed[0]
    },

    ...mapGetters({
      isWished: 'cart/isWished'
    }),

    ...mapState({
      wishList: state => state.cart.wishList,
      pricePopup: state => state.pricePopup,
      isLoggedin: state => state.user.loggedIn,
      loggedinUser: state => state.user.loggedinUser
    })
  },

  watch: {
    product () {
      this.setLoading(false)
    }
  },

  created () {
    this.getData()
    this.setLoading(true)
  },

  methods: {

    ...mapActions({
      addToCart: 'cart/addToCart',
      addWishList: 'cart/addWishList'
    }),

    ...mapMutations({
      setLoading: 'setLoading'
    }),

    async getData () {
      const segment = this.$route.query ? `?segment_id=${this.$route.query.segment}` : ''
      const response = await this.$axios.get(`/product-detail/${this.$route.params.slug}${segment}`)
      if (response.status === 200) {
        this.product = response.data.data
        this.selectedSize = this.product.product_size[0]
      }
    },

    handleHoverImage (value) {
      this.hoverImage = value
    },

    handleSelectedSize (value) {
      this.selectedSize = this.product.product_size[value]
    },

    addToBag () {
      if (!this.isLoggedin) {
        this.$bvModal.show('price')
        return false
      }

      const singleProduct = {
        name: this.product.name,
        slug: this.product.slug,
        price: this.selectedSize.price,
        size_id: this.selectedSize.size_id,
        product_size_price_id: this.selectedSize.product_size_id,
        feature_image: this.product.feature_image,
        size: this.selectedSize.name,
        product_id: this.product.id,
        ref_number: this.selectedSize.ref_number,
        domestic_price: this.selectedSize.domestic_price,
        international_price: this.selectedSize.international_price,
        flag: 1,
        qty: 1
      }

      this.addToCart(singleProduct)
      this.$toast.success(this.$t('product_added_to_cart_successfully'), { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    section {
        width: 100%;
        max-width: 1340px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding: 100px 0 60px;

        @media screen and (max-width: 768px){
            flex-direction: column;
        }

        .gallery {
            width: 40%;

            @media screen and (max-width: 768px){
                width: 100%;
            }

            figure {
                width: 100%;
                height: 600px;
                overflow: hidden;
                margin: 0;
                position: relative;
                display: flex;
                justify-content: center;

                @media screen and (max-width: 768px){
                    height: 300px;
                }

                img {
                    position: absolute;
                    transition: 0.4s;
                    height: 100%;
                    object-fit: contain;
                    -webkit-user-drag: none;
                }
            }
        }

        .content {
            width: 40%;
            display: flex;
            align-items: center;

            @media screen and (max-width: 768px){
                width: 100%;
                height: 500px;
            }
        }
    }

    .add-bar {
        position: sticky;
        bottom: 0px;
        z-index: 50;
        width: 100%;
        background: black;
        text-transform: uppercase;

        @media screen and (max-width: 768px){
            padding: 10px 0;
        }

        .items {
            position: sticky;
            bottom: 0px;
            z-index: 50;
            width: 90%;
            max-width: 1300px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;

            @media screen and (max-width: 768px){
                flex-direction: column;
                gap: 0.5rem;
            }

            figure {
                display: flex;
                margin: 0;
            }

            .product-info {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                @media screen and (max-width: 768px){
                    flex-direction: column;
                }

                figure {
                    width: 32px;
                    height: 32px;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }

                .info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    text-transform: uppercase;

                    @media screen and (max-width: 768px){
                        flex-direction: column;
                    }
                    span {
                        font-weight: 200;
                        font-size: 18px;
                    }

                    .bold {
                        font-weight: 500;
                    }

                    hr {
                        margin: 0 8px;
                        border: none;
                        height: 8px;
                        width: 8px;
                        transform: rotate(45deg);
                        background: #E2C8B8;
                    }
                }
            }

            .icon {
                width: 50px;
                height: 50px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            .price {
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
        }
    }
}

</style>
