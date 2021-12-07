<template>
  <div class="welcome">
    <div class="container">
      <AuthLogin />
      <client-only>
        <div id="myTabContent" class="tab-content">
          <div id="register" class="tab-pane fade show active" role="tabpanel" aria-labelledby="register-tab">
            <form class="radio_btn">
              <p>
                <input id="test1" type="radio" name="radio-group" checked @click="shoUserTypeForm(particular)">
                <label for="test1">Consumer</label>
              </p>
              <p>
                <input id="test2" type="radio" name="radio-group" @click="shoUserTypeForm(company)">
                <label for="test2">Company</label>
              </p>
            </form>
            <RegisterCompany v-if="userType == company" :countries="countries" @user-data="registerUser" />
            <RegisterParticular v-else :countries="countries" @user-data="registerUser" />
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
const PARTICULAR = 'particular'
const COMPANY = 'company'
export default {
  auth: 'guest',

  data () {
    return {
      userType: PARTICULAR,
      particular: PARTICULAR,
      company: COMPANY,
      currentStep: 1,
      formObserver: '',
      countries: [],
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
  async created () {
    await this.getCountries()
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
      const userData = userInfo
      try {
        const { data } = await this.$axios.post('/register', userData)
        if (data.status === true) {
          this.$router.push({ path: '/login', redirect: 'actualRoute' })
          this.$toast.success('You have registred successfully.', { duration: 3000 })
        }
      } catch (err) {

      }
    }

  }
}
</script>

<style>
.shipping [type="radio"]:checked + label:before, [type="radio"]:not(:checked) + label:before {top: calc(50% - 9px);left: 0px !important;}
</style>
