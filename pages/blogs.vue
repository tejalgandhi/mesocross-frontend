<template>
  <div class="product-page mb-5">
    <Banner :page-name="'blog'" :text-color="'white'" :defualt-image-name="'CG-EN-MCCM-2020-23.webp'" />
    <Bredcrumb :items="breadcrumbs" />
    <div class="filter_result">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3">
            <label>{{ $t('filters') }}</label>
          </div>
          <div v-if="$auth.loggedIn" class="col-lg-3">
            <div class="sorting">
              <p>{{ $t('showing_all') }} {{ blogs.length }} {{ $t('results') }}</p>
              <select v-model="priceSorting" @change="sortPrice">
                <option value="">
                  {{ $t('default_sorting') }}
                </option>
                <option value="asc">
                  {{ $t('low_to_high') }}
                </option>
                <option value="desc">
                  {{ $t('high_to_low') }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="filter_bar">
      <div class="container-fluid">
        <div class="row">
          <BlogFilter @getBlogByFilter="getBlogByFilter" @getBlogByTreatment="getBlogByTreatment" />
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
      filterByYears: '',
      filterByTreatment: '',
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
      ],
      data: {},
      type: 'blogs'
    }
  },
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
  },
  mounted () {
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
      this.filterByYears = params
      this.fetchBlogs(1)
    },
    getBlogByTreatment (params) {
      this.filterByTreatment = params.length > 0 ? params.toString() : ''
      this.fetchBlogs(1)
    },
    async fetchBlogs (page) {
      const requestParams = {
        page,
        years: this.filterByYears,
        treatment_solutions: this.filterByTreatment
      }
      const data = await this.$axios.$post('blogs', requestParams)
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
