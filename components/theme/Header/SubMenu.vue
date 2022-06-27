<template>
  <section>
    <div class="menu-overlay" />
    <div class="items" @mouseleave="$emit('close')">
      <template v-for="(tab, i) in data">
        <article :key="i">
          <template v-if="tab.image">
            <figure v-if="tab.name.toLowerCase() === 'see all'" @click="tab.slug ? goTo(tab) : ''">
              <nuxt-img
                preload
                format="webp"
                src="https://admin.mesosystem.connectgeneration.app/uploads/mccm/img/628cf394523a0-1653404564.jpg"
                :alt="tab.slug"
                quality="100"
                sizes="xs:256 md:512"
              />
            </figure>
            <figure v-else @click="tab.slug ? goTo(tab) : ''">
              <nuxt-img
                preload
                format="webp"
                :src="tab.image"
                :alt="tab.slug"
                quality="100"
                sizes="xs:256 md:512"
              />
            </figure>
            <span class="title" @click="tab.slug ? goTo(tab) : ''">{{ tab.name }}</span>
          </template>
          <template v-else>
            <span class="title" @click="tab.slug ? goTo(tab) : ''">{{ tab.name }}</span>
            <ul>
              <template v-for="(item, index) in tab.children">
                <li :key="index" :class="{underline: item.name.toLowerCase().includes('all')}" @click="item.slug ? goTo(item, tab) : ''">
                  <span>{{ item.name }}</span>
                </li>
              </template>
            </ul>
          </template>
        </article>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: false,
      default: () => []
    },
    slug: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  methods: {
    goTo (to, tab) {
      if (tab?.name === 'Treatment Solutions') {
        this.$router.push(`/products/ts/${to.slug}`)
        return
      }

      if (tab?.name === 'Professional') {
        if (to.name.toLowerCase() === 'all products') {
          this.$router.push('/products')
          return
        }
        this.$router.push(`/products/${to.slug}`)
        return
      }

      if (tab?.name === 'Treatment Packs') {
        if (to.name.toLowerCase() === 'all packs') {
          this.$router.push(`/products/${to.slug}`)
          return
        }
        this.$router.push(`/product-detail/${to.slug}`)
        return
      }

      if (this.slug[0].custom_slug === 'blogs') {
        this.$router.push(`/blog-detail/${to.slug}`)
        return
      }

      if (this.slug[0].custom_slug === 'equipments') {
        if (to.slug === 'see-all-equipment') {
          this.$router.push('/equipments')
          return
        }
        this.$router.push(`/equipment-details/${to.slug}`)
        return
      }

      if (this.slug[0].custom_slug) {
        this.$router.push(`/${this.slug[0].custom_slug}/${to.slug}`)
        return
      }

      this.$router.push(`${to.slug}`)
    }
  }
}
</script>

<style lang="scss" scoped>
    section {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        display: flex;
        justify-content: center;
        z-index: 70;

        .menu-overlay {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 100px;
            left: 0;
            background: #25282ac7;
        }

        .items {
            position: absolute;
            top: 100px;
            width: 90%;
            padding: 0 1rem;
            background: white;
            border: 0.5px solid #DCDCDC;
            display: flex;
            gap: 4rem;
            padding: 2rem 10.5rem;

            article {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                .title {
                    font-weight: 600;
                    user-select: none;
                    cursor: pointer;
                }

                figure {
                    width: 15rem;
                    height: 10rem;
                    background: #F4F4F4;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }

                ul {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;

                    li {
                        user-select: none;
                        cursor: pointer;
                        transition: 0.2s;

                        &:hover {
                            color: grey;
                        }

                        &.underline {
                            margin-top: 0.5rem;
                            font-weight: 500;
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
</style>
