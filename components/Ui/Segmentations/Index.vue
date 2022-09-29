<template>
  <div class="segmentation">
    <figure @click="goTo(`/products/${data.slug}`)">
      <img v-if="data.category_image" :src="spacesURL + data.category_image" :alt="data.category.toLowerCase()">
    </figure>
    <div class="categories">
      <template v-for="(item, i) in data.childrens">
        <span :key="i" @click="goTo(`/products/${item.slug}`)">{{ item.name.en }}</span>
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
  },

  data () {
    return {
      spacesURL: process.env.uploadURL
    }
  },

  methods: {
    goTo (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style lang="scss" scoped>
    .segmentation {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        text-transform: uppercase;

        figure {
            cursor: pointer;
            height: 200px;
            width: 200px;
            display: flex;
            align-items: center;
            background: rgba(255,255,255,0.1);
            border-radius: 2px;
            img {
                width: 100%;
                object-fit: contain;
                -webkit-user-drag: none;
            }
        }

        .categories {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;

            span {
                cursor: pointer;
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    width: 0px;
                    height: 2px;
                    background: white;
                    transition: 0.2s;
                }

                &:hover {
                    &::before {
                        width: 100%;
                    }
                }
            }

        }
    }
</style>
