<template>
  <main>
    <figure v-b-toggle.wishlist-sidebar class="mb-0">
      <img src="@/assets/img/star.svg" alt="favs">
      <span v-if="wishlist" class="number">{{ wishlist }}</span>
    </figure>
    <figure v-b-toggle.card-sidebar class="mb-0">
      <img src="@/assets/img/basket.svg" alt="cart">
      <span v-if="products.length > 0" class="number">{{ products.length }}</span>
    </figure>
    <figure class="mb-0" @click="setSearch">
      <img src="@/assets/img/search.svg" alt="search">
    </figure>
<!--    <figure v-click-outside="hideUserTab" class="mb-0 text-uppercase">-->
<!--      <div v-if="!isLoggedin" :class="{'active':showUserTab}" @click="showUserTab = !showUserTab">-->
<!--        {{ $t('sign_in') }}-->
<!--      </div>-->
<!--      <div v-else :class="{'active':showUserTab}" @click="showUserTab = !showUserTab">-->
<!--        <img src="@/assets/img/user.svg" alt="search" class="mr-3">-->
<!--      </div>-->
<!--      <transition v-if="!isLoggedin" name="pop">-->
<!--        <span class="info" />-->
<!--      </transition>-->
<!--      <transition name="show">-->
<!--        <user-tab v-if="showUserTab" @close="showUserTab = false" />-->
<!--      </transition>-->
<!--    </figure>-->
  </main>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import UserTab from './UserProfile.vue'
export default {
  components: {
    UserTab
  },

  data () {
    return {
      logInUser: false,
      showUserTab: false,
      cartPreview: false
    }
  },

  computed: {
    ...mapGetters({
      products: 'cart/totalUnits' || 0,
      wishlist: 'cart/totalFavs' || 0
    }),
    ...mapState({
      wishList: state => state.cart.wishList,
      products: state => state.cart.products,
      isLoggedin: state => state.user.loggedIn,
      loggedinUser: state => state.user.loggedinUser
    }),
    fullName () {
      return (this.$auth.$state.loggedIn && this.loggedinUser?.full_name) ? `${this.loggedinUser?.full_name.substring(0, 5)}...` : ''
    },
    userName () {
      let userName = this.loggedinUser.full_name
      if (this.loggedinUser.type === 1 && this.loggedinUser.company_name) {
        userName = this.loggedinUser.company_name
      }
      return userName
    }
  },

  methods: {
    ...mapMutations({
      setLoggedin: 'user/setLoggedin',
      setLoggedinUser: 'user/setLoggedinUser'
    }),
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
            align-items: center;
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

            caption{
              position: relative;
              padding: 0;
              color: rgba($color: #ffffff, $alpha: 0.8);
              text-align: left;
              transition: all ease-in-out 0.2s;
              &:hover, &:active, &:visited, &.active{
                color: #ffffff;
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
