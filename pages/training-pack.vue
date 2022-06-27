<template>
  <div class="container-fluid training-pack">
    <div class="row">
      <div class="col-12">
        <h2 class="heading py-5">
          Mccm trainings
        </h2>
      </div>

      <div v-if="plans && plans.length" class="col-md-12 col-lg-8 mx-auto">
        <div class="select-text my-3 pb-2">
          Select your subscription plan
        </div>
        <div v-for="(item, index) in plans" :key="index">
          <div @click="selectPlan(item.id)">
            <input :id="`for${index}`" class="form-check-input" :checked="selectedPlanId == item.id" name="radio" type="radio">
            <label class="address-radio row mx-0 align-items-center mb-3" :for="`for${index}`">
              <div class="col-12">
                <div class="form-check row px-0 d-flex align-items-center justify-content-between">
                  <p class="col-3 font-weight-bold">{{ item.title }}</p>
                  <div class="d-flex col-6 align-items-center justify-content-between">
                    <label class="ml-2 form-check-label font-16 text-dark item-desc" :for="`for${index}`">
                      <span class="d-block font-16 text-secondary">{{ item.description }}</span>
                    </label>
                  </div>
                  <p class="font-16 text-dark col-3 m-0 d-inline text-right font-20">{{ item.price }} €/{{ item.month }} month</p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div class="col-12 text-center mx-auto mb-5">
        <!-- <button class="btn btn-dark text-white my-4 col-md-4 col-lg-3 d-block mx-auto" @click="$bvModal.show('trainingModal')">
          Subscribe plan
        </button> -->

        <button class="btn btn-dark text-white my-4 col-md-4 col-lg-3 d-block mx-auto" @click="redirectToCheckout">
          Subscribe plan
        </button>

        <nuxt-link to="/" class="text-dark">
          Cancel
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  async asyncData ({ $axios, redirect }) {
    try {
      const url = '/training/get-plans'
      const { data } = await $axios.$get(url)
      const plans = data
      return { plans }
    } catch (error) {
      if (error.response.status === 401) {
        redirect('/login')
      }
    }
  },
  data () {
    return {
      // selectedCard: 1
    }
  },
  computed: {
    ...mapState({
      selectedPlanId: state => state.training.selectedPlanId,
      isLoggedin: state => state.user.loggedIn
    })
  },
  mounted () {
    if (!this.isLoggedin) {
      this.$router.push('/login')
    }
  },
  methods: {
    selectPlan (planId) {
      this.setSelectedPlanId(planId)
    },
    async redirectToCheckout () {
      if (this.selectedPlanId === 0) {
        this.$toast.error(this.$t('please_select_your_plan'), { duration: 3000, position: 'top-right' })
        return false
      }
      const planId = this.selectedPlanId
      const data = await this.$axios.$post('subscription/check-higher-plan', { selectedPlanId: planId })
      if (data === 1) {
        this.$toast.error(this.$t('plan_should_greate_message'), { duration: 5000, position: 'top-right' })
      } else {
        this.$router.push('training-checkout')
      }
    },
    ...mapMutations({
      setSelectedPlanId: 'training/setSelectedPlanId'
    })
  }
}
</script>

<style type="text/css">
.heading {
  text-align: center;
  font: normal normal 500 40px Work Sans;
  letter-spacing: 0px;
  color: #25282A;
}
.item-desc {
  max-width: 450px;
  margin: auto;
  text-align: center;
}

.training-pack [type="radio"]:checked + label:before, [type="radio"]:not(:checked) + label:before {
  top: calc(50% - 9px);
  left: 20px !important;
}
.training-pack [type="radio"]:checked + label:after, [type="radio"]:not(:checked) + label:after {
  top: calc(50% - 5px);
  left: 24px !important;
}
</style>
