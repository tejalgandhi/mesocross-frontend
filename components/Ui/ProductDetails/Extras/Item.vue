<template>
  <article>
    <header @click="$emit('opened')">
      <h2>{{ $t(title) }}</h2>
      <span class="plus" :class="{minus: opened}" />
    </header>
    <div v-show="opened" class="data">
      <div class="product-data" :class="{opened: showDiv}" v-html="data" />
    </div>
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => ''
    },
    data: {
      type: String,
      default: () => ''
    },
    opened: {
      type: Boolean,
      default: () => false
    }
  },

  data () {
    return {
      showDiv: false
    }
  },

  watch: {
    opened: {
      immediate: true,
      handler (val) {
        setTimeout(() => {
          this.showDiv = val
        }, 1)
      }

    }
  }
}
</script>

<style lang="scss" scoped>
    article {
        width: 100%;
        display: flex;
        flex-direction: column;

        header {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            user-select: none;

            h2 {
                font-size: 28px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .plus {
                width: 20px;
                height: 20px;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;

                &::before, &::after {
                    content: '';
                    position: absolute;
                    background: white;
                    transition: 0.2s;
                }

                &:before {
                    width: 20px;
                    height: 1px;
                }

                &:after {
                    height: 20px;
                    width: 1px;
                }

                &.minus {
                     &:after {
                        height: 0px;
                        width: 1px;
                    }
                }
            }
        }

        .data {
            max-height: 150px;
            overflow: auto;
            .product-data {
                opacity: 0;
                transform: translateY(-10%);
                transition: 0.4s;

                &.opened {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        }

    }
</style>

<style lang="scss">
.product-data {
    p {
        font-weight: 100;
        font-size: 24px;
    }
}
</style>
