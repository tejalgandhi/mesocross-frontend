export default {
  setFilter (state, payload) {
    state.filters = payload
  },
  setProduct (state, payload) {
    state.products = payload
  },
  setProductPaginate (state, payload) {
    state.productPaginate = payload
  },
  setSelectedFilters (state, payload) {
    state.selectedFilters = payload
  },
  setPriceSort (state, payload) {
    state.priceSort = payload
  },
  setWishListData (state, payload) {
    state.wishList = payload
  },
  setTreatment (state, payload) {
    state.searchPreference = payload
  },
  setTreatmentSolutions (state, payload) {
    state.treatmentSolutions = payload
  }
}
