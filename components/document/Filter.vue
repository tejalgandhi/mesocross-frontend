<template>
  <div class="col-lg-3">
    <div class="filter_bar">
      <ul class="mainUl">
        <li>
          <span class="mb-3 topic">{{ $t('topics') }}</span>
          <b-collapse id="treatment_div" v-model="treatmentFilter">
            <div class="filter_row">
              <!-- {{ modelTreatment }} -->
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
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      monthFilter: {
        visible: true
      },
      treatmentFilter: true,
      visible: false,
      filterData: [],
      countByMonths: [],
      countByTreatments: [],
      modelMonth: [],
      modelTreatment: []
    }
  },
  mounted () {
    this.getcountByTreatment()
    // this.applyFilter()
  },
  methods: {
    async getcountByTreatment () {
      const data = await this.$axios.$get('/treatment/document-count')
      this.countByTreatments = data
      this.modelTreatment = Object.keys(this.countByTreatments)
    },
    applyFilter () {
      this.$nextTick(() => {
        const filterObject = {
          treatment_solutions: [],
          months: []
        }
        filterObject.treatment_solutions = this.modelTreatment
        filterObject.months = this.modelMonth

        this.$emit('getDocumentsByFilter', filterObject)
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
  background: url(../../assets/img/filter-down-arrow.svg) no-repeat !important;
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

.mainUl li span.mb-3.topic {
  margin-bottom: 15px !important;
}
</style>
