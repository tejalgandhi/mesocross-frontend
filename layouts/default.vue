<template>
  <div class="bg" :class="{custom: customBg}" :style="{background: pageBackground}">
    <ThemeHeader />
    <CommonSearch v-show="search" @click="isClicked(false)" />
    <div v-show="loading" class="loading">
      <span class="loader" />
    </div>
    <div v-show="!loading">
      <Nuxt @click="isClicked(false)" />
    </div>

    <ThemeFooter />
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      data: [],
      pageBackground: '',
      customBg: false
    }
  },

  computed: {
    ...mapState({
      search: state => state.search,
      loading: state => state.loading
    })
  },

  watch: {
    $route () {
      window.scrollTo(0, 0)
      this.setBackground()
    },

    data () {
      this.setBackground()
    }
  },

  created () {
    this.getData()

    if (this.$auth.$state.loggedIn) {
      this.getWishList()
      this.getCart()
      return
    }

    this.setCartProduct([])
    this.setWishListData([])
  },

  methods: {
    ...mapActions({
      isClicked: 'isClicked',
      getWishList: 'cart/getWishList',
      getCart: 'cart/getCart'
    }),

    ...mapMutations({
      setCartProduct: 'cart/setCartProduct',
      setCategories: 'categories/setCategories',
      setWishListData: 'cart/setWishListData'
    }),

    setBackground () {
      const query = this.$route.query?.segment || undefined
      const currentData = this.data.filter(el => el.slug === this.$route.params.categorySlug || (query && el.segment_id === Number(query)))

      if (!currentData.length || !currentData[0].color_gradient.length) {
        this.customBg = false
        this.pageBackground = ''
        return
      }

      this.customBg = true

      this.pageBackground = currentData[0].color_gradient
    },

    async getData () {
      const response = await this.$axios.$get('/categories')
      if (response.success) {
        this.data = response.data
        this.setCategories(this.data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {

}

.loading {
    height: calc(100vh - 185px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .loader {
        border: 8px solid #7c7b7b42;
        border-radius: 50%;
        border-top: 8px solid white;
        width: 60px;
        height: 60px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>

<style lang="scss">
button, input, select, a {
    &:focus {
        outline: none;
        box-shadow: unset !important;
    }
}
</style>
