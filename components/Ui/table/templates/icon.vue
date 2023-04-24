<template>
  <div class="item">
    <nuxt-img :src="data.data" :alt="data.name" />
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
    img {
        width: 20px;
        height: 20px;
        object-fit: contain;
    }
</style>
