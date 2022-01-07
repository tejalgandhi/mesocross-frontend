export const state = () => ({
    list: []
})

export const getters = {
    getList(state) {
        return state.list
    }
}

export const mutations = {
    setList(state, payload) {
        state.list.push(payload[0], ...payload[1])
    }
}

