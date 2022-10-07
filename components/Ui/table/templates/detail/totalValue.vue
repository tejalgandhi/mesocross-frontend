<template>
  <div class="item" :class="{light}">
    <label>{{ data.label }}</label>
    <span>{{ data.data }}€</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    light: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style lang="scss" scoped>
    .item {
        width: 100%;
        display: flex;
        justify-content: space-between;

        &.light {
            span, label {
                font-weight: 400;
            }
        }

        span, label {
            font-weight: 600;
        }
    }
</style>
