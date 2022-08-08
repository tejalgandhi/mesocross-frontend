<template>
  <div :class="{'customize_treatment': key==0,'quiz': key > 0}">
    <div class="container">
      <div v-if="key ==0">
        <h2>{{ $t('customize_your_treatment') }}</h2>
        <p>{{ $t('customize_treatment_desc') }}</p>
        <a href="javascript:void(0)" @click="start">{{ $t('lets_start') }}!</a>
      </div>
      <div v-else-if="key == 6">
        <CustomTreatmentProductList :treatment="treatmentOptions" :solution-array="solutionArray" :products="products" :selected-treatment="selectedTreatment" @changeDetail="changeDetail" />
      </div>
      <div v-else>
        <h3>{{ $t('your_personalized_treatment') }}</h3>
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
      products: [],
      solutionArray: []
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
    async nextOption (selectedTreatment, selectedOPtionObject) {
      if (this.key === 4) {
        if (selectedOPtionObject.part_of_body === 'hair') {
          this.key = 6
          await this.fetchCustomTreatmentData(selectedOPtionObject)
        } else {
          this.key++
        }
      } else if (this.key === 5) {
        await this.fetchCustomTreatmentData(selectedOPtionObject)
        this.key++
      } else {
        this.key++
      }
    },
    async fetchCustomTreatmentData (selectedOPtionObject) {
      try {
        this.selectedTreatment = selectedOPtionObject
        const url = '/fetch-custom-treatment-products'
        const data = await this.$axios.$post(url, selectedOPtionObject)
        this.products = data.products
        this.solutionArray = data.solutionArray
      } catch (error) {
        if (error.response.status === 404) {
          this.$toast.error(error.response.data.message, { duration: 3000, position: 'top-right' })
        }
      }
    },
    changeDetail () {
      this.key = 1
      this.products = []
      this.solutionArray = []
    }
  }
}
</script>
