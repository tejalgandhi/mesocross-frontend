<template>
  <div class="cart-preview">
    <div class="overlay" />
    <div class="cart" @mouseleave="$emit('close')">
      <div class="title">
        <span>{{ $t('Cart') }} ({{ productCount }})</span>
        <figure @click="$emit('close')">
          <img src="@/assets/img/close.svg" alt="image">
        </figure>
      </div>
      <div class="products" :class="{center: !products.length}">
        <template v-if="products.length">
          <template v-for="(product, i) in products">
            <UiCartHoverProduct :key="i" :product="product" />
          </template>
        </template>
        <template v-else>
          <span>{{ $t('your_cart_is_empty') }}</span>
        </template>
      </div>
      <div class="go-cart">
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
  data () {
    return {
      close: false
    }
  },

  computed: {
    ...mapGetters({
      productCount: 'cart/totalUnits' || 0,
      products: 'cart/getProducts',
      subTotal: 'cart/subTotal'
    })
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
                font-weight: 600;
                font-size: 1.5rem;
                height: 100px;
                padding: 0 40px;
                position: relative;

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
                }
            }

            .products {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 2rem;
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
                background: #0000001F;

                .total {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                    .subtotal {
                        text-transform: uppercase;
                        font-weight: 500;
                    }

                    .value {
                        font-weight: 600;
                        font-size: 1.2rem;
                    }
                }

                .btn {
                    width: 100%;
                    padding: 10px 0;
                    background: #25282A;
                    color: white;
                    text-transform: capitalize;
                    font-weight: 500;
                    transition: 0.2s;

                    &:hover {
                        background: #25282ad7;
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
