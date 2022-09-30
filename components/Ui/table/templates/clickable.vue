<template>
  <div class="item">
    <span @click="goToItem">{{ data.data }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    goToItem () {
      window.open(this.data.link, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
    span {
        color: black;
        text-decoration: underline;
    }
</style>
