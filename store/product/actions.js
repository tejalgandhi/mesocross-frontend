export default {
  async fetchCategories ({ commit }) {
    const { data } = await this.$axios.$get('/categories')
    const parentCategories = data.filter(category => category.parent_id == null)
    parentCategories.map((cat) => {
      cat.child = data.filter(val => val.parent_id === cat.id)
      cat.visible = false
      cat.child.map((childCat) => {
        childCat.child = data.filter(v => v.parent_id === childCat.id).map((cCat) => {
          cCat.selected = false
          cCat.visible = false
          return cCat
        })
        childCat.visible = false
        return childCat
      })
      return cat
    })
    commit('setFilter', parentCategories)
  },
  selectFilter ({ commit, state, dispatch }, payload) {
    // eslint-disable-next-line prefer-const
    let selectedFilter = [...state.selectedFilters]
    const index = selectedFilter.findIndex(val => val.id === payload.id)
    if (index === -1) {
      selectedFilter.push({
        id: payload.id,
        name: payload.name,
        treatmentSolution: payload.treatmentSolution,
        is_skincare: payload.is_skincare,
        slug: payload.slug
      })
    } else {
      const index = selectedFilter.findIndex(data => data.id === payload.id)
      selectedFilter.splice(index, 1)
    }
    commit('setSelectedFilters', selectedFilter)
  },
  filterRemove ({ commit, state, dispatch }, index) {
    const selectedFilter = [...state.selectedFilters]
    selectedFilter.splice(index, 1)
    commit('setSelectedFilters', selectedFilter)
  },
  setTreatment ({ commit }, payload) {
    commit('setTreatment', payload)
  },
  async getTreatmentSolutions ({ commit }, payload = null) {
    const { data } = await this.$axios.$get(`/treatment-solutions?type=${payload}`)
    commit('setTreatmentSolutions', data)
  }
}
