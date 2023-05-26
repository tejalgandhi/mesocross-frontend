<template>
    <table>
        <thead>
            <template v-for="(item, i) in headItems">
                <span :key="i" :style="{ width: `${100 / headItems.length}%` }">{{ $t(item) }}</span>
            </template>
        </thead>
        <tbody>
            <template v-if="entries.length">
                <template v-for="(orders, index) in entries">
                    <div :key="index" class="row">
                        <template v-for="(order, i) in orders">
                            <div class="item" :key="i" :style="{ width: `${100 / headItems.length}%` }"
                                @click="handleItemClick(index, order.template)">
                                <UiTableItem :data="order" />
                            </div>
                        </template>
                    </div>
                </template>
            </template>
            <template v-else>
                <div class="row">
                    <span class="nan">{{ $t('no_entries_to_show') }}</span>
                </div>
            </template>
        </tbody>
    </table>
</template>

<script>
export default {
  props: {
    headItems: {
      type: Array,
      default: () => []
    },

    entries: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    handleItemClick (index, template) {
      const id = this.entries[index][0].id
      const value = template !== 'cancel' ? { tag: 'show', id } : { tag: 'cancel', id }
      this.$emit('itemClick', value)
    }
  }
}
</script>

<style lang="scss" scoped>
table {
    width: 100%;

    thead {
        background: #dde6ea;
        width: 100%;
        display: flex;
        color: #25282A;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding-inline: 10px;

        span {
            text-align: center;
            // border-right: solid 1px $beige;
            padding: 10px 0;

            &:last-of-type {
                border-right: unset;
            }
        }
    }

    tbody {
        display: flex;
        flex-direction: column;
        border: solid 1px;
        border-color: transparent #25282A #25282A #25282A;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;

        .row {
            height: 4rem;
            padding-inline: 10px;
            display: flex;

            .nan {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                user-select: none;
            }
        }
    }
}
</style>
