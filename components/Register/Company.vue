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
            <label for="name">Company Name*</label>
            <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
              <input
                id="name"
                ref="name"
                v-model="signup.company_name"
                type="text"
                class="form-control"
                aria-describedby="name"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="NIF">VAT Number*</label>
            <ValidationProvider v-slot="{ errors }" name="VAT" rules="required">
              <input id="NIF" v-model="signup.nif" type="text" class="form-control" aria-describedby="VAT">
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="selectcountry">Country*</label>
            <ValidationProvider v-slot="{ errors }" name="Country" rules="required">
              <select id="selectcountry" v-model="signup.country_code" class="form-control">
                <option v-for="country in countries" :key="country.iso_code" :value="country.iso_code">
                  {{ country.label }}
                </option>
              </select>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="companyPhoneNumber">Company Phone Number*</label>
            <ValidationProvider v-slot="{ errors }" name="Phone Number" rules="required">
              <input
                id="companyPhoneNumber"
                v-model="signup.company_phone_number"
                type="text"
                class="form-control"
                aria-describedby="name"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="company_website">Website*</label>
            <ValidationProvider v-slot="{ errors }" name="Company Website" rules="required">
              <input
                id="company_website"
                v-model="signup.company_website"
                type="text"
                class="form-control"
                aria-describedby="company_websiteHelp"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <button type="button" class="btn btn-primary continue" @click="nextButton()">
            Continue <img src="../../assets/img/angel-right.svg" class="icon-down1" alt="">
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
              <label>Company Information</label>
            </div>
            <div class="two colmn active">
              <span>2</span>
              <label>Personal Information</label>
            </div>
            <div class="three colmn">
              <span>3</span>
              <label>Account Details</label>
            </div>
          </div>
          <a href="#" class="back"><i class="fa fa-angle-left" aria-hidden="true" /></a>
          <div class="form-group">
            <label for="name">First Name*</label>
            <ValidationProvider v-slot="{ errors }" name="First Name" rules="required">
              <input
                id="first_name"
                v-model="signup.first_name"
                type="text"
                class="form-control"
                aria-describedby="name"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="surname">Surname*</label>
            <ValidationProvider v-slot="{ errors }" name="Surname" rules="required">
              <input
                id="surname"
                v-model="signup.surname"
                type="surname"
                class="form-control"
                aria-describedby="surname"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="phoneNumber">Direct Phone Number*</label>
            <ValidationProvider v-slot="{ errors }" name="Phone Number" rules="required">
              <input
                id="phoneNumber"
                v-model="signup.phone_number"
                type="text"
                class="form-control"
                aria-describedby="name"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group">
            <label for="email">Email*</label>
            <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email_exists">
              <input id="email" v-model="signup.email" type="email" class="form-control" aria-describedby="emailHelp">
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <button type="button" class="btn btn-primary continue" @click="nextButton()">
            Continue <img src="../../assets/img/angel-right.svg" class="icon-down1" alt="">
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
              <label>Company Information</label>
            </div>
            <div class="two colmn" @click="gotToStep(2)">
              <img src="@/assets/img/completed.svg">
              <label>Personal Information</label>
            </div>
            <div class="three colmn active">
              <span>3</span>
              <label>Account Details</label>
            </div>
          </div>
          <a href="#" class="back"><i class="fa fa-angle-left" aria-hidden="true" /></a>
          <div class="form-group">
            <label for="password">Password*</label>
            <ValidationProvider v-slot="{ errors }" name="password" rules="required|min:6" vid="password">
              <input
                id="password"
                v-model="signup.password"
                :type="passwordType"
                class="form-control"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
            <a @click="showPassword(passwordType)"><img
              :src="require(`~/assets/img/${passwordImage}`)"
              alt="eye"
              class="eye"
            ></a>
          </div>
          <div class="form-group">
            <label for="resetPassword">Repeat Password*</label>
            <ValidationProvider v-slot="{ valid,errors }" name="Confirm Password" rules="required|confirmed:password">
              <input
                id="resetPassword"
                v-model="signup.confirmPassword"
                :type="confirmPasswordType"
                class="form-control"
                :state="errors[0] ? false : (valid ? true : null)"
              >
              <a @click="showConfirmPassword(confirmPasswordType)"><img
                :src="require(`~/assets/img/${confirmPasswordImage}`)"
                alt="eye"
                class="eye"
              ></a>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-check mb-3">
            <input id="exampleCheck1" v-model="prvacyPolicy" type="checkbox" class="form-check-input">
            <label class="form-check-label" for="exampleCheck1">I was able to read and understand the information on the
              use of my personal data explained in the Privacy Policy and agree to receive personalized commercial
              communications from MCCM email and other means.</label>
          </div>
          <div class="form-check">
            <input id="emailMarketing" v-model="signup.email_marketing" type="checkbox" class="form-check-input">
            <label class="form-check-label" for="emailMarketing">Email Marketing</label>
          </div>
          <button type="submit" :disabled="prvacyPolicy == false" class="btn btn-primary">
            Create an account
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
        country_code: '',
        company_phone_number: '',
        company_website: '',
        first_name: '',
        surname: '',
        phone_number: '',
        email: '',
        password: '',
        confirmPassword: '',
        email_marketing: ''
      }
    }
  },
  methods: {
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
        this.$emit('user-data', this.signup)
      }
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
