<template>
  <div class="welcome page-space">
    <div class="container">
      <div>
        <h1 class="h2 text-uppercase font-weight-normal">
          Forgot Password
        </h1>
        <div id="myTabContent" class="tab-content">
          <div id="login" class="tab-pane fade show active" role="tabpanel" aria-labelledby="login-tab">
            <div v-if="errorRes" class="alert alert-danger" role="alert">
              {{ errorMsg }}
            </div>
            <div v-if="successRes" class="alert alert-success" role="alert">
              Reset password link has been sent to given email.
            </div>
            <ValidationObserver ref="formObserver">
              <form v-if="!successRes">
                <div class="form-group">
                  <label for="email">Email</label>
                  <ValidationProvider v-slot="{ errors }" name="Email" rules="required">
                    <input id="email" v-model="form.email" type="email" class="form-control" aria-describedby="emailHelp">
                    <span class="errors">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <button type="button" class="btn btn-primary" @click="forgotPassword()">
                  Submit
                </button>
              </form>
            </validationobserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data () {
    return {
      form: {
        email: ''
      },
      errorRes: false,
      errorMsg: '',
      successRes: false
    }
  },
  methods: {
    async  forgotPassword () {
      try {
        const userData = this.form
        this.successRes = false
        this.errorRes = false
        this.errorMsg = ''
        if (await this.$refs.formObserver.validate()) {
          this.$axios.post('/forgot-password', userData)
            .then((res) => {
              this.successRes = true
            })
            .catch((error) => {
              if (error.response.status === 404) {
                this.errorRes = true
                this.errorMsg = 'User doesn\'t exist with given email. '
              } else if (error.response.status === 429) {
                this.errorRes = true
                this.errorMsg = 'Too many attampt please try after sometime. '
              }
            })
        }
      } catch (err) {
      }
    }
  }
}
</script>

<style>

</style>
