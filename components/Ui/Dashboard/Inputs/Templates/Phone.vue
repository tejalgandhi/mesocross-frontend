<template>
  <div class="item">
    <label>{{ $t(data.name) }}</label>
    <div class="input">
      <vue-country-code
        :dropdown-options="{
          enabledCountryCode:true,
          disabledDialCode: false
        }"
        :disabled-fetching-country="false"
        :enabled-country-code="true"
        :preferred-countries="topCountries"
        :enable-search-field="true"
        @onSelect="onSelect"
      />
      <input v-model="value.phone_no" :type="data.type" :placeholder="`${$t('insert')} ${$t(data.name)} ${$t('here')}`">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      value: {
        phone_no: this.data.value || undefined,
        iso_alpha2: this.data.iso_alpha2 || undefined,
        dial_code: this.data.dial_code || undefined
      },
      topCountries: ['pt', 'es', 'gb', 'us']
    }
  },

  computed: {
    ...mapState({
      countries: state => state.countries,
      loggedinUser: state => state.user.loggedinUser
    })
  },

  watch: {
    value: {
      deep: true,
      immediate: true,
      handler (val) {
        this.$emit('selected', { name: this.data.tag, value: val })
      }
    }
  },

  mounted () {
    this.topCountries.sort((x, y) => { return x === this.data.iso_alpha2?.toLowerCase() ? -1 : y === this.data.iso_alpha2?.toLowerCase() ? 1 : 0 })
  },

  methods: {
    onSelect (val) {
      if (this.value.dial_code !== val.dialCode) {
        this.value.dial_code = val.dialCode
        this.value.iso_alpha2 = val.iso2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .item {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        .input {
            display: flex;
            .vue-country-select {
                border: 1px solid #dde6ea;
                border-radius: 2px;
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
            }

            label {
                font-weight: 500;
                text-transform: capitalize;
            }

            input {
                border-left: none;
                font-weight: 400;
                padding: 8px 12px;
                border: solid 1px #dde6ea;
                border-radius: 2px;
            }
        }

    }
</style>
