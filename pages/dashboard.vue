<template>
  <div class="container-fluid w-100 px-0">
    <div class="top-banner mb-5 d-flex justify-content-center align-items-center">
      <div class="text-white text-center">
        <h3>Bodyconcept Lda</h3>
        <p>Welcome to your account</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 col-lg-4 col-xl-3 mb-4">
        <div class="user-item-list">
          <ul class="list-unstyled mt-3 nav nav-tabs d-block border-0">
            <li class="d-flex align-items-center mt-2 nav-item">
              <a class="d-flex align-items-center pl-4 nav-link" :class="{'active' : isActive === 2}" @click="setComponent('orders-returns'); activate(2)">
                Orders & Returns
              </a>
            </li>
            <li class="d-flex align-items-center mt-2 nav-item">
              <a class="d-flex align-items-center pl-4 nav-link" :class="{'active' : isActive === 3}" @click="setComponent('invoice-history'); activate(3)">
                Invoice History
              </a>
            </li>
            <li class="d-flex align-items-center mt-2 nav-item">
              <a class="d-flex align-items-center pl-4 nav-link" :class="{'active' : isActive === 4}" @click="setComponent('personal-data'); activate(4)">
                Personal data
              </a>
            </li>
            <li class="d-flex align-items-center mt-2 nav-item">
              <a class="d-flex align-items-center pl-4 nav-link" :class="{'active' : isActive === 5}" @click="setComponent('company-data'); activate(5)">
                Company data
              </a>
            </li>
            <li class="d-flex align-items-center mt-2 nav-item">
              <a class="d-flex align-items-center pl-4 nav-link" :class="{'active' : isActive === 6}" @click="setComponent('address-book'); activate(6)">
                Address book
              </a>
            </li>
            <li class="d-flex align-items-center mt-2 nav-item">
              <a class="d-flex align-items-center pl-4 nav-link" :class="{'active' : isActive === 7}" @click="setComponent('payment-methods'); activate(7)">
                Payment methods
              </a>
            </li>
            <li class="d-flex align-items-center mt-2 nav-item">
              <a class="d-flex align-items-center pl-4 nav-link" :class="{'active' : isActive === 8}" @click="setComponent('training-plans'); activate(8)">
                Trainings plans
              </a>
            </li>
            <li class="d-flex align-items-center mt-2 nav-item">
              <a class="d-flex align-items-center pl-4 nav-link" :class="{'active' : isActive === 9}" @click="setComponent('login-data'); activate(9)">
                Login data
              </a>
            </li>
          </ul>

          <a class="d-flex align-items-center pl-4 nav-link mt-5 font-weight-bold" style="text-decoration: underline">
            Log out
          </a>
        </div>
      </div>
      <div class="col-md-7 col-lg-8 col-xl-9 mb-4">
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentComponent: 'orders-returns',
      isActive: 2
    }
  },
  methods: {
    setComponent (name) {
      this.currentComponent = name
    },
    activate (el) {
      this.isActive = el
    }
  }
}
</script>

<style scoped>
.top-banner {height: 433px; background: #25282A}
.top-banner div h3 {font: normal normal 600 34px Work Sans;}
.top-banner div p {font: normal normal 300 20px Work Sans;}
.store .nav-tabs li a.active{font: normal normal bold 24px Lato !important;letter-spacing: 1.44px !important;color: #203032 !important; border: none !important;border-bottom: 4px solid #203032 !important;}
.store .nav-tabs li a:hover{border: none !important}
.store .nav-tabs li a.active:hover{border: none !important;}
.user-item-list .nav-tabs li a.active {background: #F4F4F4 0% 0% no-repeat padding-box; border: none; border-radius: 0; border-left: 4px solid #1b1e21; padding: 10px 0;}
.user-item-list .nav-tabs li a:hover {background: #F4F4F4 0% 0% no-repeat padding-box; border-left: 4px solid #1b1e21; padding: 10px 0; border-bottom: none;}
.nav-tabs .nav-link {width: 100%}
</style>
