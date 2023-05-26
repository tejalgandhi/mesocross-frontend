<template>
    <div class="details-container">
        <div class="overlay" @click="$emit('close')" />
        <div class="details">
            <div class="header">
                <h2>{{ data.title }}</h2>
                <span>{{ $t('order.created_at') }} {{ localeDate }}</span>
                <span class="close" @click="$emit('close')" />
            </div>
            <div class="items">
                <template v-if="data.products">
                    <template v-for="(item, i) in data.products">
                        <UiTableTemplatesProduct :key="`product-${i}`" :data="item" />
                    </template>
                </template>
                <template v-for="(item, index) in data.items">
                    <UiTableTemplatesDetailTotalValue
                        v-if="item.template === 'total-value' || item.template === 'sub-value'" :key="`value-${index}`"
                        :light="item.template === 'sub-value'" :data="item" />
                    <UiTableTemplatesDetailMultipleBoolean v-else-if="item.template === 'multiple-boolean'"
                        :key="`boolean-${index}`" :data="item" />
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    localeDate () {
      if (!this.data.date) { return }

      const date = new Date(this.data.date)
      return date.toLocaleString(this.$i18n.locale, { day: 'numeric', month: 'long', year: 'numeric' })
    }
  }
}
</script>

<style lang="scss" scoped>
.details-container {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 100;

    .overlay {
        position: absolute;
        background: grey;
        opacity: 0.8;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    .details {
        width: 95%;
        height: 95%;
        max-width: 500px;
        max-height: 700px;
        background: white;
        border-radius: 4px;
        z-index: 1;
        color: black;

        .header {
            height: 5rem;
            width: 100%;
            border-bottom: solid 1px grey;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            margin: 0;

            h2 {
                font-size: 20px;
                text-transform: uppercase;
                color: black;
            }

            span {
                font-weight: 100;
                font-size: 12px;
            }

            .close {
                width: 16px;
                height: 16px;
                position: absolute;
                right: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                &::before,
                &::after {
                    content: '';
                    position: absolute;
                    width: 16px;
                    height: 1px;
                    background: black;
                }

                &::after {
                    transform: rotate(45deg);
                }

                &::before {
                    transform: rotate(-45deg);
                }
            }
        }

        .items {
            height: calc(100% - 5rem);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            overflow: auto;

            hr {
                border: none;
                width: 100%;
                height: 1px;
                background: rgba(0, 0, 0, 0.1);
            }
        }
    }
}
</style>
