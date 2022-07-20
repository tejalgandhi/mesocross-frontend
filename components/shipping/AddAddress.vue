<template>
  <div class="">
    <div class="tab-content">
      <div id="shipping" class="tab-pane fade show active shipping">
        <div class="my-3">
          <p class="font-weight-bold text-light font-18">
            {{ $t('edit_delivery_address') }}
          </p>
          <p class="mt-2 mb-2 font-16">
            * {{ $t('required_fields') }}
          </p>
        </div>
        <div class="row mx-0">
          <ValidationObserver ref="formObserver">
            <form action="" class="fill-detail-from col-md-9 col-xl-9 row px-0">
              <div v-if="loggedinUser.type === 2" class="form-group col-md-6">
                <label for="">{{ $t('company_name') }} *</label>
                <ValidationProvider v-slot="{ errors }" :name="$t('company_name')" rules="required">
                  <div class="position-relative" style="height: 40px">
                    <input :value="data.company_name" type="text" class="w-100 px-3 h-100" @input="changeAddress('company_name', $event)">
                    <span class="errors">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div v-if="user.type === 2" class="form-group col-md-6">
                <label for="">{{ $t('vat_number') }} *</label>
                <ValidationProvider v-slot="{ errors }" :name="$t('NIF')" rules="required">
                  <div class="position-relative" style="height: 40px">
                    <input :value="data.nif" type="text" class="w-100 px-3 h-100" @input="changeAddress('nif', $event)">
                    <span class="errors">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div v-else class="form-group col-md-6">
                <label for="">{{ $t('vat_number') }}</label>
                <ValidationProvider v-slot="{ errors }" :name="$t('vat_number')">
                  <div class="position-relative" style="height: 40px">
                    <input :value="data.nif" type="text" class="w-100 px-3 h-100" @input="changeAddress('nif', $event)">
                    <span class="errors">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="form-group col-12">
                <label for="">{{ $t('country') }} *</label>
                <div class="position-relative" style="height: 40px">
                  <ValidationProvider v-slot="{ errors }" :name="$t('country')" rules="required">
                    <select :value="data.country_code" class="form-select form-control py-0" aria-label="Default select example" autocomplete="off" @input="changeAddress('country_code', $event)">
                      <option value="">
                        {{ $t('select_country') }}
                      </option>
                      <option v-for="country in countries" :key="country.iso_code" :selected="data.country_code == country.iso_code" :value="country.iso_code">
                        {{ country.label }}
                      </option>
                    </select>
                    <span class="errors">{{ errors[0] }}</span>
                  </ValidationProvider>
                  <i class="fa fa-angle-down text-muted bottom-arrow position-absolute" />
                </div>
              </div>
              <div class="form-group col-12">
                <label for="">{{ $t('address') }} *</label>
                <div class="position-relative mb-2" style="height: 40px">
                  <input :value="data.address_first_line" type="text" class="w-100 px-3 h-100" @input="changeAddress('address_first_line', $event)">
                </div>
                <div class="position-relative" style="height: 40px">
                  <input :value="data.address_second_line" type="text" class="w-100 px-3 h-100" @input="changeAddress('address_second_line', $event)">
                </div>
                <span v-if="formSubmit && (data.address_first_line == '' || data.address_second_line == '')" class="errors">Please Fill Address</span>
              </div>
              <div class="form-group col-md-6">
                <label for="">{{ $t('city') }}  *</label>
                <ValidationProvider v-slot="{ errors }" :name="$t('city')" rules="required">
                  <div class="position-relative" style="height: 40px">
                    <input :value="data.city" type="text" class="w-100 px-3 h-100" @input="changeAddress('city', $event)">
                  </div>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md-6">
                <label for="">{{ $t('state') }} </label>
                <div class="position-relative" style="height: 40px">
                  <input :value="data.state" type="text" class="w-100 px-3 h-100" @input="changeAddress('state', $event)">
                </div>
              </div>
              <div class="form-group col-md-12">
                <label for="">{{ $t('postal_or_zip_code') }} *</label>
                <ValidationProvider v-slot="{ errors }" :name="$t('postal_or_zip_code')" rules="required">
                  <div class="position-relative col-md-6 pl-0 pr-0 pr-md-3" style="height: 40px">
                    <input :value="data.post_code" type="text" class="w-100 px-3 h-100" @input="changeAddress('post_code', $event)">
                  </div>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md-6">
                <ValidationProvider v-slot="{ errors }" name="Phone Number" rules="required">
                  <label for="">{{ $t('phone') }} *</label>
                  <div class="d-flex">
                    <vue-country-code
                      :dropdown-options="{
                        enabledCountryCode:true,
                        disabledDialCode: false
                      }"
                      :default-country="data.iso_alpha2"
                      :disabled-fetching-country="false"
                      :enabled-country-code="true"
                      :preferred-countries="['pt','es']"
                      :enable-search-field="true"
                      @onSelect="onSelect"
                    />
                    <input :value="data.phone_no" type="text" class="form-control phone-input" @input="changeAddress('phone_no', $event)">
                  </div>
                  <span class="errors text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md-6">
                <label for="">{{ $t('email') }} *</label>
                <ValidationProvider v-slot="{ errors }" :name="$t('email')" rules="required|email">
                  <div class="position-relative" style="height: 40px">
                    <input :value="data.email" type="text" class="w-100 px-3 h-100" @input="changeAddress('email', $event)">
                  </div>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md-6 mt-3">
                <button class="btn w-100 btn-primary filter-invert" type="button" @click="saveAddress">
                  {{ $t('save') }}
                </button>
              </div>
              <div class="form-group col-md-6 mt-3">
                <button class="btn w-100 btn-outline-primary filter-invert" type="button" @click="$emit('hideAddAdrress')">
                  {{ $t('cancel') }}
                </button>
              </div>

              <div class="col-12 text-center my-3">
                <!-- <a href="javascript:void(0)" class="font-16 text-dark font-weight-bold" @click="deleteAddress">Delete Address</a> -->
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      countries: [],
      formSubmit: false,
      formObserver: '',
      firstLoad: 1,
      t: ''
    }
  },
  computed: {
    phoneClassName () {
      let dynamicPhoneClass = 'phoneAdd'
      if (this.$route.name === 'checkout') {
        dynamicPhoneClass = 'checkout'
      }
      return dynamicPhoneClass
    },
    ...mapState({
      data: state => state.user.singleAddress,
      user: state => state.auth.user,
      loggedinUser: state => state.user.loggedinUser
    })
  },
  mounted () {
    this.getCountries()
  },
  methods: {
    onSelect ({ iso2, dialCode }) {
      const internationalCodeKey = 'dial_code'
      const isoAlpha2Key = 'iso_alpha2'
      this.changeAddressInput({ key: internationalCodeKey, value: dialCode })
      this.changeAddressInput({ key: isoAlpha2Key, value: iso2 })
      this.firstLoad++
    },
    getCountries () {
      this.$axios.get('/countries')
        .then((res) => {
          this.countries = res.data.countries
        })
        .catch(() => {
          this.countries = []
        })
    },
    changeAddress (key, value) {
      this.changeAddressInput({ key, value: value.target.value })
    },
    ...mapMutations({
      changeAddressInput: 'user/changeAddressInput',
      resetAddressInput: 'user/resetAddressInput'
    }),
    async saveAddress () {
      // eslint-disable-next-line no-empty
      const selectedCountry = this.countries.find(val => val.iso_code === this.data.country_code)
      const data = { ...this.data }
      data.country = !selectedCountry ? this.countries[0].label : selectedCountry.label
      data.address = `${this.data.address_first_line} ${this.data.address_second_line}`
      this.formSubmit = true
      if (await this.$refs.formObserver.validate() && (this.data.address_first_line || this.data.address_second_line)) {
        this.$axios.post('/address', data).then(({ data }) => {
          this.$toast.success(data.message, { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
          this.resetAddressInput()
          this.$emit('addressSave')
        }).catch((err) => {
          if (err.response.status === 422) {
            const { message } = err.response.data
            this.$toast.error(message, { duration: 3000, position: 'top-right' })
          } else {
            this.$toast.error('Something Went Wrong', { duration: 3000, position: 'top-right' })
          }
        })
      }
    },
    deleteAddress () {
      this.$axios.delete('/delete-address', { data: { address_id: this.data.id } }).then(({ data }) => {
        this.$toast.success(data.message, { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
        this.resetAddressInput()
        this.$emit('addressSave')
      }).catch((err) => {
        if (err.response.status === 422) {
          this.$toast.error(err.response.message, { duration: 3000, position: 'top-right' })
        } else {
          this.$toast.error('Something Went Wrong.', { duration: 3000, position: 'top-right' })
        }
      })
    }
  }
}
</script>
<style scoped>
.vue-country-select{
  float:left;
  width: auto;
  height: 40px;
}
.vue-country-select .dropdown-list{
  overflow-x:hidden;
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
.shipping .fill-detail-from label{display: block;}
.checkout{display: inline-flex; width: 66%;}
.checkout input{width: 100%;}
.phoneAdd{display: inline-flex; width: 68%;}
.phoneAdd input{width: 100%;}
</style>
