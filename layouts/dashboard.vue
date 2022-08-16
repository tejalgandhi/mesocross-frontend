<template>
  <div>
    <b-overlay :show="loading" rounded="sm">
      <div class="topbar container-fluid py-3">
        <div class="row align-items-center">
          <div class="col-4">
            <div class="lang_part">
              <CommonAccessPrice />
              <CommonLangSwitcher />
            </div>
          </div>
          <div class="col-4 text-center">
            <div class="navbar-brand mx-auto py-0">
              <figure class="brand-logo mb-0 cursor-pointer" @mouseover="isActive = 0" @click="goHome">
                Mesocross
              </figure>
            </div>
          </div>
          <div class="col-4 user-tab">
            <div class="d-lg-flexjustify-content-end">
              <a :href="`tel:+${telephone}`" class="mr-lg-3">NEED HELP?</a>
              <a class="d-lg-inline-block d-none" :href="`tel:+${telephone}`">+{{ telephone }}</a>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!search" :class="['myaccount mesocross-content', {dashboard: $route.name === 'dashboard'}]" @click="isClicked(false)">
        <Nuxt />
      </div>
      <ThemeFooter :class="['myaccount-footer', {'dashboard-ft': $route.name === 'dashboard'}]" />
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  layout: 'dashboard',
  computed: {
    ...mapState({
      search: state => state.search,
      loading: state => state.loading
    }),
    telephone () {
      return process.env.TELEPHONE
    }
  },

  watch: {
    $route () {
      window.scrollTo(0, 0)
    }
  },

  created () {
    if (this.$auth.loggedIn) {
      this.getWishList()
      this.getCart()
    } else {
      this.setCartProduct([])
      this.setWishListData([])
    }
  },

  methods: {
    ...mapActions({
      isClicked: 'isClicked',
      getWishList: 'cart/getWishList',
      getCart: 'cart/getCart'
    }),

    ...mapMutations({
      setCartProduct: 'cart/setCartProduct',
      setWishListData: 'cart/setWishListData'
    }),
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.brand-logo{
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: 20px;
  margin: 0;
  @media (max-width:991px) {
      font-size: 16px;
  }
}
.myaccount {
  background-color: #fff;
  color: #000;
  padding-bottom: 80px;
  &.dashboard{
     background-color: #F5F5F5;
  }
}
.myaccount-footer {
    .support-links {
      background-color: #fff;
      border-color: rgba(0,0,0,0.12157) !important;
    }
    &.dashboard-ft {
      .support-links {
      background-color: #F5F5F5;
    }
  }
}
.myaccount-footer .support-links .border-right {
  border-color: rgba(0,0,0,0.12157) !important;
}
.myaccount-footer .support-links .btn {
  color: #000;
}
.myaccount-footer .support-links .btn:hover {
  opacity: .5;
}
.shipping-tab {
  .nav-link.active,
  .nav-tabs .nav-item.show .nav-link {
   background-color: transparent;
  }
  .fill-detail-from select, input, textarea,
  .fill-detail-from select:focus, input:focus, textarea:focus{
      background: #ffffff 0% 0% no-repeat padding-box;
      border-color: #adadad;
      color: #203032;
  }
  .summary{
        min-width: 350px;
  }
  .text-dark{
    color: #25282a !important
  }
}
</style>
