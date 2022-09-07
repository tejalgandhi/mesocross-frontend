<template>
  <div class="welcome page-space">
    <div class="container">
      <AuthLogin />
      <client-only>
        <div id="myTabContent" class="tab-content">
          <div id="register" class="tab-pane fade show active" role="tabpanel" aria-labelledby="register-tab">
            <form class="radio_btn text-center">
              <p class="mr-2 mr-md-4">
                <input id="test1" type="radio" name="radio-group" checked @click="shoUserTypeForm(particular)">
                <label for="test1">{{ $t('consumer') }}</label>
              </p>
              <p class="mr-0">
                <input id="test2" type="radio" name="radio-group" @click="shoUserTypeForm(company)">
                <label for="test2">{{ $t('company') }}</label>
              </p>
            </form>
            <RegisterCompany v-if="userType == company" ref="companyComponent" :countries="countries" @user-data="registerUser" />
            <RegisterParticular v-else :countries="countries" @user-data="registerUser" />
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const PARTICULAR = 'particular'
const COMPANY = 'company'
export default {
  data () {
    return {
      userType: PARTICULAR,
      particular: PARTICULAR,
      company: COMPANY,
      currentStep: 1,
      formObserver: '',
      // countries: [],
      signup: {
        company_name: '',
        company_nif: '',
        company_country: '',
        company_phone_number: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        confirmPassword: ''

      }
    }
  },
  computed: {
    ...mapState({
      countries: state => state.countries,
      isLoggedin: state => state.user.loggedIn
    })
  },
  mounted () {
    if (this.isLoggedin) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    getCountries () {
      this.$axios.get('/countries')
        .then((res) => {
          this.countries = res.data.countries
        })
        .catch(() => {
          this.countries = []
        })
    },
    shoUserTypeForm (userType) {
      this.userType = userType
    },
    async registerUser (userInfo) {
      userInfo.country_name = this.countries.find(currentValue => currentValue.iso_code === userInfo.country_code).label
      const userData = userInfo
      try {
        const { data } = await this.$axios.post('/register', userData)
        if (data.status === true) {
          this.$router.push({ path: '/login', redirect: 'actualRoute' })
          this.$toast.success(this.$t('you_have_registred_successfully'), { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
        }
      } catch (err) {
        if (err.response.data.code === 422) {
          const data = err.response.data
          Object.values(data.message).forEach((val) => {
            this.$toast.error(val[0], { duration: 5000 }, 'top-right')
          })
        } else {
          this.$toast.error(this.$t('something_went_wrong'), { duration: 3000 })
        }
      }
    }

  }
}
</script>

<style>
.shipping [type="radio"]:checked + label:before, [type="radio"]:not(:checked) + label:before {top: calc(50% - 9px);left: 20px !important;}
</style>
