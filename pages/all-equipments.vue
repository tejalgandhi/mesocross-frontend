<template>
  <div class="all-equipments">
    <div class="slider">
      <div class="container-fluid detail-slider px-md-3 px-0">
        <VueSlickCarousel v-if="sliderIteams.length" v-bind="settings1" class="pro_slider">
          <div v-for="(iteams, index) in sliderIteams" :key="index" class="align-slider">
            <img :src="iteams.image" alt="aa">
            <div class="content_text">
              <h2 class="font-weight-bold">
                Discover our new equipment.
              </h2>
              <h3 class="mx-4 mx-md-0">
                MCCM medical cosmetics professional solutions for acne and seborrheic prone skin
              </h3>
              <button class="btn bg-transparent border-dark text-dark px-3 px-md-5 py-2">
                Buy DLE
              </button>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
      <div class="container-fluid">
        <div class="mb-5">
          <div class="col-12 my-4">
            <h3 class="all-cat-heading">
              All Categories
            </h3>
          </div>
          <!-- {{ equipmentFirstCategories }} {{ equipmentFirstCategories }} -->
          <div class="row mb-5">
            <div class="col-md-5 mb-4">
              <div class="equipment-box py-4 px-3">
                <h5>{{ equipmentFirstCategories.name }}</h5>
                <div class="text-center">
                  <img :src="equipmentFirstCategories.banner" class="mx-auto" alt="image">
                </div>
                <nuxt-link :to="`/equipments/${equipmentFirstCategories.slug}`" class="my-4 d-block text-center font-16">
                  View More
                </nuxt-link>
              </div>
            </div>
            <div class="col-md-7 mb-4">
              <div class="equipment-box py-4 px-3">
                <h5>{{ equipmentSecondCategories.name }}</h5>
                <div class="text-center">
                  <img :src="equipmentSecondCategories.banner" class="mx-auto" alt="image">
                </div>
                <nuxt-link :to="`/equipments/${equipmentSecondCategories.slug}`" class="my-4 d-block text-center font-16">
                  View More
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="row">
            <div v-for="(category, index) in equipmentCategories" :key="index" class="col-sm-6 col-md-6 col-xl-3 mb-4">
              <div class="equipment-box py-4 px-3">
                <h5>{{ category.name | documentContent }}..</h5>
                <div class="text-center">
                  <img :src="category.banner" class="mx-auto" alt="image" style="width:100%;height: 400px;">
                </div>
                <nuxt-link :to="`/equipments/${category.slug}`" class="my-4 d-block text-center font-16">
                  View More
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'

export default {

  filters: {
    documentContent (val) {
      return val.substring(0, 20)
    }
  },
  components: {
    VueSlickCarousel
  },
  data () {
    return {
      sliderIteams: [],
      equipmentCategories: [],
      equipmentFirstCategories: '',
      equipmentSecondCategories: '',
      settings1: {
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              arrows: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              arrows: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              dots: true
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
  mounted () {
    this.fetchEquipment()
  },
  methods: {
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
    },
    async fetchEquipment () {
      const url = '/get-equipment-all-categories-details'
      const { data } = await this.$axios.$get(url)
      this.equipmentCategories = data
      this.equipmentFirstCategories = this.equipmentCategories[0]
      this.equipmentSecondCategories = this.equipmentCategories[1]
    }

  }
}
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .all-equipments .content_text {
    max-width: 400px;
    width: 100%;
  }
}
.all-cat-heading {
  font: normal normal 600 24px Work Sans;
  color: #25282A;
}
.equipment-box{
  background: #F5F5F5;
}
.equipment-box h5 {
  font: normal normal 500 30px Work Sans;
  color: #25282A;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 32px;
}
.equipment-box .text-center img{
  object-fit: contain;
}

.align-slider {
    display: flex !important;
    align-items: center;
}

</style>
