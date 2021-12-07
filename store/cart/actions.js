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
  }
}
