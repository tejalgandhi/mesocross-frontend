<template>
  <div class="col-lg-3">
    <div class="filter_bar">
      <template v-for="year in Object.keys(eventsByYears)">
        <EventFilterItems :key="year" :title="year" :data="eventsByYears[year]" @checked="handleChecks" />
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      eventsByYears: [],
      checksToSend: []
    }
  },
  created () {
    this.getCountByMonths()
  },
  methods: {
    async getCountByMonths () {
      const data = await this.$axios.$get('/get-event-exhibitions/month-count')
      this.eventsByYears = data
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

      this.$emit('getEventsByFilter', this.checksToSend)
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

.product-page .child-a {
  color: #000;
 }

.product-page  .child-b {
  color: #000;
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
