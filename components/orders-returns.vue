<template>
  <div class="dashboard-order-tab">
    <div class="store mb-5">
      <h2 class="font-weight-normal mb-3">
        Orders & Returns
      </h2>
    </div>
    <b-tabs content-class="nav nav-tabs">
      <b-tab title="Orders" active>
        <div id="one" class="tab-pane w-100 pb-3 fade show active" role="tabpanel">
          <div class=" accordion-div mb-3">
            <div class="d-flex align-items-start">
              <a class="child-a w-100 a position-relative" :class="showTreatment ? 'mb-3' : 'arrowUp'" @click="showTreatment = !showTreatment">
                <h5>Order Nº 4054580 - 800€</h5>
                <small>Sent</small>
              </a>
            </div>
            <b-collapse id="treatment-filter" v-model="showTreatment">
              <div class="filter_list">
                <h1>sfj saudjskaasd</h1>
              </div>
            </b-collapse>
          </div>
          <div class="accordion-div mb-3">
            <div class="d-flex align-items-start">
              <a class="child-a w-100 a position-relative" :class="showTreatment1 ? 'mb-3' : 'arrowUp'" @click="showTreatment1 = !showTreatment1">
                <h5>Order Nº 4054580 - 800€</h5>
                <small class="text-success">Delivered</small>
              </a>
            </div>
            <b-collapse id="treatment-filter" v-model="showTreatment1">
              <div class="filter_list">
                <h1>sfj saudjskaasd</h1>
              </div>
            </b-collapse>
          </div>
        </div>
      </b-tab>
      <b-tab title="Return">
        <div id="two" class="tab-pane w-100 pb-3 fade show active" role="tabpanel">
          <div class="accordion-div mb-3">
            <div class="d-flex align-items-start">
              <a class="child-a w-100 a position-relative" :class="showTreatment ? 'mb-3' : 'arrowUp'" @click="showTreatment = !showTreatment">
                <h5>Return Nº 4054580 - 800€</h5>
                <small>Sent</small>
              </a>
            </div>
            <b-collapse id="treatment-filter" v-model="showTreatment">
              <div class="filter_list">
                <h1>sfj saudjskaasd</h1>
              </div>
            </b-collapse>
          </div>
          <div class="accordion-div mb-3">
            <div class="d-flex align-items-start">
              <a class="child-a w-100 a position-relative" :class="showTreatment1 ? 'mb-3' : 'arrowUp'" @click="showTreatment1 = !showTreatment1">
                <h5>Return Nº 4054580 - 800€</h5>
                <small class="text-success">Delivered</small>
              </a>
            </div>
            <b-collapse id="treatment-filter" v-model="showTreatment1">
              <div class="filter_list">
                <h1>sfj saudjskaasd</h1>
              </div>
            </b-collapse>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showTreatment: false,
      showTreatment1: false
    }
  }
}
</script>

<style scoped>
.store h2 {
  font: normal normal 600 34px Work Sans;
  letter-spacing: 0px;
  margin: 0 !important;
  color: #25282A;
}

.a h5 {
  font: normal normal normal 24px Work Sans;
  letter-spacing: 0px;
  color: #25282A;
}

.a small {
  font: normal normal 500 16px Work Sans;
  letter-spacing: 0px;
  color: #F18500;
}

.accordion-div {
  background: #F5F5F5;
  border-radius: 4px;
  padding: 15px;
}

.a:after {
  position: absolute !important;
  content: '' !important;
  transform: rotate(-180deg) !important;
  background: url(../assets/img/filter-down-arrow.svg) no-repeat !important;
  width: 20px !important;
  height: 20px !important;
  background-size: 20px 20px !important;
  right: 10px !important;
  top: 5px !important;
}

.a.arrowUp:after {
  transform: rotate(0) !important;
  width: 20px !important;
  height: 20px !important;
  right: 10px !important;
  top: 10px !important;
  background-size: 20px 20px !important;
}

</style>
