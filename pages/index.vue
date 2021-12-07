<template>
  <div>
    <div class="slider">
      <div class="container-fluid detail-slider">
        <!-- <div > -->
        <VueSlickCarousel v-if="sliderIteams.length" :arrows="true" :dots="true" class="pro_slider">
          <div v-for="(iteams, index) in sliderIteams" :key="index">
            <img :src="iteams.image" alt="aa">
            <div class="content_text">
              <h2>{{ iteams.title }}</h2>
              <h3>{{ iteams.message }}</h3>
              <LinkSetByType :item="iteams" :title="'Discover'" />
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </div>

    <div v-if="treatmentSolutions.length" class="treatment">
      <div class="container-fluid treatment-items">
        <h2>Treatment Solutions</h2>
        <VueSlickCarousel v-show="treatmentSolutions.length > 0" v-bind="settings" :arrows="false" :dots="true" class="pro_slider">
          <div v-for="(val, index) in treatmentSolutions" :key="index" class="treatment-item mx-auto text-center">
            <nuxt-link :to="`/products/ts/${val.slug}`">
              <img :src="val.image" alt="" class="mx-auto">
              <span style="white-space: nowrap !important;">{{ val.name }}</span>
            </nuxt-link>
          </div>
        </VueSlickCarousel>
      </div>
    </div>

    <HomeBlogs />
    <BestSeller />
    <HomeNewReleases />
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import { mapActions, mapGetters } from 'vuex'
import BestSeller from '~/components/home/BestSeller.vue'
import HomeBlogs from '~/components/home/Blogs.vue'
import LinkSetByType from '~/components/home/LinkSetByType.vue'

export default {
  components: {
    HomeBlogs,
    BestSeller,
    VueSlickCarousel,
    LinkSetByType
  },
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

<style lang="css" type="text/css">
.treatment-item {
  height: 50px !important;
  width: 100% !important;
  margin: 20px 0 !important;
}

.treatment-item img {
  height: 50px !important;
  width: 85px !important;
  object-fit: scale-down;
}

.treatment-items .slick-dots {
  bottom: -50px !important;
}
.treatment-item span {
  white-space: nowrap !important;
}
</style>
