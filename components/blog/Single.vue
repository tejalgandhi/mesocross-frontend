<template>
  <div :class="className">
    <div class="course_box">
      <div class="img_box">
        <img :src="blog.image" alt="">
      </div>

      <div class="content_box">
        <span>{{ blog.title }}</span>
        <p /><div v-html="blog.content" /></p>
        <small>{{ $moment(blog.created_at).format('D MMM YYYY') }}</small><br>
        <nuxt-link :to="`blog-detail/${blog.slug}`">
          Read Now
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
  }

}
</script>

<style>

</style>
