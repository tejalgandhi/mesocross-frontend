export default {
  async addToCart ({ commit, state }, payload) {
    const { products } = state
    const newProducts = JSON.parse(JSON.stringify(products))
    await this.$axios.$post('/cart', payload)
    const index = newProducts.findIndex(val => (val.product_id === payload.product_id && val.size_id === payload.size_id))
    if (index > -1 && (payload.flag === 1 || payload.flag === 2)) {
      newProducts[index].qty = payload.flag === 1 ? parseInt(newProducts[index].qty) + 1 : parseInt(newProducts[index].qty) - 1
    } else if (index > -1 && payload.flag === 3) {
      newProducts.splice(index, 1)
    } else {
      newProducts.push(payload)
    }
    commit('setCartProduct', newProducts)
  },
  async getCart ({ commit }) {
    const { data } = await this.$axios.$get('/cart')
    commit('setCartProduct', data)
  },
  async addWishList ({ commit, state }, payload) {
    const wishList = JSON.parse(JSON.stringify(state.wishList))
    await this.$axios.$post('/wishlist', payload)
    if (payload.flag === 1) {
      wishList.push(payload)
    } else {
      const index = wishList.findIndex(pr => pr.product_id === payload.product_id)
      wishList.splice(index, 1)
    }
    commit('setWishListData', wishList)
  },
  async getWishList ({ commit }) {
    const { data } = await this.$axios.$get('/wishlist')
    commit('setWishListData', data)
  },
  async getShippingCharge ({ rootState, commit }) {
    try {
      commit('setLoading', true, { root: true })
      commit('setShippingCharge', [])
      commit('setShippingCharge', { shipping_charge: 0, productCode: '', localProductCode: '' })
      const { selectedAddress, address } = rootState.user
      const userAddress = address.find(val => val.id === selectedAddress)
      const { data } = await this.$axios.$post('/shipping-charges', { countryCode: userAddress.iso_alpha2, postalCode: userAddress.post_code, cityName: userAddress.city, dhlProductCode: userAddress.dhl_prodct_code, dhlLocalProductCode: userAddress.dhl_local_product_code })
      commit('setLoading', false, { root: true })
      commit('setShippingCharge', data)
      commit('setUserShippingCharge', data[0])
    } catch (e) {
      commit('setLoading', false, { root: true })
    }
  },
  applyDiscount ({ getters, commit }, flag) {
    if (flag) {
      const { subTotal } = getters
      const discountPer = Number(process.env.stripeCommisionPer)
      const discount = (subTotal * discountPer) / 100
      commit('setDiscount', discount.toFixed(2))
    } else {
      commit('setDiscount', 0)
    }
  }
}
