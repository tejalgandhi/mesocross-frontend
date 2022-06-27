export default {
  setCartProduct (state, payload) {
    state.products = payload
  },
  setWishListData (state, payload) {
    state.wishList = payload
  },
  setShippingCharge (state, payload) {
    state.shippings = payload
  },
  setUserShippingCharge (state, payload) {
    state.shippingProductCode = payload.productCode
    state.shippingLocalProductCode = payload.localProductCode
    state.shippingCharge = payload.totalPrice
    state.shippingProductName = payload.productName
  },
  setDiscount (state, payload) {
    state.discount = payload
  }
}
