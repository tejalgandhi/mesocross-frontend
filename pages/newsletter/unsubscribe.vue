<template>
  <div class="under_construction">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <nuxt-link to="/">
            Go to homepage
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      filters: []
    }
  },
  mounted () {
    this.unSubscribe()
  },
  methods: {
    async unSubscribe () {
      try {
        const data = await this.$axios.$post('newsletter/unsubscribe', { token: this.$route.query.token })
        this.$toast.success(data.message, { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
      } catch (err) {
        this.$router.push('/')
      }
    }
  }
}
</script>
