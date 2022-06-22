<template>
  <div class="about">
    <div class="banner">
      <div class="banner-content">
        <figure>
          <img :src="banner.image" alt="banner">
        </figure>
        <div class="text">
          <h1>{{ banner.title }}</h1>
          <span class="message">{{ banner.message }}</span>
        </div>
      </div>
    </div>
    <Bredcrumb class="mb-0" :items="breadcrumbs" />
    <main>
      <div class="about-training-container">
        <div class="main-features">
          <h6>{{ head.title }}</h6>
          <div v-html="head.content" />
        </div>
        <div class="main-features">
          <h6>{{ mainFeatures.title }}</h6>
          <div v-html="mainFeatures.content" />
        </div>
        <TrainingComponent :data="solutions" />
        <div class="main-features">
          <h6>{{ mobileApp.title }}</h6>
          <div v-html="mobileApp.content" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  filters: {
    documentContent (val) {
      return val.substring(0, 73)
    }
  },
  async asyncData ({ $axios }) {
    const url = '/get-page-content?page=training-about'
    const { data } = await $axios.$get(url)
    return { data }
  },
  data () {
    return {
      data: [],
      paginate: {},
      trainings: [],
      banner: {},
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
          active: 0
        },
        {
          path: '/',
          label: 'About Mccm',
          active: 0
        },
        {
          path: '/',
          label: 'Mccm Training',
          active: 1
        }
      ]
    }
  },
  computed: {
    mainFeatures () {
      return this.data.find(val => val.slug === 'mccm-training-about-1')
    },
    solutions () {
      return this.data.find(val => val.slug === 'mccm-training-about-2')
    },
    mobileApp () {
      return this.data.find(val => val.slug === 'mccm-training-about-3')
    },
    head () {
      return this.data.find(val => val.slug === 'mccm-training-about-4')
    },
    ...mapGetters({
      getIsSubscribed: 'training/getIsSubscribed'
    })
  },

  created () {
    this.fetchBanner()
  },

  mounted () {
    this.getMostPopular()
  },
  methods: {
    async fetchBanner () {
      const url = '/sliders?type=banner&page=training'
      const response = await this.$axios.$get(url)
      this.banner = response.data[0]
    },
    loadMoreTraining () {
      const page = this.paginate.meta.current_page + 1
      this.getMostPopular(page)
    },
    async getMostPopular (page = 1) {
      const { data } = await this.$axios.get(`training-with-page?page=${page}&per_page=4&order_by=user_views`)
      const paginate = Object.assign({}, data)
      delete paginate.data
      this.paginate = paginate
      if (page > 1) {
        this.trainings = [...this.trainings, ...data.data]
      } else {
        this.trainings = data.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .banner {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .banner-content {
            width: 90%;
            height: 433px;
            position: relative;

            figure {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: -1;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .text {
                width: 50%;
                height: 100%;
                padding: 4rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 1rem;

                @media screen and (max-width: 1200px){
                    width: 100%;
                    padding: 2rem;
                }

                h1 {
                    font-weight: 500;
                    font-size: 40px;
                }
            }
        }
    }

    main {
        width: 100%;
        display: flex;
        justify-content: center;

        .about-training-container {
            width: 90%;
            display: flex;
            flex-direction: column;

            .main-features {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                padding: 2rem;

                h6 {
                    font-weight: 600;
                    font-size: 1.5rem;
                }

                div {
                    display: flex;
                    gap: 2rem;
                    flex-wrap: wrap;
                    justify-content: space-around;
                    @media screen and (max-width: 768px){
                        flex-direction: column;
                        text-align: center;
                    }

                    p {
                        font-weight: 500;
                    }
                }
            }
        }
    }
</style>
