<template>
  <div>
    <video controls preload="auto" src="https://mesosystem-backend.test/api/training/media?slug=first-training-video" width="100%" />'
  </div>
</template>
<script>
export default {
  data () {
    return {
      flag: true,
      option: {
        url: 'https://artplayer.org/assets/sample/video.mp4'
        // poster: '/assets/img/CG-EN-MESOCROSS-2020-23.webp'
      },
      style: {
        width: '1400px',
        height: '700px',
        margin: '60px auto 0'
      }
    }
  },
  methods: {
    getInstance (art) {
    },
    useral (flag) {
      this.$refs.videoPlayer.currentTime = 50
      if (flag === true) {
        this.$refs.videoPlayer.pause()
        this.flag = false
      } else {
        this.$refs.videoPlayer.play()
        this.flag = true
      }
    }
  }
}
</script>
<style scoped>
.sign-in {
  background-color: #25282A;
}
</style>
