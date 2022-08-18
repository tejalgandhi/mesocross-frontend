<template>
  <client-only>
    <div class="product-page">
      <Banner :page-name="'product'" />
      <div class="filter_result">
        <div class="container-fluid">
          <div class="col-lg-10 px-0 mx-auto">
            <div class="row">
              <div class="col-auto">
                <div class="sorting d-flex flex-wrap">
                  <button
                    v-b-toggle.filter-mobile
                    class="btn p-2 ml-2 px-3 d-flex align-items-center"
                  >
                    {{ $t('filters') }}
                    <b-icon-chevron-down class="ml-2" />
                  </button>
                </div>
              </div>
              <div class="col col order-2 order-sm-0">
                <div v-show="selectedFilters && selectedFilters.length >0" class="selected_filter">
                  <a v-for="(filter, index) in selectedFilters" :key="index" class="mr-2 mb-2" href="javascript:void(0)" @click="removeFilter(index)">
                    {{ filter.name }} <img src="@/assets/img/filter-cross.svg" alt="image">
                  </a>
                </div>
              </div>
              <div class="col-auto">
                <div class="sorting short-by d-flex flex-wrap">
                  <b-dropdown variant="link" toggle-class="text-decoration-none d-flex align-items-center" no-caret>
                    <template #button-content>
                      <b-icon-chevron-down class="mr-2" /> {{ $t('default_sorting') }}
                    </template>
                    <b-dropdown-item href="#" @click="sortType = 'alpha_a_z'">
                      {{ $t('alpha_a_z') }}
                    </b-dropdown-item>

                    <b-dropdown-item href="#" @click="sortType = 'alpha_z_a'">
                      {{ $t('alpha_z_a') }}
                    </b-dropdown-item>

                    <b-dropdown-item href="#" @click="sortType = 'best_selling'">
                      {{ $t('best_selling') }}
                    </b-dropdown-item>

                    <b-dropdown-item href="#" @click="sortType = 'low_to_high'">
                      {{ $t('low_to_high') }}
                    </b-dropdown-item>

                    <b-dropdown-item href="#" @click="sortType = 'high_to_low'">
                      {{ $t('high_to_low') }}
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="filter_bar">
        <b-sidebar
          id="filter-mobile"
          v-model="filterSidebar"
          :title="$t('filters')"
          backdrop
          shadow
          left
          header-class="py-3 px-4"
        >
          <template #footer>
            <div class="px-0 pt-2 row mx-0 align-items-center">
              <div class="w-100 col-6 d-block align-self-center text-center">
                <p class="" @click="clearAll">
                  CLEAN
                </p>
              </div>
              <button class="btn w-100 col-6 py-2 d-block apply-filter-btn" @click="applyMobileFilter">
                APPLY
              </button>
            </div>
          </template>
          <ProductFilter
            ref="prodcuFilter"
            class="p-4"
            @fetchProducts="fetchProducts"
            @setBackgroudColor="setBackgroudColor"
            @priceSort="setSorting"
            @alphaSorting="setAlphaBeticSort"
            @bestSellingChanged="setBestSellSort"
          />
        </b-sidebar>
        <div class="container-fluid">
          <div class="row">
            <ProductListing :products="products" :paginate="paginate" :loading-finish="loadingFinish" @fetchProducts="fetchProducts" />
          </div>
        </div>
      </div>

    <!-- <div v-show="isLoggedin" class="recommended mt-4">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 offset-md-6">
            <h2>{{ $t('treatment_recommended') }}</h2>
            <p>{{ $t('treatment_recommended_desc') }}</p>
            <nuxt-link to="/customize-treatment">
              {{ $t('customize_treatment') }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div> -->
    </div>
  </client-only>
</template>
<script>
import { showPricePopup } from 'assets/js/custom'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  auth: false,
  async asyncData ({ params, $axios, store }) {
    let url = '/products?page=1'
    if (params && params.treatmentSlug) {
      url = `${url}&treatment_solutions=${params.treatmentSlug}`
    } else if (params && params.categorySlug) {
      url = `${url}&category_slug=${params.categorySlug}`
    }
    const data = await $axios.$get(url)
    const paginate = Object.assign({}, data)
    delete paginate.data
    const products = data.data
    const selectedSlugName = data.meta.selectedSlugName
    return { products, paginate, selectedSlugName }
  },
  data () {
    return {
      filters: [],
      sortType: '',
      priceSorting: '',
      alphaSorting: '',
      bestSellSorting: '',
      loadingFinish: false,
      products: [],
      paginate: {},
      filterSidebar: false,
      bgColor: '',
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
          active: 0
        },
        {
          path: '/products',
          label: 'Product',
          active: 0
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
  watch: {
    bgColor (newVal) {
      document.body.style.background = newVal
    },
    sortType (newVal) {
      this.sortPrice()
    }
  },
  beforeDestroy () {
    document.body.setAttribute('style', '')
    this.setSelectedFilters([])
  },
  mounted () {
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
    clearAll () {
      this.setSelectedFilters([])
      this.setPriceSort('')
      this.filterSidebar = false
      this.fetchProducts(1)
      this.$refs.prodcuFilter.refresh()
    },
    loadProducts () {
      let url = '/products?page=1'
      if (this.$route.params && this.$route.params.treatmentSlug) {
        url = `${url}&treatment_solutions=${this.$route.params.treatmentSlug}`
      }
      this.fetchProducts(1, url)
    },
    sortPrice () {
      this.priceSorting = ''
      this.bestSellSorting = ''
      this.alphaSorting = ''
      if (this.sortType === 'alpha_a_z') {
        this.alphaSorting = 'asc'
        this.setAlphaSort(this.alphaSorting)
      }
      if (this.sortType === 'alpha_z_a') {
        this.alphaSorting = 'desc'
        this.setAlphaSort(this.alphaSorting)
      }
      if (this.sortType === 'best_selling') {
        this.bestSellSorting = '1'
        this.setBestSellSort(this.bestSellSorting)
      }
      if (this.sortType === 'low_to_high') {
        this.priceSorting = 'asc'
        this.setPriceSort(this.priceSorting)
      }
      if (this.sortType === 'high_to_low') {
        this.priceSorting = 'desc'
        this.setPriceSort(this.priceSorting)
      }
      this.fetchProducts(1)
    },
    setSorting (sort) {
      this.priceSorting = sort
      this.bestSellSorting = ''
      this.alphaSorting = ''
      this.setPriceSort(this.priceSorting)
      this.fetchProducts(1)
    },
    setAlphaBeticSort (sort) {
      this.priceSorting = ''
      this.bestSellSorting = ''
      this.alphaSorting = sort
      this.setAlphaSort(this.alphaSorting)
      this.fetchProducts(1)
    },
    setBestSellSort (sort) {
      this.priceSorting = ''
      this.bestSellSorting = sort
      this.alphaSorting = ''
      this.setBestSellSort(this.bestSellSorting)
      this.fetchProducts(1)
    },
    applyMobileFilter () {
      // this.fetchProducts(1)
      this.filterSidebar = false
    },
    setBackgroudColor (color = '') {
      document.body.style.background = color
    },
    async fetchProducts (page, productUrl = '') {
      let activeCat
      if (this.$route.params && this.$route.params.categorySlug) {
        this.$refs.prodcuFilter.filterData.forEach((category) => {
          if (!activeCat) {
            if (category.slug === this.$route.params.categorySlug) {
              activeCat = category
            } else {
              activeCat = category.child.find(item => item.slug === this.$route.params.categorySlug)
            }
          }
        })
        if (activeCat !== undefined) {
          activeCat = `&category=${activeCat.id}`
        }
      }
      let url = productUrl
      if (url === '') { // PREPARE API URL, IT WILL SET ON INTIAL LOAD
        url = `/products?page=${page}`
        if (this.selectedFilters) {
          const category = this.selectedFilters.filter(v => !v.treatmentSolution).map(val => val.id).toString()
          if (category !== '') {
            url = `${url}&category=${category}`
          } else {
            url = `${url}${activeCat}`
          }
          const treatmentsolution = this.selectedFilters.filter(v => v.treatmentSolution).map(val => val.id).toString()
          if (treatmentsolution !== '') {
            url = `${url}&treatment_solutions_ids=${treatmentsolution}`
          }
        }
        if (this.priceSorting) {
          url = `${url}&price=${this.priceSorting}`
        }
        if (this.bestSellSorting) {
          url = `${url}&best_seller=${this.bestSellSorting}`
        }
        if (this.alphaSorting) {
          url = `${url}&alphabetic=${this.alphaSorting}`
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
      setAlphaSort: 'product/setAlphaSort',
      setBestSellSort: 'product/setBestSellSort',
      setSelectedFilters: 'product/setSelectedFilters'
    })
  }
}
</script>

<style lang="scss" type="text/css">
.close-sidebar {
  position: absolute;
  top: 15px;
  right: 10px;
}
#filter-mobile{
  background: #FFF !important;
  color: #000 !important;
  .close{
    svg{
      fill: #000 !important;
    }
  }
}
.font-large {
  font-size: 27px;
}

.apply-filter-btn {
  border-radius: 0 !important;
  color: white;
  background: #25282A;
  border: 1px solid #25282A;
}

.sorting{
  option{
    color: #000 !important;
    text-transform: uppercase;
  }
}
</style>
