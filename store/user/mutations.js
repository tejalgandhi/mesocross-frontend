export default {
  setAddress (state, payload) {
    state.address = payload
  },
  changeAddressInput (state, payload) {
    state.singleAddress[payload.key] = payload.value
  },
  setSingleAddress (state, payload) {
    state.singleAddress = payload
  },
  resetAddressInput (state) {
    state.singleAddress = {
      company_name: '',
      nif: '',
      country_code: '',
      country: '',
      address: '',
      address_first_line: '',
      address_second_line: '',
      city: '',
      state: '',
      post_code: '',
      phone_no: '',
      email: ''
    }
  },
  settSelectedAddress (state, payload) {
    state.selectedAddress = payload
  },
  setLoggedin (state, payload) {
    state.loggedIn = payload
  },
  setLoggedinUser (state, payload) {
    state.loggedinUser = payload
  }
}
