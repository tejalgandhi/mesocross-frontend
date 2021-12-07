<template>
  <div v-show="blogs.length > 0" class="home_category">
    <div class="container-fluid">
      <div v-for="(item, index) in blogs" :key="index" class="box">
        <div v-show="index % 2 == 1" class="row align-middle mx-0">
          <div class="col-lg-6 d-flex align-items-center justify-content-center">
            <img :src="item.image" alt="">
          </div>
          <!-- eslint-disable vue/no-v-html -->
          <div class="col-lg-6 align-items-center d-flex justify-content-center">
            <div class="desc px-0">
              <h3>{{ item.title }}</h3>
              <LinkSetByType :item="item" />
            </div>
          </div>
        </div>

        <div v-show="index % 2 == 0" class="row align-middle mx-0">
          <div class="col-lg-6 second align-items-center d-flex justify-content-center">
            <div class="desc px-0">
              <h3>{{ item.title }}</h3>
              <LinkSetByType :item="item" />
            </div>
          </div>
          <div class="col-lg-6 first d-flex align-items-center justify-content-center">
            <img :src="item.image" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LinkSetByType from './LinkSetByType.vue'
export default {
  components: { LinkSetByType },
  data () {
    return {
      blogs: []
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('/home/blogs')
      this.blogs = data.data
    } catch (e) {

    }
  },
  fetchOnServer: true
}
</script>

<style scoped>
.home_category .box img {
  width: 400px !important;
}
</style>
