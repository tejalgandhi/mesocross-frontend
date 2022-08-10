<template>
  <div class="sub-items">
    <div class="main" @click="handleMainItemClick">
      <span>{{ data.name }}</span>
      <span class="arrow" :class="{up: openSub, go: !data.children }" />
    </div>
    <div v-if="openSub" class="secondary">
      <template v-for="(item, i) in data.children">
        <span :key="i" :class="{under: item.name.toLowerCase().includes('all')}" @click="item.slug ? goTo(item, data) : ''">{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    },
    main: {
      type: Object,
      required: false,
      default: () => {}
    }
  },

  data () {
    return {
      openSub: false
    }
  },

  methods: {
    handleMainItemClick () {
      if (this.data.children) { this.openSub = !this.openSub } else if (this.data.slug) {
        this.goTo(this.data)
      }
    },

    goTo (to, tab) {
      this.$emit('close')

      if (tab?.name === 'Treatment Solutions') {
        this.$router.push(`/products/ts/${to.slug}`)
        return
      }

      if (tab?.name === 'Professional') {
        if (to.name.toLowerCase() === 'all products') {
          this.$router.push('/products')
          return
        }
        this.$router.push(`/products/${to.slug}`)
        return
      }

      if (tab?.name === 'Treatment Packs') {
        if (to.name.toLowerCase() === 'all packs') {
          this.$router.push(`/products/${to.slug}`)
          return
        }
        this.$router.push(`/product-detail/${to.slug}`)
        return
      }

      if (this.main.custom_slug === 'blogs') {
        this.$router.push(`/blog-detail/${to.slug}`)
        return
      }

      if (this.main.custom_slug === 'equipments') {
        if (to.slug === 'see-all-equipment') {
          this.$router.push('/equipments')
          return
        }
        this.$router.push(`/equipment-details/${to.slug}`)
        return
      }

      if (this.main.custom_slug) {
        this.$router.push(`/${this.main.custom_slug}/${to.slug}`)
        return
      }

      this.$router.push(`${to.slug}`)
    }
  }
}
</script>

<style lang="scss" scoped>
    .sub-items {
        display: flex;
        flex-direction: column;

        .main {
            display: flex;
            justify-content: space-between;
            font-weight: 500;
            cursor: pointer;

            .arrow {
                width: 10px;
                height: 10px;
                border-top: solid 1px #FFF;
                border-right: solid 1px #FFF;
                transform: rotate(135deg);
                transition: 0.2s;

                &.up {
                    transform: rotate(-45deg);
                }
                &.go {
                    transform: rotate(45deg);
                }
            }
        }

        .secondary {
            padding: 0.5rem 20px;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            cursor: pointer;

            &.under {
                text-decoration: underline;
            }
        }
    }
</style>
