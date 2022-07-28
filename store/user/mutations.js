export default {
  setAddress (state, payload) {
    state.address = payload
  },
  changeAddressInput (state, payload) {
    // console.log('DDDDDDDDDDD', payload.key, payload.value)
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
      dial_code: '',
      iso_alpha2: '',
      city: '',
      state: '',
      post_code: '',
      phone_no: '',
      email: ''
    }
  },
  settSelectedAddress (state, payload) {
    state.selectedAddress = payload
    this.dispatch('cart/getShippingCharge', null, { root: true })
  },
  setLoggedin (state, payload) {
    if (!payload) {
      this.commit('cart/setCartProduct', [], { root: true })
      this.commit('cart/setWishListData', [], { root: true })
    }
    state.loggedIn = payload
  },
  setLoggedinUser (state, payload) {
    state.loggedinUser = payload
  },
  setIsAddPayment (state, payload) {
    state.isAddPayment = payload
  },
  setUserCards (state, payload) {
    state.userCards = payload
  },
  setSelectedCard (state, payload) {
    if (payload === 0) {
      this.dispatch('cart/applyDiscount', true, { root: true })
    } else {
      this.dispatch('cart/applyDiscount', false, { root: true })
    }
    state.selectedCard = payload
  }
}
