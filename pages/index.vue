<template>
  <div>
    <div class="slider">
      <div class="main-banner">
        <!-- <div > -->
<!--        <VueSlickCarousel v-if="sliderIteams.length" :arrows="true" :dots="true" class="pro_slider">
          <div v-for="(iteams, index) in sliderIteams" :key="index">
            <img :src="iteams.image" alt="aa">
            <div class="content_text">
              <h2>{{ iteams.title }}</h2>
              <h3>{{ iteams.message }}</h3>
              <LinkSetByType :item="iteams" :title="'Discover'" />
            </div>
          </div>
        </VueSlickCarousel>-->

        <div class="row mx-0 px-0 py-4">
          <div class="offset-lg-2 col-lg-6 pl-md-5 text-center text-white banner-text">
            <h1>Lorem ipsum dolor sit</h1>
            <p class="text-white mt-3 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum elit quis mi accumsan tristique.</p>
            <button class="btn bg-white text-dark">DISCOVER</button>
          </div>
        </div>
      </div>
    </div>
    <HomeNewReleases />

    <div class="high-light-product text-center pb-5">
      <div class="row mx-0 justify-content-center pb-5">
        <div class="col-md-6">
          <img src="@/assets/img/product-2.png" class="img-fluid mb-4" alt="product">
          <h3>LOREM IPSUM</h3>
          <p class="py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum elit quis mi accumsan tristique.</p>
          <button class="mt-3">
            DISCOVER
          </button>
        </div>
        <div class="col-md-6">
          <img src="@/assets/img/product-3.png" class="img-fluid mb-4" alt="product">
          <h3>LOREM IPSUM</h3>
          <p class="py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elementum elit quis mi accumsan tristique.</p>
          <button class="mt-3">
            DISCOVER
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      sliderIteams: [],
      settings: {
        arrows: false,
        dots: true,
        edgeFriction: 0.35,
        infinite: false,
        speed: 500,
        slidesToShow: 9,
        slidesToScroll: 9,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 7
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          }
        ]
      }
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.$get('/sliders?type=slider&page=home')
      this.sliderIteams = data
    } catch (e) {
      // console.log(e.message)
    }
  },
  fetchOnServer: true,
  computed: {
    ...mapGetters({
      treatmentSolutions: 'product/getHomePageTeatmentSolutions'
    })
  },
  created () {
    this.getTreatmentSolutions()
    // this.getSliders()
  },
  methods: {
    ...mapActions({
      setTreatment: 'product/setTreatment',
      getTreatmentSolutions: 'product/getTreatmentSolutions'
    }),
    getSliders () {
      this.$nextTick(async () => {
        try {
          this.$nuxt.$loading.start()
          const { data } = await this.$axios.$get('/sliders?type=slider&page=home')
          this.$nuxt.$loading.finish()
          this.sliderIteams = data
        } catch (e) {
          // console.log(e.message)
        }
      })
    }
  }
}
</script>
