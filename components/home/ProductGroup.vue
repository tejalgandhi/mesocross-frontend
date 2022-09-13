<template>
  <main v-if="newProducts.length > 0">
    <div class="container-fluid">
      <h2 class="text-uppercase font-weight-normal mb-4 mt-5 mb-lg-5 text-center">
        {{ $t(title) }}
      </h2>
      <UiProductSlider :data="newProducts" :settings="settings" />
      <!-- <VueSlickCarousel v-if="newProducts.length" v-bind="settings1" class="pro_slider">
        <ProductSingle v-for="(product, index) in newProducts" :key="index" :product="product" :class-name="'product-slide'" />
      </VueSlickCarousel> -->
      <!-- <div class="row justify-content-center">
        <ProductSingle v-for="(product, index) in newProducts" :key="index" :product="product" :class-name="'col-lg-4 col-md-6'" />
      </div> -->
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
    const { data } = await this.$axios.get(`/products/${this.api}`)
    this.newProducts = data.data
  },
  fetchOnServer: true,
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
  }
}
</script>
