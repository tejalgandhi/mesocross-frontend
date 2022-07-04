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
              <figure class="brand-logo mb-0" @mouseover="isActive = 0" @click="goHome">
                Mesocross
              </figure>
            </div>
          </div>
          <div class="col-4 user-tab">
            <div class="d-flex justify-content-end">
              <a href="#" class="mr-3">NEED HELP?</a>
              <a href="#">+351789505960</a>
            </div>
          </div>
        </div>
      </div>
      <div v-show="!search" class="myaccount mccm-content" @click="isClicked(false)">
        <Nuxt />
      </div>
      <ThemeFooter class="myaccount-footer" />
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
    })
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
    })
  }
}
</script>

<style>
.brand-logo{
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  font-size: 20px;
  margin: 0;
}
.myaccount {
  background-color: #F5F5F5;
}
.myaccount-footer .support-links {
  background-color: #F5F5F5;
  border-color: rgba(0,0,0,0.12157) !important;
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
</style>
