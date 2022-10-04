<template>
  <section>
    <div class="head">
      <div class="back" @click="$emit('back')">
        <span class="arrow" />
        <span>{{ $t('back') }}</span>
      </div>
      <h2>{{ title }}</h2>
    </div>

    <form @submit.prevent="sendData">
      <template v-for="(item, i) in data">
        <div :key="i" class="field">
          <h2>{{ $t(item.title) }}</h2>
          <template v-for="(field, index) in item.items">
            <UiDashboardInputs :key="index" :data="field" @selected="handleSelected" />
          </template>
        </div>
      </template>
      <button type="submit">
        <span>{{ $t('submit') }}</span>
        <span class="arrow" />
      </button>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: () => ''
    }
  },

  data () {
    return {
      finalData: {}
    }
  },

  methods: {
    handleSelected (data) {
      this.finalData[data.name] = data.value
    },

    sendData () {
      this.$emit('submit', this.finalData)
    }
  }
}
</script>

<style lang="scss" scoped>
    .head {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .back {
            display: flex;
            align-items: center;
            gap: 0.2rem;
            font-weight: 500;
            user-select: none;
            cursor: pointer;
            width: fit-content;

            &:hover {
                span {
                    text-decoration: underline;
                }
            }
            .arrow {
                width: 8px;
                height: 8px;
                border: solid 1px;
                border-color: #25282A #25282A transparent transparent;
                transform: rotate(-135deg);
                transition: 0.2s;
            }
        }

        h2 {
            font-weight: 600;
            font-size: 20px;
        }
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        padding: 10px 20px;
        border: solid 1px #E0E0E0;

        .field {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            h2 {
                font-weight: 600;
                font-size: 20px;
            }
        }

        button {
            margin: 10px 0 40px;
            width: 12rem;
            background: #25282A;
            color: white;
            padding: 10px 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            transition: 0.2s;

            &:hover {
                background: #25282ad0;
                .arrow {
                    margin-left: 5px;
                }
            }

            .arrow {
                width: 8px;
                height: 8px;
                border: solid 1px;
                border-color: white white transparent transparent;
                transform: rotate(45deg);
                transition: 0.2s;
            }
        }

    }
</style>
