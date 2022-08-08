<template>
  <div class="container-fluid w-100 px-0">
    <div class="account-tabs">
      <b-tabs pills vertical content-class="mt-0 g-5" nav-class="account-navbar">
        <b-tab title="MY ACCOUNT" active>
          <h2 class="mb-4">
            MY ACCOUNT
            <b-button variant="link" class="float-right p-2 text-capitalize" @click="updateAccount = !updateAccount">
              {{ updateAccount ? 'Cancel': 'Edit' }}
            </b-button>
          </h2>
          <company-data v-if="updateAccount" />
          <template v-else>
            <div class="d-block">
              <div class="col-md-5 px-0">
                <b-form-group
                  class="mb-0"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  content-cols-sm
                  content-cols-lg="7"
                  label="Name"
                  label-class="py-1"
                  label-for="input-horizontal"
                >
                  <span class="d-block py-1">{{ userName }}</span>
                </b-form-group>
                <b-form-group
                  class="mb-0"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  content-cols-sm
                  content-cols-lg="7"
                  label="Email"
                  label-class="py-1"
                  label-for="input-horizontal"
                >
                  <span class="d-block py-1">richardmiles@gmail.com</span>
                </b-form-group>
                <b-form-group
                  class="mb-0"
                  label-cols-sm="4"
                  label-cols-lg="3"
                  content-cols-sm
                  content-cols-lg="7"
                  label="Phone"
                  label-class="py-1"
                  label-for="input-horizontal"
                >
                  <span class="d-block py-1">900 000 000</span>
                </b-form-group>
                <b-button variant="link" class="text-capitalize p-0 border-0 mt-3">
                  Change Password
                </b-button>
              </div>
            </div>
          </template>
        </b-tab>
        <b-tab title="ORDERS & RETURNS">
          <orders-returns />
        </b-tab>
        <b-tab title="INVOICE HISTORY">
          <invoice-history />
        </b-tab>
        <b-tab title="ADDRESS BOOK">
          <address-book />
        </b-tab>
        <b-tab title="PAYMENT METHODS">
          <payment-methods />
        </b-tab>
        <b-tab title="" disabled>
          <template #title>
            <b-button variant="link" size="lg" class="logout-btn border-0 text-danger text-capitalize p-0" @click="Logout">
              Logout
            </b-button>
          </template>
        </b-tab>
      </b-tabs>
    </div>

    <!-- <div class="row mx-0">
      <div class="col-md-5 px-0 px-md-3 col-lg-4 col-xl-3 mb-4">
        <div class="user-item-list">
          <ul class="list-unstyled mt-3 nav nav-tabs d-block border-0">
            <li v-for="(comonent, index) in dashboardComponents" :key="index" class="d-flex align-items-center mt-2 nav-item">
              <a class="d-flex align-items-center pl-4 nav-link" :class="{'active' : selectedDashboardComponentIndex === index}" @click="setComponent(comonent.component)">
                {{ comonent.label }}
              </a>
            </li>
          </ul>

          <a class="d-flex align-items-center pl-4 nav-link mt-5 font-weight-bold" style="text-decoration: underline" @click="Logout">
            Log out
          </a>
        </div>
      </div>
      <div class="col-md-7 col-lg-8 col-xl-9 mb-4">
        <component :is="selectedDashboardComponent" />
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { companyDashboard, consumerDashboard } from '../utils/constant'
export default {
  middleware: 'auth',
  data () {
    return {
      updateAccount: false
    }
  },
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn,
      loggedinUser: state => state.user.loggedinUser,
      dashboardComponents: state => state.dashboardComponents,
      selectedDashboardComponent: state => state.selectedDashboardComponent,
      selectedDashboardComponentIndex: state => state.selectedDashboardComponentIndex
    }),
    userName () {
      let userName = this.loggedinUser.full_name
      if (this.loggedinUser.type === 1 && this.loggedinUser.company_name) {
        userName = this.loggedinUser.company_name
      }
      return userName
    },
    components () {
      if (this.loggedinUser.type === 1) {
        return consumerDashboard
      } else {
        return companyDashboard
      }
    }
  },
  mounted () {
    const { page } = this.$route.query
    this.setDashboardComponents()
    if (page) {
      this.setSelectedDashboardComponent(page)
      // this.isActive = this.components.findIndex(val => val.component === page)
      this.$router.replace('/dashboard')
    } else {
      this.setSelectedDashboardComponent(this.dashboardComponents[0].component)
    }
    if (!this.$auth.loggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    setComponent (name) {
      this.setSelectedDashboardComponent(name)
    },
    ...mapMutations({
      setLoggedin: 'user/setLoggedin',
      setLoggedinUser: 'user/setLoggedinUser',
      setDashboardComponents: 'setDashboardComponents',
      setSelectedDashboardComponent: 'setSelectedDashboardComponent'
    }),
    async Logout () {
      this.setLoggedin(false)
      this.setLoggedinUser({})
      await this.$auth.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
