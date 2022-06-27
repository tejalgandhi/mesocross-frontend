<template>
  <div class="steps border">
    <div class="py-3 border-bottom">
      <h3 class="step-heading text-left px-3">
        Steps
      </h3>
    </div>
    <ul>
      <li
        v-for="(item, index) in steps"
        :key="index"
        :class="item.isActive ? 'active' : ''"
        class="p-3 text-left d-flex align-items-center step-box"
        @click="clickActive(index)"
      >
        <img src="@/assets/img/training-bg.webp" alt="image">
        <div class="ml-4">
          <h5 class="heading text-left mt-0">
            {{ item.title }}
          </h5>
          <p class="time px-2 py-1">
            {{ item.time }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    steps: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  }
}
</script>
