<template>
  <div class="col-lg-9">
    <div class="row">
      <div v-for="(document, index) in documents" :key="index" class="col-lg-4 mb-3">
        <div class="course_box">
          <div class="img_box">
            <nuxt-img :src="document.image" alt="image" />
          </div>
          <div class="content_box">
            <small style="font-weight: 500">{{ document.treatment_solution_name }}</small><br>
            <h2>{{ document.title }}</h2>
            <div>
              {{ document.description | documentContent }}...
            </div>
            <span>{{ $moment(document.created_at).format('D MMMM, YYYY') }}</span>
          </div>
          <!-- <a v-if="isLoggedin" href="javascript:void(0)" @click="downloadDocument(document.id)">Download</a> -->
          <a v-if="isLoggedin" :href="document.document" target="_blank">Download</a>
        </div>
      </div>
      <div v-if="paginate.meta && paginate.meta.last_page > paginate.meta.current_page" class="view_more">
        <a @click="viewMore">{{ $t('view_more') }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  filters: {
    documentContent (val) {
      return val.substring(0, 73)
    }
  },
  props: {
    documents: {
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
  data () {
    return {
      baseUrl: process.env.baseUrl
    }
  },
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
  },
  methods: {
    viewMore () {
      const nextPage = this.paginate.meta.current_page + 1
      this.$emit('fetchDocuments', nextPage)
    },
    downloadDocument (id) {
      const url = `${this.baseUrl}/documents/get-document?document_id=${id}`
      window.open(url)
      // this.$axios.$post('/documents/get-document', { document_id: id }).then((response) => {
      //   console.log('response', response)
      // const fileURL = window.URL.createObjectURL(new Blob([response.data]))
      // const fileLink = document.createElement('a')
      // fileLink.href = fileURL
      // fileLink.setAttribute('download')
      // document.body.appendChild(fileLink)
      // fileLink.click()
      // })
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
