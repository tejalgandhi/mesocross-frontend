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
  setShippingDays (state, payload) {
    state.shippingDays = payload
  },
  setUserShippingCharge (state, payload) {
    state.shippingProductCode = payload.productCode
    state.shippingLocalProductCode = payload.localProductCode
    state.shippingCharge = payload.totalPrice
    state.shippingDays = payload.estimatedDays
    state.isSingleDay = payload.isSingleDay
    state.shippingProductName = payload.productName
  },
  setDiscount (state, payload) {
    state.discount = payload
  },
  setDiscountString (state, payload) {
    state.discount_string = payload
  }
}
