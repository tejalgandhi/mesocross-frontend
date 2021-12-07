<template>
  <div class="welcome">
    <client-only>
      <div class="container">
        <AuthLogin />
        <div id="myTabContent" class="tab-content">
          <div id="login" class="tab-pane fade show active" role="tabpanel" aria-labelledby="login-tab">
            <div v-if="invalidCredentials" class="alert alert-danger" role="alert">
              Invalid Credentials.
            </div>
            <ValidationObserver ref="formObserver">
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="email">Email</label>
                  <ValidationProvider v-slot="{ errors }" name="Email" rules="required">
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      class="form-control"
                      aria-describedby="emailHelp"
                    >
                    <small class="errors text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <ValidationProvider v-slot="{ errors }" name="Password" rules="required">
                    <div class="w-100 position-relative">
                      <input id="password" v-model="form.password" :type="passwordType" class="form-control">
                      <a @click="showPassword(passwordType)">
                        <img :src="require(`~/assets/img/${passwordImage}`)" alt="eye" class="eye"></a>
                    </div>
                    <small class="errors text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </div>
                <div class="form-group text-right">
                  <p>
                    <nuxt-link to="/forgot-password" class="font-weight-normal">
                      Forgot password?
                    </nuxt-link>
                  </p>
                </div>
                <div class="form-check">
                  <input id="exampleCheck1" type="checkbox" class="form-check-input">
                  <label class="form-check-label" for="exampleCheck1">Keep me signed in.</label>
                </div>
                <button type="submit" class="btn btn-primary">
                  Continue
                </button>
              </form>
            </validationobserver>
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
import { togglePassword } from '@/assets/js/custom'
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      passwordType: 'password',
      passwordImage: 'eye.svg',
      form: {
        email: '',
        password: ''
      },
      invalidCredentials: false
    }
  },
  methods: {
    ...mapMutations({
      setLoggedin: 'user/setLoggedin',
      setLoggedinUser: 'user/setLoggedinUser'
    }),
    showPassword (passwordType) {
      const passwordData = togglePassword(passwordType)
      this.passwordType = passwordData.text
      this.passwordImage = passwordData.image
    },

    async login () {
      this.invalidCredentials = false
      try {
        if (await this.$refs.formObserver.validate()) {
          this.$axios.setHeader('localization', this.$i18n.locale)
          const response = await this.$auth.loginWith('local', { data: this.form })
          // this.$auth.setUser(response.data.user)
          if (response.data.status === false) {
            this.invalidCredentials = true
          } else {
            this.setLoggedin(true)
            this.setLoggedinUser(response.data.user)
            setTimeout(() => {
              this.getCart()
              this.getWishList()
              this.$router.push('/')
            }, 300)
          }
        }
      } catch (err) {
        // console.log('err', err)
      }
    },
    ...mapActions({
      getCart: 'cart/getCart',
      getWishList: 'cart/getWishList',
      setSearch: 'setSearch'
    })
  }
}
</script>

<style>
.errors {
  font-size: 12px !important;
}
</style>
