<template>
  <section>
    <figure>
      <img :src="data.media" class="img-fluid box-image" alt="image">
    </figure>
    <article>
      <h2>{{ data.title }}</h2>
      <!-- eslint-disable vue/no-v-html -->
      <div v-html="data.content" />
      <figure v-if="data.action_text === 'appbtns'" class="app-btns">
        <img src="@/assets/img/google_play.png" alt="google play" @click="goTo(links[0])">
        <img src="@/assets/img/app_store.png" alt="apple store" @click="goTo(links[1])">
      </figure>
    </article>
  </section>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    links () {
      return this.data.action_link.split(',')
    }
  },

  methods: {
    goTo (link) {
      window.open(link, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
    section {
        background: rgba(#FFF, 0.1);
        display: flex;
        padding: 2rem;

        @media screen and (max-width: 1200px){
            flex-direction: column;
            align-items: center;
        }

        figure, article {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;

            @media screen and (max-width: 1200px){
                width: 100%;
            }
        }

        figure {
            align-items: center;
        }

        article {
            padding-right: 10rem;
            gap: 2rem;

            @media screen and (max-width: 1200px){
                text-align: center;
                padding: 0;
            }

            h2 {
                width: 80%;
                font-weight: 600;
                font-size: 2rem;
                @media screen and (max-width: 1200px){
                    width: 100%;
                }
            }

            .app-btns {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                gap: 1rem;
                width: 100%;

                @media screen and (max-width: 1200px){
                    justify-content: center;
                }

                img {
                    cursor: pointer;
                    width: 200px;
                    max-width: 50%;
                    -webkit-user-drag: none;
                }
            }
        }
    }
</style>
