<template>
  <div class="item">
    <label v-if="data.label">{{ data.label }}</label>
    <span>{{ data.data }}</span>
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
