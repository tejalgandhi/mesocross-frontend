<template>
  <div class="item">
    <figure v-if="data.image">
      <img :src="data.image" alt="product_image">
    </figure>
    <div class="info">
      <span>{{ data.name }}</span>
      <span>{{ $t('order.size') }}: <b>{{ data.size }}</b></span>
      <span>{{ $t('order.quantity') }}: <b>{{ data.quantity }}</b></span>
      <span>{{ $t('order.price') }}: <b>{{ data.price }}€</b></span>
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
  }
}
</script>

<style lang="scss" scoped>
    .item {
        width: 100%;
        height: 10rem;
        display: flex;
        justify-content: center;
        gap: 1rem;
        border-bottom: solid 1px rgba(0,0,0,0.1);

        figure {
            height: 9rem;
            width: 9rem;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .info {
            width: calc(100% - 8rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            gap: 0.5rem;
            text-align: right;
            font-size: 14px;
        }
    }
</style>
