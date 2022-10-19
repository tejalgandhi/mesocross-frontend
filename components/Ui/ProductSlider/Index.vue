<template>
  <div class="slider-container">
    <div ref="slider" class="slider" @mousedown="handleMouseDown" @mouseover="sliderHover = true" @mouseleave="sliderHover = false">
      <template v-for="(block, index) in filteredData">
        <div :key="index" class="block" :style="{transform: `translateX(${ index === isActive ? 0 : index < isActive ? 100 * (index - isActive) : 100 * (index - isActive)}%)`}">
          <template v-for="(item, i) in block">
            <UiProductSliderItem :key="i" :data="item" :style="{width: `${100 / perSlide}%`}" />
          </template>
        </div>
      </template>
    </div>
    <div class="dots">
      <template v-for="(block, i) in filteredData">
        <span :key="i" :class="{active: isActive === i}" @click="isActive = i" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    settings: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      perSlide: 0,
      filteredData: [],
      isActive: 0,
      currentBreak: undefined,
      initPosition: undefined,
      initY: undefined
    }
  },

  mounted () {
    this.getItemsToShow()
    window.addEventListener('resize', this.getItemsToShow)
    this.$refs.slider.addEventListener('touchstart', this.handleMouseDown)
    this.$refs.slider.addEventListener('touchmove', this.handleScroll)
    window.addEventListener('touchend', this.handleMouseUp)
    window.addEventListener('mouseup', this.handleMouseUp)
  },

  beforeUnmount () {
    window.removeEventListener('resize', this.getItemsToShow)
    window.removeEventListener('mouseup', this.handleMouseUp)
    window.removeEventListener('touchend', this.handleMouseUp)
    this.$refs.slider.removeEventListener('touchmove', this.handleScroll)
    this.$refs.slider.removeEventListener('touchstart', this.handleMouseDown)
  },

  methods: {
    getItemsToShow () {
      const width = window.innerWidth
      const responsive = this.settings.responsive.find((el, i) => el.breakpoint > width && !(this.settings.responsive[i + 1]?.breakpoint > width))

      if (responsive && responsive.breakpoint === this.currentBreak) {
        return
      }

      if (!responsive) {
        this.perSlide = this.settings.itemsPerSlide
        const old = this.filteredData.length
        this.separateItems()
        const value = (this.filteredData.length * (this.isActive + 1)) / old
        this.isActive = value < 0 ? 0 : !old ? 0 : value > this.filteredData.length - 1 ? this.filteredData.length - 1 : Math.ceil(value) - 1
        this.currentBreak = undefined
        return
      }

      this.perSlide = responsive.settings.itemsPerSlide
      const old = this.filteredData.length
      this.separateItems()
      const value = (this.filteredData.length * (this.isActive + 1)) / old
      this.isActive = value < 0 ? 0 : !old ? 0 : value > this.filteredData.length - 1 ? this.filteredData.length - 1 : Math.ceil(value) - 1

      this.currentBreak = responsive.breakpoint
    },

    separateItems () {
      const chunks = []
      const items = [].concat(...this.data)

      while (items.length) {
        chunks.push(
          items.splice(0, this.perSlide)
        )
      }

      this.filteredData = chunks
    },

    handleMouseDown (e) {
      this.initPosition = e.clientX ? e.clientX : e.changedTouches[0].clientX
      this.initY = e.clientY ? e.clientY : e.changedTouches[0].clientY
    },

    handleScroll (e) {
      e.preventDefault()
    },

    handleMouseUp (e) {
      if (!this.initPosition) {
        return
      }

      const touch = e.clientX ? e.clientX : e.changedTouches[0].clientX
      const diff = touch - this.initPosition
      const length = this.filteredData.length - 1
      const Y = e.clientY ? e.clientY : e.changedTouches[0].clientY

      if (diff > -50 && diff < 50) {
        const yDiff = Y - this.initY
        window.scroll({
          top: window.scrollY - yDiff
        })
        return
      }

      this.initPosition = undefined

      if (diff > -50 && this.isActive > 0) {
        this.isActive -= 1
        return
      }

      if (diff > -50 && this.isActive === 0) {
        this.isActive = length
        return
      }

      if (diff < 50 && this.isActive < length) {
        this.isActive += 1
        return
      }

      if (diff < 50 && this.isActive === length) {
        this.isActive = 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-container {
    width: 100%;
    height: 550px;
    position: relative;
    display: flex;
    justify-content: center;
    margin: 0;
    margin-bottom: 48px;
    padding: 0;

    .slider {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
        user-select: none;

        .block {
            width: 100%;
            display: flex;
            justify-content: center;
            gap: 1rem;
            position: absolute;
            transition: 0.4s;
        }
    }

    .dots {
        position: absolute;
        bottom: -20px;
        display: flex;
        gap: 0.5rem;
        span {
            width: 8px;
            height: 8px;
            border: solid 1px #E2C8B8;
            transform: rotate(45deg);
            transition: 0.4s;
            cursor: pointer;

            &.active {
                background: #E2C8B8;
            }
        }
    }
}
</style>
