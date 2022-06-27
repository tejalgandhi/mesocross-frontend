<template>
  <li>
    <a :class="treatmentFilter ? 'mb-3' : 'arrowUp'" :aria-expanded="treatmentFilter ? 'true' : 'false'" aria-controls="treatment_div`" @click="treatmentFilter = !treatmentFilter">{{ $t('themes') }}</a>
    <b-collapse id="treatment_div" v-model="treatmentFilter">
      <div class="filter_row">
        <div v-for="(treatment, index) in countByTreatments" :key="index" class="filter_check">
          <label class="control control--checkbox">
            {{ treatment.name }}
            <small class="countSmall">({{ treatment.total }}) </small>
            <input v-model="modelTreatment" type="checkbox" :value="index" @change="applyFilter('treatment',index)">
            <div class="control__indicator" />
          </label>
        </div>
      </div>
    </b-collapse>
  </li>
</template>
<script>
export default {
  data () {
    return {
      treatmentFilter: true,
      visible: false,
      countByTreatments: [],
      modelTreatment: []
    }
  },
  mounted () {
    this.getcountByTreatment()
  },
  methods: {
    async getcountByTreatment () {
      const data = await this.$axios.$get('/blog-treatment/count')
      this.countByTreatments = data
    },
    applyFilter (from, value) {
      this.$nextTick(() => {
        this.$emit('checked', this.modelTreatment)
      })
    }
  }
}
</script>
<style>
.child-a {
  font: normal normal 600 18px Work Sans;
  letter-spacing: 0px;
  color: #25282A;
  text-transform: capitalize;
}

.child-b {
  font: normal normal 600 16px Work Sans;
  letter-spacing: 0px;
  color: #25282A;
  text-transform: capitalize;
}

.a:after {
  position: absolute !important;
  content: '' !important;
  transform: rotate(-180deg) !important;
  /* background: url(../../assets/img/filter-down-arrow.svg) no-repeat !important; */
  width: 13px !important;
  height: 7px !important;
  right: 0px !important;
  top: 5px !important;
}

.a.arrowUp:after {
  transform: rotate(0) !important;
  width: 13px !important;
  height: 7px !important;
  right: 0px !important;
  top: 10px !important;
}
</style>
