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
          <img src="@/assets/img/close.svg" alt="image" class="close" @click="hideModal()">
          <client-only>
            <div class="container">
              <div id="myTabContent" class="tab-content">
                <div id="login">
                  <h3 class="text-center modal-heading">
                    {{ pricingPopTitle }}
                  </h3>
                  <p class="my-3">
                    {{ $t('login_popup_desc') }}
                  </p>
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
                            <input id="password" v-model="form.password" :type="passwordType" autocomplete="off" class="form-control">
                            <a @click="showPassword(passwordType)">
                              <img :src="require(`~/assets/img/${passwordImage}`)" alt="eye" class="eye"></a>
                          </div>
                          <small class="errors text-danger">{{ errors[0] }}</small>
                        </ValidationProvider>
                      </div>
                      <div class="form-group text-right">
                        <p>
                          <nuxt-link to="/forgot-password" class="font-weight-normal" @click.native="hideModal">
                            {{ $t('forgot_password') }}?
                          </nuxt-link>
                        </p>
                      </div>
                      <div class="form-check">
                        <input id="exampleCheck1" type="checkbox" class="form-check-input">
                        <label class="form-check-label" for="exampleCheck1">{{ $t('keep_me_signed_in') }}</label>
                      </div>
                      <button type="submit" class="btn btn-primary">
                        {{ $t('sign_in') }}
                      </button>
                    </form>
                  </validationobserver>
                  <p class="text-center text-dark mt-4">
                    {{ $t('still_dont_have_an_account') }}? <a style="text-decoration: underline" class="font-weight-bold" @click="toRedirect">
                      {{ $t('register') }}
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
import { mapActions, mapState, mapMutations } from 'vuex'
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
      pricePopup: state => state.pricePopup
    }),
    pricingPopTitle () {
      return this.$route.name === 'product-detail-slug' ? this.$t('please_sign_in_to_see_pricing') : this.$t('please_sign_in_for_more_details')
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
      this.$router.push({ name: 'register' })
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
  font-family: Arquitecta;
  font-weight: 500;
}
.close {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
