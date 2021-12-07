export default {
  totalProductPrice (state) {
    return state.products.map(val => parseFloat(val.price) * parseFloat(val.qty)).reduce((a, b) => parseFloat(a) + parseFloat(b), 0).toFixed(2)
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
  }
}
