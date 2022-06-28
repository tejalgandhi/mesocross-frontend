<template>
  <div class="product-page">
    <Banner :page-name="'product'" />
    <Bredcrumb :items="breadcrumbs" />
    <div class="filter_result">
      <div class="container-fluid">
        <div class="row">
          <div class="col-auto">
            <p style="white-space: nowrap" class="mr-2">
              {{ $t('showing_all') }} {{ products.length }} {{ $t('results') }}
            </p>
          </div>
          <div class="col">
            <div v-show="selectedFilters && selectedFilters.length >0" class="selected_filter">
              <a v-for="(filter, index) in selectedFilters" :key="index" class="mr-2 mb-2" href="javascript:void(0)" @click="removeFilter(index)">
                {{ filter.name }} <img src="@/assets/img/filter-cross.svg" alt="image">
              </a>
            </div>
          </div>
          <div class="col-auto">
            <div class="sorting d-flex flex-wrap">
              <select v-model="priceSorting" class="d-none d-md-block ml-0 bg-dark form-control text-light w-auto" @change="sortPrice">
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

              <button
                v-b-toggle.filter-mobile
                class="btn btn-primary p-2 ml-2 px-3"
              >
                <b-icon-filter />
                {{ $t('filters') }} ({{ selectedFilters.length }})
              </button>
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
        right
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
        <ProductFilter ref="prodcuFilter" class="p-4" @fetchProducts="fetchProducts" @priceSort="setSorting" />
      </b-sidebar>
      <div class="container-fluid">
        <div class="row">
          <ProductListing :products="products" :paginate="paginate" :loading-finish="loadingFinish" @fetchProducts="fetchProducts" />
        </div>
      </div>
    </div>

    <div v-show="isLoggedin" class="recommended mt-4">
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
    </div>
  </div>
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
      priceSorting: '',
      loadingFinish: false,
      products: [],
      paginate: {},
      filterSidebar: false,
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
  beforeDestroy () {
    this.setSelectedFilters([])
  },
  mounted () {
    if (this.selectedSlugName) {
      this.breadcrumbs.push(
        {
          path: '/',
          label: this.selectedSlugName,
          active: 1
        }
      )
    }
    this.activeLastBreadCrumb()
    showPricePopup(this)
  },
  methods: {
    activeLastBreadCrumb () {
      this.breadcrumbs[this.breadcrumbs.length - 1].active = 1
    },
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
      this.setPriceSort(this.priceSorting)
      this.fetchProducts(1)
    },
    setSorting (sort) {
      this.priceSorting = sort
      this.setPriceSort(this.priceSorting)
      this.fetchProducts(1)
    },
    applyMobileFilter () {
      // this.fetchProducts(1)
      this.filterSidebar = false
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

.logout-btn {
  border-radius: 5px;
  color: #25282A;
  background: white;
  border: 1px solid #25282A;
}
</style>
