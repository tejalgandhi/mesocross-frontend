<template>
  <section>
    <div class="items" @mouseleave="$emit('close')">
      <template v-for="(tab, i) in data">
        <article :key="i">
          <span class="title" @click="tab.slug ? goTo(tab) : ''">{{ tab.name }}</span>
          <ul>
            <template v-for="(item, index) in tab.children">
              <li :key="index" :class="{underline: item.name.toLowerCase().includes('all')}" @click="item.slug ? goTo(item, tab) : ''">
                <span>{{ item.name }}</span>
              </li>
            </template>
          </ul>
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
      if (!to) { return }

      if (to.type) {
        this.$router.push(`/${to.type}/${to.slug.replace('/', '')}`)
        return
      }

      this.$router.push(`/${to.slug.replace('/', '')}`)
    }
  }
}
</script>

<style lang="scss" scoped>
    section {
        .items {
              position: absolute;
              top: 100%;
              grid-gap: 4rem;
              gap: 4rem;
              padding: 1.5rem;
              margin: 0 auto;
              text-transform: uppercase;
              background: #fff;
              color: #000;
              transform: translateX(-50%);
              left: 50%;
              width: 200px;
              &:before {
                  content: "";
                  position: absolute;
                  width: 12px;
                  height: 12px;
                  display: block;
                  top: -6px;
                  left: 50%;
                  transform: translateX(-50%) rotate(45deg);
                  background: #FFF;
              }

            article {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                &:last-child{
                      grid-gap: 0;
                }
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
                    margin: 0;

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
