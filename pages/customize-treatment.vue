<template>
  <div :class="{'customize_treatment': key==0,'quiz': key > 0}">
    <div class="container">
      <div v-if="key ==0">
        <h2>Customize your treatment</h2>
        <p>As specialists we want to recommend the best for your skin and silhouette. Get a professional, personalized prescription comfortably and quickly.</p>
        <a href="javascript:void(0)" @click="start">Let's start!</a>
      </div>
      <div v-else-if="key == 6">
        <CustomTreatmentProducts :treatment="treatmentOptions" :products="products" :selected-treatment="selectedTreatment" @changeDetail="key = 1" />
      </div>
      <div v-else>
        <h3>Your personalized treatment</h3>
        <ul>
          <li :class="{'active': key == 1}" />
          <li :class="{'active': key == 2}" />
          <li :class="{'active': key == 3}" />
          <li :class="{'active': key == 4}" />
          <li :class="{'active': key == 5}" />
        </ul>
      </div>
      <LazyCustomTreatment v-if="key > 0 && key !== 6" :treatment-key="key" :treatment="treatmentOptions" @next="nextOption" @prev="key--" />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      treatmentOptions: {},
      selectedTreatment: '',
      key: 0,
      products: []
    }
  },
  beforeMount () {
    this.fetchCustomTreatmentOptions()
  },
  methods: {
    start () {
      this.key++
    },
    async fetchCustomTreatmentOptions () {
      const data = await this.$axios.$get('/custom-treatment')
      for (const i in data) {
        data[i].value = ''
      }
      this.treatmentOptions = data
    },
    async nextOption (selectedTreatment) {
      if (this.key === 4) {
        const ageGroup = this.treatmentOptions.ageGroup.value
        const gender = this.treatmentOptions.gender.value
        const partsOfBody = this.treatmentOptions.partsOfBody.value
        const skinTypes = this.treatmentOptions.skinTypes.value
        const url = `/fetch-treatment?ageGroup=${ageGroup}&gender=${gender}&partsOfBody=${partsOfBody}&skinType=${skinTypes}`
        const data = await this.$axios.$get(url)
        this.treatmentOptions.treatments = {}
        data.data.forEach((val) => {
          this.treatmentOptions.treatments[val.slug] = val.name
        })
        // eslint-disable-next-line dot-notation
        this.key++
      } else if (this.key === 5) {
        this.selectedTreatment = selectedTreatment
        const url = `/products?paginate=0&treatment_solutions=${this.selectedTreatment}&product_price=true`
        const { data } = await this.$axios.$get(url)
        this.products = data
        this.key++
      } else {
        this.key++
      }
    }
  }
}
</script>
