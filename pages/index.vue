<template>
  <div>
    <div v-if="banner" class="banner">
      <section>
        <div class="banner-content">
          <h1 class="title font-weight-normal">
            {{ banner.title }}
          </h1>
          <p class="text col-lg-10 mx-auto">
            {{ banner.message }}
          </p>
        </div>
        <HomeLinkSetByType :item="banner" :title="'Discover'" class="btn-primary" />
      </section>
      <img :src="banner.image">
    </div>

    <HomeProductGroup :title="'new_collection'" :api="'new-collection'" :is-new="true" />
    <HomeBlogs />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Index',
  data () {
    return {
      banner: []
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.$get('/sliders?type=banner&page=home')
      if (data && data.length) {
        this.banner = data[0]
      }
    } catch (e) {
      // console.log(e.message)
    }
  },
  fetchOnServer: true,
  computed: {
    ...mapGetters({
      treatmentSolutions: 'product/getHomePageTeatmentSolutions'
    })
  },
  mounted () {
    this.getTreatmentSolutions()
  },
  methods: {
    ...mapActions({
      setTreatment: 'product/setTreatment',
      getTreatmentSolutions: 'product/getTreatmentSolutions'
    }),
    getSliders () {
      this.$nextTick(async () => {
        try {
          this.$nuxt.$loading.start()
          const { data } = await this.$axios.$get('/sliders?type=banner&page=home')
          this.$nuxt.$loading.finish()
          if (data && data.length) {
            this.banner = data[0]
          }
        } catch (e) {
          // console.log(e.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
    position: relative;
    background-color: black;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 88px;
      @media (max-width:991px) {
        flex-direction: column;
        padding-bottom: 60px;
      }

      .banner-content {
        max-width: 520px;
        margin-left: auto;
      }

    img {
        width: auto;
        min-width: 50%;
        object-fit: cover;
        height: 33rem;
        @media (max-width:991px) {
            min-height: 300px;
            object-fit: contain;
            height: auto;
        }
    }

    section {
        position: absolute;
        top: 50%;
        left: 6rem;
        transform: translate(0, -50%);
        width: 40%;
        text-align: center;
        color: white;
         @media (max-width:991px) {
          position: static;
          width: 100%;
          transform: none;
          padding: 2rem;
         }
        h1 {
            margin-bottom: 1rem;
        }

        p {
            margin-bottom: 2rem;
        }
    }
}
</style>
