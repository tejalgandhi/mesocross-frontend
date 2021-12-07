<template>
  <div>
    <div class="store">
      <h2 class="font-weight-normal mb-3">
        Company data
      </h2>
      <small class="text-muted">* Required fields</small>
    </div>
    <form class="w-100 row col-lg-10 col-xl-8 mt-5 px-0">
      <div class="form-group col-lg-6">
        <label>Company name *</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group col-lg-6">
        <label>NIF *</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group col-lg-12">
        <label for="">Country *</label>
        <div class="position-relative" style="height: 40px">
          <select class="form-select form-control py-0" aria-label="Default select example">
            <option selected>
              India
            </option>
          </select>
          <img src="../assets/img/angel-down.svg" class="bottom-arrow position-absolute" alt="">
        </div>
      </div>
      <div class="form-group col-lg-12">
        <label>Address *</label>
        <input type="text" class="form-control mb-3">
        <input type="text" class="form-control">
      </div>
      <div class="form-group col-lg-6">
        <label>City *</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group col-lg-6">
        <label>State *</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group col-lg-12">
        <div class="col-lg-6 pl-0">
          <label>Postal or zip code *</label>
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group col-lg-6">
        <label>Phone *</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group col-lg-6">
        <label>Email *</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group col-lg-6 mt-4">
        <button class="d-block btn submit-btn text-white">
          Update personal data
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.store h2 {
  font: normal normal 600 34px Work Sans;
  letter-spacing: 0px;
  margin: 0 !important;
  color: #25282A;
}

label {
  text-align: left;
  font: normal normal 500 16px Work Sans;
  letter-spacing: 0px;
  color: #25282A;
}

.submit-btn {
  font: normal normal 500 16px Work Sans;
  letter-spacing: 0.48px;
  background: #25282A;
  border-radius: 4px;
  height: 45px;
}
.bottom-arrow {top: 15px !important; right: 10px; z-index: 1}
</style>
