<template>
  <div>
    <div v-if="data.content" class="col-12">
      <div class="alter-info">
        <h2 class="title-40">
          {{ data.title }}
        </h2>
        <!-- eslint-disable vue/no-v-html -->
        <div v-html="data.content" />
      </div>
    </div>
    <div v-else>
      <h1>No Content</h1>
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
    }
  }
}
</script>
