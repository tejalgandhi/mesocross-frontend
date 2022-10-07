<template>
  <div class="item">
    <label>{{ $t(data.name) }}</label>
    <select v-model="value">
      <option :value="undefined" selected disabled>
        {{ $t('choose') }} {{ $t(data.name) }} {{ $t('here') }}
      </option>
      <template v-for="(option, i) in data.options">
        <option :key="i" :value="option.value">
          {{ option.name }}
        </option>
      </template>
    </select>

    <template v-if="value === ''">
      <div class="other">
        <UiDashboardInputs :data="data.other" @selected="handleSelected" />
      </div>
    </template>
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
      value: this.data.value || undefined
    }
  },

  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.$emit('selected', { name: this.data.tag, value: val })
      }

    }
  },

  methods: {
    handleSelected (data) {
      this.$emit('selected', data)
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
            border: 1px solid #E0E0E0;
            border: solid 1px #dde6ea;
            text-transform: capitalize;
        }

        .other {
            margin-top: 8px;
            padding-left: 32px;
            position: relative;

            &::before {
                position: absolute;
                left: 8px;
                bottom: 16px;
                content: '';
                height: 52px;
                width: 20px;
                border: solid 1px;
                border-color: transparent transparent #E0E0E0 #E0E0E0;
            }
        }
    }
</style>
