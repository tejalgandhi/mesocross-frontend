
<template>
  <section :class="{reverse}">
    <figure class="image-section">
      <nuxt-img :src="data.media" alt="image" />
    </figure>
    <article class="content-section">
      <h2>{{ data.title }}</h2>
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
        display: flex;
        align-items: center;
        width: 80%;
        max-width: 1600px;
        padding: 0;
        margin: 0 auto;
        @media screen and (max-width: 1200px){
            flex-direction: column;
            width: 85%;
        }

        &.reverse {
            flex-direction: row-reverse;

            @media screen and (max-width: 1200px){
                flex-direction: column;
            }
        }

        figure {
            width: 50%;
            height: 480px;

            @media screen and (max-width: 1200px){
                width: 100%;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                -webkit-user-drag: none;
                filter: grayscale(100%);
            }
        }

        article {
            width: 50%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
            padding: 0 80px;

            @media screen and (max-width: 1200px){
                width: 100%;
                padding: 0;
            }

            h2 {
                font-size: 2.125rem;
                font-weight: normal;
            }

            p{
              margin-bottom: 15px;
            }

        }
    }
</style>
