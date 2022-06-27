<template>
  <div class="col-lg-9">
    <div class="row">
      <div v-for="(product, index) in blogs" :key="index" class="col-lg-4 mb-3">
        <nuxt-link :to="`/blog-detail/${product.slug}`">
          <div class="course_box">
            <div class="img_box">
              <img :src="product.image" alt="image">
            </div>
            <div class="content_box">
              <small>{{ product.treatment_solution_name }}</small><br>
              <h2>{{ product.title }}</h2>
              <!-- <div :inner-html.prop="product.content | blogContent" /> -->
              <span>{{ $moment(product.created_at).format('MMMM D, YYYY') }}</span>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div v-if="paginate.meta && paginate.meta.last_page > paginate.meta.current_page" class="view_more">
        <a @click="viewMore">{{ $t('view_more') }}</a>
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
    blogs: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    paginate: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  methods: {
    viewMore () {
      const nextPage = this.paginate.meta.current_page + 1
      this.$emit('fetchBlogs', nextPage)
    }
  }
}
</script>

<style scoped>
.content_box span {
    color: #54565A;
    font-size: 14px;
}
.content_box p{
  font-size: 16px !important;
  font-weight: normal;
}
.course_box .content_box h2{font-size: 24px;}
</style>
