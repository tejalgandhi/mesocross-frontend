<template>
  <div class="search">
    <div class="container">
      <div class="search_bar">
        <input v-model="searchStr" type="text" @input="search">
        <a href="javascript:void(0)" @click="setSearch"><img src="@/assets/img/close.svg"></a>
      </div>
    </div>
    <div class="search_tabs">
      <div class="container">
        <b-tabs v-model="tabIndex" content-class="nav nav-tabs" @input="searchStr = ''">
          <b-tab title="Products" active>
            <div class="container">
              <div v-if="products.length > 0" class="results">
                Showing all {{ products.length }} results
              </div>
              <div class="row">
                <ProductSingle v-for="(product, index) in products" :key="index" :product="product" :class-name="'col-lg-3'" />
                <div v-if="products.length == 0">
                  Search Prodcuts
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab title="Blog">
            <div class="container">
              <div v-if="searchData.length > 0" class="results">
                Showing all {{ searchData.length }} results
              </div>
              <div class="row">
                <BlogSingle v-for="(blog, index) in searchData" :key="index" :blog="blog" :class-name="'col-lg-3'" />
                <div v-if="searchData.length == 0">
                  Search Blogs
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab>
            Trainings
          </b-tab>
          <b-tab title="Exhibitions & Events">
            Exhibitions & Events
          </b-tab>
          <b-tab title="Documents">
            Documents
          </b-tab>
        </b-tabs>
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
      searchData: []
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
      }, 500)
    },
    async fetchProducts () {
      const url = `/products?page=${this.page}&search=${this.searchStr}`
      const { data } = await this.$axios.$get(url)
      this.products = data
    },
    async fetchBlogs () {
      const url = `/blogs?page=${this.page}&search=${this.searchStr}`
      const { data } = await this.$axios.$get(url)
      this.searchData = data.blogs
    }
  }
}
</script>
