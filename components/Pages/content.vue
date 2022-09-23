<template>
  <div>
    <div v-if="data.content" class="col-12">
      <div class="alter-info">
        <div class="h1 title-34">
          {{ data.title }}
        </div>
        <!-- eslint-disable vue/no-v-html -->
        <div v-html="data.content" />
      </div>
    </div>
    <div v-else class="col-12">
      <div class="alter-info">
        <div class="h1 title-34">
          {{ tempTitle }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PagesContent',
  // eslint-disable-next-line vue/require-prop-types
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    tempTitle: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style lang="scss" scoped>
    .title-34 {
        text-transform: capitalize;
    }
</style>
