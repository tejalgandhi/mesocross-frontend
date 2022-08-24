<template>
  <div class="filter-mobile">
    <ul class="mainUl">
      <li v-for="(filter, index) in filterData" :key="index">
        <div class="d-flex align-items-start">
          <label class="control control--checkbox pl-3">
            <span class="child-a ml-2 w-100 text-uppercase text-decoration-none">{{ filter.name }}</span>
            <input
              v-model="selected"
              class="mt-1"
              type="checkbox"
              :value="filter"
              @change="applyFilter(filter)"
            >
            <div class="control__indicator" />
          </label>
        </div>

        <div v-show="filter.child.length > 0" class="filter_list">
          <ul class="secondUl">
            <li v-for="(childCat, cIndex) in filter.child" :key="cIndex">
              <label class="control control--checkbox">
                {{ childCat.name }}
                <input
                  v-model="selected"
                  type="checkbox"
                  :value="childCat"
                  @change="applyFilter(childCat)"
                >
                <div class="control__indicator" />
              </label>
              <div class="filter_row">
                <div v-for="(c, i) in childCat.child" :key="i" class="filter_check">
                  <label class="control control--checkbox">
                    {{ c.name }}
                    <small class="countSmall">({{ c.products_count }})</small>
                    <input
                      v-model="selected"
                      type="checkbox"
                      :value="c"
                      @change="applyFilter(c)"
                    >
                    <div class="control__indicator" />
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </li>
      <li v-show="skincares.length > 0">
        <div class="d-flex align-items-start">
          <label class="control control--checkbox pl-3">
            <span class="child-a ml-2 w-100 text-uppercase text-decoration-none">skin care</span>
            <div class="control__indicator" />
          </label>
        </div>
        <div  class="filter_list">
          <ul class="secondUl">
            <li v-for="(childCat, cIndex) in skincares" :key="cIndex">
              <label class="control control--checkbox">
                {{ childCat.name }}
                <input
                  v-model="selected"
                  type="checkbox"
                  :value="childCat"
                  @change="applyFilter(childCat)"
                >
                <div class="control__indicator" />
              </label>
              <div class="filter_row">
                <div v-for="(c, i) in childCat.child" :key="i" class="filter_check">
                  <label class="control control--checkbox">
                    {{ c.name }}
                    <small class="countSmall">({{ c.products_count }})</small>
                    <input
                      v-model="selected"
                      type="checkbox"
                      :value="c"
                      @change="applyFilter(c)"
                    >
                    <div class="control__indicator" />
                  </label>
                </div>
              </div>
            </li>
          </ul>
        </div>      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      visible: false,
      filterData: [],
      skincares: [],
      selected: []

    }
  },
  async fetch () {
    const { data, skincares } = await this.$axios.$get('/categories')
    const selectedCat = data.reduce((res, cat) => {
      return cat.slug === this.$route.params.categorySlug ? cat : res
    }, null)
    const skincare = skincares.reduce((sel, cat) => cat.slug === this.$route.params.categorySlug ? cat : sel, null)
    if (skincare !== null || this.$route.params.categorySlug === 'skincare') {
      const collected = []
      this.skincares = skincares.filter((cat) => {
        if (collected.includes(cat.name)) {
          return false
        } else {
          collected.push(cat.name)
          return true
        }
      })
    } else {
      this.skincares = skincares.filter(cat => cat.category_id === selectedCat.id)
    }
    const parentCategories = data.filter(category => category.parent_id == null)
    parentCategories.map((cat) => {
      if (this.$route.params.categorySlug === cat.slug) {
        this.$emit('setBackgroudColor', cat.color_gradient)
      }
      cat.child = data.filter(val => val.parent_id === cat.id)
      return cat
    })
    if (!this.showAllCats) {
      this.filterData = parentCategories
    } else {
      this.filterData = parentCategories.filter((category) => {
        const slug = this.$route.params.categorySlug
        return category.slug === slug || category.child.find(cat => cat.slug === slug)
      })
    }
  },
  fetchOnServer: true,
  computed: {
    showAllCats () {
      if (this.$route.params && this.$route.params.categorySlug) {
        return true
      }
      return false
    }
  },
  methods: {
    applyFilter (filter, treatmentSolution = false) {
      setTimeout(() => {
        filter.treatmentSolution = treatmentSolution
        this.selectFilter(filter)
        this.$emit('fetchProducts', 1)
      }, 200)
    },
    removeFilter (item) {
      const selectIndex = this.selected.findIndex(f => f.id === item.id && f.slug === item.slug)
      this.selected.splice(selectIndex, 1)
      this.selectFilter(item)
    },
    refresh () {
      this.filterData = []
      this.$fetch()
    },
    ...mapActions({
      selectFilter: 'product/selectFilter'
    })
  }
}
</script>
<style>
.child-a {
  font: normal normal 600 18px Arquitecta;
  letter-spacing: 0px;
  color: #25282A;
  text-transform: capitalize;
}

.child-b {
  font: normal normal 600 16px Arquitecta;
  letter-spacing: 0px;
  color: #25282A;
  text-transform: capitalize;
}

.a:after {
  position: absolute !important;
  content: '' !important;
  transform: rotate(-180deg) !important;
  background: url(../../assets/img/filter-down-arrow.svg) no-repeat !important;
  width: 13px !important;
  height: 7px !important;
  right: 0px !important;
  top: 5px !important;
}

.a.arrowUp:after {
  transform: rotate(0) !important;
  width: 13px !important;
  height: 7px !important;
  right: 0px !important;
  top: 10px !important;
}

.filter-mobile [type="radio"]:checked + label:before, filter-mobile [type="radio"]:not(:checked) + label:before {
  left: 0 !important;
}

.filter-mobile .custom-radio {
  margin-top: 10px;
  padding-left: 10px !important;
}
</style>
