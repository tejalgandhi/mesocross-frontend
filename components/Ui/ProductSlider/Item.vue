<template>
  <article @click="goTo">
    <figure>
      <img :src="data.feature_image" alt="product_image">
    </figure>
    <div class="info">
      <header>
        <span class="star" />
        <span>{{ data.category }}</span>
        <span class="star" />
      </header>
      <h2>{{ data.name }}</h2>
      <hr>
      <span class="desc">{{ data.short_description }}</span>
      <span v-if="isLoggedin">{{ data.product_size[0].price }}€</span>
    </div>
  </article>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    }),

    ...mapGetters({
      categories: 'categories/getCategories'
    })
  },
  methods: {
    goTo () {
      const category = this.categories.find(el => el.name === this.data.category)
      const segment = category && category.segment_id.toString().length ? `?segment=${category.segment_id}` : ''
      this.$router.push(`/product-detail/${this.data.slug}${segment}`)
    }
  }
}
</script>

<style lang="scss" scoped>
    article {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        figure {
            width: 100%;
            height: 350px;
            overflow: hidden;
            display: flex;
            justify-content: center;

            img {
                height: 100%;
                -webkit-user-drag: none;
                object-fit: cover;
            }
        }

        .info {
            display: flex;
            flex-direction: column;
            align-items: center;

            header {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                span {
                    font-weight: 100;
                }

                .star {
                    width: 4px;
                    height: 4px;
                    background: white;
                    transform: rotate(45deg);
                    transition: 0.4s;
                }
            }

            h2 {
                font-weight: 600;
                font-size: 24px;
                text-align: center;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }

            hr {
                width: 2rem;
                height: 1px;
                border: none;
                background: white;
                margin: 10px 0 0;
            }

            .desc {
                font-weight: 100;
                font-size: 20px;
                text-transform: uppercase;
            }
        }
    }
</style>
