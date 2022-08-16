<template>
  <div>
    <div class="store">
      <h2 class="font-weight-normal mb-3">
        {{ $t('dashboard.personal_data') }}
      </h2>
      <small class="text-muted">* {{ $t('required_fields') }}</small>
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <ValidationObserver ref="formObserver" @submit.prevent="updatePersonalData">
      <div class="col-sm-7">
        <form class="row">
          <div class="form-group col-md-6">
            <ValidationProvider v-slot="{ errors }" :name="$t('name')" rules="required">
              <label>{{ $t('name') }}*</label>
              <input v-model="user.name" type="text" class="form-control">
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-md-6">
            <ValidationProvider v-slot="{ errors }" :name="$t('surname')" rules="required">
              <label>{{ $t('surname') }} *</label>
              <input v-model="user.surname" type="text" class="form-control">
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-lg-6">
            <ValidationProvider v-slot="{ errors }" :name="$t('phone')" rules="required">
              <label>{{ $t('phone') }} *</label>
              <div class="d-flex">
                <vue-country-code
                  :dropdown-options="{
                    enabledCountryCode:true,
                    disabledDialCode: false
                  }"
                  :default-country="user.iso_alpha2"
                  :disabled-fetching-country="false"
                  :enabled-country-code="true"
                  :preferred-countries="['pt','es']"
                  :enable-search-field="true"
                  @onSelect="changeIsoCode"
                />
                <input v-model="user.phone_number" type="text" class="form-control phone-input">
              </div>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-lg-6">
            <ValidationProvider v-slot="{ errors }" :name="$t('email')" rules="required|email">
              <label>{{ $t('email') }} *</label>
              <input v-model="user.email" type="text" class="form-control">
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-group col-lg-12">
            <div class="col-md-6 pl-0">
              <ValidationProvider v-slot="{ errors }" :name="$t('password')" rules="required">
                <label>{{ $t('password') }} *</label>
                <input v-model="user.password" type="password" class="form-control" placeholder="*********">
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="form-group col-lg-6">
            <b-button variant="primary" class="d-block w-100">
              {{ $t('dashboard.update_personal_data') }}
            </b-button>
          </div>
        </form>
      </div>
    </ValidationObserver>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      formObserver: '',
      errorMessage: '',
      user: {
        name: '',
        surname: '',
        phone_number: '',
        email: '',
        password: '',
        dial_code: '',
        iso_alpha2: ''
      }
    }
  },
  computed: {
    ...mapState({
      loggedinUser: state => state.user.loggedinUser
    })
  },
  mounted () {
    this.setUserData()
  },
  methods: {
    setUserData () {
      this.user.name = this.loggedinUser.first_name
      this.user.surname = this.loggedinUser.last_name
      this.user.phone_number = this.loggedinUser.phone_number
      this.user.email = this.loggedinUser.email
      this.user.dial_code = this.loggedinUser.dial_code
      this.user.iso_alpha2 = this.loggedinUser.iso_alpha2
    },
    async updatePersonalData () {
      this.errorMessage = ''
      if (await this.$refs.formObserver.validate()) {
        try {
          await this.$axios.post('/change-personal-details', this.user)
          this.$toast.success(this.$t('dashboard.personal_detail_updated_successfully'), { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
        } catch (err) {
          if (err.response.status === 401) {
            this.errorMessage = this.$t('invalid_credentials')
          } else if (err.response.status === 422) {
            this.errorMessage = this.$t('email_exists')
          }
        }
      }
    },
    changeIsoCode ({ iso2, dialCode }) {
      this.user.iso_alpha2 = iso2
      this.user.dial_code = dialCode
    }
  }
}
</script>

<style scoped>
.store h2 {
  font: normal normal 600 34px Arquitecta;
  letter-spacing: 0px;
  margin: 0 !important;
  color: #25282A;
}

label {
  text-align: left;
  font: normal normal 500 16px Arquitecta;
  letter-spacing: 0px;
  color: #25282A;
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
