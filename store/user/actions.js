export default {
  async getAddress ({ commit, dispatch }, fetchShippingPrice = true) {
    try {
      const { data } = await this.$axios.get('/address')
      commit('setAddress', data.data)
      if (data.data.length === 1 && fetchShippingPrice) { // IF USER HAS ONLY ONE ADDRESS, THEN MAKE IT DEFAULT
        commit('settSelectedAddress', data.data[0].id)
      }
    } catch (e) {
      commit('setAddress', [])
    }
  },
  async getUserCards ({ commit }, cardList = null) {
    try {
      const { data } = cardList != null ? cardList : await this.$axios.get('stripe/card-list')
      commit('setUserCards', data.data)
      if (data.data.length === 1) {
        commit('setSelectedCard', data.data[0].id)
      }
    } catch (e) {
      commit('setUserCards', [])
    }
  }
}
