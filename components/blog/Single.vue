<template>
  <div :class="className">
    <div class="course_box">
      <div class="img_box">
        <img :src="blog.image" alt="image">
      </div>

      <div class="content_box">
        <span>{{ blog.title }}</span>
        <div :inner-html.prop="blog.content | blogContent" />
        <small>{{ $moment(blog.created_at).format('D MMM YYYY') }}</small><br>
        <a @click="blogDetail(blog.slug)">
          {{ $t('read_now') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    blogContent (content) {
      return `${content.substring(0, 100)}...`
    }
  },
  props: {
    className: {
      type: String,
      default: 'col-lg-3'
    },
    blog: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    }
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
