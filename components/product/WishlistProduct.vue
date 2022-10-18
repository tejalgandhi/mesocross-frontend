<template>
  <div class="text-light">
    <div class="row align-items-center ws-product" @click="goToProduct">
      <figure>
        <nuxt-img
          preload
          format="webp"
          :src="product.feature_image"
          alt="image"
          quality="100"
          class="product_img"
        />
      </figure>
      <div class="product-data">
        <div class="category">
          <span class="dot" />
          <span>{{ product.category }}</span>
          <span class="dot" />
        </div>
        <div class="main">
          <span class="title"> {{ product.name }} </span>
          <span class="desc">{{ product.short_description }}</span>
        </div>
        <div v-if="productPrice && $auth.$state.loggedIn" class="prices">
          <span class="price">{{ productPrice }}€</span>
          <hr>
          <span class="size">{{ productSize.name }}</span>
        </div>
      </div>
    </div>
    <b-button class="button" size="sm" variant="light" block @click="onAddToCart">
      {{ $t('add_to_cart') }}
    </b-button>
    <b-button class="button" size="sm" variant="outline-light" block @click="removeWishlist">
      {{ $t('remove') }}
    </b-button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    className: {
      type: String,
      default: () => 'col-lg-3'
    },
    product: {
      type: Object,
      default: () => {}
    },
    isWishList: {
      type: Boolean,
      default: () => false
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
    },
    productSize () {
      if (this.product && (this.product.product_size && this.product.product_size.length !== 0)) {
        return this.product.product_size[0]
      }
      return null
    }
  },

  methods: {
    ...mapActions({
      addWishList: 'cart/addWishList',
      addToCart: 'cart/addToCart'
    }),

    goToProduct () {
      this.$router.push(`/product-detail/${this.product.slug}`)
    },

    onAddToCart () {
      const singleProduct = {
        name: this.product.name,
        slug: this.product.slug,
        price: this.productSize.price,
        size_id: this.productSize.size_id,
        product_size_price_id: this.productSize.product_size_id,
        feature_image: this.product.feature_image,
        size: this.productSize.name,
        product_id: this.product.id,
        ref_number: this.ref_number,
        domestic_price: this.productSize.domestic_price,
        international_price: this.productSize.domestic_price,
        flag: 1,
        qty: 1
      }
      this.addToCart(singleProduct)
    },

    removeWishlist () {
      const singleProduct = {
        product_id: this.product.id || this.product.product_id,
        flag: 2
      }
      this.addWishList(singleProduct)
    }
  }
}
</script>
<style lang="scss" scoped>

.ws-product {
    margin-bottom: 1.5rem;
    cursor: pointer;
}

figure {
    height: 130px;
    width: 130px;
    overflow: hidden;
    margin: 0;
    .product_img {
        height: 100%;
        object-fit: cover;
        -webkit-user-drag: none;
    }
}

.product-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 130px;

    .category {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        span {
            font-size: 18px;
            font-weight: 300;
        }

        .dot {
            width: 4px;
            height: 4px;
            background: black;
            transform: rotate(45deg);
            transition: 0.2s;
            cursor: pointer;
        }
    }

    .main {
        display: flex;
        flex-direction: column;
        gap: 0.1rem;
        font-size: 20px;
        text-transform: uppercase;

        .title {
            font-weight: 500;
        }

        .desc {
            font-weight: 300;
            margin-top: -10px;
        }
    }

    .prices {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 16px;

        .price {
            font-weight: 500;
        }

        hr {
            margin: 0;
            border: none;
            height: 16px;
            width: 2px;
            background: black;
        }

        .size {
            font-weight: 300;
        }
    }
}

.cart-option{
  .btn{
    border-radius: 0;
    padding: 0 .75rem 0 .75rem;

    &:last-child{
      border-right: 0 !important;
    }
  }
}

.button {
    font-size: 20px;
    font-weight: 300;
}

</style>
