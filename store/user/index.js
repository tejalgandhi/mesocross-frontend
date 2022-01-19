export const state = () => ({
    user: {},
    message: true,
    cat: null,
    cart: [],
    wishlist: [],
})
  
export const mutations = {
    setUser(state, payload) {
        state.user = payload
    },
    setMessage(state, payload) {
        state.message = payload
    },
    setCat(state, payload) {
        state.cat = payload
    },
    setCart(state, payload) {
        state.cart = payload
    },
    deleteFromCart(state, payload) {
        const i = state.cart.indexOf(el => el.product_id === payload)
        state.cart.splice(i, 1)
    },
    updateQuantity(state, payload) {
        const i = state.cart.findIndex(item => item.product_id === payload.id);
        state.cart[i].qty = parseInt(state.cart[i].qty) + parseInt(payload.qty);
    },
    setWishlist(state, payload) {
        state.wishlist = payload
    },
    deleteFromWishlist(state, payload) {
        const i = state.wishlist.indexOf(el => el.product_id === payload)
        state.wishlist.splice(i, 1)
    },
}

export const getters = {
    getUser(state) {
        return state.user
    },
    getMessage(state) {
        return state.message
    },
    getCat(state) {
        return state.cat
    },
    getCart(state) {
        return state.cart
    },
    getWishlist(state) {
        return state.wishlist
    }
}