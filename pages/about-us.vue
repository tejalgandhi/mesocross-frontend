<template>
  <div class="about-page">
    <Banner :page-name="'about-us'" />
    <template v-if="!$fetchState.pending">
      <UiMission class="py-5 my-5" :data="ourMission" />
      <div class="container py-5 my-5">
        <div class="row">
        <div class="col-lg-6">
            <text-image-container :data="solutionTes()" />
        </div>
        <div class="col-lg-6">
            <text-image-container :data="solution2" :reverse="true" />
        </div>
      </div>
      </div>
    </template>
    <AboutUsCertificate />
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
    const url = '/get-page-content?page=about-us'
    const { data } = await this.$axios.$get(url)
    this.data = data
  },

  computed: {
    solution1 () {
      return this.data.find(val => val.slug === 'mccm-about-us-1')
    },
    ourMission () {
      return this.data.find(val => val.slug === 'mccm-about-us-2')
    },
    solution2 () {
      return this.data.find(val => val.slug === 'mccm-about-us-3')
    }
  },
  methods: {
    solutionTes () {
      return this.data.find(val => val.slug === 'mccm-about-us-1')
    }
  }
}
</script>
