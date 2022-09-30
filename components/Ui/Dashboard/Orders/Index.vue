<template>
  <section>
    <UiTable v-if="loaded" :head-items="tabs" :entries="entries" @itemClick="handleItemClick" />
    <div v-else class="loading">
      <span class="loader" />
    </div>
    <div class="pagination">
      <span class="item" />
      <div class="item">
        <span class="arrow left" :class="{disabled: currentPage <= 1}" @click="handlePage(0)" />
        <span class="page">{{ currentPage }}</span>
        <span class="arrow right" :class="{disabled: currentPage >= lastPage}" @click="handlePage(1)" />
      </div>
      <div class="item showing">
        <span>{{ `${$t('showing')}` }} <b>{{ (10 * (currentPage - 1)) + entries.length }}</b> {{ `${$t('of')}` }} <b>{{ totalItems }}</b> {{ `${$t('results').toLowerCase()}` }}</span>
      </div>
    </div>
    <UiTableDetails v-if="Object.keys(toSee).length" :data="toSee" @close="toSee = {}" />
  </section>
</template>

<script>
export default {

  data () {
    return {
      tabs: [
        'order.date',
        'order.number',
        'order.payment_method',
        'order.total_amount'
      ],
      activeTab: 0,
      currentPage: 1,
      totalItems: 0,
      lastPage: 1,
      loaded: false,
      entries: [],
      fullData: [],
      toSee: {},
      API_PATH: process.env.API_PATH
    }
  },

  watch: {
    activeTab: {
      immediate: true,
      handler () {
        if (this.currentPage === 1) {
          this.getData()
          return
        }
        this.currentPage = 1
      }
    },

    currentPage () {
      this.getData()
    },

    tabs () {
      if (this.fullData.length) {
        this.handleData(this.fullData)
      }
    }
  },

  created () {
    this.setTabs()
    window.addEventListener('resize', this.setTabs)
  },

  methods: {
    setTabs () {
      if (window.innerWidth < 768) {
        this.tabs = [
          'order.number',
          'order.total_amount'
        ]
        return
      }

      this.tabs = [
        'order.date',
        'order.number',
        'order.payment_method',
        'order.total_amount'
      ]
    },

    async getData () {
      this.loaded = true
      const response = await this.$axios.get('orders')

      this.loaded = true
      this.fullData = response.data.data
      this.totalItems = response.data.total
      this.lastPage = response.data.last_page
      this.handleData(this.fullData)
    },

    handleItemClick (id) {
      const item = this.fullData.filter(el => el.id === id)[0]
      this.toSee = {
        title: `${this.$t('order.order')} #${String(item.id).padStart(5, '0')}`,
        date: item.created_at,
        products: item.order_products.map((el) => {
          return {
            name: el.products.name[this.$i18n.locale],
            image: process.env.uploadURL + el.products.feature_image,
            quantity: el.qty,
            size: el.size.name[this.$i18n.locale],
            price: el.product_price
          }
        }),
        items: [
          {
            template: 'sub-value',
            label: this.$t('order.sub_total'),
            data: item.sub_total
          },
          {
            template: 'sub-value',
            label: this.$t('order.shipping_price'),
            data: item.shipping_price
          },
          {
            template: 'total-value',
            label: this.$t('order.total_amount'),
            data: item.total
          }
        ]
      }
    },

    handleData (data) {
      this.entries = data.map((el) => {
        const entries = [
          {
            template: 'date',
            name: 'date',
            id: el.id,
            data: el.created_at
          },
          {
            template: 'normal',
            name: 'number',
            id: el.id,
            data: `#${String(el.id).padStart(5, '0')}`
          },
          {
            template: 'normal',
            name: 'payment_method',
            data: this.$t(`order.method.${el.payment_method}`)
          },
          {
            template: 'normal',
            name: 'total_amount',
            data: `${el.total}€`
          }
        ]

        if (this.tabs.length === 2) {
          entries.splice(2, 1)
          entries.splice(0, 1)
        }

        return entries
      })
    },

    handlePage (value) {
      if (!value && this.currentPage > 1) {
        this.currentPage -= 1
        return
      }

      if (this.currentPage < this.lastPage) {
        this.currentPage += 1
      }
    }
  }

}
</script>

<style lang="scss" scoped>
    section {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        .tabs {
            display: flex;
            gap: 1rem;
            position: relative;
            user-select: none;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0px;
                width: 10rem;
                height: 2px;
                background: black;
                transition: 0.2s;
            }

            &.right {
                &::after {
                   left: 11rem;
                }
            }

            span {
                cursor: pointer;
                position: relative;
                width: 10rem;
                text-align: center;
                padding: 10px 0;
                font-size: 20px;

                &.active {
                    font-weight: 500;
                }
            }
        }

        .emtpy {
            height: 685px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .pagination {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            user-select: none;

            .item {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 0.5rem;
                width: 33%;

                .arrow {
                    width: 8px;
                    height: 8px;
                    border: solid 1px;
                    border-color: black black transparent transparent;
                    cursor: pointer;

                    &.disabled {
                        opacity: 0.4;
                        cursor: unset;
                    }

                    &.right {
                        transform: rotate(45deg);
                    }

                    &.left {
                        transform: rotate(-135deg);
                    }
                }
            }

            .showing {
                display: flex;
                justify-content: flex-end;
                span {
                    font-size: 12px;

                    b {
                        font-size: 12px;
                    }
                }
            }

            .page {
                padding: 5px 10px;
                border: solid 1px grey;
                border-radius: 4px;
            }
        }
    }
</style>
