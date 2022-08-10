<template>
  <div class="search text-light">
    <div class="search_bar ">
      <div class="input-group mb-3">
        <span id="basic-addon1" class="input-group-text bg-transparent pl-0 pr-3">
          <b-icon-search class="text-light mt-2" scale="1.25" />
        </span>
        <input v-model="searchStr" class="form-control" type="text" placeholder="Write to search..." @input="search">
        <a href="javascript:void(0)" class="filter-invert" @click="setSearch"><img width="18" src="@/assets/img/close.svg"></a>
      </div>
    </div>
    <div v-if="products.length > 0" class="search_tabs">
      <h4 class="font-weight-normal my-4">
        FEATURED PRODUCTS
      </h4>
      <ProductSidebarSingle
        v-for="(product, index) in products"
        :key="index"
        class="my-4 list-border"
        :product="product"
      />
      <b-button variant="default text-light px-0" to="/products">
        SEE ALL PRODUCTS <b-icon-chevron-right scale=".75" />
      </b-button>
      <h4 class="font-weight-normal my-4">
        SUGGESTIONS
      </h4>
      <div class="d-flex flex-wrap catlinks">
        <b-button class="mr-3 p-1 px-0" variant="default text-light">
          SKIN ESSENCE
        </b-button>
        <b-button class="mr-3 p-1 px-0" variant="default text-light">
          EPICROSS
        </b-button>
        <b-button class="mr-3 p-1 px-0" variant="default text-light">
          KING
        </b-button>
        <b-button class="mr-3 p-1 px-0" variant="default text-light">
          QUEEN
        </b-button>
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
.list-border{
  border-bottom: 1px solid #b1b1b1;
}
.content_box span {
    color: #54565A;
    font-size: 14px;
}
.catlinks .btn{
  text-decoration: underline !important;
}
</style>
