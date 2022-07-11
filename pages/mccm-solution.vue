<template>
  <div class="about-page">
    <Banner :page-name="'mesocross-solution'" />
    <template v-if="!$fetchState.pending">
      <text-image-container :data="solutionTes()" :position="'left'" />
      <aboutus-our-mission :data="ourMission" />
      <text-image-container :data="solution2" :position="'right'" />
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: []
    }
  },
  async fetch () {
    const url = '/get-page-content?page=mesocross-solution'
    const { data } = await this.$axios.$get(url)
    this.data = data
  },
  fetchOnServer: true,
  computed: {
    // solution1 () {
    //   return this.data.find(val => val.slug === 'mesocross-solution-1')
    // },
    ourMission () {
      return this.data.find(val => val.slug === 'mesocross-solution-2')
    },
    solution2 () {
      return this.data.find(val => val.slug === 'mesocross-solution-3')
    }
  },
  methods: {
    solutionTes () {
      return this.data.find(val => val.slug === 'mesocross-solution-1')
    }
  }
}
</script>
