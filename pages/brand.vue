<template>
  <div class="about-page">
    <Banner :page-name="'our-story'" />
    <template v-if="data.length">
      <!-- <UiMission :data="ourMission" :first="true" /> -->
      <text-image-container :data="solution1"   v-if="solution1.content"/>
      <text-image-container :data="solution2"  v-if="solution2.content" :reverse="true" />
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
    const url = '/get-page-content?page=our-story'
    const { data } = await this.$axios.$get(url)
    this.data = data
  },

  computed: {
    ourMission () {
      return this.data.find(val => val.slug === 'mesocross-our-story-1')
    },
    solution1 () {
      return this.data.find(val => val.slug === 'mesocross-our-story-2')
    },
    solution2 () {
      return this.data.find(val => val.slug === 'mesocross-our-story-3')
    }
  },
  methods: {
    download (data) {
      const fileURL = window.URL.createObjectURL(new Blob([data]))
      const fileLink = document.createElement('a')

      fileLink.href = fileURL
      fileLink.setAttribute('download', 'file.pdf')
      document.body.appendChild(fileLink)
      fileLink.click()
    }
  }
}
</script>

<style lang="scss" scoped>
    .our-mission {
        margin-top: 80px;
    }
</style>
