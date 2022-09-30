<template>
  <div class="item">
    <label :for="data.tag">{{ $t(data.name) }}</label>
    <label class="switch">
      <input
        :id="data.tag"
        v-model="value"
        type="checkbox"
      >
      <span class="boolean round" />
    </label>
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
      value: this.data.value || undefined
    }
  },

  watch: {
    value (val) {
      this.$emit('selected', { name: this.data.tag, value: val })
    }
  }
}
</script>

<style lang="scss" scoped>
    .item {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        label {
            font-weight: 500;
            position: relative;
        }

        .switch {
            display: flex;
            height: 15px;
            position: relative;
            width: 35px;
            margin: 0;
            position: relative;
            .boolean {
                background-color: #25282A;
                bottom: 0;
                cursor: pointer;
                left: 0;
                position: absolute;
                right: 0;
                top: 0;
                width: 36px;
                transition: 0.4s;

                &.round {
                    border-radius: 34px;

                    &::before {
                        border-radius: 50%;
                    }
                }

                &::before {
                    background-color: #fff;
                    bottom: -1px;
                    content: "";
                    height: 18px;
                    left: 0;
                    position: absolute;
                    transition: 0.4s;
                    width: 18px;
                    box-shadow: 0 0 5px rgba(0, 0, 0, 0.9);
                }
            }

            input {
                display: none;
                &:checked + .boolean {
                    background-color: #dde6ea;

                    &::before {
                        transform: translateX(18px);
                    }
                }
            }
        }

    }
</style>
