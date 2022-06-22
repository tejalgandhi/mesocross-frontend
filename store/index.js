import { pagesDashboard, companyDashboard, consumerDashboard } from '../utils/constant'
export default {
  state: () => ({
    search: false,
    lang: '',
    languagePopup: true,
    countries: [],
    isClicked: false,
    pricePopup: true,
    loading: false,
    selectedPageComponent: 'contact-us',
    selectedPageComponentIndex: 0,
    selectedDashboardComponent: '',
    pagecurrentComponent: 'contact-us',
    selectedDashboardComponentIndex: 0,
    dashboardComponents: companyDashboard
  }),
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
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setSelectedPageComponent (state, payload) {
      const componentIndex = pagesDashboard.findIndex(val => val.slug === payload.slug)
      state.selectedPageComponentIndex = componentIndex
      const currentComponent = pagesDashboard[componentIndex]
      state.selectedPageComponent = currentComponent.slug
      state.pagecurrentComponent = currentComponent.component
    },
    setSelectedDashboardComponent (state, payload) {
      state.selectedDashboardComponentIndex = state.dashboardComponents.findIndex(val => val.component === payload)
      state.selectedDashboardComponent = payload
    },
    setDashboardComponents (state, payload) {
      if (state.user.loggedinUser.type === 1) {
        state.dashboardComponents = consumerDashboard
      } else {
        state.dashboardComponents = companyDashboard
      }
    }

  }
  // getters: {
  //   getCountries () {

  //   }
  // }
}
