<template>
  <div>
    <div class="store">
      <h2 class="font-weight-normal mb-3">
        {{ $t('dashboard.login_data') }}
      </h2>
      <small class="text-muted">* {{ $t('required_fields') }}</small>
    </div>
    <h4 class="font-weight-normal my-4 h4">
      {{ $t('new_password') }}
    </h4>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <ValidationObserver ref="formObserver" @submit.prevent="updateLoginData">
      <form class="row w-100 col-lg-10 col-xl-8 px-0">
        <div class="form-group col-lg-12">
          <div class="col-lg-6 pl-0">
            <ValidationProvider v-slot="{ errors }" :name="$t('current_password')" rules="required">
              <label>{{ $t('current_password') }} *</label>
              <input v-model="data.password" type="password" class="form-control">
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-group col-lg-6">
          <ValidationProvider v-slot="{ errors }" :name="$t('new_password')" rules="required" vid="new_password">
            <label>{{ $t('new_password') }} *</label>
            <input v-model="data.new_password" type="password" class="form-control">
            <span class="errors">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="form-group col-lg-6">
          <ValidationProvider v-slot="{ errors }" :name="$t('repeat_new_password')" rules="required|confirmed:new_password">
            <label>{{ $t('repeat_new_password') }} *</label>
            <input v-model="data.confirm_password" type="password" class="form-control">
            <span class="errors">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <div class="col-md-12 py-4">
          <button class="px-4 btn bg-dark text-white">
            {{ $t('dashboard.update_login_date') }}
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {
        password: '',
        new_password: '',
        confirm_password: ''
      },
      formObserver: '',
      errorMessage: ''
    }
  },
  methods: {
    async updateLoginData () {
      try {
        this.errorMessage = ''
        if (await this.$refs.formObserver.validate()) {
          await this.$axios.post('/change-password', this.data)
          this.$toast.success(this.$t('dashboard.login_data_updated_successfully'), { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
          this.data = {
            password: '',
            new_password: '',
            confirm_password: ''
          }
          this.$refs.formObserver.reset()
        }
      } catch (err) {
        if (err.response.status === 401) {
          this.errorMessage = this.$t('invalid_credentials')
        }
      }
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
