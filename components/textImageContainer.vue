<template>
  <section :class="{reverse}">
    <figure>
      <img :src="data.media" alt="image">
    </figure>
    <article>
      <h2 class="font-weight-normal text-uppercase">
        {{ data.title }}
      </h2>
      <span v-html="data.content" />
    </article>
  </section>
</template>
<script>
export default {
  name: 'TextImageContainer',
  props: {
    reverse: {
      type: Boolean,
      default: () => false
    },
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
    section {
        margin: 0 auto;
        gap: 4rem;
        width: 80%;
        max-width: 1600px;
        padding: 80px 0;

        &.reverse {
            flex-direction: row-reverse;

            @media screen and (max-width: 1200px){
                flex-direction: column;
            }
        }

        figure {
            width: 100%;

            @media screen and (max-width: 1200px){
                width: 100%;
            }

            img {
                width: 100%;
                object-fit: cover;
                -webkit-user-drag: none;
                margin-bottom: 1rem;
            }
        }

        article {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
            text-align: center;

            @media screen and (max-width: 1200px){
                width: 100%;
            }

            h2 {
                font-size: 2.125rem;
            }
        }
    }
</style>
