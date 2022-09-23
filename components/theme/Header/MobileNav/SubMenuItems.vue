<template>
  <div class="sub-items">
    <div class="main" @click="handleMainItemClick">
      <span>{{ data.name }}</span>
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
      if (this.data && this.data.children.length !== 0) {
        this.openSub = !this.openSub
      } else if (this.data.slug) {
        this.goTo(this.data)
      }
    },

    goTo (to, tab) {
      this.$emit('close')

      if (to.type === 'category') {
        this.$router.push(`/products/${to.slug.replace('/', '')}`)
        return
      }

      if (to.type === 'products') {
        this.$router.push(`/products/${to.slug}`)
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
