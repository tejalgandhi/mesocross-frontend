<template>
  <div :class="{'customize_treatment': key==0,'quiz': key > 0}">
    <div class="container">
      <div v-if="key ==0">
        <h2 class="text-uppercase">
          {{ $t('customize_your_treatment') }}
        </h2>
        <p>{{ $t('customize_treatment_desc') }}</p>
        <b-button variant="outline-primary" class="px-5 rounded-0" @click="start">
          {{ $t('lets_start') }}!
        </b-button>
      </div>
      <div v-else-if="key == 7">
        <CustomTreatmentProductList :treatment="treatmentOptions" :solution-array="solutionArray" :products="products" :selected-treatment="selectedTreatment" @changeDetail="changeDetail" />
      </div>
      <div v-else>
        <ul>
          <li :class="{'active': key == 1}">
            <i>1</i>
            <span>GENDER</span>
          </li>
          <li :class="{'active': key == 2}">
            <i>2</i>
            <span>AGE</span>
          </li>
          <li :class="{'active': key == 3}">
            <i>3</i>
            <span>SKIN FEELS</span>
          </li>
          <li :class="{'active': key == 4}">
            <i>4</i>
            <span>OBSERVATION</span>
          </li>
          <li :class="{'active': key == 5}">
            <i>5</i>
            <span>SENSITIVE SKIN</span>
          </li>
          <li :class="{'active': key == 6}">
            <i>6</i>
            <span>SKIN NEEDS</span>
          </li>
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
