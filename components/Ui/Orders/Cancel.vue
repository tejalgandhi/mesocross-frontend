<template>
    <span>cancel #{{ String(data.id).padStart(5, '0') }}</span>
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
    position: fixed;
    width: 100%;
    height: 100%;
    color: red;
}
</style>
