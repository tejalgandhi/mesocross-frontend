<template>
  <div>
    <!-- <button class="bg-transparent d-flex align-items-center" @click="$bvModal.show('price')">
      Price Popup
    </button> -->

    <b-modal
      id="price"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      centered
      hide-footer
      hide-header
    >
      <template #default="">
        <div class="welcome my-3">
          <img src="@/assets/img/close.svg" alt="" class="close" @click="hideModal()">
          <client-only>
            <div class="container">
              <div id="myTabContent" class="tab-content">
                <div id="login">
                  <h3 class="text-center modal-heading">
                    {{ pricingPopTitle }}
                  </h3>
                  <p class="my-3">
                    In order for your experience on our website to be complete, please enter your data
                  </p>
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
                          <nuxt-link to="/forgot-password" class="font-weight-normal" @click.native="hideModal">
                            Did you forget password?
                          </nuxt-link>
                        </p>
                      </div>
                      <div class="form-check">
                        <input id="exampleCheck1" type="checkbox" class="form-check-input">
                        <label class="form-check-label" for="exampleCheck1">Keep me signed in.</label>
                      </div>
                      <button type="submit" class="btn btn-primary">
                        Sign in
                      </button>
                    </form>
                  </validationobserver>
                  <p class="text-center text-dark mt-4">
                    Still don't have an account? <a style="text-decoration: underline" class="font-weight-bold" @click="toRedirect">
                      Register
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </client-only>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { togglePassword } from '@/assets/js/custom'
import { mapActions, mapState, mapMutations } from 'vuex'

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
      pricePopup: state => state.pricePopup
    }),
    pricingPopTitle () {
      return this.$route.name === 'product-detail-slug' ? 'Please sign in to see pricing' : 'Please sign in for more details'
    }
  },
  mounted () {
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      if (modalId === 'price') {
        this.setPricePopup(false)
      }
    })
  },
  methods: {
    toRedirect () {
      this.hideModal()
      this.$router.push('register')
    },
    showPassword (passwordType) {
      const passwordData = togglePassword(passwordType)
      this.passwordType = passwordData.text
      this.passwordImage = passwordData.image
    },
    async login () {
      // console.log('this.route.name', this.$route.name)
      this.invalidCredentials = false
      try {
        if (await this.$refs.formObserver.validate()) {
          this.$axios.setHeader('localization', this.$i18n.locale)
          const response = await this.$axios.post('/login', this.form)
          // const response = await this.$auth.loginWith('local', { data: this.form })
          if (response.data.status === false) {
            this.invalidCredentials = true
          } else {
            this.$auth.setUser(response.data.user)
            await this.$auth.setUserToken(response.data.access_token)
            await this.$nuxt.refresh()
            this.setLoggedin(true)
            this.setLoggedinUser(response.data.user)
            this.$bvModal.hide('price')
            this.getCart()
            this.getWishList()
            // this.$router.go()
            // this.$router.push('/')
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
    }),
    ...mapMutations({
      setPricePopup: 'setPricePopup',
      setLoggedin: 'user/setLoggedin',
      setLoggedinUser: 'user/setLoggedinUser'
    }),
    hideModal () {
      this.setPricePopup(false)
      this.$bvModal.hide('price')
    }
  }
}
</script>

<style scoped>
.errors {
  font-size: 12px !important;
}

.container {
  width: 100% !important;
}
.modal-heading {
  font-size: 30px;
  font-family: Work Sans;
  font-weight: 500;
}
.close {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
