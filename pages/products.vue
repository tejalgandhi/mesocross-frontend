<template>
  <div class="product-page">
    <ProductBanner />
    <Bredcrumb :items="breadcrumbs" />
    <div class="container-fluid pl-4 mb-5">
      <p class="text-white pl-2 mb-5">56 Products</p>
    </div>
<!--    <div class="filter_result">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6">
            <div v-if="selectedFilters && selectedFilters.length >0" class="selected_filter">
              <a v-for="(filter, index) in selectedFilters" :key="index" class="mr-2 mb-2" href="javascript:void(0)" @click="removeFilter(index)">
                {{ filter.name }} <img src="@/assets/img/filter-cross.svg" alt="">
              </a>
            </div>
          </div>
          <div v-if="isLoggedin" class="col-lg-3">
            <div class="sorting">
              <p>Showing all {{ products.length }} results</p>
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
    </div>-->

    <div class="filter_bar">
      <div class="container-fluid">
        <div class="row">
<!--          <ProductFilter ref="prodcuFilter" @fetchProducts="fetchProducts" />-->
          <ProductListing :products="products" :paginate="paginate" :loading-finish="loadingFinish" @fetchProducts="fetchProducts" />
        </div>
      </div>
    </div>

<!--    <div v-show="isLoggedin" class="recommended mt-4">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 offset-md-6">
            <h2>Treatment Recommended</h2>
            <p>As specialists we want to recommend the best for your skin and silhouette. Get a professional, personalized prescription comfortably.</p>
            <nuxt-link to="/customize-treatment">
              Customize Treatment
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>
<script>
import { showPricePopup } from 'assets/js/custom'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  auth: false,
  async asyncData ({ params, $axios, store }) {
    let url = '/products?page=1'
    if (params && params.tretmentSlug) {
      url = `${url}&treatment_solutions=${params.tretmentSlug}`
    } else if (params && params.categorySlug) {
      url = `${url}&category_slug=${params.categorySlug}`
    }
    const data = await $axios.$get(url)
    const paginate = Object.assign({}, data)
    delete paginate.data
    const products = data.data
    return { products, paginate }
  },
  data () {
    return {
      filters: [],
      priceSorting: '',
      loadingFinish: false,
      products: [],
      paginate: {},
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
          active: 0
        },
        {
          path: '/products',
          label: 'Product',
          active: 1
        }
      ]
    }
  },
  computed: {
    ...mapState({
      selectedFilters: state => state.product.selectedFilters,
      pricePopup: state => state.pricePopup,
      isLoggedin: state => state.user.loggedIn
    })
  },
  beforeDestroy () {
    this.setSelectedFilters([])
  },
  created () {
    // this.loadProducts()
  },
  mounted () {
    // Access using $auth
    // Access using $auth
    showPricePopup(this)
  },
  methods: {
    removeFilter (index) {
      setTimeout(() => {
        this.$refs.prodcuFilter.removeFilter(this.selectedFilters[index])
        this.filterRemove(index)
        this.fetchProducts(1)
      }, 100)
    },
    loadProducts () {
      let url = '/products?page=1'
      if (this.$route.params && this.$route.params.tretmentSlug) {
        url = `${url}&treatment_solutions=${this.$route.params.tretmentSlug}`
      }
      this.fetchProducts(1, url)
    },
    sortPrice () {
      this.setPriceSort(this.priceSorting)
      this.fetchProducts(1)
    },
    async fetchProducts (page, productUrl = '') {
      let url = productUrl
      if (url === '') { // PREPARE API URL, IT WILL SET ON INTIAL LOAD
        url = `/products?page=${page}`
        if (this.selectedFilters) {
          const category = this.selectedFilters.filter(v => !v.treatmentSolution).map(val => val.id).toString()
          if (category !== '') {
            url = `${url}&category=${category}`
          }
          const treatmentsolution = this.selectedFilters.filter(v => v.treatmentSolution).map(val => val.id).toString()
          if (treatmentsolution !== '') {
            url = `${url}&treatment_solutions_ids=${treatmentsolution}`
          }
        }
        if (this.priceSorting) {
          url = `${url}&price=${this.priceSorting}`
        }
        this.$nuxt.$loading.start()
      }
      const data = await this.$axios.$get(url)
      if (productUrl === '') {
        this.$nuxt.$loading.finish()
      }
      this.loadingFinish = true
      const paginate = Object.assign({}, data)
      delete paginate.data
      this.paginate = paginate
      if (page > 1) {
        this.products = [...this.products, ...data.data]
      } else {
        this.products = data.data
      }
    },
    ...mapActions({
      filterRemove: 'product/filterRemove'
    }),
    ...mapMutations({
      setPriceSort: 'product/setPriceSort',
      setSelectedFilters: 'product/setSelectedFilters'
    })
  }
}
</script>
