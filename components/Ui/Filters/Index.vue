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
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      close: false,
      categories: [],
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
    async getCategories () {
      this.loaded = false
      const response = await this.$axios.get('/segment-category-relation')
      this.getSkincares()

      if (response.status !== 200) {
        return
      }

      this.categories.push({
        name: 'SEGMENTATION',
        slug: 'segmentation',
        childrens: response.data.data.filter(el => Number(el.segment_id))
      })

      this.categories.push({
        name: 'LINE',
        slug: 'lines',
        childrens: response.data.data.filter(el => !el.segment_id)
      })

    //   this.categories = response.data.data
    },

    async getSkincares () {
      const response = await this.$axios.get('/categories')

      if (response.status !== 200) {
        return
      }

      this.categories.push({
        name: 'SKIN CARE',
        slug: 'skincare',
        childrens: response.data.skincares
      })

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

            hr {
                background: rgba(0, 0, 0, 0.1);
                width: calc(100% - 160px);
                margin: 0 auto;
                height: 1px;
                border: none;
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

                &::-webkit-scrollbar {
                    display: none;
                }

                &.center {
                    align-items: center;
                    justify-content: center;
                }
            }

            .go-cart {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                width: 100%;
                height: 8rem;
                padding: 0 40px;
                background: #0000001F;

                .total {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                    .subtotal {
                        text-transform: uppercase;
                        font-weight: 500;
                    }

                    .value {
                        font-weight: 600;
                        font-size: 1.2rem;
                    }
                }

                .btn {
                    width: 100%;
                    padding: 10px 0;
                    background: #25282A;
                    color: white;
                    text-transform: capitalize;
                    font-weight: 500;
                    transition: 0.2s;

                    &:hover {
                        background: #25282ad7;
                    }
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
