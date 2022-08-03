<template>
  <div>
    <Banner :page-name="'home'" />
    <HomeBlogs />
    <HomeProductGroup :title="'new_collection'" :api="'new-collection'" :is-new="true" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Index',
  fetchOnServer: true,
  computed: {
    ...mapGetters({
      treatmentSolutions: 'product/getHomePageTeatmentSolutions'
    })
  },
  mounted () {
    this.getTreatmentSolutions()
  },
  methods: {
    ...mapActions({
      setTreatment: 'product/setTreatment',
      getTreatmentSolutions: 'product/getTreatmentSolutions'
    })
  }
}
</script>