<template>
  <div class="about-page">
    <Banner :page-name="'about-us'" />
    <template v-if="!$fetchState.pending">
      <text-image-container :data="whoweare" />
      <!-- <UiMission :data="ourMission" /> -->
      <text-image-container :data="philosophy" :first="true" :reverse="true" />
      <text-image-container v-if="last_content.content" :data="last_content" />
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
    whoweare () {
      return this.data.find(val => val.slug === 'mesocross-about-us-1')
    },
    ourMission () {
      return this.data.find(val => val.slug === 'mesocross-about-us-2')
    },
    philosophy () {
      return this.data.find(val => val.slug === 'mesocross-about-us-3')
    },
    last_content () {
      return this.data.find(val => val.slug === 'mesocross-about-us-4')
    }
  }
}
</script>
