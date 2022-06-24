<template>
  <div class="welcome">
    <client-only>
      <div class="container">
        <AuthLogin />
        <div id="myTabContent" class="tab-content">
          <div id="login" class="tab-pane fade show active" role="tabpanel" aria-labelledby="login-tab">
            <div v-if="invalidCredentials" class="alert alert-danger" role="alert">
              {{ $t('invalid_credentials') }}
            </div>
            <ValidationObserver ref="formObserver">
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="email">{{ $t('email') }}</label>
                  <ValidationProvider v-slot="{ errors }" :name="$t('email')" rules="required">
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
                  <label for="password">{{ $t('password') }}</label>
                  <ValidationProvider v-slot="{ errors }" :name="$t('password')" rules="required">
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
                      {{ $t('forgot_password') }}?
                    </nuxt-link>
                  </p>
                </div>
                <div class="form-check">
                  <input id="exampleCheck1" type="checkbox" class="form-check-input">
                  <label class="form-check-label" for="exampleCheck1">{{ $t('keep_me_signed_in') }}</label>
                </div>
                <button type="submit" class="btn btn-primary">
                  {{ $t('continue') }}
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
import { mapState, mapActions, mapMutations } from 'vuex'
import { togglePassword } from '@/assets/js/custom'

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
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
  },
  mounted () {
    if (this.isLoggedin) {
      // this.$router.back()
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
        // if (await this.$refs.formObserver.validate()) {
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
            this.getIsSubscribed()
            this.$router.push('/')
          }, 300)
        }
        // }
      } catch (err) {
        if (err.response.data.code === 422) {
          const data = err.response.data
          Object.values(data.message).forEach((val) => {
            this.$toast.error(val[0], { duration: 5000 }, 'top-right')
          })
        } if (err.response.status === 401) {
          this.$toast.error(err.response.data.message, { duration: 3000 })
        } else {
          this.$toast.error(this.$t('something_went_wrong'), { duration: 3000 })
        }
      }
    },
    ...mapActions({
      getCart: 'cart/getCart',
      getWishList: 'cart/getWishList',
      setSearch: 'setSearch',
      getIsSubscribed: 'training/getIsSubscribed'
    })
  }
}
</script>

<style>
.errors {
  color: red;
  font-size: 12px !important;
}
</style>
