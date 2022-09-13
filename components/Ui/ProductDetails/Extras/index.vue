<template>
  <div class="product-details">
    <template v-for="(item, i) in items">
      <UiProductDetailsExtrasItem :key="i" :opened="opened === i" :title="item.name" :data="data[item.tag]" @opened="handleOpened(i)" />
    </template>
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

  data () {
    return {
      items: [
        {
          name: 'description',
          tag: 'product_content'
        },
        {
          name: 'details',
          tag: 'additional_info'
        },
        {
          name: 'benefits',
          tag: 'characteristics_effect'
        },
        {
          name: 'how_to_apply',
          tag: 'application'
        }
      ],

      opened: 0
    }
  },

  methods: {
    handleOpened (index) {
      this.opened = index
    }
  }
}
</script>

<style lang="scss" scoped>
    .product-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 100%;
        height: 100%;
        transition: 0.4s;
        gap: 2rem;
    }
</style>
