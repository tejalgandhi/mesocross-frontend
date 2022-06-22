<template>
  <div>
    <Banner :page-name="page" />
    <div v-if="data" class="col-12">
      <div class="alter-info">
        <h2 class="title-40">
          {{ data.title }}
        </h2>
        <!-- eslint-disable vue/no-v-html -->
        <div v-html="data.content" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData ({ params, $axios }) {
    const { data } = await $axios.$get(`/get-page-content?page=${params.slug}&only_title_contetnt=1`)
    return { data, page: params.slug }
  }
}
</script>
