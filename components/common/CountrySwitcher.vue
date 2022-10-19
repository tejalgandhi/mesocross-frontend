<template>
  <div>
    <button
      class="bg-transparent d-flex align-items-center text-dark mr-3"
      :class="{large}"
      @click="$bvModal.show('country-modal')"
    >
      {{ country || 'USA' }}
      <img
        src="../../assets/img/angel-down.svg"
        class="icon-down ml-2"
        alt="image"
      >
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
              <form @submit.prevent="setCountry">
                <p>
                  <span>{{ $t('country') }}</span>
                  <select v-model="vModelSetCountry" class="form-control mb-3">
                    <option value="">
                      Select Country
                    </option>
                    <option v-for="cntry in countryList" :key="cntry.iso_code" :value="cntry.iso_code">
                      {{ cntry.label }}
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
          {{ $t('confirm') }}
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    country: {
      type: String,
      default: () => ''
    },
    large: {
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      vModelSetCountry: this.country
    }
  },

  computed: {
    ...mapState({
      countryList: 'countries'
    })
  },

  watch: {
    country (val) {
      this.vModelSetCountry = val
    }
  },

  methods: {
    hideModal () {
      this.$bvModal.hide('country-modal')
    },

    setCountry () {
      localStorage.country = this.vModelSetCountry
      this.$nuxt.$emit('newCountry', this.vModelSetCountry)
      this.hideModal()
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

<style lang="scss" scoped>
    select, option {
        text-transform: uppercase;
    }

    button {
        &.large {
            margin: 0 !important;
            width: 100%;
            justify-content: space-between;
            border: solid 1px white;
            padding: 5px 10px;
        }
    }
</style>
