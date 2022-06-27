const isMobile = {
  data () {
    return {
      screenWidth: undefined
    }
  },

  mounted () {
    window.addEventListener('resize', this.onScreenResize)
    this.onScreenResize()
  },

  beforeUnmount () {
    window.removeEventListener('resize', this.onScreenResize)
  },

  methods: {
    onScreenResize () {
      this.screenWidth = window.innerWidth
    },

    isMobile () {
      return this.screenWidth <= 1250
    }
  }
}

export default isMobile
