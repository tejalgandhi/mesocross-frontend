<template>
  <div class="container-fluid">
    <div class="form-content mx-auto mb-5">
      <div class="page-title text-center">
        <h1 class="title-34">
          {{ $t('contact_us') }}
        </h1>
        <p class="mb-2 required-filed">
          * {{ $t('required_fields') }}
        </p>
      </div>
      <ValidationObserver ref="formObserver">
        <form enctype="multipart/form-data" @submit.prevent="submit">
          <div class="row mb-25">
            <div class="col-md-12">
              <div class="form-group">
                <label for="Name">{{ $t('name') }} * </label>
                <div class="position-relative">
                  <ValidationProvider v-slot="{ errors }" :name="$t('name')" rules="required">
                    <input v-model="form.name" type="text" :placeholder="$t('name')" class="form-control">
                    <span class="errors text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label for="">{{ $t('email') }} * </label>
                <div class="position-relative">
                  <ValidationProvider v-slot="{ errors }" :name="$t('email')" rules="required">
                    <input v-model="form.email" :placeholder="$t('email')" type="email" class="form-control">
                    <span class="errors text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
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
                    <span class="errors text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
                <label for="">{{ $t('subject') }} * </label>
                <div class="position-relative">
                  <ValidationProvider v-slot="{ errors }" :name="$t('subject')" rules="required">
                    <input v-model="form.subject" :placeholder="$t('subject')" type="text" class="form-control">
                    <span class="errors text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-group">
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
                  <span class="errors text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label for="">{{ $t('message') }} * </label>
                <div class="position-relative">
                  <ValidationProvider v-slot="{ errors }" :name="$t('message')" rules="required">
                    <textarea id="comment" v-model="form.message" :placeholder="$t('message')" class="form-control" rows="10" />
                    <span class="errors text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <recaptcha
                  id="v2-normal"
                  :site-key="siteCaptchaKey"
                />
                <span v-if="isCaptchaError" class="errors text-danger">Please Select Captcha</span>
              </div>
            </div>
            <div class="col-md-6">
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('attachments')" rules="size:5000">
                  <b-button block variant="outline-primary" @click="onPickFile">
                    {{ file ? file.name : 'ADD FILE +' }}
                  </b-button>
                  <input ref="fileInput" hidden type="file" class="custom-file-input" @change="handleFileUpload($event)">
                  <span class="errors text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
            <div class="col-md-6">
              <b-button block type="submit" variant="primary">
                {{ $t('Send') }}
              </b-button>
            </div>
          </div>
        </form>
      </validationobserver>
      <hr class="border-top">
      <div class="row my-5 pb-5 gt-5">
        <div class="col-md-6">
          <h3 class="mb-4">
            Call us
          </h3>
          <div class="text-lg">
            <p class="mb-3">
              We’re available Monday to Friday <br>09:00 - 20:00 GMT and Saturday to Sunday 09:00 - 18:00 GMT
            </p>
            <p><a href="tel:+44 (0) 000 000 000">+44 (0) 000 000 000</a></p>
          </div>
        </div>
        <div class="col-md-6">
          <h3 class="mb-4">
            Find us
          </h3>
          <div class="text-lg">
            <p class="mb-3">
              Lorem ipsum dolor sit 3ºA 1400-356 Lorem, Ipsum
            </p>
            <p><a style="text-decoration: underline;" href="#">Open map</a></p>
          </div>
        </div>
      </div>
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
            const token = await this.$recaptcha.getResponse()
            console.log('ReCaptcha token:', token)
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
              this.$toast.error(data.message.file[0], { duration: 5000, position: 'top-right' })
            } else {
              this.$toast.success(data.message, { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
              this.$router.push('/')
            }
          }
        }
      } catch (error) {
        this.$toast.error('Something went wrong', { duration: 5000, position: 'top-right' })
      }
    },
    handleFileUpload (e) {
      console.log(e.target.files[0])
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
<style lang="scss" scoped>
.text-lg{
  font-size: 20px;
}
.form-content{
  .page-title{
    padding: 80px 0;
    @media (max-width:991px) {
      padding: 40px 0;
    }
  }
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
