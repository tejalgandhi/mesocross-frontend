<template>
  <a @click="Logout">Logout</a>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      setLoggedin: 'user/setLoggedin',
      setLoggedinUser: 'user/setLoggedinUser'
    }),
    async Logout () {
      this.setLoggedin(false)
      this.setLoggedinUser({})
      await this.$auth.logout()
    }
  }
}
</script>

<style>

</style>
