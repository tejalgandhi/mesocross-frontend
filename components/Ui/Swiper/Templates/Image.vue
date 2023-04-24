<template>
  <article id="swipe-item" @click="goTo">
    <figure>
      <nuxt-img :src="data.image" alt="icon" />
    </figure>
    <span>
      {{ data.name }}
    </span>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  },

  methods: {
    goTo () {
      this.$router.push(`products/ts/${this.data.slug}`)
    }
  }
}
</script>

<style lang="scss" scoped>
    article {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        figure {
            width: 5rem;
            height: 3.5rem;

            @media screen and (max-width: 768px){
                width: 6rem;
            }

            img {
                width: 100%;
                user-drag: none;
                -webkit-user-drag: none;
                user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
            }
        }
        span {
            width: 100%;
            white-space: nowrap;
        }
    }
</style>
