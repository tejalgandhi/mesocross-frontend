<template>
  <div class="col-lg-9">
    <div class="tab-content">
      <div id="shipping" class="tab-pane fade show active shipping">
        <div class="my-3">
          <p class="font-weight-bold text-dark font-18">
            Edit delivery address
          </p>
          <p class="mt-2 mb-2 font-16">
            * Required fields
          </p>
        </div>
        <div class="row mx-0">
          <ValidationObserver ref="formObserver">
            <form action="" class="fill-detail-from col-md-9 col-xl-8 row px-0">
              <div v-if="loggedinUser.type === 2" class="form-group col-md-6">
                <label for="">Company name *</label>
                <ValidationProvider v-slot="{ errors }" name="Company name" rules="required">
                  <div class="position-relative" style="height: 40px">
                    <input :value="data.company_name" type="text" class="w-100 px-3 h-100" @input="changeAddress('company_name', $event)">
                    <span class="errors">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="form-group col-md-6">
                <label for="">NIF *</label>
                <ValidationProvider v-slot="{ errors }" name="NIF" rules="required">
                  <div class="position-relative" style="height: 40px">
                    <input :value="data.nif" type="text" class="w-100 px-3 h-100" @input="changeAddress('nif', $event)">
                    <span class="errors">{{ errors[0] }}</span>
                  </div>
                </ValidationProvider>
              </div>
              <div class="form-group col-12">
                <label for="">Country *</label>
                <div class="position-relative" style="height: 40px">
                  <ValidationProvider v-slot="{ errors }" name="Country" rules="required">
                    <select :value="data.country_code" class="form-select form-control py-0" aria-label="Default select example" autocomplete="off" @input="changeAddress('country_code', $event)">
                      <option value="">
                        Select Country
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
                <label for="">Address *</label>
                <div class="position-relative mb-2" style="height: 40px">
                  <input :value="data.address_first_line" type="text" class="w-100 px-3 h-100" @input="changeAddress('address_first_line', $event)">
                </div>
                <div class="position-relative" style="height: 40px">
                  <input :value="data.address_second_line" type="text" class="w-100 px-3 h-100" @input="changeAddress('address_second_line', $event)">
                </div>
                <span v-if="formSubmit && (data.address_first_line == '' || data.address_second_line == '')" class="errors">Please Fill Address</span>
              </div>
              <div class="form-group col-md-6">
                <label for="">City *</label>
                <ValidationProvider v-slot="{ errors }" name="City" rules="required">
                  <div class="position-relative" style="height: 40px">
                    <input :value="data.city" type="text" class="w-100 px-3 h-100" @input="changeAddress('city', $event)">
                  </div>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md-6">
                <label for="">State</label>
                <div class="position-relative" style="height: 40px">
                  <input :value="data.state" type="text" class="w-100 px-3 h-100" @input="changeAddress('state', $event)">
                </div>
              </div>
              <div class="form-group col-md-12">
                <label for="">Postal or zip code *</label>
                <ValidationProvider v-slot="{ errors }" name="zip code" rules="required">
                  <div class="position-relative col-md-6 pl-0 pr-0 pr-md-3" style="height: 40px">
                    <input :value="data.post_code" type="text" class="w-100 px-3 h-100" @input="changeAddress('post_code', $event)">
                  </div>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md-6">
                <label for="">Phone *</label>
                <ValidationProvider v-slot="{ errors }" name="Phone" rules="required">
                  <div class="position-relative" style="height: 40px">
                    <input :value="data.phone_no" type="text" class="w-100 px-3 h-100" @input="changeAddress('phone_no', $event)">
                  </div>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md-6">
                <label for="">Email *</label>
                <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                  <div class="position-relative" style="height: 40px">
                    <input :value="data.email" type="text" class="w-100 px-3 h-100" @input="changeAddress('email', $event)">
                  </div>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-group col-md-6 mt-3">
                <button class="btn w-100 bg-dark text-white" type="button" @click="saveAddress">
                  Save
                </button>
              </div>
              <div class="form-group col-md-6 mt-3">
                <button class="btn w-100 btn-outline-dark" type="button" @click="$emit('hideAddAdrress')">
                  Cancel
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
      formObserver: ''
    }
  },
  computed: {
    ...mapState({
      data: state => state.user.singleAddress,
      loggedinUser: state => state.user.loggedinUser
    })
  },
  created () {
    this.getCountries()
  },
  methods: {
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
          this.$toast.success(data.message, { duration: 3000 })
          this.resetAddressInput()
          this.$emit('addressSave')
        }).catch(() => {
          this.$toast.error('Something Went Wrong.', { duration: 3000, position: 'top-right' })
        })
      }
    },
    deleteAddress () {
      this.$axios.delete('/delete-address', { data: { address_id: this.data.id } }).then(({ data }) => {
        this.$toast.success(data.message, { duration: 3000 })
        this.resetAddressInput()
        this.$emit('addressSave')
      }).catch(() => {
        this.$toast.error('Something Went Wrong.', { duration: 3000, position: 'top-right' })
      })
    }
  }
}
</script>
