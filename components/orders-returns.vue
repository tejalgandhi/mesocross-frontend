<template>
  <div class="dashboard-order-tab">
    <h2 class="mb-4 text-uppercase">
      Orders & Returns
    </h2>
    <div class="order-tabs">
      <b-tabs content-class="nav nav-tabs" nav-class="order-navbar">
        <b-tab title="Orders" active>
          <div id="one" class="tab-pane w-100 pb-3 fade show active" role="tabpanel">
            <div class="accordion-div mb-3">
              <div class="d-flex align-items-start">
                <a class="child-a w-100 a position-relative" :class="showTreatment ? 'mb-3' : 'arrowUp'" @click="showTreatment = !showTreatment">
                  <h5>Order Nº 4054580 - 800€</h5>
                  <small>Sent</small>
                </a>
              </div>
              <b-collapse id="treatment-filter" v-model="showTreatment">
                <ProductOrderItem />
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
                <ProductOrderItem />
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
                <ProductOrderItem />
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
                <ProductOrderItem />
              </b-collapse>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
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

<style>

.order-tabs .order-navbar {
  border-bottom-color: #25282A;
}
.order-tabs .order-navbar .nav-link {
  padding: 5px 0;
  border: 0;
  font-size: 24px;
  margin-right: 2.25rem;
}

.order-tabs .order-navbar .nav-link.active {
  border: none;
  color: #fff;
  font-weight: bold;
  border-bottom: 1px solid #fff;
}

.store h2 {
  font: normal normal 600 34px Arquitecta;
  letter-spacing: 0px;
  margin: 0 !important;
  color: #25282A;
}

.a h5 {
  font: normal normal normal 24px Arquitecta;
  letter-spacing: 0px;
  color: #fff;
  margin-bottom: .25rem;
}

.a small {
  font: normal normal 500 16px Arquitecta;
  letter-spacing: 0px;
  color: #F18500;
}
.accordion-div a {
  text-decoration: none;
}
.accordion-div {
  background: #25282A;
  border-radius: 0;
  padding: 18px 24px;
}
.a:after{
  filter: invert(1);
}
</style>
