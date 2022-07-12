<template>
  <nav>
    <section>
      <figure @click="handleMenu">
        <template v-if="!menuOpened">
          <img src="@/assets/img/hamburguer.svg" alt="search">
        </template>
        <template v-else>
          <img src="@/assets/img/close.svg" style="padding: .125rem" alt="search">
        </template>
      </figure>
      <figure @click="setSearch">
        <img src="@/assets/img/search.svg" alt="search">
      </figure>
    </section>
    <section class="logo brand-logo">
      <figure @click="goTo('/')">
        Mesocross
      </figure>
    </section>
    <section>
      <figure @click="goTo('/wishlist')">
        <img src="@/assets/img/star.svg" alt="favs">
        <transition name="pop">
          <span v-if="wishlist">{{ wishlist }}</span>
        </transition>
      </figure>
      <figure @click="goTo('/cart')">
        <img src="@/assets/img/basket.svg" alt="favs">
        <transition name="pop">
          <span v-if="products">{{ products }}</span>
        </transition>
      </figure>
    </section>
  </nav>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    from: {
      type: Number,
      required: false,
      default: () => 0
    }
  },

  data () {
    return {
      menuOpened: 0
    }
  },

  computed: {
    ...mapGetters({
      products: 'cart/totalUnits',
      wishlist: 'cart/totalFavs'
    })
  },

  watch: {
    from: {
      immediate: true,
      handler (val) {
        this.menuOpened = val
      }
    }
  },

  methods: {
    ...mapActions({
      setSearch: 'setSearch'
    }),

    goTo (url) {
      this.$router.push(url)
    },

    handleMenu () {
      this.menuOpened = !this.menuOpened
      this.menuOpened ? this.$emit('openMenu') : this.$emit('closeMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
    .pop-enter-active,
    .pop-leave-active {
        animation: pop 0.5s ease-in-out;
    }

    .pop-enter-from,
    .pop-leave-to {
        animation: pop 0.5s reverse ease-in-out;
    }

    nav {
        display: flex;
        justify-content: space-between;

        section {
            display: flex;
            gap: 2rem;

            figure {
                cursor: pointer;
                position: relative;
                width: 1.5rem;
                height: 1.5rem;
                @media (max-width: 1249px) {
                  margin-bottom: 0;
                }

                img {
                    width: 100%;
                    height: 100%;
                }

                span {
                    position: absolute;
                    border-radius: 50%;
                    background: rgb(66, 66, 66);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    top: -5px;
                    right: -10px;
                    width: 20px;
                    height: 20px;
                    color: white;
                    font-size: 0.7rem;
                }
            }
        }

        .logo {
            figure {
                width: auto;
                height: 2.5rem;
                margin: 0;
                @media (max-width: 1249px) {
                  height: 1.875rem;
                }

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    @keyframes pop {
        from {
            transform: scale(.4);
            opacity: 0;
        }

        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    .brand-logo{
      font-weight: bold;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      font-size: 20px;
      margin: 0;
    }
</style>
