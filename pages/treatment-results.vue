<template>
  <section class="compare-bilds">
    <Banner :page-name="'treatment-result'" />
    <div class="container-fluid data">
      <h2 class="title">
        treatments
      </h2>
      <div class="row mx-0">
        <div v-if="data.length" class="treatment my-2 treatment-2">
          <div class="treatment-items my-4">
            <client-only>
              <UiSwiper :data="data" :template="'button'" :active="selectedIndex" @buttonClick="handleSwiperButton" />
            </client-only>
          </div>
        </div>
      </div>
      <UiCompareSlider :data="selectedTreatment" />
      <div v-if="treatmentSolutions.length" class="treatment">
        <h2 class="title">
          shop by treatment
        </h2>
        <div class="treatment-items">
          <client-only>
            <UiSwiper :data="treatmentSolutions" :template="'image'" />
          </client-only>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      data: [],
      selectedIndex: 0,
      selectedTreatment: {}
    }
  },

  async fetch () {
    const url = '/get-page-content?page=treatment-result'
    const { data } = await this.$axios.$get(url)
    this.data = data
    this.selectedTreatment = data[0]
  },

  computed: {
    ...mapGetters({
      treatmentSolutions: 'product/getHomePageTeatmentSolutions'
    })
  },

  mounted () {
    this.getTreatmentSolutions()
    setTimeout(() => {
      this.initComparisons()
    }, 500)
  },

  methods: {
    ...mapActions({
      getTreatmentSolutions: 'product/getTreatmentSolutions'
    }),

    handleSwiperButton (item) {
      this.setTreatmentResult(item)
    },

    setTreatmentResult (index) {
      this.selectedIndex = index
      this.selectedTreatment = this.data[index]
    }
  }
}
</script>
<style lang="scss" >
    .compare-bilds {
        padding: 0 0 100px;

        h2 {
            font-weight: 600;
            font-size: 2rem;
            width: 100%;
            text-align: center;
            text-transform: capitalize;
        }
    }

    .data {
        margin-top: 40px;
    }
</style>
