<template>
  <div class="col-lg-3">
    <div class="filter_bar">
      <ul class="mainUl">
        <li>
          <a :class="yearFilter ? 'mb-3' : 'arrowUp'" :aria-expanded="yearFilter ? 'true' : 'false'" aria-controls="year_div`" @click="yearFilter = !yearFilter">{{ $t('Years') }}</a>
          <b-collapse id="year_div" v-model="yearFilter">
            <template v-for="year in Object.keys(eventsByYears)">
              <BlogFilterItems :key="year" :title="year" :data="eventsByYears[year]" @checked="handleChecks" />
            </template>
          </b-collapse>
        </li>
        <BlogFilterTreatment @checked="handleTreatment" />
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      yearFilter: true,
      eventsByYears: [],
      checksToSend: []
    }
  },
  created () {
    this.getCountByMonths()
  },
  methods: {
    async getCountByMonths () {
      const data = await this.$axios.$get('/blog-month/count')
      this.eventsByYears = data
    },
    handleTreatment (data) {
      this.$emit('getBlogByTreatment', data)
    },
    handleChecks (data) {
      const yearsAvailable = this.checksToSend.map(el => el.year)
      const i = yearsAvailable.indexOf(data.year)

      if (!data.months.length) {
        this.checksToSend.splice(i, 1)
      } else if (yearsAvailable.includes(data.year)) {
        this.checksToSend.splice(i, 1)
        this.checksToSend.push(data)
      } else {
        this.checksToSend.push(data)
      }

      this.$emit('getBlogByFilter', this.checksToSend)
    }
  }
}
</script>

<style lang="scss" scoped>
    .filter_bar {
        background: rgba(#FFF,0.1);
        padding: 10px;
    }
</style>

<style>
.child-a {
  font: normal normal 600 18px Arquitecta;
  letter-spacing: 0px;
  color: #fff;
  text-transform: capitalize;
}

.child-b {
  font: normal normal 600 16px Arquitecta;
  letter-spacing: 0px;
  color: #fff;
  text-transform: capitalize;
}

.a:after {
  position: absolute !important;
  content: '' !important;
  transform: rotate(-180deg) !important;
  background: url(@/assets/img/filter-down-arrow.svg) no-repeat !important;
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
