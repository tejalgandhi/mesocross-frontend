<template>
  <div class="welcome">
    <div class="container">
      <div>
        <div>
          <h1>Reset Password</h1>
        </div>
        <div id="myTabContent" class="tab-content">
          <div v-if="errorRes" class="alert alert-danger" role="alert">
            {{ errorMsg }}
          </div>
          <ValidationObserver ref="formObserver">
            <form @submit.prevent="resetPassword">
              <div class="form-group">
                <label for="password">Password*</label>
                <ValidationProvider v-slot="{ errors }" name="password" rules="required|min:6" vid="password">
                  <input
                    id="password"
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                  >
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
                <a @click="showPassword = !showPassword">
                  <img v-if="showPassword" src="@/assets/img/Eye_Close.svg" alt="eye" class="eye">
                  <img v-else src="@/assets/img/eye.svg" alt="eye" class="eye">
                </a>
              </div>
              <div class="form-group">
                <label for="resetPassword">Repeat Password*</label>
                <ValidationProvider v-slot="{ valid,errors }" name="Confirm Password" rules="required|confirmed:password">
                  <input id="resetPassword" v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' :'password'" class="form-control" :state="errors[0] ? false : (valid ? true : null)">
                  <a @click="showConfirmPassword = !showConfirmPassword">
                    <img v-if="showConfirmPassword" src="@/assets/img/Eye_Close.svg" alt="eye" class="eye">
                    <img v-else src="@/assets/img/eye.svg" alt="eye" class="eye">
                  </a>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <button class="btn btn-primary">
                Submit
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  data () {
    return {
      form: {
        password: '',
        confirmPassword: '',
        token: '',
        email: ''
      },
      errorRes: false,
      errorMsg: '',
      successRes: false,
      showPassword: false,
      showConfirmPassword: false,
      tokenVerified: true,
      error: {
        statusCode: '',
        message: ''
      },
      formObserver: ''
    }
  },

  created () {
    this.form.token = this.$route.query.token
    this.verifyToken()
  },
  methods: {
    async resetPassword () {
      try {
        if (await this.$refs.formObserver.validate() && this.tokenVerified) {
          await this.$axios.post('/reset-password', this.form)
          this.$toast.success('Password reset successfully', { duration: 3000 })
          this.$router.push('/login')
        }
      } catch (e) {
        this.tokenVerified = false
        this.errorRes = true
        if (e.response.status === 400) {
          this.errorMsg = 'Reset Password link is expired, please try once again'
        } else {
          this.errorMsg = 'Invalid link'
        }
      }
    },
    async verifyToken () {
      try {
        const res = await this.$axios.get(`/verify-password-token?token=${this.form.token}`)
        if (res.status) {
          this.tokenVerified = true
        }
      } catch (e) {
        this.tokenVerified = false
        this.errorRes = true
        if (e.response.status === 400) {
          this.errorMsg = 'Reset Password link is expired, please try once again'
        } else {
          this.errorMsg = 'Invalid link'
        }
      }
    }
  }
}
</script>

<style>

</style>
