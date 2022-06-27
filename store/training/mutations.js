export default {
  setTrainingTreatmentSolutions (state, payload) {
    state.TrainingTreatmentSolution = payload
  },
  setIsAddPayment (state, payload) {
    state.isAddPayment = payload
  },
  setSelectedPlanId (state, payload) {
    state.selectedPlanId = payload
  },
  setTrainingModalPopup (state, payload) {
    state.trainingModalPopup = payload
  },
  setIsSubscribed (state, payload) {
    state.isSubscribed = payload
  }
}
