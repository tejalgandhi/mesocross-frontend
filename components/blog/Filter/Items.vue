<template>
  <main>
    <header>
      <div class="title">
        <label class="control control--checkbox">
          <input v-model="selectedYear" type="checkbox" @change="handleYearSelect">
          <span class="control__indicator" />
        </label>
        <span class="text">{{ title }} ({{ total }})</span>
      </div>
      <span class="arrow" />
    </header>
    <section class="options">
      <template v-for="(item, i) in data">
        <EventFilterItem :key="i" :item="item" :all-checked="checked" @check="handleCheck" />
      </template>
    </section>
  </main>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: () => ''
    },
    data: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data () {
    return {
      selectedYear: false,
      checked: []
    }
  },

  computed: {
    total () {
      return this.data.map(el => el.total).reduce((sum, el) => sum + el)
    },

    currentYear () {
      return new Date().getFullYear()
    }
  },

  watch: {
    checked (val) {
      if (val.length === this.data.length) { this.selectedYear = true }

      this.$emit('checked', {
        year: this.title,
        months: val.join(',')
      }
      )
    }
  },

  created () {
    this.selectedYear = this.currentYear.toString() === this.title

    if (this.selectedYear) {
      this.checked = this.data.map(el => el.month)
    }
  },

  methods: {
    handleCheck (val) {
      if (!val[0]) {
        const index = this.checked.indexOf(val[1])
        this.checked.splice(index, 1)
      } else {
        this.checked.push(val[1])
      }

      this.selectedYear = this.checked.length === this.data.length
    },

    handleYearSelect (e) {
      e.preventDefault()

      const val = e.target.checked
      if (!val) {
        this.checked = []
      } else {
        this.checked = this.data.map(el => el.month)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    main {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        header {
            .title {
                font-weight: 500;
                .text {
                    padding-left: 25px;
                }

            }
        }

        .options {
            padding: 0 20px;
            display: flex;
            flex-direction: column;

            .item {
                color: #7a7a7a;
            }
        }
    }
</style>
