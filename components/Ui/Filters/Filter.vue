<template>
  <div class="item">
    <h2 class="title">
      {{ data.name }}
    </h2>
    <div class="children">
      <template v-for="(item, i) in data.childrens">
        <span :key="i" :class="{active: isActive(item)}" @click="selectFilter(item)">{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    ...mapGetters({
      selectedFilters: 'product/getSelectedFilters'
    })
  },

  methods: {
    ...mapActions({
      selectFilter: 'product/selectFilter'
    }),

    isActive (item) {
      return this.selectedFilters.length ? this.selectedFilters.map(el => el.id).includes(item.id) && this.selectedFilters.map(el => el.name).includes(item.name) : false
    }

  }
}
</script>

<style lang="scss" scoped>
    .item {
        color: black;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        h2 {
            font-weight: 400;
            font-size: 30px;
            position: relative;
            display: flex;
            align-items: center;
            padding-left: 30px;
            cursor: pointer;
            user-select: none;
            @media screen and (max-width: 1200px){
                font-size: 24px;
            }

            &::before {
                content: '';
                position: absolute;
                left: 0;
                height: 8px;
                width: 8px;
                background: #B5B5B5;
                transform: rotate(45deg);
            }
        }

        .children {
            padding-left: 30px;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            span {
                position: relative;
                display: flex;
                align-items: center;
                font-weight: 200;
                font-size: 24px;
                padding-left: 30px;
                cursor: pointer;
                user-select: none;
                @media screen and (max-width: 1200px){
                    font-size: 20px;
                }

                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    height: 8px;
                    width: 8px;
                    background: #B5B5B5;
                    transform: rotate(45deg);
                    transition: 0.2s;
                }

                &.active {
                    &::before {
                        background: black;
                    }
                }
            }
        }
    }
</style>
