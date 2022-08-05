<template>
  <div>
    <button
      class="bg-transparent d-flex align-items-center text-dark mr-3"
      @click="$bvModal.show('country-modal')"
    >
      USA
      <img
        src="../../assets/img/angel-down.svg"
        class="icon-down ml-2"
        alt="image"
      />
    </button>
    <b-modal
      id="country-modal"
      class="modal fade"
      dialog-class="lang-modal"
      tabindex="-1"
      aria-hidden="true"
      centered
      hide-footer
      hide-header
    >
      <template #default>
        <div class="">
          <div class="">
            <div class="">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" />
            </div>
            <div class="lang_box">
              <img src="@/assets/img/close.svg" alt="image" class="close" @click="hideModal()">
              <h3>{{ $t('select_your_country') }}</h3>
              <form action="">
                <p>
                   <span>{{ $t('country') }}</span>
                   <select v-model="vModelSetCountry" class="form-control mb-3">
                    <option value="">Select Country</option>
                    <!--<option value="" disabled>
                      {{ selectedLocaleName.name }}
                    </option>-->
                    <option v-for="country in countryList" :key="country.iso_code" :value="country.iso_code">
                      {{ country.label }}
                    </option>
                  </select>
                </p>
                <button class="btn btn-primary btn-block">
                  {{ $t('confirm') }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </template>

      <template #modal-footer="">
        <button>
          Confirm
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      vModelSetCountry: ''
    }
  },
  computed: {
    ...mapState({
      countryList: 'countries'
    })
  },
  methods: {
    hideModal () {
      this.$bvModal.hide('country-modal')
    }
  }
}
</script>

<style>
.icon-down {
  height: 15px !important;
  width: 15px !important;
}
</style>
