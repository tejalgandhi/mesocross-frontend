<template>
  <section class="alternative-item bg-white">
    <div class="container">
      <div :class="{'row al-child align-items-center': position== 'left', 'row flex-row-reverse align-items-center': position== 'right'}">
        <div class="col-12">
          <img class="alternative-bild d-table ml-auto" :class="{'mr-auto': position== 'left'}" :src="data.media" alt="image">
        </div>
        <div class="col-12">
          <div class="alter-info">
            <h2 class="title-40">
              {{ data.title }}
            </h2>
            <!-- eslint-disable vue/no-v-html -->
            <div v-html="data.content" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'TextImageContainer',
  // eslint-disable-next-line vue/require-prop-types
  props: {
    position: { // This prop is for image position
      type: String,
      default: 'right'
    },
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
