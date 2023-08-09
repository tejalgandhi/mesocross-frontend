<template>
  <div>
    <div v-if="currentStep == 1" class="step1">
      <ValidationObserver ref="formObserver">
        <form @submit.prevent="registerUser">
          <div class="steps">
            <div class="one colmn active">
              <span>1</span>
              <label>{{ $t('personal_information') }}</label>
            </div>
            <div class="two colmn">
              <span>2</span>
              <label>{{ $t('account_details') }}</label>
            </div>
          </div>

          <div class="form-group">
            <label for="name">{{ $t('first_name') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('first_name')" rules="required">
              <input
                id="name"
                ref="name"
                v-model="signup.first_name"
                type="text"
                class="form-control"
                aria-describedby="name"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.first_name.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="name">{{ $t('surname') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('surname')" rules="required">
              <input
                id="surname"
                ref="surname"
                v-model="signup.surname"
                type="text"
                class="form-control"
                aria-describedby="surname"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.surname.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="selectcountry">{{ $t('country') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('country')" rules="required">
              <select id="selectcountry" v-model="signup.country_code" class="form-control">
                <option v-for="country in countries" :key="country.iso_code" :value="country.iso_code">
                  {{ country.label }}
                </option>
              </select>
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.country.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="NIF">{{ $t('vat_number') }}</label>
            <input id="NIF" v-model="signup.nif" type="text" class="form-control" aria-describedby="VAT">
          </div>
          <div class="form-group">
            <label for="address">{{ $t('address') }}</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('address')">
              <input
                id="address"
                ref="address"
                v-model="signup.address"
                type="text"
                class="form-control"
                aria-describedby="address"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.address.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="postal_code">{{ $t('postal_code') }}</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('postal_code')">
              <input
                id="postal_code"
                ref="postal_code"
                v-model="signup.postal_code"
                type="text"
                class="form-control"
                aria-describedby="postal_code"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.postal_code.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="city">{{ $t('city') }}</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('city')">
              <input
                id="city"
                ref="city"
                v-model="signup.city"
                type="text"
                class="form-control"
                aria-describedby="city"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.city.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="District">{{ $t('district_region') }}</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('district_region')">
              <input
                id="district"
                ref="district"
                v-model="signup.district"
                type="text"
                class="form-control"
                aria-describedby="district"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.district.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="language">{{ $t('language') }}</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('language')">
              <select
                id="language"
                ref="language"
                v-model="signup.language"
                type="text"
                class="form-control"
                aria-describedby="language"
              >
                <option v-for="language in $i18n.locales" :key="language.code" :value="language.code">
                  {{ $t(language.name.toLowerCase()) }}
                </option>
              </select>
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.language.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <ValidationProvider v-slot="{ errors }" name="Phone Number" rules="required">
              <label for="companyPhoneNumber">{{ $t('phone_number') }}*</label>
              <div class="d-flex">
                <vue-country-code
                  :dropdown-options="{
                    enabledCountryCode:true,
                    disabledDialCode: false
                  }"
                  :disabled-fetching-country="false"
                  :enabled-country-code="true"
                  :preferred-countries="['pt','es']"
                  :enable-search-field="true"
                  @onSelect="onSelect"
                />
                <input id="companyPhoneNumber" v-model="signup.phone_number" type="text" class="form-control phone-input" aria-describedby="name">
              </div>
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.phone_number.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="email">{{ $t('email') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('email')" rules="required|email_exists">
              <input id="email" v-model="signup.email" type="email" class="form-control" aria-describedby="emailHelp">
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.email.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <button type="button" class="btn btn-primary continue" @click="nextButton()">
            {{ $t('continue') }} <img src="../../assets/img/angel-right.svg" class="icon-down1" alt="image">
          </button>
        </form>
      </ValidationObserver>
    </div>
    <div v-if="currentStep == 2" class="step2">
      <ValidationObserver ref="formObserver">
        <form @submit.prevent="registerUser">
          <div class="steps">
            <div class="one colmn" @click="gotToStep(1)">
              <img src="@/assets/img/completed.svg">
              <label>{{ $t('personal_information') }}</label>
            </div>
            <div class="two colmn active">
              <span>2</span>
              <label>{{ $t('account_details') }}</label>
            </div>
          </div>
          <a href="javascript:void(0)" class="back" @click="gotToStep(1)"><i class="fa fa-angle-left" aria-hidden="true" /></a>
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
              <span class="errors">{{ errors && errors.length > 0 ? passwordError(errors, 'password') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="resetPassword">{{ $t('repeat_password') }}*</label>
            <ValidationProvider v-slot="{ valid,errors }" :name="$t('repeat_password')" rules="required|confirmed:password">
              <div class="w-100 position-relative">
                <input id="resetPassword" v-model="signup.confirmPassword" :type="confirmPasswordType" class="form-control" :state="errors[0] ? false : (valid ? true : null)">
              </div>
              <span class="errors">{{ errors && errors.length > 0 ? passwordError(errors, 'repeat_password') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-check mb-3">
            <input id="exampleCheck1" v-model="privacyPolicy" type="checkbox" class="form-check-input">
            <label class="form-check-label" for="exampleCheck1">{{ $t('register_term') }}*</label>
          </div>
          <div class="form-check">
            <input id="emailMarketing" v-model="signup.email_marketing" type="checkbox" class="form-check-input">
            <label class="form-check-label" for="emailMarketing">{{ $t('email_marketing') }}</label>
          </div>
          <button type="submit" :disabled="privacyPolicy == false" class="btn btn-primary">
            {{ $t('create_an_account') }}
          </button>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { togglePassword } from '@/assets/js/custom'
export default {
  props: {
    countries: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data () {
    return {
      privacyPolicy: false,
      currentStep: 1,
      formObserver: '',
      passwordType: 'password',
      passwordImage: 'eye.svg',
      confirmPasswordType: 'password',
      confirmPasswordImage: 'eye.svg',
      signup: {
        type: 1,
        first_name: '',
        surname: '', // RID
        country_code: '', // RID CN
        nif: '', // RID CN
        address: '', // RID
        postal_code: '', // RID
        city: '', // RID
        district: '', // RID
        phone: '',
        language: this.$i18n.locale,
        phone_number: '',
        dial_code: '',
        iso_alpha2: '',
        email: '',
        password: '',
        confirmPassword: '',
        email_marketing: ''
      }
    }
  },

  watch: {
    currentStep () {
      window.scrollTo(0, 0)
    }
  },

  methods: {
    onSelect ({ iso2, dialCode }) {
      this.signup.dial_code = dialCode
      this.signup.iso_alpha2 = iso2
    },
    async nextButton () {
      if (await this.$refs.formObserver.validate() && this.currentStep < 3) {
        this.currentStep++
        this.$refs.formObserver.reset()
      }
    },
    previousButton () {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
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
    gotToStep (step) {
      this.currentStep = step
    },
    async registerUser () {
      if (await this.$refs.formObserver.validate() && this.currentStep) {
        this.$emit('user-data', this.signup)
      }
    },
    passwordError (errors, field) {
      if (errors[0] === 'validation.min') {
        return this.$t('validation.custom.password.params')
      } else if (errors[0] === 'The :attribute field is required.') {
        return this.$t('validation.custom.password.required')
      } else if (field === 'repeat_password') {
        return this.$t('validation.custom.password.equal')
      }
      return this.$t('validation.custom.password.required')
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
