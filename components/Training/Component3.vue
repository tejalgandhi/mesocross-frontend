<template>
  <div class="row my-5 py-5 diff-bg">
    <div class="col-md-7 mx-auto text-center text-content align-self-center">
      <div class="text-left">
        <h2>{{ data.title }}</h2>
        <!-- eslint-disable vue/no-v-html -->
        <div v-html="data.content" />
      </div>
    </div>
    <div class="col-md-5 text-left">
      <img :src="data.media" class="img-fluid box-image" alt="image">
    </div>
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
