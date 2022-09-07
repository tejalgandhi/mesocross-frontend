<template>
  <div class="bg" :class="{custom: customBg}" :style="{background: pageBackground}">
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
  data () {
    return {
      data: [],
      pageBackground: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 49%, rgba(0,0,0,1) 50%, rgba(0,0,0,1), 51%, rgba(0,0,0,1) 84%, rgba(0,0,0,1) 100%)',
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
    if (this.$auth.loggedIn) {
      this.getWishList()
      this.getCart()
    } else {
      this.setCartProduct([])
      this.setWishListData([])
    }

    this.getData()
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

    setBackground () {
      const query = this.$route.query?.segment || undefined
      const currentData = this.data.filter(el => el.slug === this.$route.params.categorySlug || (query && el.segment_id === Number(query)))

      if (!currentData.length || !currentData[0].color_gradient.length) {
        this.customBg = false
        return
      }

      this.customBg = true

      const colors = currentData[0].color_gradient.split(', ').splice(1, 3).map(el => el.replace(')', ''))

      this.pageBackground = `linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 49%, rgba(0,0,0,1) 50%, ${this.hexToRgbA(colors[0])} 51%, ${this.hexToRgbA(colors[1])} 84%, ${this.hexToRgbA(colors[2])} 100%)`
    },

    hexToRgbA (hex) {
      let c
      if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('')
        if (c.length === 3) {
          c = [c[0], c[0], c[1], c[1], c[2], c[2]]
        }
        c = '0x' + c.join('')
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
      }
      throw new Error('Bad Hex')
    },

    async getData () {
      const response = await this.$axios.$get('/categories')
      if (response.success) { this.data = response.data }
    }
  }
}
</script>

<style lang="scss" scoped>
.bg {
    background-size: 100% 250% !important;
    background-position: 0% 0% !important ;

    &.custom {
        background-position: 0% 100% !important ;
    }
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
