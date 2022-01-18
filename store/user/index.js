export const state = () => ({
    user: {},
    message: true,
    cat: null,
    cart: [],
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
        state.cat = payload
    }
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
        return state.cat
    }
}