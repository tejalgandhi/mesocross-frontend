<template>
  <main>
    <figure v-click-outside="hideUserTab" class="mb-0">
      <img src="@/assets/img/user.svg" alt="user" @click="showUserTab = !showUserTab">
      <transition name="pop">
        <span v-if="$auth.loggedIn" class="info" />
      </transition>
      <transition name="show">
        <user-tab v-if="showUserTab" @close="showUserTab = false" />
      </transition>
    </figure>
    <figure class="mb-0" @click="goTo('/wishlist')">
      <img src="@/assets/img/star.svg" alt="favs">
      <span v-if="wishlist" class="number">{{ wishlist }}</span>
    </figure>
    <figure class="mb-0" @click="goTo('/cart')">
      <img src="@/assets/img/basket.svg" alt="cart">
      <span v-if="products" class="number">{{ products }}</span>
    </figure>
    <figure class="mb-0" @click="setSearch">
      <img src="@/assets/img/search.svg" alt="search">
    </figure>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserTab from './UserProfile.vue'
export default {
  components: {
    UserTab
  },

  data () {
    return {
      showUserTab: false,
      cartPreview: false
    }
  },

  computed: {
    ...mapGetters({
      products: 'cart/totalUnits' || 0,
      wishlist: 'cart/totalFavs' || 0
    })
  },

  methods: {
    ...mapActions({
      setSearch: 'setSearch'
    }),
    hideUserTab () {
      this.showUserTab = false
    },
    goTo (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>

    .show-enter-active,
    .show-leave-active {
        animation: show 0.2s ease-in-out;
    }

    .show-enter-from,
    .show-leave-to {
        animation: show 0.2s reverse ease-in-out;
    }

    main {
        display: flex;
        gap: 1.5rem;
        box-shadow: none;

        figure {
            cursor: pointer;
            position: relative;
            display: flex;
            justify-content: center;

            span {
                position: absolute;
                border-radius: 50%;
                background: rgb(66, 66, 66);
                display: flex;
                justify-content: center;
                align-items: center;

                &.info {
                    top: -2.5px;
                    right: 0px;
                    width: 10px;
                    height: 10px;
                }

                &.number {
                    top: -5px;
                    right: -10px;
                    width: 20px;
                    height: 20px;
                    color: white;
                    font-size: 0.7rem;
                }
            }
        }
    }

    @keyframes show {
        from {
            transform: translateY(10px);
            opacity: 0;
        }

        to {
            transform: translateY(0px);
            opacity: 1;
        }
    }
</style>
