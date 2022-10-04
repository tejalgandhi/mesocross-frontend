<template>
  <div class="item">
    <label>{{ $t(data.name) }}</label>
    <select v-model="value">
      <option :value="undefined" selected disabled>
        {{ $t('choose') }} {{ $t(data.name) }} {{ $t('here') }}
      </option>
      <template v-for="(option, i) in countries">
        <option :key="i" :value="option.iso_code">
          {{ option.label }}
        </option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      value: undefined,
      countries: []
    }
  },

  watch: {
    value: {
      handler (val) {
        const country = this.countries.filter(el => el.iso_code === val)
        if (!country.length) { return }

        this.$emit('selected', {
          name: this.data.tag,
          value: {
            country_code: val,
            country: country[0].label
          }
        })
      }
    }
  },

  created () {
    this.getData()
  },

  methods: {
    async getData () {
      const response = await this.$axios.$get('/countries')
      if (response.code !== 200) {
        return
      }
      this.countries = response.countries
      this.value = this.data.value || undefined
    }
  }
}
</script>

<style lang="scss" scoped>
    .item {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        label {
            font-weight: 500;
            text-transform: capitalize;
        }

        select {
            font-weight: 400;
            padding: 8px 12px;
            border-radius: 2px;
            text-transform: capitalize;
            border: solid 1px #dde6ea;
            background: black;
            color: white;
        }
    }
</style>
