<template>
  <div class="search">
    <div class="container">
      <div class="search_bar">
        <input v-model="searchStr" type="text" placeholder="Write to search..." @input="search">
        <a href="javascript:void(0)" @click="setSearch"><img src="@/assets/img/close.svg"></a>
      </div>
    </div>
    <div class="search_tabs">
      <div class="container">
        <div v-if="products.length > 0" class="results">
          {{ $t('showing_all') }} {{ products.length }} {{ $t('results') }}
        </div>
        <div class="row">
          <ProductSingle v-for="(product, index) in products" :key="index" :product="product" :class-name="'col-lg-4 col-md-6'" />
          <div class="col-12" v-if="products.length == 0">
            {{ $t('search_prodcuts') }}
          </div>
        </div>
        <!-- <b-tabs v-model="tabIndex" content-class="nav nav-tabs" @input="searchStr = ''">
          <b-tab :title="$t('Products')" active>

          </b-tab>
          <b-tab :title="$t('Blog')">
            <div class="container">
              <div v-if="searchData.length > 0" class="results">
                {{ $t('showing_all') }} {{ searchData.length }} {{ $t('results') }}
              </div>
              <div class="row">
                <BlogSingle v-for="(blog, index) in searchData" :key="index" :blog="blog" :class-name="'col-lg-3'" />
                <div v-if="searchData.length == 0">
                  {{ $t('search_blogs') }}
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab :title="$t('trainings')">
            <div class="container">
              <div v-if="trainingData.length > 0" class="results">
                {{ $t('showing_all') }} {{ trainingData.length }} {{ $t('results') }}
              </div>
              <div class="row">
                <TrainingSingle v-for="(single, index) in trainingData" :key="index" :single="single" :class-name="'col-lg-3'" />
                <div v-if="trainingData.length == 0">
                  {{ $t('search_training') }}
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab :title="$t('exhibitions_and_events')">
            {{ $t('exhibitions_and_events') }}
          </b-tab>
          <b-tab :title="$t('documents')">
            <div class="container">
              <div v-if="searchData.length > 0" class="results">
                {{ $t('showing_all') }} {{ searchData.length }} {{ $t('results') }}
              </div>
              <div class="row">
                <DocumentSingle v-for="(single, index) in documentData" :key="index" :single="single" :class-name="'col-lg-3'" />
                <div v-if="documentData.length == 0">
                  {{ $t('search_document') }}
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      tabIndex: 0,
      timeOut: '',
      searchStr: '',
      page: 1,
      products: [],
      searchData: [],
      documentData: [],
      trainingData: []
    }
  },
  methods: {
    ...mapActions({
      setSearch: 'setSearch'
    }),
    search () {
      if (this.timeOut) {
        clearTimeout(this.timeOut)
      }
      this.timeOut = setTimeout(() => {
        if (this.tabIndex === 0) { // FETCH PRODCUTS
          this.fetchProducts()
        }

        if (this.tabIndex === 1) { // FETCH Blogs
          this.fetchBlogs()
        }

        if (this.tabIndex === 4) { // FETCH Document
          this.fetchDocuments()
        }

        if (this.tabIndex === 2) { // FETCH Training
          this.fetchTrainings()
        }
      }, 500)
    },
    async fetchProducts () {
      const url = `/products?page=${this.page}&search=${this.searchStr}`
      const { data } = await this.$axios.$get(url)
      this.products = data
    },
    async fetchBlogs () {
      const url = `/blogs?page=${this.page}&search=${this.searchStr}`
      const { data } = await this.$axios.$post(url)
      this.searchData = data
    },
    async fetchDocuments () {
      const url = `/documents?page=${this.page}&search=${this.searchStr}`
      const { data } = await this.$axios.$get(url)
      this.documentData = data
    },
    async fetchTrainings () {
      const { data } = await this.$axios.get(`training-with-page?page=${this.page}&per_page=4&order_by=id&search=${this.searchStr}`)
      this.trainingData = data.data
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
