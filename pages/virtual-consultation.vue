<template>
  <div class="quiz customize_treatment">
    <div class="container">
      <ul>
        <li v-for="(step, index) in steps" :key="index" :class="{'active': key == (index + 1)}">
          <i>{{ index +1 }}</i>
          <span>{{ step.name }}</span>
        </li>
      </ul>
      <div v-if="key ==0">
        <h2 class="text-uppercase my-5">
          {{ $t('customize_your_treatment') }}
        </h2>
        <p>{{ $t('customize_treatment_desc') }}</p>
        <b-button variant="outline-primary" class="px-5 rounded-0" @click="start">
          {{ $t('lets_start') }}!
        </b-button>
      </div>
      <div v-else-if="key == 7">
        <CustomTreatmentProductList :products-group="products" @changeDetail="changeDetail" />
      </div>
      <LazyCustomTreatment
        v-if="key > 0 && key !== 7"
        :treatment-key="key"
        :step="steps[key-1]"
        :treatment="treatmentOptions"
        @next="nextOption"
        @prev="key--"
      />
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      steps: [
        { title: this.$t('customizeTreatment.what_is_your_gender'), key: 'gender', name: 'GENDER' },
        { title: this.$t('customizeTreatment.how_old_are_you'), key: 'age_group', name: 'AGE' },
        { title: this.$t('customizeTreatment.in_the_morning_my_face_skin_feels'), key: 'skinfeels', name: 'SKIN FEELS' },
        { title: this.$t('customizeTreatment.later_on_the_day_i_observe'), key: 'observation', name: 'OBSERVATION' },
        { title: this.$t('customizeTreatment.do_you_have_sensitive_skin'), key: 'sensitive', name: 'SENSITIVE SKIN' },
        { title: this.$t('customizeTreatment.what_are_your_skin_needs'), subtitle: this.$t('customizeTreatment.more_than_one_option_is_possible'), key: 'skin_needs', name: 'SKIN NEEDS' }
      ],
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
      if (this.key === 6) {
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
