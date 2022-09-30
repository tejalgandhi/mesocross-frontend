<template>
  <div class="tab" :class="{active}" @click="$emit('select')">
    <span>{{ $t(data.name) }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },

    active: {
      type: Boolean,
      default: () => false
    }
  }
}
</script>

<style lang="scss" scoped>
    .tab {
        padding: 10px 30px;
        user-select: none;
        cursor: pointer;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        transition: 0.2s;

        &:hover {
            background: #191b1d;
        }

        @media screen and (max-width: 768px) {
            text-align: center;
        }

        &.active {
            background: #25282A;

            &::before {
                position: absolute;
                content: '';
                width: 4px;
                left: 0;
                top: 0;
                height: 100%;
                background: #F5F5F5;
            }

            span {
                font-weight: 500;
            }
        }

        span {
            font-size: 20px;
        }
    }
</style>
