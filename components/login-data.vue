<template>
  <div>
    <div class="store">
      <h2 class="font-weight-normal mb-3">
        Login data
      </h2>
      <small class="text-muted">* Required fields</small>
    </div>
    <form class="w-100 row col-lg-10 col-xl-8 mt-5 px-0">
      <div class="form-group col-lg-12">
        <div class="col-md-6 pl-0">
          <label>Email *</label>
          <input type="text" class="form-control" placeholder="abc@gmail.com">
        </div>
      </div>
      <div class="form-group col-lg-12">
        <div class="col-md-6 pl-0">
          <label>Current Password *</label>
          <input type="text" class="form-control" placeholder="*********">
        </div>
      </div>
    </form>

    <h4 class="font-weight-normal my-4 h4">
      New Password
    </h4>
    <form class="row w-100 col-lg-10 col-xl-8 px-0">
      <div class="form-group col-lg-12">
        <div class="col-lg-6 pl-0">
          <label>Current Password *</label>
          <input type="text" class="form-control">
        </div>
      </div>
      <div class="form-group col-lg-6">
        <label>New Password *</label>
        <input type="text" class="form-control">
      </div>
      <div class="form-group col-lg-6">
        <label>Repeat New Password *</label>
        <input type="text" class="form-control">
      </div>
      <div class="col-md-4 py-4">
        <button class="w-100 d-block btn bg-dark text-white">
          Update Login Data
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

.h4 {
  font: normal normal 600 24px Work Sans;
  letter-spacing: 0px;
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
