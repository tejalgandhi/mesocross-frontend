<template>
  <div class="banner">
    <div v-if="!$fetchState.pending" class="container-fluid position-relative px-0 px-md-3">
      <div v-if="isMobile()" class="overlay" />
      <nuxt-img
        v-if="data && data.banner"
        preload
        format="webp"
        :src="data.banner"
        alt="banner"
        quality="100"
        sizes="xs:1024 md:1366 lg:1920"
      />
      <nuxt-img
        v-else-if="data && data.image"
        preload
        format="webp"
        :src="data.image"
        alt="banner"
        quality="100"
        sizes="xs:1024 md:1366 lg:1920"
      />
      <nuxt-img
        v-else
        preload
        format="webp"
        :src="require(`../assets/img/${defualtImageName}`)"
        alt="banner"
        quality="100"
        sizes="xs:1024 md:1366 lg:1920"
      />
      <div v-if="data" class="content" :class="{white: inverse}">
        <h1 v-if="data.title">
          {{ data.title }}
        </h1>
        <h1 v-else>
          {{ data.name }}
        </h1>
        <p v-if="data.message">
          {{ data.message }}
        </p>
        <p v-else>
          {{ data.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import isMobile from '@/mixins/isMobile'
export default {
  mixins: [isMobile],

  props: {
    pageName: {
      type: String,
      default: 'blog'
    },
    defualtImageName: {
      type: String,
      default: () => 'CG-EN-MCCM-2020-23.svg'
    },
    inverse: {
      type: Boolean,
      default: () => false
    }
  },

  data () {
    return {
      data: {},
      type: 'product'
    }
  },

  async fetch () {
    let url = `/sliders?type=banner&page=${this.pageName}`
    if (this.$route.params && this.$route.params.treatmentSlug) {
      url = `/get-treatment-banner?treatment_slug=${this.$route.params.treatmentSlug}&page=product`
      this.type = 'tretment'
    } else if (this.$route.params && this.$route.params.categorySlug) {
      url = `get-category-banner?category_slug=${this.$route.params.categorySlug}&page=product`
      this.type = 'category'
    }
    const { data } = await this.$axios.$get(url)
    this.data = this.type === 'product' ? data[0] : data
  }
}
</script>

<style lang="scss" scoped>

.container-fluid {
    display: flex;
    align-items: center;
}

.content {
    top: unset;

    &.white {
        color: white;
    }
}

.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
    background: rgba(255,255,255,0.5);
}
.banner .white.content h1,.banner .white.content p {
  color: #fff
}
</style>
