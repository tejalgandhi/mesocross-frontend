<template>
  <div class="col-lg-3">
    <div class="filter_bar">
      <ul class="mainUl">
        <li>
          <a :class="monthFilter.visible ? 'mb-3' : 'arrowUp'" :aria-expanded="monthFilter.visible ? 'true' : 'false'" aria-controls="month_div`" @click="monthFilter.visible = !monthFilter.visible">{{ $t('months') }}</a>
          <b-collapse id="month_div" v-model="monthFilter.visible">
            <div class="filter_row">
              <div v-for="(month, index) in countByMonths" :key="index" class="filter_check">
                <label class="control control--checkbox">
                  {{ month.name }}
                  <small class="countSmall">({{ month.total }}) </small>
                  <input v-model="modelMonth" type="checkbox" :value="index" @change="applyFilter('month',index)">
                  <div class="control__indicator" />
                </label>
              </div>
            </div>
          </b-collapse>
        </li>
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
    this.getCountByMonths()
    this.getcountByTreatment()
  },
  methods: {
    async getCountByMonths () {
      const data = await this.$axios.$get('/blog-month/count')
      console.log(data)
      this.countByMonths = data
    },
    async getcountByTreatment () {
      const data = await this.$axios.$get('/blog-treatment/count')
      this.countByTreatments = data
    },
    applyFilter (from, value) {
      this.$nextTick(() => {
        // console.log('modelTreatment', this.modelTreatment, 'modelMonth', this.modelMonth)
        const filterObject = {
          treatment_solutions: [],
          months: []
        }
        filterObject.treatment_solutions = this.modelTreatment
        filterObject.months = this.modelMonth

        this.$emit('getBlogByFilter', filterObject)
      })
    }
  }
}
</script>
<style>
.child-a {
  font: normal normal 600 18px Arquitecta;
  letter-spacing: 0px;
  color: #25282A;
  text-transform: capitalize;
}

.child-b {
  font: normal normal 600 16px Arquitecta;
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
</style>
