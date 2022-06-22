<template>
  <main>
    <section ref="swipe" :class="{dragging: isDragging, 'small-gap': template === 'button'}" @mousedown="setInitDrag" @scroll="handleScroll">
      <template v-for="(item, i) in data">
        <UiSwiperTemplatesImage v-if="template === 'image'" :key="i" :data="item" />
        <UiSwiperTemplatesButton v-else-if="template === 'button'" :key="i" :active="active === i" :data="item" @buttonClick="$emit('buttonClick', i)" />
      </template>
    </section>
    <div class="scrolls">
      <template v-for="i in Math.ceil(scrolls)">
        <span :key="i" :class="{active: isActive === i}" @click="isActive = i" />
      </template>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: false,
      default: () => []
    },
    template: {
      type: String,
      required: false,
      default: () => 'image'
    },
    active: {
      type: Number,
      required: false,
      default: () => 0
    }
  },

  data () {
    return {
      scrolls: 1,
      isDragging: false,
      isActive: 1,
      initDrag: 0
    }
  },

  watch: {
    isActive (newVal, prevVal) {
      this.scrollTo(newVal > prevVal)
    }
  },

  mounted () {
    this.getItemsInView()

    window.addEventListener('mouseup', this.handleFinishDrag)
    window.addEventListener('touchend', this.handleFinishDrag)
    this.$refs.swipe.addEventListener('touchstart', this.setInitDrag)

    window.addEventListener('resize', this.getItemsInView)
  },

  methods: {
    getItemsInView () {
      this.scrolls = this.$refs.swipe.scrollWidth / this.$refs.swipe.clientWidth
    },

    setInitDrag (e) {
      this.isDragging = true
      this.initDrag = e.clientX ? e.clientX : e.changedTouches[0].clientX
    },

    handleFinishDrag (e) {
      if (this.initDrag) {
        this.isDragging = false
        const x = e.clientX ? e.clientX : e.changedTouches[0].clientX
        if (x - this.initDrag < -10 && this.isActive < Math.ceil(this.scrolls)) { this.isActive += 1 } else if (x - this.initDrag > 10 && this.isActive > 1) { this.isActive -= 1 } else if (x - this.initDrag < -10 && this.isActive === Math.ceil(this.scrolls)) { this.isActive = 1 } else if (x - this.initDrag > 10) { this.isActive = Math.ceil(this.scrolls) }
        this.initDrag = 0
      }
    },

    handleScroll (e) {
      e.preventDefault()
    },

    scrollTo (forward) {
      const item = this.$refs.swipe
      if (this.isActive === 1) { item.scrollLeft = 0 } else if (this.isActive === Math.ceil(this.scrolls)) { item.scrollLeft = item.scrollWidth } else if (forward) {
        item.scrollLeft = item.clientWidth * (this.isActive - 1)
      } else { item.scrollLeft -= item.clientWidth }
    }
  }
}
</script>

<style lang="scss" scoped>
main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    section {
        max-width: 100%;
        display: flex;
        gap: 7.5rem;
        cursor: pointer;
        overflow: auto;
        scroll-behavior: smooth;
        user-select: none;

        @media screen and (max-width: 768px){
            width: 90%;
            gap: 6rem;
        }

        &.dragging {
            cursor: grabbing;
        }
        &.small-gap {
            gap: 2.5rem;
        }

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .scrolls {
        display: flex;
        justify-content: center;
        gap: 0.5rem;

        span {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: solid 1px black;
            cursor: pointer;
            user-select: none;

            &.active {
                background: black;
            }
        }
    }
}

</style>
