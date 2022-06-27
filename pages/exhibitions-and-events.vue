<template>
  <div class="product-page mb-5">
    <Banner :page-name="'exhibition'" />
    <Bredcrumb :items="breadcrumbs" />
    <div class="filter_result">
      <div class="container-fluid">
        <div class="header">
          <div>
            <label>{{ $t('filters') }}</label>
          </div>
          <div class="results-count">
            <label>{{ $t('showing_all') }} {{ data.length }} {{ $t('results') }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="filter_bar">
      <div class="container-fluid">
        <div class="row">
          <EventFilter @getEventsByFilter="getEventsByFilter" />
          <EventListing :events="data" @fetchEvents="fetchEvents" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      filterParams: '',
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
          active: 0
        },
        {
          path: '/exhibitions-and-events',
          label: 'exhibitions_and_events',
          active: 1
        }
      ]
    }
  },
  mounted () {
    this.fetchEvents()
  },
  methods: {
    async fetchEvents () {
      const url = '/get-event-exhibitions'
      const { data } = await this.$axios.$post(url, this.filterParams)
      this.data = data
      this.data.forEach(function (a) {
        a.isCollapsed = true
      })
    },
    getEventsByFilter (params) {
      this.filterParams = []

      if (Object.keys(params).length) {
        this.filterParams = params
      }

      this.fetchEvents()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;

}
    .results-count {
        width: 75%;
        display: flex;
        justify-content: flex-end;
        label {
            font-size: 0.8rem;
            color: grey;
            font-weight: 400;
        }

    }
</style>
