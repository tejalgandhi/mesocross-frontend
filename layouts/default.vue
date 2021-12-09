<template>
  <div>
    <ThemeHeader />
    <CommonSearch v-show="search" style="padding-top: 80px" @click="isClicked(false)" />
    <div v-show="!search" class="mccm-content" @click="isClicked(false)">
      <Nuxt />
    </div>
    <ThemeFooter />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      search: state => state.search
    })
  },
  methods: {
    ...mapActions({
      isClicked: 'isClicked'
    })
  }
}
</script>

<style lang="scss">
@import "./assets/css/common.scss";
</style>
