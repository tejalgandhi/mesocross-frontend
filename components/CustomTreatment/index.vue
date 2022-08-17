<template>
  <div>
    <h2 class="my-5 text-uppercase" v-html="title" />
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
        skinfeels: '',
        observation: '',
        sensitive: '',
        skin_needs: '',
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
          options = this.treatment.skinfeels
          break
        case 4:
          options = this.treatment.observation
          break
        case 5:
          options = this.treatment.sensitive
          break
        case 6:
          options = this.treatment.skin_needs
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
          this.selectedTreatmentObject.skinfeels = this.treatment.skinfeels.value
          selectedOption = this.treatment.skinfeels.value
          // selectedOption = ''
          break
        case 4:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.selectedTreatmentObject.observation = this.treatment.observation.value
          selectedOption = this.treatment.observation.value
          break
        case 5:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.selectedTreatmentObject.sensitive = this.treatment.sensitive.value
          selectedOption = this.treatment.sensitive.value
          // selectedOption = ''
          break

        case 6:
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.selectedTreatmentObject.skin_needs = this.treatment.skin_needs.value
          selectedOption = this.treatment.skin_needs.value
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
          title = `${this.$t('customizeTreatment.in_the_morning_my_face_skin_feels')}`
          break
        case 4:
          title = `${this.$t('customizeTreatment.later_on_the_day_i_observe')}`
          break
        case 5:
          title = `${this.$t('customizeTreatment.do_you_have_sensitive_skin')}`
          break
        case 6:
          // eslint-disable-next-line no-case-declarations
          title = `${this.$t('customizeTreatment.what_are_your_skin_needs')} <br /> <span class="font-weight-light">(${this.$t('customizeTreatment.more_than_one_option_is_possible')})</span>`
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
        this.treatment.skinfeels.value = selectedOption
      } else if (this.treatmentKey === 4) {
        // eslint-disable-next-line vue/no-mutating-props
        this.treatment.observation.value = selectedOption
      } else if (this.treatmentKey === 5) {
        // eslint-disable-next-line vue/no-mutating-props
        this.treatment.sensitive.value = selectedOption
      } else if (this.treatmentKey === 6) {
        // eslint-disable-next-line vue/no-mutating-props
        this.treatment.skin_needs.value = selectedOption
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
