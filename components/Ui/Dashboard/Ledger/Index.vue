<template>
  <section>
    <UiTable v-if="loaded || entries.length" :head-items="tabs" :entries="entries" @itemClick="handleItemClick" />
    <div v-else class="loading">
      <span class="loader" />
    </div>
    <div v-if="!hideViewMore" class="pagination">
      <div v-if="entries.length" class="item" :class="{loading: !loaded}">
        <span v-if="loaded" class="page" @click="viewMore">{{ $t('view_more') }}</span>
        <span v-else class="loader" />
      </div>
    </div>
  </section>
</template>

<script>
export default {

  data () {
    return {
      tabs: [
        'ledger_keys.date',
        'ledger_keys.order',
        'ledger_keys.type',
        'ledger_keys.ammount',
        ''
      ],
      activeTab: 0,
      loaded: false,
      entries: [],
      fullData: [],
      toSee: {},
      bookmarkKey: '',
      API_PATH: process.env.API_PATH,
      hideViewMore: false
    }
  },

  watch: {
    bookmarkKey: {
      immediate: true,
      handler () {
        this.getData()
      }
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
          'ledger_keys.order',
          'ledger_keys.ammount',
          ''
        ]
        return
      }

      this.tabs = [
        'ledger_keys.date',
        'ledger_keys.order',
        'ledger_keys.type',
        'ledger_keys.ammount',
        ''
      ]
    },

    async getData () {
      this.loaded = false

      const response = await this.$axios.get(`ledger-entries?bookmarkKey=${this.bookmarkKey}`)

      this.loaded = true
      this.fullData.push(...response.data)
      this.handleData(this.fullData)
    },

    handleItemClick (id) {
      const item = this.fullData.filter(el => el.Key === id)[0]
      console.log(item.Document_No)
    },

    handleData (data) {
      this.entries = data.map((el) => {
        const orderSplit = el.Description.split(' ')
        const entries = [
          {
            template: 'date',
            name: 'date',
            id: el.Key,
            data: el.Document_Date
          },
          {
            template: 'normal',
            name: 'order',
            id: el.Key,
            data: orderSplit.length > 1 ? orderSplit[1] : el.Description
          },
          {
            template: 'normal',
            name: 'type',
            data: el.Document_Type
          },
          {
            template: 'normal',
            name: 'total_amount',
            data: `${el.Amount}€`
          },
          {
            template: 'icon',
            name: 'download',
            data: '/icons/download.svg'
          }
        ]

        if (this.tabs.length === 3) {
          entries.splice(2, 1)
          entries.splice(0, 1)
        }

        return entries
      })
    },

    viewMore () {
      const newLastKey = this.fullData[this.fullData.length - 1].Key

      if (newLastKey === this.bookmarkKey) {
        this.hideViewMore = true
        return
      }

      this.bookmarkKey = newLastKey
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
                padding: 5px 10px;
                border: solid 1px grey;
                border-radius: 4px;
                width: fit-content;
                transition: 0.2s;
                cursor: pointer;

                &:hover {
                    background: black;
                    color: white;
                }

                &.loading {

                    cursor: pointer;
                    .loader {
                        height: 20px;
                        width: 20px;
                        border: 2px solid #f3f3f3;
                        border-top: 2px solid #25282A
                    }
                }
            }

        }
    }
</style>
