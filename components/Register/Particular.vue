<template>
  <ValidationObserver ref="formObserver">
    <form @submit.prevent="registerUser">
      <!-- <div class="steps">
            <div class="one colmn" @click="gotToStep(1)">
              <img src="@/assets/img/completed.svg">
              <label>{{ $t('personal_information') }}</label>
            </div>
            <div class="two colmn active">
              <span>2</span>
              <label>{{ $t('account_details') }}</label>
            </div>
          </div>
          <a href="javascript:void(0)" class="back" @click="gotToStep(1)"><i class="fa fa-angle-left" aria-hidden="true" /></a> -->

      <div class="form-group">
        <label for="name">{{ $t('full_name') }}*</label>
        <ValidationProvider v-slot="{ errors }" :name="$t('full_name')" rules="required">
          <input
            id="name"
            ref="name"
            v-model="signup.name"
            type="text"
            class="form-control"
            aria-describedby="name"
          >
          <span class="errors">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label for="email">{{ $t('email') }}*</label>
        <ValidationProvider v-slot="{ errors }" :name="$t('email')" rules="required|email_exists">
          <input id="email" v-model="signup.email" type="email" class="form-control" aria-describedby="emailHelp">
          <span class="errors">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label for="password">{{ $t('password') }}*</label>
        <ValidationProvider v-slot="{ errors }" :name="$t('password')" rules="required|min:6" vid="password">
          <div class="w-100 position-relative">
            <input
              id="password"
              v-model="signup.password"
              :type="passwordType"
              class="form-control"
            >
          </div>
          <span class="errors">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label for="resetPassword">{{ $t('repeat_password') }}*</label>
        <ValidationProvider v-slot="{ valid,errors }" :name="$t('repeat_password')" rules="required|confirmed:password">
          <div class="w-100 position-relative">
            <input id="resetPassword" v-model="signup.confirmPassword" :type="confirmPasswordType" class="form-control" :state="errors[0] ? false : (valid ? true : null)">
          </div>
          <span class="errors">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-check mb-3">
        <input id="exampleCheck1" v-model="privacyPolicy" type="checkbox" class="form-check-input">
        <label class="form-check-label" for="exampleCheck1">{{ $t('register_term') }}</label>
      </div>
      <button type="submit" :disabled="privacyPolicy == false" class="btn btn-primary py-3">
        {{ $t('create_an_account') }}
      </button>
    </form>
  </ValidationObserver>
</template>

<script>
import { togglePassword } from '@/assets/js/custom'
export default {
  data () {
    return {
      privacyPolicy: false,
      formObserver: '',
      passwordType: 'password',
      passwordImage: 'eye.svg',
      confirmPasswordType: 'password',
      confirmPasswordImage: 'eye.svg',
      signup: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        email_marketing: ''
      }
    }
  },

  methods: {
    showPassword (passwordType) {
      const passwordData = togglePassword(passwordType)
      this.passwordType = passwordData.text
      this.passwordImage = passwordData.image
    },
    showConfirmPassword (passwordType) {
      const passwordData = togglePassword(passwordType)
      this.confirmPasswordType = passwordData.text
      this.confirmPasswordImage = passwordData.image
    },
    async registerUser () {
      if (await this.$refs.formObserver.validate()) {
        const { name, email, password } = this.signup
        this.$emit('user-data', { name, email, password })
      }
    }

  }
}
</script>

<style scoped>
.errors {
  color: #cf0000;
}
.icon-down1{
  height: 12px !important;
  width: 12px !important;
  transform: rotate(-90deg);
}

.vue-country-select {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.phone-input {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
</style>
