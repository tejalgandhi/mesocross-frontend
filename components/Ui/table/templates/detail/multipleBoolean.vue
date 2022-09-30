<template>
  <div class="item">
    <label>{{ data.label }}</label>
    <div class="status">
      <template v-for="(item, i) in data.data">
        <div :key="i">
          <label>{{ item.label }}</label>
          <span :class="{pending: !item.value}">{{ item.data }}</span>
        </div>
      </template>
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
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
        font-weight: 600;
    }

    .status {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        div {
            display: flex;
            justify-content: space-between;

            label {
                font-weight: 500;
            }

            span {
                color: black;

                &.pending {
                    color: red;
                }
            }
        }
    }
}

</style>
