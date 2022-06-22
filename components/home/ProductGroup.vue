<template>
  <main v-if="newProducts.length > 0">
    <h3 class="text-uppercase mb-4">
      {{ $t(title) }}
    </h3>
    <section>
      <template v-for="(item,index) in newProducts">
        <article :key="index" class="prod_box" @click="$router.push(`/product-detail/${item.slug}`)">
          <figure>
            <nuxt-img
              preload
              format="webp"
              :src="item.feature_image"
              alt="product"
              class="product"
              quality="100"
              sizes="xs:256 md:512"
            />
          </figure>
          <img v-if="isNew" src="@/assets/img/new-badge.png" alt="badge" class="badge_new">
          <div class="desc_box">
            {{ item.name }}
            <p>{{ item.short_description }}</p>
            <span v-if="$auth.loggedIn">{{ item.product_size.price }}€</span>
          </div>
        </article>
      </template>
    </section>
    <nuxt-link to="/products" class="btn btn-outline-primary">
      {{ $t('see_all_products') }}
    </nuxt-link>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    api: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    isNew: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      newProducts: [],
      settings1: {
        dots: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        edgeFriction: 0.35,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      }
    }
  },
  async fetch () {
    const { data } = await this.$axios.get(`/products/${this.api}?isSinglePrice=true`)
    this.newProducts = data.data
  },
  fetchOnServer: true,
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
  }
}
</script>

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    width: 100%;
    padding: 40px 0;

    h2 {
        text-align: center;
        display: block;
        font-size: 40px;
        font-weight: 500;
        margin-bottom: 40px;
    }

    section {
        display: flex;
        justify-content: center;
        gap: 4rem;
        width: 100%;
        max-width: 1600px;

        @media screen and (max-width: 1400px){
            max-width: 1200px;
            flex-direction: column;
            align-items: center;
        }

        article {
            width: 25%;
            display: flex;
            flex-direction: column;
            position: relative;
            user-select: none;
            cursor: pointer;

            @media screen and (max-width: 768px){
                width: 80%;
            }

            &:hover {
                figure {
                    .product {
                        transform: scale(1.1);
                    }
                }
            }

            figure {
                width: 100%;
                min-height: 200px;
                overflow: hidden;

                .product {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: 0.5s;
                }
            }

            .badge_new {
                width: 50px;
                height: 50px;
                position: absolute;
                top: -25px;
                left: -25px;
            }
        }

        .desc_box {
            text-align: center;
        }
    }
}

</style>
