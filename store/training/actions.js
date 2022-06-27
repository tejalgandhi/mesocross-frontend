export default {
  async getTrainingTreatmentSolutions ({ commit }) {
    const { data } = await this.$axios.$get('/training/treatments')
    commit('setTrainingTreatmentSolutions', data)
  },
  async getIsSubscribed ({ commit }) {
    const data = await this.$axios.$get('/subscription-check')
    let havePlan = false
    if (data === 1) { havePlan = true }

    commit('setIsSubscribed', havePlan)
  }
}
