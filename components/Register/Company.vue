<template>
  <div>
    <div v-if="currentStep == 1" class="step1">
      <ValidationObserver ref="formObserver">
        <form>
          <div class="steps">
            <div class="one colmn active">
              <span>1</span>
              <label>Company Information</label>
            </div>
            <div class="two colmn">
              <span>2</span>
              <label>Personal Information</label>
            </div>
            <div class="three colmn">
              <span>3</span>
              <label>Account Details</label>
            </div>
          </div>

          <div class="form-group">
            <label for="name">{{ $t('company_name') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('company_name')" rules="required">
              <input
                id="name"
                ref="name"
                v-model="signup.company_name"
                type="text"
                class="form-control"
                aria-describedby="name"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.company_name.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="NIF">{{ $t('vat_number') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('vat_number')" rules="required">
              <input id="NIF" v-model="signup.nif" type="text" class="form-control" aria-describedby="VAT">
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="name">{{ $t('address') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('address')" rules="required">
              <input
                id="address"
                ref="address"
                v-model="signup.address"
                type="text"
                class="form-control"
                aria-describedby="name"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.address.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="name">{{ $t('city') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('city')" rules="required">
              <input
                id="city"
                ref="city"
                v-model="signup.city"
                type="text"
                class="form-control"
                aria-describedby="name"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.city.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="selectcountry">{{ $t('country') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('country')" rules="required">
              <select id="selectcountry" v-model="signup.country_code" class="form-control">
                <option :value="''">
                  Select a Country
                </option>
                <option v-for="country in countries" :key="country.iso_code" :value="country.iso_code">
                  {{ country.label }}
                </option>
              </select>
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.country.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="postal_code">{{ $t('postal_code') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('postal_code')" rules="required">
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
            <label for="companyPhoneNumber">{{ $t('company_phone_number') }}*</label>
            <vue-country-code
              :dropdown-options="{
                enabledCountryCode:true,
                disabledDialCode: false
              }"
              :disabled-fetching-country="false"
              :enabled-country-code="true"
              :preferred-countries="['pt','es']"
              :enable-search-field="true"
              @onSelect="onSelectCompany"
            />
            <ValidationProvider v-slot="{ errors }" :name="$t('company_phone_number')" rules="required">
              <input
                id="companyPhoneNumber"
                v-model="signup.company_phone_number"
                type="text"
                class="form-control phone-input"
                aria-describedby="name"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.company_phone_number.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="Industry sector">{{ $t('industry_sector') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('industry_sector')" rules="required">
              <select id="industry_sector" v-model="signup.industry_sector" class="form-control">
                <option :value="undefined">
                  Select a Sector
                </option>
                <option v-for="(sector, index) in industry_sectors" :key="index" :value="sector.value">
                  {{ sector.label }}
                </option>
              </select>
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.industry_sector.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div v-show="otherSector" class="form-group">
            <label for="other_sector">{{ $t('other_sector') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('other_sector')" :rules="{'required': otherSector===true }">
              <input
                id="other_sector"
                v-model="signup.other_sector"
                type="textarea"
                class="form-control"
                aria-describedby="name"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.industry_sector.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="company_website">{{ $t('website') }}</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('website')">
              <input
                id="company_website"
                v-model="signup.company_website"
                type="text"
                class="form-control"
                aria-describedby="company_websiteHelp"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.website.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <button type="button" class="btn btn-primary continue" @click="nextButton()">
            {{ $t('continue') }} <img src="../../assets/img/angel-right.svg" class="icon-down1" alt="image">
          </button>
        </form>
      </validationobserver>
    </div>

    <div v-if="currentStep == 2" class="step2">
      <ValidationObserver ref="formObserver">
        <form>
          <div class="steps">
            <div class="one colmn completed" @click="gotToStep(1)">
              <img src="@/assets/img/completed.svg">
              <label>{{ $t('company_information') }}</label>
            </div>
            <div class="two colmn active">
              <span>2</span>
              <label>{{ $t('personal_information') }}</label>
            </div>
            <div class="three colmn">
              <span>3</span>
              <label>{{ $t('account_details') }}</label>
            </div>
          </div>
          <a href="javascript:void(0)" class="back" @click="gotToStep(1)"><i class="fa fa-angle-left" aria-hidden="true" /></a>
          <div class="form-group">
            <label for="name">{{ $t('first_name') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('first_name')" rules="required">
              <input
                id="first_name"
                v-model="signup.first_name"
                type="text"
                class="form-control"
                aria-describedby="name"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.first_name.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="surname">{{ $t('surname') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('surname')" rules="required">
              <input
                id="surname"
                v-model="signup.surname"
                type="surname"
                class="form-control"
                aria-describedby="surname"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.surname.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="phoneNumber">{{ $t('direct_phone_number') }}*</label>
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
            <ValidationProvider v-slot="{ errors }" :name="$t('direct_phone_number')" rules="required">
              <input
                id="phoneNumber"
                v-model="signup.phone_number"
                type="text"
                class="form-control"
                aria-describedby="name"
              >
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
            <label for="position">{{ $t('position') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('position')" rules="required">
              <select id="selectposition" v-model="signup.position" class="form-control">
                <option :value="undefined">
                  Select a Position
                </option>
                <option v-for="(position, index) in positions" :key="index" :value="position.value">
                  {{ position.label }}
                </option>
              </select>
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.position.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <div v-show="otherPosition" class="form-group">
            <label for="other_position">{{ $t('other_position') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('other_position')" :rules="{'required': otherPosition===true }">
              <input
                id="other_position"
                v-model="signup.other_position"
                type="textarea"
                class="form-control"
                aria-describedby="name"
              >
              <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.position.required') : '' }}</span>
            </ValidationProvider>
          </div>
          <button type="button" class="btn btn-primary continue" @click="nextButton()">
            {{ $t('continue') }} <img src="../../assets/img/angel-right.svg" class="icon-down1" alt="image">
          </button>
        </form>
      </ValidationObserver>
    </div>
    <div v-if="currentStep == 3" class="step3">
      <ValidationObserver ref="formObserver">
        <form @submit.prevent="registerUser">
          <div class="steps">
            <div class="one colmn completed" @click="gotToStep(1)">
              <img src="@/assets/img/completed.svg">
              <label>{{ $t('company_information') }}</label>
            </div>
            <div class="two colmn" @click="gotToStep(2)">
              <img src="@/assets/img/completed.svg">
              <label>{{ $t('personal_information') }}</label>
            </div>
            <div class="three colmn active">
              <span>3</span>
              <label>{{ $t('account_details') }}</label>
            </div>
          </div>
          <a href="javascript:void(0)" class="back" @click="gotToStep(2)"><i class="fa fa-angle-left" aria-hidden="true" /></a>
          <div class="form-group">
            <label for="password">{{ $t('password') }}*</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('password')" rules="required|min:6" vid="password">
              <input
                id="password"
                v-model="signup.password"
                :type="passwordType"
                class="form-control"
              >
              <span class="errors">{{ errors && errors.length > 0 ? passwordError(errors, 'password') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="resetPassword">{{ $t('repeat_password') }}*</label>
            <ValidationProvider v-slot="{ valid,errors }" :name="$t('repeat_password')" rules="required|confirmed:password">
              <input
                id="resetPassword"
                v-model="signup.confirmPassword"
                :type="confirmPasswordType"
                class="form-control"
                :state="errors[0] ? false : (valid ? true : null)"
              >
              <span class="errors">{{ errors && errors.length > 0 ? passwordError(errors, 'repeat_password') : '' }}</span>
            </ValidationProvider>
          </div>
          <div class="form-check mb-3">
            <input id="exampleCheck1" v-model="prvacyPolicy" type="checkbox" class="form-check-input">
            <label class="form-check-label" for="exampleCheck1">{{ $t('register_term') }}</label>
          </div>
          <div class="form-check">
            <input id="emailMarketing" v-model="signup.email_marketing" type="checkbox" class="form-check-input">
            <label class="form-check-label" for="emailMarketing">{{ $t('email_marketing') }}</label>
          </div>
          <button type="submit" :disabled="prvacyPolicy == false" class="btn btn-primary">
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
  // eslint-disable-next-line vue/require-default-prop
  props: {
    countries: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  data () {
    return {
      prvacyPolicy: false,
      currentStep: 1,
      formObserver: '',
      passwordType: 'password',
      passwordImage: 'eye.svg',
      confirmPasswordType: 'password',
      confirmPasswordImage: 'eye.svg',
      signup: {
        type: 2,
        company_name: '',
        nif: '',
        address: '',
        postal_code: '',
        city: '',
        country_code: '',
        company_phone_number: '',
        company_dial_code: '',
        company_iso_alpha2: '',
        company_website: '',
        first_name: '',
        surname: '',
        // internationalCode: '',
        phone_number: '',
        dial_code: '',
        iso_alpha2: '',
        personal_phone: '',
        language: this.$i18n.locale,
        email: '',
        password: '',
        confirmPassword: '',
        email_marketing: '',
        position: undefined,
        industry_sector: undefined,
        other_sector: '',
        other_position: ''
      },
      positions: [
        { value: 'Business Owner', label: 'Business Owner' },
        { value: 'Business Partner', label: 'Business Partner' },
        { value: 'Managing Director', label: 'Managing Director' },
        { value: 'Department Director', label: 'Department Director' },
        { value: 'General Manager', label: 'General Manager' },
        { value: 'Coordinator', label: 'Coordinator' },
        { value: 'Sales Manager', label: 'Sales Manager' },
        { value: 'Account Manager', label: 'Account Manager' },
        { value: 'Purchase Assistant', label: 'Purchase Assistant' },
        { value: 'Trainee', label: 'Trainee' },
        { value: 'Beauty Professional', label: 'Beauty Professional' },
        { value: 'Beauty Consultant', label: 'Beauty Consultant' },
        { value: 'Beauty Advisor', label: 'Beauty Advisor' },
        { value: 'Physician', label: 'Physician' },
        { value: '', label: 'Other (please describe)' }
      ],
      industry_sectors: [
        { value: 'Beauty Clinic', label: this.$t('beauty_clinic') },
        { value: 'Spa Clinic', label: this.$t('spa_clinic') },
        { value: 'Distributor', label: this.$t('distributor') },
        { value: '', label: this.$t('other_please_describe') }
      ]
    }
  },
  computed: {
    otherSector () {
      if (this.signup.industry_sector === 'other') {
        return true
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.signup.other_sector = ''
        return false
      }
    },
    otherPosition () {
      if (this.signup.position === 'other') {
        return true
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.signup.other_position = ''
        return false
      }
    }
  },
  methods: {
    onSelect ({ iso2, dialCode }) {
      // this.signup.internationalCode = dialCode
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

    gotToStep (step) {
      this.currentStep = step
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
    async registerUser () {
      if (await this.$refs.formObserver.validate() && this.currentStep) {
        // this.signup.phone_number = concateCodeWithPhone(this.signup.internationalCode, this.signup.personal_phone)
        this.$emit('user-data', this.signup)
      }
    },
    onSelectCompany ({ iso2, dialCode }) {
      this.signup.company_dial_code = dialCode
      this.signup.company_iso_alpha2 = iso2
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

<style>
.errors {
  color: #cf0000;
}

.icon-down1 {
  height: 12px !important;
  width: 12px !important;
  transform: rotate(-90deg);
}
</style>

<style lang="scss" scoped>
option, select {
    text-transform: capitalize;
}
.vue-country-select {
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.phone-input {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  width: 78%;
}
</style>

<style >
.errors {
  color: #cf0000;
}

.icon-down1 {
  height: 12px !important;
  width: 12px !important;
  transform: rotate(-90deg);
}
</style>
