<template>
  <main :class="{empty : !newProducts.length}">
    <div class="container-fluid">
      <h2 class="text-uppercase font-weight-normal mb-4 mt-5 mb-lg-5 text-center">
        {{ $t(title) }}
      </h2>
      <UiProductSlider v-if="newProducts.length" :data="newProducts" :settings="settings" />
      <span v-else>{{ $t('no_products_to_show') }}</span>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    api: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    isNew: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      newProducts: [],
      settings: {
        itemsPerSlide: 4,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              itemsPerSlide: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              itemsPerSlide: 1
            }
          }
        ]
      }
    }
  },
  async fetch () {
    const { data } = await this.$axios.get(`${this.api}`)
    this.newProducts = data.data || data.complementry
  },

  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
  }
}
</script>

<style lang="scss" scoped>
    main {
        &.empty {
            span {
                width: 100%;
                display: flex;
                justify-content: center;
                padding: 0 0 60px;
            }
        }
    }
</style>
