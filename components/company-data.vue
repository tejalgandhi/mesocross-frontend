<template>
  <div>
    <div class="store">
      <h2 class="font-weight-normal mb-3">
        {{ $t('dashboard.company_data') }}
      </h2>
      <small class="text-muted">* {{ $t('required_fields') }}</small>
    </div>
    <ValidationObserver ref="formObserver">
      <div class="col-sm-7">
        <form class="row" @submit.prevent="storeCompanyData">
          <div class="form-group col-lg-6">
            <label>{{ $t('company_name') }} *</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('company_name')" rules="required">
              <input
                id="company_name"
                ref="company_name"
                v-model="company.company_name"
                type="text"
                class="form-control"
                aria-describedby="company_name"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-lg-6">
            <label>{{ $t('NIF') }} *</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('NIF')" rules="required">
              <input
                id="nif"
                ref="nif"
                v-model="company.nif"
                type="text"
                class="form-control"
                aria-describedby="nif"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-lg-12">
            <label for="">{{ $t('country') }} * </label>
            <div class="position-relative" style="height: 40px">
              <select v-model="company.country_code" class="form-select form-control py-0" aria-label="Default select example">
                <option v-for="country in countries" :key="country.iso_code" :value="country.iso_code" :selected="loggedinUser.country_code == country.iso_code">
                  {{ country.label }}
                </option>
              </select>
              <img src="../assets/img/angel-down.svg" class="bottom-arrow position-absolute" alt="image">
            </div>
          </div>
          <div class="form-group col-lg-12">
            <label>{{ $t('address') }}Address *</label>
            <ValidationProvider v-slot="{ errors }" name="Address Line 1" rules="required">
              <input
                id="adddress1"
                ref="adddress1"
                v-model="company.company_address_first_line"
                type="text"
                class="form-control mb-3"
                aria-describedby="address1"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Address Line 2" rules="required">
              <input
                id="adddress2"
                ref="adddress2"
                v-model="company.company_address_second_line"
                type="text"
                class="form-control"
                aria-describedby="address2"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-lg-6">
            <label>{{ $t('city') }} *</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('city')" rules="required">
              <input
                id="city"
                ref="city"
                v-model="company.company_city"
                type="text"
                class="form-control"
                aria-describedby="city"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-lg-6">
            <label>{{ $t('state') }} *</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('state')" rules="required">
              <input
                id="state"
                ref="state"
                v-model="company.company_state"
                type="text"
                class="form-control"
                aria-describedby="state"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-lg-12">
            <div class="col-lg-6 pl-0">
              <label>{{ $t('postal_or_zip_code') }} *</label>
              <ValidationProvider v-slot="{ errors }" :name="$t('postal_or_zip_code')" rules="required">
                <input
                  id="postal_or_zip_code"
                  ref="postal_or_zip_code"
                  v-model="company.company_postal_code"
                  type="text"
                  class="form-control"
                  aria-describedby="postal_or_zip_code"
                >
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group col-lg-6">
            <label>{{ $t('phone') }} *</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('phone')" rules="required">
              <input
                id="phone"
                ref="phone"
                v-model="company.company_phone_number"
                type="text"
                class="form-control"
                aria-describedby="phone"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-lg-6">
            <label>{{ $t('email') }} *</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('email')" rules="required">
              <input
                id="email"
                ref="email"
                v-model="company.company_email"
                type="text"
                class="form-control"
                aria-describedby="email"
              >
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-lg-6">
            <label>{{ $t('current_password') }} *</label>
            <ValidationProvider v-slot="{ errors }" :name="$t('current_password')" rules="required">
              <div class="w-100 position-relative">
                <input
                  id="password"
                  ref="password"
                  v-model="company.password"
                  type="password"
                  class="form-control"
                  aria-describedby="password"
                >
              </div>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-lg-12 mt-4">
            <button class="d-block btn submit-btn text-white">
              {{ $t('update_company_data') }}
            </button>
          </div>
        </form>
      </div>
    </ValidationObserver>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      formObserver: '',
      company: {
        company_name: '',
        nif: '',
        country_code: '',
        company_phone_number: '',
        // company_website: '',
        company_address_first_line: '',
        company_address_second_line: '',
        company_city: '',
        company_state: '',
        company_postal_code: '',
        company_email: '',
        password: ''
      }
    }
  },
  // async fetch () {
  //   try {
  //     const { data } = await this.$axios.get('/user/company-data')
  //     console.log(data)
  //   } catch (e) {
  //   }
  // },
  computed: {
    ...mapState({
      countries: state => state.countries,
      loggedinUser: state => state.user.loggedinUser
    })
  },
  mounted () {
    this.company.company_name = this.loggedinUser.company_name
    this.company.nif = this.loggedinUser.nif
    this.company.country_code = this.loggedinUser.country_code
    this.company.company_address_first_line = this.loggedinUser.company_address_first_line
    this.company.company_address_second_line = this.loggedinUser.company_address_second_line
    this.company.company_city = this.loggedinUser.company_city
    this.company.company_state = this.loggedinUser.company_state
    this.company.company_phone_number = this.loggedinUser.company_phone_number
    this.company.company_postal_code = this.loggedinUser.company_postal_code
    this.company.company_email = this.loggedinUser.company_email
  },
  methods: {
    async storeCompanyData () {
      if (await this.$refs.formObserver.validate()) {
        const { data } = await this.$axios.post('user/store-company-data', this.company)
        if (data.status === true) {
          this.$toast.success(data.message, { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
          const user = await this.$axios.$get('/user')
          this.setLoggedinUser(user)
        }

        if (data.status === false) {
          this.$toast.error(data.message, { duration: 3000 })
        }
      }
    },
    ...mapMutations({
      setLoggedinUser: 'user/setLoggedinUser'
    })
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
.errors {
  color: #cf0000;
}
</style>
