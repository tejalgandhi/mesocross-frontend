<template>
  <div class="welcome page-space">
    <div class="container">
      <AuthLogin />
      <client-only>
        <div id="myTabContent" class="tab-content">
          <div id="register" class="tab-pane fade show active" role="tabpanel" aria-labelledby="register-tab">
            <RegisterParticular @user-data="registerUser" />
          </div>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      userType: ''
    }
  },
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
  },
  mounted () {
    if (this.isLoggedin) {
      this.$router.back()
    }
  },
  methods: {
    async registerUser (userInfo) {
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
