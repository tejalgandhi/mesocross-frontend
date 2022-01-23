export const state = () => ({
    address_form: {},
    billing_form: {},
})
  
export const mutations = {
    setAddressForm(state, payload) {
        state.address_form = payload
    },
    setBillingForm(state, payload) {
        state.billing_form = payload
    },
}

export const getters = {
    getAddressForm(state) {
        return state.address_form
    },
    getBillingForm(state) {
        return state.billing_form
    },
}