<template>
  <div>
    <Banner :page-name="'home'" />
    <HomeBlogs />
    <HomeProductGroup :title="'mesocross_best_sellers'" :api="'/products/bestsellers'" :is-new="true" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Index',
  fetchOnServer: true,
  computed: {
    ...mapGetters({
      treatmentSolutions: 'product/getHomePageTeatmentSolutions'
    })
  },

  created () {
    this.$store.commit('setLoading', true)
  },

  async mounted () {
    await this.getTreatmentSolutions()

    setTimeout(() => {
      this.setLoading(false)
    }, 200)
  },
  methods: {
    ...mapActions({
      setTreatment: 'product/setTreatment',
      getTreatmentSolutions: 'product/getTreatmentSolutions'
    }),
    ...mapMutations({
      setLoading: 'setLoading'
    })
  }
}
</script>
