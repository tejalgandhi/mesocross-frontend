<template>
  <section class="our-mission" :class="{first}">
    <figure class="bg">
      <div v-if="data.media" class="bg-overlay" />
      <nuxt-img v-if="data.media" :src="data.media" alt="background" />
      <span v-else class="white" />
    </figure>
    <article>
      <h2 :class="['text-uppercase', {color: !data.media}]">
        {{ data.title }}
      </h2>
      <button v-if="data.action_link" @click="goTo(data.action_link)">
        {{ data.action_text }}
      </button>
    </article>
  </section>
</template>
<script>

export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    first: {
      type: Boolean,
      default: () => false
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
    .our-mission {
        display: flex;
        justify-content: center;
        width: 100%;
        min-height: 600px;
        position: relative;

        &.first {
            margin-top: 80px;
        }

        .bg{
            position: absolute;
            z-index: -1;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;

            .bg-overlay {
                position: absolute;
                height: 100%;
                width: 100%;
                top: 0;
                left: 0;
                background: rgba(0,0,0,0.4);
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                -webkit-user-drag: none;
            }

            .white {
                height: 100%;
                width: 100%;
                background: white;
            }
        }

        article {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 60%;
            gap: 3rem;
            padding: 80px 0;
            @media screen and (max-width: 1200px){
                width: 90%;
            }

            h2 {
                color: white;
                font-size: 2.75rem;
                text-align: center;

                &.color {
                    color: #fff;
                }

                @media screen and (max-width: 1200px){
                    font-size: 2rem;
                }
            }

            button {
                background: none;
                border: solid 1px white;
                color: white;
                padding: 10px 50px;
                border-radius: 4px;
                transition: 0.2s;

                &:hover {
                    border: solid 1px transparent;
                    background: white;
                    color: #fff;
                }
            }
        }
    }
</style>
