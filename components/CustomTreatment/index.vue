<template>
  <div>
    <h2>{{ title }}</h2>
    <span>(Choose 1)</span>
    <div class="options">
      <p v-for="(val, index) in treatmentOptions" :key="index">
        <a v-if="index != 'value'" href="javascript:void(0)" :class="{'active': treatmentOptions.value ==index || selectedTreatment == index }" @click="selectOption(index)">{{ val }}</a>
      </p>
    </div>
    <div class="act_btn">
      <a v-if="treatmentKey > 1 " href="javascript:void(0)" class="prev" @click="$emit('prev')">Previous</a>
      <a href="javascript:void(0)" class="next" @click="triggerNext">Next</a>
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
      selectedTreatment: ''
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
          options = this.treatment.partsOfBody
          break
        case 4:
          options = this.treatment.skinTypes
          break
        case 5:
          options = this.treatment.treatments
          break
      }
      return options
    },
    selectedOption () {
      let selectedOption = ''
      switch (this.treatmentKey) {
        case 1:
          selectedOption = this.treatment.gender.value
          break
        case 2:
          selectedOption = this.treatment.ageGroup.value
          break
        case 3:
          selectedOption = this.treatment.partsOfBody.value
          break
        case 4:
          selectedOption = this.treatment.skinTypes.value
          break
        case 5:
          selectedOption = this.selectedTreatment
          break
      }
      return selectedOption
    },
    title () {
      let title = ''
      switch (this.treatmentKey) {
        case 1:
          title = 'Is it a woman or man'
          break
        case 2:
          title = 'How old are you ?'
          break
        case 3:
          title = 'what part of the body ?'
          break
        case 4:
          title = 'What is your skin type ?'
          break
      }
      return title
    }
  },
  methods: {
    selectOption (selectedOption) {
      // console.log(selectedOption)
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
        this.treatment.skinTypes.value = selectedOption
      } else if (this.treatmentKey === 5) {
        this.selectedTreatment = selectedOption
        // eslint-disable-next-line vue/no-mutating-props
        // this.treatment.treatments.value = selectedOption
        // console.log(this.treatment.treatments.value)
      }
    },
    triggerNext () {
      if (this.selectedOption) {
        this.$emit('next', this.selectedTreatment)
      } else {
        this.$toast.error('Please select any Option.', { duration: 3000, position: 'top-right' })
      }
    }
  }
}
</script>
