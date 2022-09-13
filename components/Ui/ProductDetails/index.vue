<template>
  <div class="container">
    <div class="dots">
      <span :class="{active: isActive === 0}" @click="isActive = 0" />
      <span :class="{active: isActive === 1}" @click="isActive = 1" />
    </div>
    <div ref="details" class="details">
      <UiProductDetailsMain :data="data" :style="{transform: `translateY(${ isActive === 0 ? 0 : `-100`}%`}" />
      <UiProductDetailsExtras :data="data" :style="{transform: `translateY(${ isActive === 1 ? 0 : `100`}%`}" />
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
  },

  data () {
    return {
      isActive: 0,
      previousScroll: 0
    }
  },

  watch: {
    isActive (val) {
      this.$emit('hoverImage', Boolean(val))
    }
  },

  mounted () {
    this.$refs.details.addEventListener('wheel', this.handleScroll)
  },

  methods: {
    handleScroll (e) {
      if (e.deltaY > 0 && !this.isActive) {
        e.preventDefault()
        this.isActive = 1
      } else if (e.deltaY < 0 && this.isActive) {
        e.preventDefault()
        this.isActive = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;

    .details {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;

    }
    .dots {
        position: absolute;
        left: -32px;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        span {
            width: 8px;
            height: 8px;
            border: solid 1px #E2C8B8;
            transform: rotate(45deg);
            transition: 0.2s;
            cursor: pointer;

            &.active {
                background: #E2C8B8;
            }
        }
    }
}

</style>
