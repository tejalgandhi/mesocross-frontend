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
  }
}
