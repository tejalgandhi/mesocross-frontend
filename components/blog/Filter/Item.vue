<template>
  <div class="item control control--checkbox">
    <input v-model="isChecked" type="checkbox">
    <span class="control__indicator" @click="handleInput" />
    <span>{{ item.name }} ({{ item.total }})</span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: false,
      default: () => {}
    },
    allChecked: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data () {
    return {
      isChecked: this.allChecked.includes(this.item.month)
    }
  },

  watch: {
    allChecked (val) {
      this.isChecked = val.includes(this.item.month)
    }
  },

  methods: {
    handleInput () {
      this.isChecked = !this.isChecked
      this.$emit('check', [this.isChecked, this.item.month])
    }
  }
}
</script>
