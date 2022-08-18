<template>
  <div class="filter-mobile">
    <ul class="mainUl">
      <li class="d-md-none">
        <div class="d-flex align-items-center">
          <a
            v-b-toggle.collapse-1
            class="child-a ml-2 w-100 a"
          >Sort by</a>
        </div>
        <b-collapse id="collapse-1">
          <div class="filter-list">
            <b-form-group v-slot="{ ariaDescribedby }">
              <b-form-radio v-model="bestSellingSort" :aria-describedby="ariaDescribedby" name="some-radios" value="asc" @change="bestSellingChanged(1)">
                {{ $t('best_selling') }}
              </b-form-radio>
              <b-form-radio v-model="alphabeticSort" :aria-describedby="ariaDescribedby" name="some-radios" value="asc" @change="alphaChanged('asc')">
                {{ $t('alpha_a_z') }}
              </b-form-radio>
              <b-form-radio v-model="alphabeticSort" :aria-describedby="ariaDescribedby" name="some-radios" value="desc" @change="alphaChanged('desc')">
                {{ $t('alpha_z_a') }}
              </b-form-radio>
              <b-form-radio v-model="priceSort" :aria-describedby="ariaDescribedby" name="some-radios" value="asc" @change="priceChanged('asc')">
                {{ $t('low_to_high') }}
              </b-form-radio>
              <b-form-radio v-model="priceSort" :aria-describedby="ariaDescribedby" name="some-radios" value="desc" @change="priceChanged('desc')">
                {{ $t('high_to_low') }}
              </b-form-radio>
            </b-form-group>
          </div>
        </b-collapse>
      </li>
      <template v-for="(filter, index) in filterData">
        <li :key="index" class="text-uppercase">
          <div class="d-flex align-items-start">
            <label class="control control--checkbox pl-3 d-none d-md-flex">
              <input
                v-model="filter.selected"
                class="mt-1"
                type="checkbox"
                :true-value="true"
                :false-value="false"
                @input="selectParent(index)"
              >
              <div class="control__indicator" />
            </label>
            <a
              class="child-a ml-2 w-100 a text-uppercase text-decoration-none"
              :aria-expanded="filter.visible ? 'true' : 'false'"
              :aria-controls="`parent_collapse-${filter.id}`"
              @click="filter.visible = !filter.visible"
            >{{ filter.name }}</a>
          </div>

          <div v-show="filter.child.length > 0" class="filter_list">
            <ul class="secondUl">
              <li v-for="(childCat, cIndex) in filter.child" :key="cIndex">
                <label class="control control--checkbox">
                  {{ childCat.name }}
                  <input
                    v-model="childCat.selected"
                    type="checkbox"
                    :true-value="true"
                    :false-value="false"
                    @input="applyFilter(childCat,filter.id)"
                  >
                  <div class="control__indicator" />
                </label>
                <div class="filter_row">
                  <div v-for="(c, i) in childCat.child" :key="i" class="filter_check">
                    <label class="control control--checkbox">
                      {{ c.name }}
                      <small class="countSmall">({{ c.products_count }})</small>
                      <input
                        v-model="c.selected"
                        type="checkbox"
                        :true-value="true"
                        :false-value="false"
                        @input="applyFilter(c,filter.id)"
                      >
                      <div class="control__indicator" />
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
const hasCategory = (category, slug) => {
  return category.slug === slug || category.child.find(cat => cat.slug === slug)
}
export default {
  data () {
    return {
      visible: false,
      filterData: [],
      showTreatment: false,
      selectAllTreatment: false,
      selected: '',
      priceSort: '',
      alphabeticSort: '',
      bestSellingSort: ''
    }
  },
  async fetch () {
    const { data } = await this.$axios.$get('/categories')
    const parentCategories = data.filter(category => category.parent_id == null)
    parentCategories.map((cat) => {
      cat.child = data.filter(val => val.parent_id === cat.id)
      cat.visible = false
      let firstSelect = false
      if (this.$route.params.categorySlug === cat.slug) {
        this.$emit('setBackgroudColor', cat.color_gradient)
        firstSelect = false
        cat.visible = false
      }
      cat.selected = firstSelect
      cat.child.map((childCat) => {
        // eslint-disable-next-line no-unneeded-ternary
        const secondSelect = (firstSelect || (this.$route.params.categorySlug === childCat.slug)) ? true : false
        let secondVisble = secondSelect
        childCat.child = data.filter(v => v.parent_id === childCat.id).map((cCat) => {
          // eslint-disable-next-line no-unneeded-ternary
          const thirdSelect = (secondSelect || (this.$route.params.categorySlug === cCat.slug)) ? true : false
          if (!secondVisble && thirdSelect) {
            secondVisble = true
          }
          cCat.selected = thirdSelect
          // eslint-disable-next-line no-unneeded-ternary
          if (secondSelect || thirdSelect) {
            cCat.visible = true
            cat.visible = true
          }
          if (thirdSelect) {
            const filter = { ...cCat }
            filter.parentId = cat.id
            this.selectFilter(filter, false)
          }
          return cCat
        })
        childCat.visible = secondVisble
        childCat.selected = secondSelect
        return childCat
      })
      return cat
    })
    if (!this.showAllCats) {
      this.filterData = parentCategories
    } else {
      this.filterData = parentCategories.filter(cat => hasCategory(cat, this.$route.params.categorySlug) || cat.slug === 'skin-care')
    }
  },
  fetchOnServer: true,
  computed: {
    ...mapState({
      treatmentSolutions: state => state.product.treatmentSolutions
    }),
    showAllCats () {
      if (this.$route.params && this.$route.params.categorySlug) {
        return true
      }
      return false
    }
  },
  methods: {
    applyFilter (value, parentId, treatmentSolution = false) {
      setTimeout(() => {
        let filter = {}
        const parentCat = this.filterData.find(val => val.id === parentId)
        if (!treatmentSolution) {
          parentCat.selected = this.getParentCategorySelected(parentCat)
          value.parentId = parentId
          filter = value
        } else {
          const treatments = JSON.parse(JSON.stringify(this.treatmentSolutions))
          const index = treatments.findIndex(val => val.id === value.id)
          treatments[index].selected = !treatments[index].selected
          this.setTreatmentSolutions(treatments)
          this.selectAllTreatment = this.getParentTreatmentSelected()
          filter = treatments[index]
        }
        filter.treatmentSolution = treatmentSolution
        this.selectFilter(filter, treatmentSolution)
        this.$emit('fetchProducts', 1)
      }, 200)
    },
    refresh () {
      this.filterData = []
      this.$fetch()
    },
    priceChanged (price) {
      this.priceSort = price
      this.$emit('priceSort', this.priceSort)
    },
    alphaChanged (alpha) {
      this.alphabeticSort = alpha
      this.$emit('alphabeticSort', this.alphabeticSort)
    },
    bestSellingChanged (sell) {
      this.bestSellingSort = sell
      this.$emit('bestSellingSort', this.bestSellingSort)
    },
    selectAllChild (data) {
      data.child = data.child.map((val) => {
        val.selected = true
        return val
      })
    },
    selectParent (index) {
      setTimeout(() => {
        const filter = this.filterData[index]
        if (filter.selected) { // IF IT IS SELECTED
          // eslint-disable-next-line array-callback-return
          filter.child = filter.child.map((parentCat) => {
            // eslint-disable-next-line array-callback-return
            parentCat.child = parentCat.child.map((childCat) => {
              childCat.selected = true
              const childFilter = { ...childCat }
              childFilter.parentId = filter.id
              this.selectFilter(childFilter, false)
              return childCat
            })
            return parentCat
          })
        } else {
          // eslint-disable-next-line array-callback-return
          filter.child = filter.child.map((parentCat) => {
            // eslint-disable-next-line array-callback-return
            parentCat.child = parentCat.child.map((childCat) => {
              childCat.selected = false
              const childFilter = { ...childCat }
              childFilter.parentId = filter.id
              this.selectFilter(childFilter, false)
              return childCat
            })
            return parentCat
          })
        }
        this.$emit('fetchProducts', 1)
      }, 200)
    },
    selectParentTreatment () {
      setTimeout(() => {
        let treatments = JSON.parse(JSON.stringify(this.treatmentSolutions))
        if (this.selectAllTreatment) {
          treatments = treatments.map((treat) => {
            treat.selected = true
            const treatmentFil = treat
            treatmentFil.treatmentSolution = true
            this.selectFilter(treatmentFil, true)
            return treat
          })
        } else {
          treatments = treatments.map((treat) => {
            treat.selected = false
            const treatmentFil = treat
            treatmentFil.treatmentSolution = true
            this.selectFilter(treatmentFil, true)
            return treat
          })
        }
        this.setTreatmentSolutions(treatments)
        this.$emit('fetchProducts', 1)
      }, 200)
    },
    getParentCategorySelected (filter) {
      let selected = true
      for (const ele of filter.child) {
        for (const child of ele.child) {
          if (child.selected === false) {
            selected = false
            break
          }
        }
      }
      return selected
    },
    getParentTreatmentSelected () {
      let selected = true
      for (const ele of this.treatmentSolutions) {
        if (ele.selected === false) {
          selected = false
          break
        }
      }
      return selected
    },
    removeFilter (item) {
      setTimeout(() => {
        if (item.treatmentSolution) {
          const treatments = JSON.parse(JSON.stringify(this.treatmentSolutions))
          const index = treatments.findIndex(val => val.id === item.id)
          treatments[index].selected = !treatments[index].selected
          this.setTreatmentSolutions(treatments)
          this.selectAllTreatment = this.getParentTreatmentSelected()
        } else {
          const parentKey = this.filterData.findIndex(filter => filter.id === item.parentId)
          // eslint-disable-next-line array-callback-return
          this.filterData[parentKey].child.map((value, index) => {
            if (value.child && value.child.length > 0) {
              // eslint-disable-next-line array-callback-return
              value.child.map((v, i) => {
                if (v.id === item.id) {
                  this.$set(this.filterData[parentKey].child[index].child[i], 'selected', false)
                }
              })
            }
          })
          this.filterData[parentKey].selected = this.getParentCategorySelected(this.filterData[parentKey])
        }
      }, 200)
    },
    ...mapActions({
      selectFilter: 'product/selectFilter'
    }),
    ...mapMutations({
      setTreatmentSolutions: 'product/setTreatmentSolutions'
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
