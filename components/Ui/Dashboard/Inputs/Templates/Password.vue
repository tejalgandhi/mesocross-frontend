<template>
  <div class="item" :class="{disabled: data.disabled}">
    <label>{{ $t(data.name) }}</label>
    <input v-model="value" :type="data.type" :placeholder="`${$t('insert')} ${$t(data.name)} ${$t('here')}`" :disabled="data.disabled">
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
    value (val) {
      this.$emit('selected', { name: this.data.tag, value: val })
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

        input {
            font-weight: 400;
            padding: 8px 12px;
            border-radius: 2px;
            border: solid 1px #dde6ea;
        }
    }
</style>
