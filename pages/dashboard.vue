<template>
  <div class="container-fluid w-100 px-0">
    <div class="account-tabs">
      <b-tabs pills vertical content-class="mt-0 g-5" nav-class="account-navbar">
        <b-tab title="MY ACCOUNT">
          <h2 class="mb-4">
            {{ $t('my_account') }}
            <b-button variant="link" class="float-right p-2 text-capitalize shadow-none" @click="updateAccount = !updateAccount">
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
                  <span class="d-block py-1">{{ loggedinUser.email }}</span>
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
                  <span class="d-block py-1">{{ loggedinUser.phone_number }}</span>
                </b-form-group>
                <b-button variant="link" class="text-capitalize p-2 px-0 shadow-none border-0 mt-3" @click="updatePassword = !updatePassword">
                  {{ updatePassword ? 'Cancel Change' : $t('change_password') }}
                </b-button>
              </div>
              <div v-if="updatePassword" class="mt-lg-5 mt-4">
                <login-data />
              </div>
            </div>
          </template>
        </b-tab>
        <b-tab title="ORDERS & RETURNS" :active="activePage('order-returns')">
          <orders-returns />
        </b-tab>
        <b-tab title="INVOICE HISTORY" :active="activePage('invoice-history')">
          <invoice-history />
        </b-tab>
        <b-tab title="ADDRESS BOOK" :active="activePage('address-book')">
          <address-book />
        </b-tab>
        <b-tab title="PAYMENT METHODS" :active="activePage('payment-methods')">
          <payment-methods />
        </b-tab>
        <b-tab title="" disabled>
          <template #title>
            <b-button variant="link" size="lg" class="logout-btn border-0 text-danger text-capitalize p-0" @click="Logout">
              {{ $t('logout') }}
            </b-button>
          </template>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { companyDashboard, consumerDashboard } from '../utils/constant'
export default {
  middleware: 'auth',
  data () {
    return {
      updateAccount: false,
      updatePassword: false
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
      // this.$router.replace('/dashboard')
    } else {
      this.setSelectedDashboardComponent(this.dashboardComponents[0].component)
    }
    if (!this.$auth.loggedIn) {
      this.$router.push('/login')
    }
  },
  methods: {
    activePage (param) {
      return this.$route.query && this.$route.query.page === param
    },
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
