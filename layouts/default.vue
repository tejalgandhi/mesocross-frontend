<template>
  <div>
    <b-overlay :show="loading" rounded="sm">
      <ThemeHeader />
      <CommonSearch v-show="search" @click="isClicked(false)" />
      <div @click="isClicked(false)">
        <Nuxt />
      </div>
      <ThemeFooter />
    </b-overlay>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
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
</style>
