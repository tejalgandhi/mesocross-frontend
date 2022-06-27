export default {
  getFilter (state) {
    return state.filters
  },
  getProducts (state) {
    return state.products
  },
  getPaginateDate (state) {
    return state.productPaginate
  },
  getHomePageTeatmentSolutions (state) {
    return state.treatmentSolutions ? state.treatmentSolutions.filter(val => val.image) : []
  }
}
