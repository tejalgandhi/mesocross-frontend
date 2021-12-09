<template>
  <div class="newsletter">
    <div class="banner-list py-5 my-5 d-flex align-items-center justify-content-center">
      <div class="row mx-0 align-items-center justify-content-center w-100">
        <div class="col-md-4 text-center text-white">
          HOW TO SHOP?
        </div>
        <div class="col-md-4 side-border text-center text-white">
          FAQs
        </div>
        <div class="col-md-4 text-center text-white">
          NEED HELP?
        </div>
      </div>
    </div>
    <h3>GET STARTED SHAKING THE WORLD OF BEAUTY!</h3>
    <button class="mb-4" @click="$bvModal.show('subscribeModal')">
      SUBSCRIBE TO OUR NEWSLETTER
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
          <img src="@/assets/img/close.svg" alt="" class="close" @click="hideModal()">
          <client-only>
            <div class="container">
              <div id="myTabContent" class="tab-content">
                <div id="login">
                  <p class="my-3">
                    Subscribe to our Newsletter and we will send you information about news and trends.
                  </p>
                  <ValidationObserver ref="formObserver">
                    <form @submit.prevent="subscribe">
                      <div class="form-group">
                        <label for="name">Name*</label>
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
                        <label for="surname">Surname*</label>
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
                        <label for="phone">Phone number*</label>
                        <ValidationProvider v-slot="{ errors }" name="phone" rules="required">
                          <input
                            id="phone"
                            v-model="form.phone"
                            type="text"
                            class="form-control"
                            aria-describedby="phoneHelp"
                          >
                          <small class="errors text-danger">{{ errors[0] }}</small>
                        </ValidationProvider>
                      </div>
                      <div class="form-group">
                        <label for="email">Email*</label>
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
                        <label for="selectcountry">Country*</label>
                        <ValidationProvider v-slot="{ errors }" name="Country" rules="required">
                          <select id="selectcountry" v-model="form.country_code" class="form-control">
                            <option v-for="country in countries" :key="country.iso_code" :value="country.iso_code">
                              {{ country.label }}
                            </option>
                          </select>
                          <span class="errors text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                      <div class="form-check">
                        <input id="exampleCheck1" v-model="terms" type="checkbox" class="form-check-input">
                        <label class="form-check-label" for="exampleCheck1">I was able to read and understand the information
                          on the use of my personal data explained in the Privacy Policy and agree to receive personalized
                          commercial communications from MCCM email and other means.</label>
                      </div>
                      <button type="submit" :disabled="!terms" class="btn btn-primary">
                        Subscribe
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
export default {
  data () {
    return {
      form: {
        name: '',
        surname: '',
        phone: '',
        email: '',
        country_code: '',
        country_name: ''
      },
      countries: [],
      terms: false
    }
  },
  async created () {
    await this.getCountries()
  },
  methods: {
    resetModal () {
      this.form = {
        name: '',
        surname: '',
        email: '',
        country_code: '',
        country_name: ''
      }
      this.terms = false
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
    hideModal () {
      this.$bvModal.hide('subscribeModal')
    },
    async subscribe () {
      try {
        if (await this.$refs.formObserver.validate()) {
          const selectedCountry = this.countries.filter(country => country.iso_code === this.form.country_code)
          this.form.country_name = selectedCountry[0].label
          const { data } = await this.$axios.post('subscribe/store', this.form)
          if (data.status === 422) {
            this.$toast.error(data.message, { duration: 5000 })
          } else if (data.status === true) {
            this.$toast.success(data.message, { duration: 3000 })
            this.$bvModal.hide('subscribeModal')
          } else {
            this.$toast.error('Something went wrong', { duration: 5000 })
          }
        }
      } catch (err) {

      }
    }
  }
}
</script>

<style scoped>
.errors {
  font-size: 12px !important;
}
#selectcountry{background-image: url('assets/img/drop-arrow.svg'); background-repeat: no-repeat; background-position: 96% center;}
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
