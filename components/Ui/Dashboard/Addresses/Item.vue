<template>
  <div class="item">
    <label class="data">
      <span class="main">{{ data.address_first_line }}</span>
      <span>{{ data.address_second_line }}</span>
      <div class="extra">
        <span>{{ data.city }}</span>
        <span>{{ data.post_code }}</span>
      </div>
    </label>
    <span class="edit" @click="$emit('edit')">{{ $t('edit_address') }}</span>
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
        border: solid 1px #E0E0E0;
        padding: 20px 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        .data {
            display: flex;
            flex-direction: column;
            user-select: none;

            .main {
                font-weight: 600;
            }

            span {
                font-weight: 500;
            }

            .extra {
                span {
                    font-weight: 400;
                }
            }
        }

        .edit {
            cursor: pointer;
            user-select: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
