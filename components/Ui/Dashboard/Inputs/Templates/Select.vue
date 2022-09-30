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
            text-transform: capitalize;
            background: black;
            color: white;
        }
    }
</style>
