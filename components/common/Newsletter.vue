<template>
  <div class="newsletter">
    <h2 class="text-uppercase mb-4 font-weight-normal">
      {{ $t('subscribe_to_our_newsletter') }}
    </h2>
    <button class="btn btn-outline-primary" @click="$bvModal.show('subscribeModal')">
      {{ $t('subscribe') }}
    </button>
    <b-modal
      id="subscribeModal"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      centered
      hide-footer
      hide-header
      @show="resetModal"
      @hidden="resetModal"
    >
      <template #default="">
        <div class="welcome my-3">
          <img src="@/assets/img/close.svg" alt="image" class="close" @click="hideModal()">
          <client-only>
            <div class="container">
              <div id="myTabContent" class="tab-content">
                <div id="login">
                  <p class="my-3">
                    {{ $t('news_letter_popup_title') }}
                  </p>
                  <ValidationObserver ref="formObserver">
                    <form @submit.prevent="subscribe">
                      <div class="form-group">
                        <label for="name">{{ $t('name') }}*</label>
                        <ValidationProvider v-slot="{ errors }" name="name" rules="required">
                          <input
                            id="name"
                            v-model="form.name"
                            type="text"
                            class="form-control"
                            aria-describedby="nameHelp"
                          >
                          <small class="errors text-danger">{{ errors[0] }}</small>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label for="surname">{{ $t('surname') }}*</label>
                        <ValidationProvider v-slot="{ errors }" name="surname" rules="required">
                          <input
                            id="surname"
                            v-model="form.surname"
                            type="text"
                            class="form-control"
                            aria-describedby="surnameHelp"
                          >
                          <small class="errors text-danger">{{ errors[0] }}</small>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label for="phone">{{ $t('phone_number') }}*</label>
                        <ValidationProvider v-slot="{ errors }" name="phone" rules="required">
                          <div class="d-flex">
                            <vue-country-code
                              :dropdown-options="{
                                enabledCountryCode:true,
                                disabledDialCode: false
                              }"
                              :disabled-fetching-country="false"
                              :enabled-country-code="true"
                              :preferred-countries="['pt','es']"
                              :enable-search-field="true"
                              @onSelect="onSelect"
                            />
                            <input
                              id="phone"
                              v-model="form.phone"
                              type="text"
                              class="form-control"
                              aria-describedby="phoneHelp"
                            >
                          </div>
                          <small class="errors text-danger">{{ errors[0] }}</small>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label for="email">{{ $t('email') }}*</label>
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
                        <label for="selectcountry">{{ $t('country') }}*</label>
                        <ValidationProvider v-slot="{ errors }" name="Country" rules="required">
                          <select id="selectcountry" v-model="form.country_code" class="form-control">
                            <option v-for="country in countries" :key="country.iso_code" :value="country.iso_code">
                              {{ country.label }}
                            </option>
                          </select>
                          <span class="errors text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label for="DOB">{{ $t('dob') }}</label>
                        <b-form-datepicker v-model="form.dob" :min="minDate" :max="maxDate" :locale="$i18n.locale" />
                      </div>
                      <div class="form-check">
                        <input id="exampleCheck1" v-model="terms" type="checkbox" class="form-check-input" @change="toggleSubmit(terms)">
                        <label class="form-check-label" for="exampleCheck1">{{ $t('register_term') }}</label>
                      </div>
                      <button type="submit" :disabled="disableButton" class="btn btn-primary">
                        {{ $t('subscribe') }}
                      </button>
                    </form>
                  </validationobserver>
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: {
        name: '',
        surname: '',
        phone_number: '',
        phone: '',
        dial_code: '',
        iso_alpha2: '',
        email: '',
        country_code: '',
        country_name: '',
        dob: ''
      },
      maxDate: new Date(),
      minDate: new Date(),
      terms: false,
      disableButton: true
    }
  },
  computed: {
    ...mapState({
      countries: state => state.countries
    })
  },
  mounted () {
    this.setDate()
  },
  methods: {
    setDate () {
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      // 100 year prior
      this.minDate = new Date(today)
      this.minDate.setFullYear(this.minDate.getFullYear() - 100)
      this.minDate.setDate(today.getDay())
      // 10 year prior
      this.maxDate = new Date(today)
      this.maxDate.setFullYear(this.maxDate.getFullYear() - 10)
      this.maxDate.setDate(today.getDay())
    },
    onSelect ({ iso2, dialCode }) {
      this.form.dial_code = dialCode
      this.form.iso_alpha2 = iso2
    },
    toggleSubmit (terms) {
      this.disableButton = !terms
    },
    resetModal () {
      this.form = {
        name: '',
        surname: '',
        email: '',
        country_code: '',
        country_name: ''
      }
      this.terms = false
      this.disableButton = true
    },
    hideModal () {
      this.$bvModal.hide('subscribeModal')
    },
    async subscribe () {
      try {
        if (await this.$refs.formObserver.validate()) {
          this.toggleSubmit(false)
          const selectedCountry = this.countries.filter(country => country.iso_code === this.form.country_code)
          this.form.country_name = selectedCountry[0].label
          // this.form.phone = concateCodeWithPhone(this.form.internationalCode, this.form.phone_number)
          // this.form.phone = this.form.internationalCode + '-' + this.form.phone_number
          const { data } = await this.$axios.post('subscribe/store', this.form)
          if (data.status === 422) {
            this.$toast.error(data.message, { duration: 5000 })
          } else if (data.status === true) {
            this.$toast.success(data.message, { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
            this.$bvModal.hide('subscribeModal')
          } else {
            this.$toast.error('Something went wrong', { duration: 5000, position: 'top-right' })
          }
          this.toggleSubmit(true)
        }
      } catch (err) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.errors {
  font-size: 12px !important;
}

</style>
