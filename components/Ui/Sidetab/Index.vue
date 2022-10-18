<template>
  <div class="cart-preview">
    <div class="overlay" @click="$emit('close')" />
    <div class="cart">
      <div class="title">
        <span>{{ $t(title) }} ({{ productCount }})</span>
        <figure @click="$emit('close')">
          <img src="@/assets/img/close.svg" alt="image">
        </figure>
      </div>
      <div class="products" :class="{center: !products.length, full: title !== 'Cart'}">
        <template v-if="!$auth.$state.loggedIn">
          <span>{{ $t('you_are_not_logged_in') }}</span>
          <nuxt-link class="btn btn-primary d-block mt-4 mb-5 mx-auto filter-invert" to="/login">
            {{ $t('sign_in') }}
          </nuxt-link>
        </template>
        <template v-else-if="products.length">
          <template v-for="(product, i) in products">
            <UiSidetabWishlistProduct v-if="title === 'Wishlist'" :key="i" :product="product" />
            <UiSidetabCartProduct v-else :key="i" :product="product" />
          </template>
        </template>
        <template v-else>
          <span>{{ $t('your_cart_is_empty') }}</span>
        </template>
      </div>
      <div v-if="$auth.$state.loggedIn && title === 'Cart'" class="go-cart">
        <div class="total">
          <span class="subtotal">{{ $t('Subtotal') }}</span>
          <span class="value">{{ subTotal || 0 }}€</span>
        </div>
        <span class="btn" @click="goTo('cart')">{{ $t('purchase') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    }
  },

  data () {
    return {
      close: false
    }
  },

  computed: {
    ...mapGetters({
      cartUnits: 'cart/totalUnits' || 0,
      cartProducts: 'cart/getProducts',
      wishlistProducts: 'cart/getWishlist',
      subTotal: 'cart/subTotal'
    }),

    productCount () {
      if (this.title === 'Wishlist') {
        return this.wishlistProducts.length
      }

      return this.cartUnits
    },

    products () {
      if (this.title === 'Wishlist') {
        return this.wishlistProducts
      }

      return this.cartProducts
    }
  },

  methods: {
    goTo (path) {
      this.$router.push(`/${path}`)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
    .cart-preview {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: flex-end;
        z-index: 100;
        color: #25282A;

        .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            background: rgba(0,0,0,0.3);
            display: block;
            z-index: -1;
            animation: fade 0.2s ease-in-out forwards;
        }

        .cart {
            position: absolute;
            top: 0px;
            right: 0;
            background: white;
            max-width: 500px;
            width: 100%;
            height: 100%;
            z-index: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            animation: slide 0.2s ease-in-out forwards;

            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 300;
                font-size: 1.5rem;
                height: 100px;
                padding: 0 40px;
                position: relative;
                text-transform: uppercase;

                &::after {
                    content: '';
                    background: #0000001F;
                    height: 1px;
                    width: calc(100% - 80px);
                    position: absolute;
                    bottom: 0;
                }

                figure {
                    cursor: pointer;

                    img {
                        filter: invert(1);
                    }
                }
            }

            .products {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                overflow: auto;
                height: calc(100% - 8rem - 100px);
                width: 100%;
                padding: 0 40px;

                &::-webkit-scrollbar {
                    display: none;
                }

                &.center {
                    align-items: center;
                    justify-content: center;
                    text-transform: uppercase;
                }

                &.full {
                    height: calc(100% - 120px);
                }
            }

            .go-cart {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                width: 100%;
                height: 8rem;
                padding: 0 40px;
                background: #000000;
                color: white;

                .total {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                    .subtotal {
                        text-transform: uppercase;
                        font-weight: 300;
                    }

                    .value {
                        font-weight: 300;
                        font-size: 1.2rem;
                    }
                }

                .btn {
                    width: 100%;
                    padding: 10px 0;
                    background: white;
                    color: #25282A;
                    text-transform: capitalize;
                    font-weight: 300;
                    transition: 0.2s;
                    text-transform: uppercase;

                    &:hover {
                        background: #ffffffe8;
                    }
                }
            }
        }
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes slide {
        from {
            opacity: 0;
            transform: translateX(250px);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }
</style>
