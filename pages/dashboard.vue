<template>
  <div class="py-5 my-account-section">
    <div class="container-fluid">
      <div class="d-flex justify-content-between align-items-end text-light mb-4">
        <div>
          <nuxt-link to="/products" class="btn filter-invert px-0 mb-4">
            <b-icon-chevron-left /> BACK TO SHOPPING
          </nuxt-link>
          <h2 class="font-weight-normal">
            MY ACCOUNT
          </h2>
        </div>
        <b-button @click="Logout" variant="default" class="filter-invert px-0">
          <u>LOG OUT</u>
        </b-button>
      </div>

      <b-card no-body class="mb-1 border-0 text-black accordion-card bg-white">
        <b-card-header header-tag="header" class="p-0 border-0 bg-white" role="tab">
          <b-button v-b-toggle="`accordion-orders`" block variant="ff">
            Orders & Returns
          </b-button>
        </b-card-header>
        <b-collapse :id="`accordion-orders`" visible accordion="my-accordion" role="tabpanel">
          <b-card-body class="accordion-card-body">
            <b-tabs
              content-class="mt-3"
              active-nav-item-class="font-weight-bold bg-transparent border-0 border-bottom text-light"
              title-link-class="text-danger"
            >
              <b-tab title="Orders" active>
                <Oders class="text-light" />
              </b-tab>
            </b-tabs>
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1 border-0 text-black accordion-card bg-white">
        <b-card-header header-tag="header" class="p-0 border-0 bg-white" role="tab">
          <b-button v-b-toggle="`accordion-history`" block variant="ff">
            Invoice history
          </b-button>
        </b-card-header>
        <b-collapse :id="`accordion-history`" visible accordion="my-accordion" role="tabpanel">
          <b-card-body class="accordion-card-body">
            <InvoiceHistory class="text-light" />
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card v-for="(comonent, index) in dashboardComponents" :key="index" no-body class="mb-1 border-0 text-black accordion-card bg-white">
        <b-card-header header-tag="header" class="p-0 border-0 bg-white" role="tab">
          <b-button v-b-toggle="`accordion-${index}`" block variant="ff" @click="setComponent(comonent.component)">
            {{ comonent.label }}
          </b-button>
        </b-card-header>
        <b-collapse :id="`accordion-${index}`" visible accordion="my-accordion" role="tabpanel">
          <b-card-body class="accordion-card-body">
            <component :is="selectedDashboardComponent" />
          </b-card-body>
        </b-collapse>
      </b-card>
      <!-- <div class="top-banner mb-md-5 d-flex justify-content-center align-items-center">
        <div class="text-white text-center">
          <h3>{{ userName }}</h3>
          <p>Welcome to your account</p>
        </div>
      </div>
      <div class="row mx-0">
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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { companyDashboard, consumerDashboard } from '../utils/constant'
import Oders from '../components/product/Oders.vue'
import InvoiceHistory from '../components/product/InvoiceHistory.vue'
export default {
  layout: 'dashboard',
  middleware: 'auth',
  data () {
    return {}
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
  },
  components: { Oders, InvoiceHistory }
}
</script>

<style lang="scss">
.top-banner {height: 433px; background: #25282A}
.top-banner div h3 {font: normal normal 600 34px Work Sans;}
.top-banner div p {font: normal normal 300 20px Work Sans;}
.store .nav-tabs li a.active{font: normal normal bold 24px Lato !important;letter-spacing: 1.44px !important;color: #203032 !important; border: none !important;border-bottom: 4px solid #203032 !important;}
.store .nav-tabs li a:hover{border: none !important}
.store .nav-tabs li a.active:hover{border: none !important;}
.user-item-list .nav-tabs li a.active {background: #F4F4F4 0% 0% no-repeat padding-box; border: none; border-radius: 0; border-left: 4px solid #1b1e21; padding: 10px 0;}
.user-item-list .nav-tabs li a{border-left: 4px solid transparent; padding: 10px 0;}
.user-item-list .nav-tabs li a:hover {background: #F4F4F4 0% 0% no-repeat padding-box; border-left: 4px solid #1b1e21; padding: 10px 0; border-bottom: none;}
.nav-tabs .nav-link {width: 100%}

.my-account-section {
  .card-header {
    .btn {
      background-color: #fff;
      color: #000;
      text-transform: none;
      letter-spacing: 0;
      text-align: left;
      border: none;
      box-shadow: none;
      font-weight: bold;
      font-size: 1rem;
      border-radius: 0;
      &:after {
          content: "";
          position: absolute;
          border-right: 1px solid;
          border-bottom: 1px solid;
          width: 10px;
          height: 10px;
          transform: rotate(45deg);
          right: 20px;
          top: 15px;
      }
    }
  }
}
.accordion-card {
  .text-dark {
    color: inherit !important;
  }
  .accordion-card-body {
    .form-group {
      .form-control {
        background-color: #fff;
        color: #000;
        border-color: #0000001F;
        border-radius: 0;
      }
      .submit-btn  {
        border-radius: 0;
        font-weight: normal;
        background-color: #000;
      }
    }
    .store {
      display: none;
    }
  }
}
</style>
