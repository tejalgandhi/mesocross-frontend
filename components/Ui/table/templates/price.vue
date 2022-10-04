<template>
  <div class="item">
    <span>{{ data.data }}€</span>
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
