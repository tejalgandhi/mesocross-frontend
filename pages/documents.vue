<template>
  <div class="product-page mb-5">
    <Banner :page-name="'documents'" :text-color="'white'" :defualt-image-name="'CG-EN-MESOCROSS-2020-23.webp'" />
    <Bredcrumb :items="breadcrumbs" />
    <div class="filter_result">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-3">
            <label>{{ $t('documents') }}</label>
          </div>
          <div class="col-lg-6">
            <!-- <div>
            </div> -->
          </div>
          <div v-if="isLoggedin" class="col-lg-3">
            <div class="sorting">
              <p>{{ $t('showing_all') }} {{ documents.length }} {{ $t('results') }}</p>
              <select v-model="orderBy" @change="sortBy">
                <option>
                  {{ $t('default_sorting') }}
                </option>
                <option value="desc">
                  {{ $t('newest') }}
                </option>
                <option value="asc">
                  {{ $t('oldest') }}
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
          <DocumentFilter @getDocumentsByFilter="getDocumentsByFilter" />
          <DocumentListing :documents="documents" :paginate="paginate" @fetchDocuments="fetchDocuments" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { showPricePopup } from 'assets/js/custom'
export default {
  data () {
    return {
      filters: [],
      orderBy: 'asc',
      documents: [],
      paginate: {},
      filterParams: '',
      treatmentFilterArray: [],
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
          active: 0
        },
        {
          path: '/documents',
          label: 'Documents',
          active: 1
        }
      ],
      data: {}
    }
  },
  computed: {
    ...mapState({
      pricePopup: state => state.pricePopup,
      isLoggedin: state => state.user.loggedIn
    })
  },
  mounted () {
    showPricePopup(this)
    this.fetchDocuments(1)
  },
  methods: {
    sortBy () {
      this.fetchDocuments(1)
    },
    getDocumentsByFilter (params) {
      this.treatmentFilterArray = params.treatment_solutions
      this.fetchDocuments(1)
    },
    async fetchDocuments (page) {
      this.filterParams = `&&orderBy=${this.orderBy}`
      if (this.treatmentFilterArray.length) {
        this.filterParams = `${this.filterParams}&&treatment_solutions=${this.treatmentFilterArray.toString()}`
      }
      const url = `/documents?page=${page}${this.filterParams}`
      const data = await this.$axios.$get(url)
      const paginate = Object.assign({}, data)
      delete paginate.data
      this.paginate = paginate
      if (page > 1) {
        this.documents = [...this.documents, ...data.data]
      } else {
        this.documents = data.data
      }
    }
  }
}
</script>
