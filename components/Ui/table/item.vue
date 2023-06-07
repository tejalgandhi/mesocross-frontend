<template>
  <UiTableTemplatesNormal v-if="data.template === 'normal' || data.template === 'cancel'" :data="data" />
  <UiTableTemplatesDate v-else-if="data.template === 'date'" :data="data" />
  <UiTableTemplatesBoolean v-else-if="data.template === 'boolean'" :data="data" />
  <UiTableTemplatesPrice v-else-if="data.template === 'price'" :data="data" />
  <UiTableTemplatesClickable v-else-if="data.template === 'clickable'" :data="data" />
  <UiTableTemplatesIcon v-else-if="data.template === 'icon'" :data="data" />
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
.item {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // border-right: solid 1px $beige;
    user-select: none;
    cursor: pointer;
    text-align: center;

    &:last-of-type {
        border-right: unset;
    }
}
</style>
