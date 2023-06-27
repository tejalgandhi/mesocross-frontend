<template>
  <client-only>
    <div class="product-page mb-5">
      <Banner :page-name="'product'" @get-segment-id="segId = $event" />
      <div class="filter_result">
        <div class="container-fluid">
          <div class="col-lg-10 px-0 mx-auto">
            <div class="row">
              <div class="col-auto">
                <div class="sorting d-flex flex-wrap">
                  <button
                    class="btn p-2 ml-2 px-3 d-flex align-items-center"
                    @click="$nuxt.$emit('showFilters')"
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
                    <b-dropdown-item @click="sortType = []">
                      {{ $t('default_sorting') }}
                    </b-dropdown-item>
                    <template v-for="(sort, i) in sorts">
                      <b-dropdown-item v-if="!sort.needsLogIn || (sort.needsLogIn && isLoggedin)" :key="i" @click="sortType = [sort.type, sort.tag]">
                        {{ $t(sort.name) }}
                      </b-dropdown-item>

                    </template>
                  </b-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <ProductListing :segment-id="Number(segId)" :products="products" :paginate="paginate" :loading-finish="loadingFinish" @fetchProducts="getProducts" />
          <div v-if="currentPage < totalPages " class="view_more" @click="currentPage += 1">
            <span>{{ $t('view_more') }}</span>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>
<script>
import { showPricePopup } from 'assets/js/custom'
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import sorts from '@/assets/json/sorts.json'
export default {
  name: 'Products',
  auth: false,
  data () {
    return {
      filters: [],
      sortType: [],
      priceSorting: '',
      alphaSorting: '',
      bestSellSorting: '',
      loadingFinish: false,
      products: [],
      paginate: {},
      filterSidebar: false,
      currentPage: 1,
      totalPages: 1,
      sorts,
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
      ],
      segId: null
    }
  },

  computed: {
    ...mapState({
      selectedFilters: state => state.product.selectedFilters,
      pricePopup: state => state.pricePopup,
      isLoggedin: state => state.user.loggedIn
    }),
    ...mapGetters({
      categories: 'categories/getCategories'
    })
  },

  watch: {
    sortType () {
      if (this.currentPage === 1) {
        this.getProducts()
        return
      }

      this.currentPage = 1
    },

    selectedFilters () {
      if (this.currentPage === 1) {
        this.getProducts()
        return
      }

      this.currentPage = 1
    },

    currentPage () {
      this.getProducts(true)
    }
  },

  beforeDestroy () {
    this.setSelectedFilters([])
  },

  created () {
    this.getProducts()
  },

  mounted () {
    showPricePopup(this)
    setTimeout(() => {
      this.setLoading(false)
    }, 200)
  },

  methods: {
    removeFilter (index) {
      this.selectFilter(this.selectedFilters[index])
      this.getProducts()
    },

    clearAll () {
      this.setSelectedFilters([])
      this.sortType = []
      this.filterSidebar = false
      this.getProducts()
      this.$refs.filters.refresh()
    },

    applyMobileFilter () {
      this.getProducts()
      this.filterSidebar = false
    },

    async getProducts (pageChange = false) {
      let url = ''

      if (this.$route.params.categorySlug && !this.selectedFilters.length) {
        url += `&category_slug=${this.$route.params.categorySlug}`
      }

      if (this.$route.params.treatmentSlug) {
        url += `&treatment_solutions=${this.$route.params.treatmentSlug}`
      }

      if (this.selectedFilters.length) {
        const selectedCategories = this.selectedFilters.filter(el => !el.is_skincare).map(el => el.id).join(',')
        const selectedSkincares = this.selectedFilters.filter(el => el.is_skincare).map(el => el.id).join(',')

        url += `&category=${selectedCategories}&skincare=${selectedSkincares}`
      }

      if (this.sortType.length) {
        url += `&${this.sortType[0]}=${this.sortType[1]}`
      }

      const response = await this.$axios.get(`/products?page=${this.currentPage}${url}`)

      if (response.status !== 200) {
        this.products = []
        return
      }

      if (pageChange && this.currentPage !== 1) {
        this.products.push(...response.data.data)
        return
      }

      this.products = response.data.data
      this.totalPages = response.data.meta.last_page
    },

    ...mapActions({
      selectFilter: 'product/selectFilter',
      filterRemove: 'product/filterRemove'
    }),
    ...mapMutations({
      setPriceSort: 'product/setPriceSort',
      setAlphaSort: 'product/setAlphaSort',
      setBestSellSort: 'product/setBestSellSort',
      setSelectedFilters: 'product/setSelectedFilters',
      setLoading: 'setLoading'
    })
  }
}
</script>

<style lang="scss" type="text/css">
.uppercase {
    text-transform: uppercase;
}
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

.view_more {
    padding: 10px 20px;
    border: solid 1px white;
    width: fit-content;
    margin: 20px auto 0;
    text-transform: uppercase;
    cursor: pointer;
    user-select: none;
    transition: 0.2s;

    &:hover {
        background: white;
        color: #25282A;
    }
}
</style>
