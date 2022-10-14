<template>
  <div class="filter-preview">
    <div class="overlay" @click="$emit('close')" />
    <div class="filters">
      <div class="title">
        <span>{{ $t('filters') }}</span>
        <div class="back" @click="$emit('close')" />
      </div>
      <div v-if="loaded" class="filter">
        <template v-for="(item, i) in categories">
          <UiFiltersFilter :key="i" :data="item" />
        </template>
      </div>
      <div v-else class="loading">
        <span class="loader" />
      </div>
      <span class="clear" @click="setFilters([])">clear</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      close: false,
      categories: [],
      skincares: [],
      loaded: false
    }
  },

  computed: {
    ...mapGetters({
      productCount: 'cart/totalUnits' || 0,
      products: 'cart/getProducts',
      subTotal: 'cart/subTotal'
    })
  },

  created () {
    this.getCategories()
  },

  methods: {
    ...mapMutations({
      setFilters: 'product/setSelectedFilters'
    }),
    ...mapGetters({
      menuChildren: 'menu/getHeaderMenuChildren'
    }),

    async getCategories () {
      this.loaded = false
      const slug = this.$route.params.categorySlug
      const response = await this.$axios.get('/categories')
      // this.getSkincares()

      if (response.status !== 200) {
        return
      }
      this.loaded = true
      const requireSkincare = ['skincare', ...response.data.skincares.map(el => el.slug)]
      if (!requireSkincare.includes(slug)) {
        this.skincares.push({
          name: 'SKIN CARE',
          slug: 'skincare',
          childrens: response.data.skincares
        })
      }

      // start segmentation menu logic
      const segment = response.data.data.filter((category) => {
        return slug === 'segmentation' || (category.slug === slug && category.segment_id !== '')
      })
      if (segment.length > 1) {
        const parentCategories = response.data.data.filter(category => category.parent_id == null)
        parentCategories.forEach((cat) => {
          this.categories.push({
            name: cat.name,
            slug: cat.slug,
            childrens: response.data.data.filter(val => val.parent_id === cat.id)
          })
        })
      } else if (segment.length > 0) {
        const childSegment = response.data.data.filter(el => el.parent_id === segment[0].id)
        this.categories.push({
          name: segment[0].name,
          slug: segment[0].slug,
          childrens: childSegment
        })
      }
      // end segmentation logic here
      if (this.skincares.length > 0) {
        // start lines menu logic
        this.categories.push(this.skincares[0])
      } else {
        // skincare menu logic
        if (requireSkincare.includes(slug)) {
          this.categories.push({
            name: 'LINE',
            slug: 'lines',
            childrens: response.data.data.filter(el => !el.segment_id)
          })
        }
        const requireSkincares = ['skincare', ...response.data.data.map(el => Number(!el.segment_id))]
        if (requireSkincares.includes(slug)) {
          this.categories.push({
            name: 'LINE',
            slug: 'lines',
            childrens: response.data.data.filter(el => !el.segment_id)
          })
        }
      }

      // start lines menu logic

      // end lines menu logic
      // if (this.$route.params.categorySlug === 'skincare') {
      //   console.log(response.data.data)
      //   this.categories.push({
      //     name: 'LINE',
      //     slug: 'lines',
      //     childrens: response.data.data.filter(el => !el.segment_id)
      //   })
      //   const unwanted = ['skincare']
      //   this.categories = this.categories.filter(el => !unwanted.includes(el.slug))
      // } else {
      //   const unwanted = ['lines']
      //   this.categories = this.categories.filter(el => !unwanted.includes(el.slug))
      //   console.log('this.categories')
      //   console.log(this.categories)
      //   // const requireSkincare = ['segmentation', ...response.data.data.map(el => Number(el.segment_id))]
      //   //
      //   // if (!requireSkincare.includes(slug)) {
      //   //   this.categories.push({
      //   //     name: 'SEGMENTATION',
      //   //     slug: 'segmentation',
      //   //     childrens: response.data.data.filter(el => Number(el.segment_id))
      //   //   })
      //   // }
      //   // this.categories.push({
      //   //   name: 'LINE',
      //   //   slug: 'lines',
      //   //   childrens: response.data.data.filter(el => !el.segment_id)
      //   // })
      // }
    },

    async getSkincares () {
      const slug = this.$route.params.categorySlug
      const response = await this.$axios.get('/categories')

      if (response.status !== 200) {
        return
      }
      const requireSkincare = ['skincare', ...response.data.skincares.map(el => el.slug)]
      console.log(requireSkincare)
      console.log(!requireSkincare.includes(slug))
      if (!requireSkincare.includes(slug)) {
        this.skincares.push({
          name: 'SKIN CARE',
          slug: 'skincare',
          childrens: response.data.skincares
        })
        console.log(this.skincares)
      }

      this.loaded = true
    },

    goTo (path) {
      this.$router.push(`/${path}`)
      this.$emit('close')
    }
  }

}
</script>

<style lang="scss" scoped>
    .filter-preview {
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        display: flex;
        justify-content: flex-end;
        z-index: 100;
        .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            background: rgba(0,0,0,0.3);
            display: block;
            z-index: -1;
            animation: fade 0.2s ease-in-out forwards;
        }
        .filters {
            position: absolute;
            top: 0px;
            left: 0;
            background: white;
            max-width: 600px;
            width: 100%;
            height: 100%;
            z-index: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            animation: slide 0.2s ease-in-out forwards;

            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 400;
                font-size: 24px;
                height: 5rem;
                padding: 0 80px;
                color: black;
                text-transform: uppercase;
                @media screen and (max-width: 1200px){
                    padding: 0 40px;
                    font-size: 16px;
                }

                .back {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 20px;
                    width: 20px;
                    cursor: pointer;

                    &::before, &::after {
                        position: absolute;
                        content: '';
                        width: 100%;
                        height: 1px;
                        background: black;
                    }

                    &::before {
                        transform: rotate(45deg);
                    }
                    &::after {
                        transform: rotate(-45deg);
                    }
                }
            }

            .filter {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 2rem;
                overflow: auto;
                height: calc(100% - 5rem - 40px);
                width: 100%;
                padding: 0 80px;
                margin: 20px 0 40px;

                @media screen and (max-width: 1200px){
                    margin: 20px 0;
                    padding: 0 40px;
                }

                &::-webkit-scrollbar {
                    display: none;
                }

                &.center {
                    align-items: center;
                    justify-content: center;
                }
            }

            .clear {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                width: 100%;
                height: 4rem;
                padding: 0 40px;
                background: #000000af;
                cursor: pointer;
                text-transform: uppercase;
                font-size: 20px;
                font-weight: 300;
                @media screen and (max-width: 1200px){
                    font-size: 16px;
                }
            }
        }
    }

    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes slide {
        from {
            opacity: 0;
            transform: translateX(-250px);
        }
        to {
            opacity: 1;
            transform: translateX(0px);
        }
    }
</style>
