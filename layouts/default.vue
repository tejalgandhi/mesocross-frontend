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
      pageBackground: 'linear-gradient(to top, 180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 49%, rgba(0,0,0,1) 50%, rgba(0,0,0,1), 51%, rgba(0,0,0,1) 84%, rgba(0,0,0,1) 100%)',
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

      this.pageBackground = `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 49%, rgba(0,0,0,1) 50%, ${this.hexToRgbA(colors[0])} 51%, ${this.hexToRgbA(colors[1])} 84%, ${this.hexToRgbA(colors[2])} 100%)`
    },

    hexToRgbA (hex) {
      if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        return
      }
      let c
      c = hex.substring(1).split('')
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]]
      }
      c = '0x' + c.join('')
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
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
    background-position: 0% 100% !important ;

    &.custom {
        background-position: 0% 0% !important ;
    }
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
