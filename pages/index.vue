<template>
  <div>
    <div class="slider">
      <div class="container-fluid detail-slider px-0 px-md-3">
        <VueSlickCarousel v-if="sliderItems.length" v-bind="settings" class="pro_slider">
          <div v-for="(item, index) in sliderItems" :key="index" class="align-slider">
            <div class="overlay" />
            <nuxt-img
              preload
              format="webp"
              :src="item.image"
              alt="slider_image"
              quality="100"
              sizes="xs:768 md:1366 lg:1920"
            />
            <div class="content_text">
              <h2>{{ item.title }}</h2>
              <h3>{{ item.message }}</h3>
              <HomeLinkSetByType :item="item" :title="'Discover'" />
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </div>

    <!-- <div v-if="treatmentSolutions.length" class="treatment">
      <div class="container-fluid treatment-items px-0 px-md-3">
        <h2 class="responsive-treatment-title">
          {{ $t('treatment_solutions') }}
        </h2>
        <client-only>
          <UiSwiper :data="treatmentSolutions" :template="'image'" />
        </client-only>
      </div>
    </div> -->
    <!-- <HomeProductGroup :title="'best_sellers'" :api="'bestsellers'" /> -->
    <HomeProductGroup :title="'new_releases'" :api="'new-release'" :is-new="true" />
    <HomeBlogs />
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Index',
  components: {
    VueSlickCarousel
  },
  data () {
    return {
      sliderItems: [],
      settings: {
        dots: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              arrows: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false
            }
          }
        ]
      }
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.$get('/sliders?type=slider&page=home')
      this.sliderItems = data
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
  mounted () {
    this.getTreatmentSolutions()
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
          this.sliderItems = data
        } catch (e) {
          // console.log(e.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" type="text/css">
.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
    background: rgba(255,255,255,0.05);
}

.treatment-items {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.treatment-item-1 {
  height: 50px !important;
  /*width: 100% !important;*/
  margin: 20px 0 !important;
}

.treatment-item-1 img {
  height: 50px !important;
  width: 85px !important;
  object-fit: scale-down;
}

.treatment-items .slick-dots {
  bottom: -50px !important;
}

.swiper {
  padding: 0 15px;
  height: 160px;
}
.swiper-pagination {
  bottom: 0 !important;
}

.swiper-pagination-bullet {
  display: inline-block;
  margin: 0 5px;
  background: transparent;
  border: 1px solid #000;
  border-radius: 50%;
  height: 10px;
  opacity: 1;
  width: 10px !important;
  text-indent: -9999px;
}

.swiper-pagination-bullet-active {
  background: #25282A;
}

.align-slider {
    display: flex !important;
    align-items: center;
}
</style>
