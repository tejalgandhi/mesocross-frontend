export default {
  getUserAddress (state) {
    return state.address.find(adr => adr.id === state.selectedAddress)
  },
  getLoggedinUser (state) {
    return state.loggedinUser
  }
}
