<template>
  <div class="about-page">
    <Banner :page-name="'our-story'" />
    <template v-if="data.length">
      <UiMission class="py-5 my-5" :data="ourMission" :first="true" />

      <div class="container py-5 my-5">
        <div class="row">
        <div class="col-lg-6">
            <text-image-container :data="solution1" />
        </div>
        <div class="col-lg-6">
            <text-image-container :data="solution2" :reverse="true" />
        </div>
      </div>
      </div>
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
      return this.data.find(val => val.slug === 'mccm-our-story-1')
    },
    solution1 () {
      return this.data.find(val => val.slug === 'mccm-our-story-2')
    },
    solution2 () {
      return this.data.find(val => val.slug === 'mccm-our-story-3')
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
