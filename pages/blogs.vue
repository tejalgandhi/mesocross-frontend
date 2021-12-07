<template>
  <div class="product-page">
    <div class="banner">
      <div class="container">
        <img src="@/assets/img/banner2.png" alt="">
        <div class="content">
          <h1>Blog</h1>
          <p>MCCM medical cosmetics professional solutions for acne and seborrheic prone skin</p>
        </div>
      </div>
    </div>
    <Bredcrumb :items="breadcrumbs" />
    <div class="filter_result">
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <label>Filters</label>
          </div>
          <div class="col-lg-6">
            <!-- <div v-if="selectedFilters && selectedFilters.length >0" class="selected_filter">
              <a v-for="(filter, index) in selectedFilters" :key="index" href="javascript:void(0)" @click="removeFilter(index)">
                {{ filter.name }} <img src="@/assets/img/filter-cross.svg" alt="">
              </a>
            </div> -->
          </div>
          <div v-if="isLoggedin" class="col-lg-3">
            <div class="sorting">
              <p>Showing all {{ blogs.length }} results</p>
              <select v-model="priceSorting" @change="sortPrice">
                <option value="">
                  Default sorting
                </option>
                <option value="asc">
                  Low to High
                </option>
                <option value="desc">
                  High to Low
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="filter_bar">
      <div class="container">
        <div class="row">
          <BlogFilter @getBlogByFilter="getBlogByFilter" />
          <BlogListing :blogs="blogs" :paginate="paginate" @fetchBlogs="fetchBlogs" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      filters: [],
      priceSorting: '',
      blogs: [],
      paginate: {},
      filterParams: '',
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
          active: 0
        },
        {
          path: '/blogs',
          label: 'Blog',
          active: 1
        }
      ]
    }
  },
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
  },
  created () {
    this.fetchBlogs(1)
  },
  methods: {
    removeFilter (index) {
      setTimeout(() => {
        this.$refs.prodcuFilter.removeFilter(this.selectedFilters[index])
        this.filterRemove(index)
        this.fetchBlogs(1)
      }, 100)
    },
    sortPrice () {
      this.setPriceSort(this.priceSorting)
      this.fetchBlogs(1)
    },
    getBlogByFilter (params) {
      this.filterParams = ''
      if (params.months.length) {
        this.filterParams = `&&months=${params.months.toString()}`
      }
      if (params.treatment_solutions.length) {
        this.filterParams = `${this.filterParams}&&treatment_solutions=${params.treatment_solutions.toString()}`
      }
      this.fetchBlogs(1)
    },
    async fetchBlogs (page) {
      const url = `/blogs?page=${page}${this.filterParams}`
      const data = await this.$axios.$get(url)
      const paginate = Object.assign({}, data)
      delete paginate.data
      this.paginate = paginate
      if (page > 1) {
        this.blogs = [...this.blogs, ...data.data]
      } else {
        this.blogs = data.data
      }
    }
  }
}
</script>
