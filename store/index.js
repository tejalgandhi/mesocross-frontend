export const state = () => ({
  counter: 0
})

export const mutations = {
  setIncrementPlus(state) {
    state.counter++
  },
  setIncrementLess(state) {
    state.counter--
  }
}

export const getters = {
  getIncrement(state) {
    return state.counter
  }
}