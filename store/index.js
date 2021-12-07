export default {
  state: {
    search: false,
    lang: '',
    languagePopup: true,
    countries: [],
    isClicked: false,
    pricePopup: true
  },
  actions: {
    async nuxtServerInit ({ commit, dispatch }, { req }) {
    },
    setSearch ({ commit }, payload) {
      commit('setSearch', payload)
    },
    isClicked ({ commit }, bool) {
      // mutate state
      commit('isClicked', bool)
    },
    async getCountries ({ commit }) {
      const { countries } = await this.$axios.$get('/countries')
      commit('setCountries', countries)
    }
    // setLanguagePopUp ({ commit }, payload) {
    //   commit('setLanguagePopUp', payload)
    // }
  },
  mutations: {
    setSearch (state, payload) {
      state.search = !state.search
    },
    setStoreLang (state, payload) {
      state.lang = payload
    },
    setLanguagePopUp (state, payload) {
      state.languagePopup = payload
    },
    setPricePopup (state, payload) {
      state.pricePopup = payload
    },
    setCountries (state, payload) {
      state.countries = payload
    },
    isClicked (state, bool) {
      state.isClicked = bool
    }
  }
  // getters: {
  //   getCountries () {

  //   }
  // }
}
