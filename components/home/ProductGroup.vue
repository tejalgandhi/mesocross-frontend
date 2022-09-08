<template>
  <main v-if="newProducts.length > 0">
    <div class="container-fluid">
      <h2 class="text-uppercase font-weight-normal mb-4 mt-5 mb-lg-5 text-center">
        {{ $t(title) }}
      </h2>
      <VueSlickCarousel v-if="newProducts.length" v-bind="settings1" class="pro_slider">
        <ProductSingle v-for="(product, index) in newProducts" :key="index" :product="product" :class-name="'product-slide'" />
      </VueSlickCarousel>
      <!-- <div class="row justify-content-center">
        <ProductSingle v-for="(product, index) in newProducts" :key="index" :product="product" :class-name="'col-lg-4 col-md-6'" />
      </div> -->
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
export default {
  components: {
    VueSlickCarousel
  },
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
      settings1: {
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        edgeFriction: 0.35,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
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
<style lang="scss">
  .slick-dots{
    position: relative;
    margin-top:50px;
     li{
      width: 5px !important;
      height: 5px;
      margin: 0 10px;
      border:unset;
      border-radius: 0;
      background: rgba($color: #ffffff, $alpha: 0.5);
      transform: rotate(45deg);
      transform-origin: center;
      cursor: pointer;
    }
  }
</style>
