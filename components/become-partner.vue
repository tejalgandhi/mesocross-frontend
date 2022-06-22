<template>
  <div>
    <div class="mc-title-main">
      <h1 class="title-34">
        {{ $t('become_partner') }}
      </h1>
      <p class="mb-2 required-filed">
        * {{ $t('required_fields') }}
      </p>
    </div>
    <div class="form-content">
      <p>{{ $t('join_us_and_feel_the_spirit_of_beauty_become_our_partner') }}</p>
      <ValidationObserver ref="formObserver">
        <form enctype="multipart/form-data" @submit.prevent="submit">
          <div class="row mb-25">
            <div class="col-12">
              <label for="Name">{{ $t('name') }} * </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('name')" rules="required">
                  <input v-model="form.name" type="text" class="form-control">
                  <span class="errors text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-12">
              <label for="">{{ $t('email') }} * </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('email')" rules="required">
                  <input v-model="form.email" type="email" class="form-control">
                  <span class="errors text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>

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
                  @onSelect="onSelect"
                />
                <input id="companyPhoneNumber" v-model="form.phone_number" type="text" class="form-control phone-input" aria-describedby="name">
              </div>
              <span class="errors text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="row mb-25">
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
                  <span class="errors text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-12">
              <label for="">{{ $t('how_did_you_hear_about_us') }}? * </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('how_did_you_hear_about_us')" rules="required">
                  <input v-model="form.hear_about_us" type="text" class="form-control">
                  <span class="errors text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-12">
              <label for="">{{ $t('what_are_the_main_products_are_you_most_interested_in') }}? * </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('what_are_the_main_products_are_you_most_interested_in')" rules="required">
                  <input v-model="form.products_you_most_interested_in" type="text" class="form-control">
                  <span class="errors text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-12">
              <label for="Company Name">{{ $t('company_name') }}? * </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('company_name')" rules="required">
                  <input v-model="form.company_name" type="text" class="form-control">
                  <span class="errors text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-12">
              <label for="Industry Sector">{{ $t('industry_sector') }}* </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('industry_sector')" rules="required">
                  <select id="industry_sector" v-model="form.industry_sector" class="form-control">
                    <option v-for="(sector, index) in industry_sectors" :key="index" :value="sector.value">
                      {{ sector.label }}
                    </option>
                  </select>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div v-show="otherSector" class="row mb-25">
            <div class="col-12">
              <label for="other_sector">{{ $t('other_sector') }}*</label>
              <ValidationProvider v-slot="{ errors }" :name="$t('other_sector')" :rules="{'required': otherSector===true }">
                <input
                  id="other_sector"
                  v-model="form.other_sector"
                  type="textarea"
                  class="form-control"
                  aria-describedby="name"
                >
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-12">
              <label for="Vat Number">{{ $t('vat_number') }}*</label>
              <ValidationProvider v-slot="{ errors }" :name="$t('vat_number')" rules="required">
                <input id="NIF" v-model="form.vat_number" type="text" class="form-control" aria-describedby="VAT">
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-12">
              <label for="website">{{ $t('website') }}</label>
              <ValidationProvider v-slot="{ errors }" :name="$t('website')" rules="required">
                <input id="website" v-model="form.website" type="text" class="form-control" aria-describedby="website">
                <span class="errors">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-12">
              <label for="">{{ $t('additional_information') }} </label>
              <div class="position-relative">
                <textarea id="comment" v-model="form.additional_information" class="form-control" rows="5" />
              </div>
            </div>
          </div>
          <div class="row mb-25">
            <div class="col-12">
              <label for="">{{ $t('attachments') }} </label>
              <div class="position-relative">
                <ValidationProvider v-slot="{ errors }" :name="$t('attachments')" rules="size:5000">
                  <input type="file" class="custom-file-input" @change="handleFileUpload($event)">
                  <span class="errors text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <div class="form-check">
            <input id="exampleCheck1" v-model="terms" type="checkbox" class="form-check-input" @change="toggleSubmit(terms)">
            <label class="form-check-label" for="exampleCheck1">{{ $t('register_term') }}</label>
          </div>
          <recaptcha
            id="v2-normal"
            :site-key="siteCaptchaKey"
          />
          <span v-if="isCaptchaError" class="errors text-danger">{{ $t('please_select_captcha') }}</span>
          <div class="row space-top">
            <div class="col-12">
              <button type="submit" :disabled="disableButton" class="btn btn-theme-dark">
                {{ $t('Send') }}
              </button>
            </div>
          </div>
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
        hear_about_us: '',
        dial_code: '',
        iso_alpha2: '',
        phone_number: '',
        industry_sector: '',
        other_sector: '',
        products_you_most_interested_in: '',
        company_name: '',
        vat_number: '',
        website: '',
        additional_information: ''
      },
      industry_sectors: [
        { value: 'Beauty Clinic', label: this.$t('beauty_clinic') },
        { value: 'Spa Clinic', label: this.$t('spa_clinic') },
        { value: 'Distributor', label: this.$t('distributor') },
        { value: 'other', label: this.$t('other_please_describe') }
      ],
      file: '',
      terms: '',
      siteCaptchaKey: process.env.siteCaptchaKey,
      isCaptchaError: false,
      disableButton: true
    }
  },
  computed: {
    otherSector () {
      if (this.form.industry_sector === 'other') {
        return true
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.form.other_sector = ''
        return false
      }
    },
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

          if (this.isCaptchaError === true) {
            const formdata = new FormData()
            formdata.append('file', this.file)
            formdata.append('form', JSON.stringify(this.form))
            const { data } = await this.$axios.post('become-partner/store', formdata)
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
      this.file = e.target.files[0]
    },
    onSelect ({ iso2, dialCode }) {
      // { name, iso2, dialCode }
      this.form.dial_code = dialCode
      this.form.iso_alpha2 = iso2
    },
    toggleSubmit (terms) {
      this.disableButton = !terms
    }
  }
}
</script>
<style scoped>
    .custom-file-input {
        color: #203032
    }

    .vue-country-select {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        height: auto;
    }

    #companyPhoneNumber {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-left: 0;
    }
</style>
