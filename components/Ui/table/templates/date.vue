<template>
  <div class="item">
    <span>{{ localeDate }}</span>
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

  computed: {
    localeDate () {
      const date = new Date(this.data.data)
      return date.toLocaleString(this.$i18n.locale, { day: 'numeric', month: 'long', year: 'numeric' })
    }
  }
}
</script>
