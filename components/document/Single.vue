<template>
  <div :class="className">
    <div class="course_box">
      <div class="img_box">
        <img :src="single.image" alt="image">
      </div>

      <div class="content_box">
        <span>{{ single.title }}</span>
        <div> {{ single.description | singleContent }} </div>
        <small>{{ $moment(single.created_at).format('D MMM YYYY') }}</small><br>
        <a v-if="$auth.loggedIn" :href="single.document" target="_blank">Download</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  filters: {
    singleContent (content) {
      return `${content.substring(0, 73)}...`
    }
  },
  props: {
    className: {
      type: String,
      default: 'col-lg-3'
    },
    single: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
  },
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
  },
  methods: {
    blogDetail (slug) {
      this.$router.push(`blog-detail/${slug}`)
    }
  }

}
</script>

<style scoped>
.content_box span {
    color: #54565A;
    font-size: 14px;
}
</style>
