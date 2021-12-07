export default {
  async getAddress ({ commit }) {
    try {
      const { data } = await this.$axios.get('/address')
      commit('setAddress', data.data)
      if (data.data.length === 1) { // IF USER HAS ONLY ONE ADDRESS, THEN MAKE IT DEFAULT
        commit('settSelectedAddress', data.data[0].id)
      }
    } catch (e) {
      commit('setAddress', [])
    }
  }
}
