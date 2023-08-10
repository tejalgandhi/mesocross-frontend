<template>
  <div>
    <div class="mc-title-main">
      <h1 class="title-34">
        {{ $t('contact_us') }}
      </h1>
      <p class="mb-2 required-filed">
        * {{ $t('required_fields') }}
      </p>
    </div>
    <div class="mc-contact-details">
      <div class="row">
        <div class="col-12 col-sm-12 col-md-12">
          <div class="contact-info">
            <p>{{ $t('We_are_available_monday_to_friday') }}<br> 09:00 - 18:00 GMT</p>
            <span>{{ $t('telephone') }} <a href="tel:+351 227 347 125">(+351) 227 347 125</a> ({{ $t('call_national_network') }})</span><br>
            <span>{{ $t('cell_phone') }} <a href="tel:+351 924 188 704">(+351) 924 188 704</a> ({{ $t('call_national_mobile_network') }})</span><br>
          </div>
        </div>
      </div>
    </div>
    <div class="form-content">
      <ValidationObserver ref="formObserver">
        <form enctype="multipart/form-data" @submit.prevent="submit">
          <div class="row mb-25">
            <div class="col-md-6">
              <label for="Name">{{ $t('name') }} * </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('name')" rules="required">
                  <input v-model="form.name" type="text" class="form-control">
                  <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.first_name.required') : '' }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="col-md-6">
              <label for="">{{ $t('email') }} * </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('email')" rules="required">
                  <input v-model="form.email" type="email" class="form-control">
                  <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.email.required') : '' }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="col-12">
              <label for="Country">{{ $t('country') }} * </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('country')" rules="required">
                  <select id="selectcountry" v-model="form.country" class="form-control">
                    <option value="">
                      {{ $t('select_your_country') }}
                    </option>
                    <option v-for="country in countries" :key="country.iso_code" :value="country.label">
                      {{ country.label }}
                    </option>
                  </select>
                  <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.country.required') : '' }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="col-12">
              <ValidationProvider v-slot="{ errors }" name="Phone Number" rules="required">
                <label for="companyPhoneNumber">{{ $t('phone_number') }}*</label>
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
                    class="h-auto"
                    @onSelect="onSelect"
                  />
                  <input id="companyPhoneNumber" v-model="form.phone_number" type="text" class="form-control phone-input" aria-describedby="name">
                </div>
                <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.phone_number.required') : '' }}</span>
              </ValidationProvider>
            </div>
            <div class="col-12">
              <label for="">{{ $t('subject') }} * </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('subject')" rules="required">
                  <input v-model="form.subject" type="text" class="form-control">
                  <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.subject.required') : '' }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="col-12">
              <label for="">{{ $t('common.message') }} * </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('message')" rules="required">
                  <textarea id="comment" v-model="form.message" class="form-control" rows="5" />
                  <span class="errors">{{ errors && errors.length > 0 ? $t('validation.custom.message.required') : '' }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="col-12">
              <recaptcha
                id="v2-normal"
                :site-key="siteCaptchaKey"
              />
              <span v-if="isCaptchaError" class="errors text-danger">Please Select Captcha</span>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-12">
              <label for="">{{ $t('attachments') }} </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('attachments')" rules="size:5000">
                  <b-button class="file-btn" block variant="outline-primary" @click="onPickFile">
                    {{ file ? file.name : `${$t('add_file')} +` }}
                  </b-button>
                  <input ref="fileInput" hidden type="file" class="custom-file-input" @change="handleFileUpload($event)">
                  <span class="errors text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary px-5">
                {{ $t('Send') }}
              </button>
            </div>
          </div>
          <div class="row mb-25" />
          <div class="form-group" />
          <div class="row mb-25" />
          <div class="row mb-25" />
          <div class="row mb-25" />
          <div class="row space-top" />
        </form>
      </validationobserver>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: {
        name: '',
        email: '',
        country: '',
        subject: '',
        message: '',
        dial_code: '',
        iso_alpha2: '',
        phone_number: ''
      },
      file: '',
      t: '',
      siteCaptchaKey: process.env.siteCaptchaKey,
      isCaptchaError: false
    }
  },
  computed: {
    ...mapState({
      countries: state => state.countries
    })
  },
  async mounted () {
    // this.siteCaptchaKey = process.env.recaptchaSiteKey
    try {
      await this.$recaptcha.init()
    } catch (e) {
    }
  },
  methods: {
    async submit () {
      // eslint-disable-next-line no-unreachable
      try {
        if (await this.$refs.formObserver.validate()) {
          try {
            this.isCaptchaError = false
            // const token = await this.$recaptcha.getResponse()
            // console.log('ReCaptcha token:', token)
          } catch (error) {
            this.isCaptchaError = true
            // console.log('ReCaptcha Error:', error)
          }

          if (this.isCaptchaError === false) {
            const formdata = new FormData()
            formdata.append('file', this.file)
            formdata.append('form', JSON.stringify(this.form))
            const { data } = await this.$axios.post('contact-us/store', formdata)

            if (data.code === 422) {
              this.$toast.error(data.message.file[0], { duration: 5000, position: 'top-right', className: 'custom-toast-error-class' })
            } else {
              this.$toast.success(data.message, { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
              this.$router.push('/')
            }
          }
        }
      } catch (error) {
        this.$toast.error('Something went wrong', { duration: 5000, position: 'top-right', className: 'custom-toast-error-class' })
      }
    },
    handleFileUpload (e) {
      this.file = e.target.files[0]
    },
    onSelect ({ iso2, dialCode }) {
      // { name, iso2, dialCode }
      this.form.dial_code = dialCode
      this.form.iso_alpha2 = iso2
    },

    onPickFile () {
      this.$refs.fileInput.click()
    }
  }
}
</script>
<style scoped>

    .file-btn {
        text-transform: uppercase;
    }
  .custom-file-input {
    color: #fff;
    opacity: 1;
    background-color: transparent;
    height: auto;

  }
  .custom-file-input:hover:before {
    color: #000;
  }

  .vue-country-select {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    }

  #companyPhoneNumber {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-left: 0;
  }
</style>
