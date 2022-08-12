<template>
  <div>
    <h2 class="my-5">
      {{ title }}
    </h2>
    <div class="options">
      <p v-for="(val, index) in treatmentOptions" :key="index">
        <a v-if="index != 'value'" href="javascript:void(0)" :class="{'active': treatmentOptions.value == index || selectedTreatment == index || selectedTreatmentWithoutHair == index }" @click="selectOption(index)">{{ val }}</a>
      </p>
    </div>
    <div class="act_btn">
      <b-button v-if="treatmentKey > 1 " variant="outline-primary" class="rounded-0" @click="$emit('prev')">
        {{ $t('Previous') }}
      </b-button>
      <b-button variant="primary" class="rounded-0" @click="triggerNext">
        {{ $t('Next') }}
      </b-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    treatment: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    treatmentKey: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selectedTreatment: '',
      selectedTreatmentWithoutHair: '',
      selectedTreatmentObject: {
        gender: '',
        age_group: '',
        part_of_body: '',
        type: '',
        specific_type: '',
        product_price: ''
      }
    }
  },
  computed: {
    treatmentOptions () {
      let options = []
      switch (this.treatmentKey) {
        case 1:
          options = this.treatment.gender
          break
        case 2:
          options = this.treatment.ageGroup
          break
        case 3:
          options = this.treatment.observation
          break
        case 4:
          options = this.treatment.type[this.treatment.observation.value]
          options.value = this.treatment.type.value
          break
        case 5:
          if (this.selectedTreatmentObject.type === 'hair') {
            options = []
          } else {
            options = this.treatment.typeChildren[this.treatment.type.value].children
            options.value = this.treatment.typeChildren.value
          }
          break
      }
      return options
    },
    selectedOption () {
      let selectedOption = ''
      switch (this.treatmentKey) {
        case 1:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.selectedTreatmentObject.gender = this.treatment.gender.value
          selectedOption = this.treatment.gender.value
          break
        case 2:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.selectedTreatmentObject.age_group = this.treatment.ageGroup.value
          selectedOption = this.treatment.ageGroup.value
          break
        case 3:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.selectedTreatmentObject.part_of_body = this.treatment.partsOfBody.value
          selectedOption = this.treatment.partsOfBody.value
          // selectedOption = ''
          break
        case 4:
          if (this.treatment.partsOfBody.value === 'hair') {
            const childrenHairValue = this.checkHairChildrenValue()
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.selectedTreatmentObject.type = childrenHairValue
            selectedOption = childrenHairValue
          } else {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.selectedTreatmentObject.type = this.treatment.type.value
            selectedOption = this.treatment.type.value
          }
          break
        case 5:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.selectedTreatmentObject.specific_type = this.treatment.typeChildren.value
          selectedOption = this.treatment.typeChildren.value
          // selectedOption = ''
          break
      }
      return selectedOption
    },
    title () {
      let title = ''
      switch (this.treatmentKey) {
        case 1:
          title = this.$t('customizeTreatment.what_is_your_gender')
          break
        case 2:
          title = `${this.$t('customizeTreatment.how_old_are_you')}`
          break
        case 3:
          title = `${this.$t('customizeTreatment.what_area_of_your_body_is_treatment_for')}`
          break
        case 4:
          title = `${this.$t('customizeTreatment.what_sort_of_solution_are_you_looking_for')}`
          break
        case 5:
          // eslint-disable-next-line no-case-declarations
          const titleByType = `customizeTreatment.${this.selectedTreatmentObject.type}`
          title = `${this.$t(titleByType)}`
          break
      }
      return title
    }
  },
  methods: {
    selectOption (selectedOption) {
      if (this.treatmentKey === 1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.treatment.gender.value = selectedOption
      } else if (this.treatmentKey === 2) {
        // eslint-disable-next-line vue/no-mutating-props
        this.treatment.ageGroup.value = selectedOption
      } else if (this.treatmentKey === 3) {
        // eslint-disable-next-line vue/no-mutating-props
        this.treatment.partsOfBody.value = selectedOption
      } else if (this.treatmentKey === 4) {
        // eslint-disable-next-line vue/no-mutating-props
        if (this.selectedTreatmentObject.part_of_body === 'hair') {
          // eslint-disable-next-line vue/no-mutating-props
          this.treatment.type.value = selectedOption
          this.selectedTreatment = selectedOption
        } else {
          // eslint-disable-next-line vue/no-mutating-props
          this.treatment.type.value = selectedOption
          this.selectedTreatmentWithoutHair = selectedOption
        }
      } else if (this.treatmentKey === 5) {
        this.selectedTreatment = selectedOption
        // eslint-disable-next-line vue/no-mutating-props
        this.treatment.typeChildren.value = selectedOption
        // eslint-disable-next-line vue/no-mutating-props
      }
    },
    triggerNext () {
      if (this.selectedOption) {
        this.$emit('next', this.selectedTreatment, this.selectedTreatmentObject)
      } else {
        this.$toast.error(this.$t('please_select_any_option'), { duration: 3000, position: 'top-right' })
      }
    },
    checkHairChildrenValue () {
      const hairChildren = Object.keys(this.treatmentOptions)
      if (!hairChildren.includes(this.treatment.type.value)) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return ''
      } else {
        return this.treatment.type.value
      }
    }
  }
}
</script>
