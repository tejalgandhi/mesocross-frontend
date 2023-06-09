export default {
  totalProductPrice (state) {
    let total = state.products.map(val => parseFloat(val.price) * parseFloat(val.qty)).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) + parseFloat(state.shippingCharge)
    total = total - parseFloat(state.discount)
    return total.toFixed(2)
  },
  subTotal (state) {
    const subTotal = state.products.map(val => parseFloat(val.price) * parseFloat(val.qty)).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    return subTotal.toFixed(2)
  },
  getOrderProducts (state) {
    return state.products.map((val) => {
      return {
        product_id: val.product_id,
        size_id: val.size_id,
        qty: val.qty,
        size_name: val.size,
        name: val.name,
        price: val.price
      }
    })
  },
  totalUnits (state) {
    return state.products.reduce((n, { qty }) => n + qty, 0)
  },
  totalFavs (state) {
    return state.wishList.length
  },
  getProducts (state) {
    return state.products
  },
  getWishlist (state) {
    return state.wishList
  },
  isWished (state) {
    return (product) => {
      const wishList = JSON.parse(JSON.stringify(state.wishList))
      const checkId = (pr, product) => (pr.product_id === product.id || pr.id === product.id)
      const checkSize = (pr, product) => {
        if (pr && pr.product_size && pr.product_size.length > 0 && pr.product_size[0].product_size_id) {
          return pr.product_size[0].product_size_id === product.product_size_id || pr.product_size_price_id === product.product_size_id
        }
        return pr.product_size_price_id === product.product_size_id
      }
      const iswish = wishList.findIndex(pr => checkId(pr, product) && checkSize(pr, product)) > -1
      return iswish
    }
  },
  getDiscount (state) {
    return state.discount
  },
  getDiscountString (state) {
    return state.discount_string
  }
}
