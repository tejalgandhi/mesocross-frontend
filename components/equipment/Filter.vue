<template>
  <div class="col-lg-3 px-0 px-lg-3 filter-mobile">
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
      <li v-for="(filter, index) in filterData" :key="index">
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
            class="child-a ml-2 w-100 a"
            :class="filter.visible ? 'mb-3' : 'arrowUp'"
            :aria-expanded="filter.visible ? 'true' : 'false'"
            :aria-controls="`parent_collapse-${filter.id}`"
            @click="filter.visible = !filter.visible"
          >{{ filter.name }}</a>
        </div>
        <b-collapse :id="`parent_collapse-${filter.id}`" v-model="filter.visible">
          <div v-show="filter.child.length > 0" class="filter_list">
            <ul class="secondUl">
              <li v-for="(childCat, cIndex) in filter.child" :key="cIndex">
                <a
                  class="child-b a"
                  :class="childCat.visible ? null : 'arrowUp'"
                  :aria-expanded="childCat.visible ? 'true' : 'false'"
                  :aria-controls="`child_collapse-${childCat.id}`"
                  @click="childCat.visible = !childCat.visible"
                >{{ childCat.name }}</a>
                <b-collapse
                  v-if="childCat.child.length > 0"
                  :id="`child_collapse-${childCat.id}`"
                  v-model="childCat.visible"
                >
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
                </b-collapse>
              </li>
            </ul>
          </div>
        </b-collapse>
      </li>
      <li>
        <div class="d-flex align-items-start">
          <label class="control control--checkbox pl-3 d-none d-md-flex">
            <input
              v-model="selectAllTreatment"
              type="checkbox"
              :true-value="true"
              :false-value="false"
              @input="selectParentTreatment"
            >
            <div class="control__indicator" />
          </label>
          <a class="child-a ml-2 w-100 a" :class="showTreatment ? 'mb-3' : 'arrowUp'" @click="showTreatment = !showTreatment">Treatment
            Solutions</a>
        </div>
        <b-collapse id="treatment-filter" v-model="showTreatment">
          <div class="filter_list">
            <ul class="secondUl">
              <li>
                <div class="filter_row">
                  <div v-for="(c, i) in treatmentSolutions" :key="i" class="filter_check">
                    <label class="control control--checkbox">
                      {{ c.name }}<small class="countSmall"> ({{ c.products_count }})</small>
                      <input
                        :id="`tretment${c.id}`"
                        type="checkbox"
                        :checked="c.selected"
                        @input="applyFilter(c,false, true)"
                      >
                      <div class="control__indicator" />
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </b-collapse>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      visible: false,
      filterData: [],
      showTreatment: false,
      selectAllTreatment: false,
      selected: '',
      priceSort: ''
    }
  },
  async fetch () {
    let selectedSlug = ''
    let equipment = ''
    if (this.$route.params.categorySlug) {
      selectedSlug = this.$route.params.categorySlug
    } else {
      equipment = 'equipment'
    }
    const { data } = await this.$axios.$get('/categories')
    const parentCategories = data.filter(category => category.parent_id == null)
    parentCategories.map((cat) => {
      cat.child = data.filter(val => val.parent_id === cat.id)
      cat.visible = false
      let firstSelect = false
      if (equipment === cat.slug) {
        firstSelect = true
        cat.visible = true
      }
      cat.selected = firstSelect
      cat.child.map((childCat) => {
        // eslint-disable-next-line no-unneeded-ternary
        const secondSelect = (firstSelect || (equipment === childCat.slug)) ? true : false
        let secondVisble = secondSelect
        childCat.child = data.filter(v => v.parent_id === childCat.id).map((cCat) => {
          // eslint-disable-next-line no-unneeded-ternary
          const thirdSelect = (secondSelect || (selectedSlug === cCat.slug)) ? true : false
          // console.log('cCat.slug', cCat.slug)
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
    this.filterData = parentCategories
  },
  fetchOnServer: true,
  computed: {
    ...mapState({
      treatmentSolutions: state => state.product.treatmentSolutions
    })
  },
  mounted () {
    this.getTreatmentSolutions('equipment')
    // if (!this.treatmentSolutions || this.treatmentSolutions.length === 0) {
    // this.getTreatmentSolutions('equipment')
    // }
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
      selectFilter: 'product/selectFilter',
      getTreatmentSolutions: 'product/getTreatmentSolutions'
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
