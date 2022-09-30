<template>
  <div class="item">
    <span v-if="data.data">{{ $t('order.success') }}</span>
    <span v-else :class="{pending: !data.data}">{{ $t('order.pending') }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
    span {
        color: black;

        &.pending {
            color: red;
        }
    }
</style>
