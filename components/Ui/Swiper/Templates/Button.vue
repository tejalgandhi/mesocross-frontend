<template>
  <article id="swipe-item" @click="$emit('buttonClick')">
    <span :class="{active}">
      {{ data.name }}
    </span>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    },
    active: {
      type: Number,
      required: false,
      default: () => 0
    }
  }
}
</script>

<style lang="scss" scoped>
    article {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        span {
            white-space: nowrap;
            min-width: 10rem;
            padding: 0.5rem 1rem;
            border:solid 1px #28252a;
            background: #fff;
            color: #28252a;
            border-radius: 4px;
            transition: 0.2s;
            border: 1px solid #28252a;

            &:hover {
                background: #28252acc;
                color: white;
            }

            &.active {
                background: #28252a;
                color: white;
            }
        }
    }
</style>
