<template>
  <div>
    <div class="store">
      <h2 class="font-weight-normal mb-3">
        Personal data
      </h2>
      <small class="text-muted">* Required fields</small>
    </div>
    <form class="w-100 row col-lg-10 col-xl-8 mt-5 px-0">
      <div class="form-group col-lg-6">
        <label>Name *</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group col-lg-6">
        <label>Surname *</label>
        <input type="text" class="form-control">
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
</style>
