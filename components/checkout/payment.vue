<template>
  <div>
    <div class="select-text my-3">
      Select your payment method
    </div>
    <input id="for5" class="form-check-input" checked type="radio" name="payment">
    <label class="address-radio row mx-0 align-items-center mb-3" for="for5">
      <div class="col-12">
        <div class="form-check px-0">
          <label class="ml-2 form-check-label font-16 text-dark" for="for5">
            <span class="d-block font-weight-bold">Condições de pagamento acordadas com a empresa</span>
            <small>Pagamento até 30 dias após a recepção da encomenda</small>
          </label>
        </div>
      </div>
    </label>
    <input id="for6" class="form-check-input" type="radio" name="payment">
    <label class="address-radio row mx-0 align-items-center mb-3" for="for6">
      <div class="col-12">
        <div class="form-check px-0 d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center">
            <img src="@/assets/img/Mastercard_logo.jpg" class="mx-3" height="30px" width="50px" alt="">
            <label class="ml-2 form-check-label font-16 text-dark" for="for2">
              <span class="d-block font-weight-bold">bodyconcept</span>
              <small>*2467</small>
            </label>
          </div>
          <p class="font-16 text-dark m-0 border-bottom d-inline text-right">Delete Method</p>
        </div>
      </div>
    </label>

    <div class="col-md-4 pt-4 mx-auto">
      <button class="w-100 d-block btn btn-outline-dark">
        Add New Method
      </button>
    </div>
  </div>
</template>
