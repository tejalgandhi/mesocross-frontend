<template>
  <div>
    <div class="store mb-5">
      <h2 class="font-weight-normal mb-3">
        Address book
      </h2>
    </div>
    <input id="for1" class="form-check-input" checked type="radio" name="flexRadioDefault">
    <label class="address-radio row mx-0 align-items-center mb-3" for="for1">
      <div class="col-6 col-md-3">
        <div class="form-check px-0">
          <label class="form-check-label font-16 text-dark" for="for1">
            bodyconcept 1
          </label>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <p class="font-16 text-dark m-0">Rua Serpa Pinto, 12 Vila Nova de Gaia Porto, 4000-321</p>
      </div>
      <div class="col-6 col-md-3 text-center">
        <p class="font-16 text-dark m-0">Portugal</p>
      </div>
      <div class="col-6 col-md-3 text-right">
        <p class="font-16 text-dark m-0 border-bottom d-inline">Edit address</p>
      </div>
    </label>
    <input id="for2" class="form-check-input" type="radio" name="flexRadioDefault">
    <label class="address-radio row mx-0 align-items-center mb-3" for="for2">
      <div class="col-6 col-md-3">
        <div class="form-check px-0">
          <label class="form-check-label font-16 text-dark" for="for2">
            bodyconcept 2
          </label>
        </div>
      </div>
      <div class="col-6 col-md-3">
        <p class="font-16 text-dark m-0">Rua Serpa Pinto, 12 Vila Nova de Gaia Porto, 4000-321</p>
      </div>
      <div class="col-6 col-md-3 text-center">
        <p class="font-16 text-dark m-0">Portugal</p>
      </div>
      <div class="col-6 col-md-3 text-right">
        <p class="font-16 text-dark m-0 border-bottom d-inline">Edit address</p>
      </div>
    </label>

    <div class="col-md-4 py-4 mx-auto">
      <button class="w-100 d-block btn btn-outline-dark">
        Add New Address
      </button>
    </div>
  </div>
</template>

<style scoped>
.store h2 {
  font: normal normal 600 34px Work Sans;
  letter-spacing: 0px;
  margin: 0 !important;
  color: #25282A;
}
.address-radio {width: 100%; border: 1px solid #0000004D; padding: 20px 0; border-radius: 4px; display: flex !important}
input[type="radio"]:checked + .address-radio {border-color: black;}
.address-radio {min-height: 100px;}
[type="radio"]:checked + label:before, [type="radio"]:not(:checked) + label:before {top: calc(50% - 9px);left: 20px;}
[type="radio"]:checked + label:after, [type="radio"]:not(:checked) + label:after {top: calc(50% - 5px);left: 24px;}
</style>
