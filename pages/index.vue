<template>
  <div>
    <div v-if="banner" class="banner mb-5">
      <section>
        <h1 class="title font-weight-normal">
          {{ banner.title }}
        </h1>
        <p class="text px-lg-5">
          {{ banner.message }}
        </p>
        <HomeLinkSetByType :item="banner" :title="'Discover'" class="btn-primary" />
      </section>
      <img :src="uploadPath + banner.image">
    </div>

    <!-- <div v-if="treatmentSolutions.length" class="treatment">
      <div class="container-fluid treatment-items px-0 px-md-3">
        <h2 class="responsive-treatment-title">
          {{ $t('treatment_solutions') }}
        </h2>
        <client-only>
          <UiSwiper :data="treatmentSolutions" :template="'image'" />
        </client-only>
      </div>
    </div> -->
    <!-- <HomeProductGroup :title="'best_sellers'" :api="'bestsellers'" /> -->
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
    }),
    uploadPath () {
      return process.env.uploadURL
    }
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
      @media (max-width:991px) {
        flex-direction: column;
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
