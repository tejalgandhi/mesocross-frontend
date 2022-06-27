<template>
  <div class="container-fluid pb-4 training-detail">
    <div class="row">
      <div class="col-md-8 mt-4">
        <video ref="videoPlayer" controls class="w-100" height="500px">
          <source :src="trainingDetail.media" type="video/mp4">
          <source :src="trainingDetail.media" type="video/ogg">
          Your browser does not support HTML video.
        </video>
        <div class="heading-item">
          <h2>{{ trainingDetail.title }}</h2>
          <p>{{ $moment(trainingDetail.created_at).format('D MMMM, YYYY') }}</p>
        </div>

        <b-tabs content-class="nav nav-tabs">
          <b-tab title="About" active class="w-100">
            <div id="one1" class="tab-pane w-100 pb-3 fade show active border-0" role="tabpanel">
              <p class="tab-text">
                {{ trainingDetail.description }}
              </p>
            </div>
          </b-tab>
          <b-tab title="Products">
            <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel">
              <div class="row">
                <div v-for="(product, index) in trainingDetail.products" :key="index" class="col-md-4">
                  <nuxt-link :to="`/product-detail/${product.slug}`">
                    <div class="training-product-box text-center">
                      <img :src="product.feature_image" class="mb-5 mx-auto" alt="image">
                      <h5>{{ product.name }}</h5>
                      <p class="my-2">
                        {{ product.short_description }}
                      </p>
                      <small>{{ product.product_size[0].price }}€</small>
                    </div>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
      <div class="col-md-4 recommend mt-4">
        <div class="steps border">
          <div class="py-3 border-bottom">
            <h3 class="step-heading text-left px-3">
              Steps
            </h3>
          </div>
          <ul>
            <li
              v-for="(item, index) in videoSteps"
              :key="index"
              :class="stepActive === index ? 'active' : ''"
              class="p-3 text-left d-flex align-items-center step-box"
              @click="clickActive(index)"
            >
              <img :src="item.thumbnail" alt="image">
              <div class="ml-4">
                <h5 class="heading text-left mt-0">
                  {{ item.title }}
                </h5>
                <p class="time px-2 py-1">
                  {{ item.step_duration | convertSecondIntoMinute }}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <h5 class="my-2">
          Recommended for you
        </h5>
        <div
          v-for="(item, index) in recommendItems"
          :key="index"
          class="recommend-box d-flex mb-3"
        >
          <img src="@/assets/img/training-bg.webp" alt="image">
          <div>
            <h6>{{ item.title }}</h6>
            <p class="my-1">
              {{ item.desc }}
            </p>
            <small>{{ item.date }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    convertSecondIntoMinute (duration) {
      const hrs = ~~(duration / 3600)
      const mins = ~~((duration % 3600) / 60)
      const secs = ~~duration % 60

      let ret = ''

      if (hrs > 0) {
        ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
      }

      ret += '' + mins + ':' + (secs < 10 ? '0' : '')
      ret += '' + secs
      return ret
    }
  },
  async asyncData ({ $axios, params, redirect }) {
    try {
      const { data } = await $axios.get(`training-detail/${params.slug}`)
      const videoSteps = data.data.steps
      const trainingDetail = data.data
      return { videoSteps, trainingDetail }
    } catch (error) {
      redirect('/training-pack')
    }
  },
  data () {
    return {
      stepActive: 0,
      recommendItems: [
        {
          title: 'How to reduce fat through controlled cold…',
          desc: 'Focusing on innovation and development, we…',
          date: '9 de jun. De 2021'
        },
        {
          title: 'How to reduce fat through controlled cold…',
          desc: 'Focusing on innovation and development, we…',
          date: '9 de jun. De 2021'
        },
        {
          title: 'How to reduce fat through controlled cold…',
          desc: 'Focusing on innovation and development, we…',
          date: '9 de jun. De 2021'
        },
        {
          title: 'How to reduce fat through controlled cold…',
          desc: 'Focusing on innovation and development, we…',
          date: '9 de jun. De 2021'
        }
      ]
    }
  },
  methods: {
    clickActive (selectedIndex) {
      this.stepActive = this.videoSteps.findIndex(
        (rank, index) => selectedIndex === index
      )
      const currentStep = this.videoSteps[selectedIndex]
      this.videoStartFrom(currentStep.start)
    },
    videoStartFrom (stratTime = 0) {
      this.$refs.videoPlayer.currentTime = stratTime
    }
  }
}
</script>

<style>
.heading-item h2 {
  font: normal normal 500 30px Work Sans;
  margin: 15px 0;
  color: #25282A;
}
.recommend h5 {
  font: normal normal 500 30px Work Sans;
  margin: 15px 0;
  color: #25282A;
}
.heading-item p {
  font: normal normal normal 16px Work Sans;
  color: #54565A;
  margin-bottom: 30px;
}
.tab-text {
  max-width: 686px;
  width: 100%;
  font: normal normal 300 16px Work Sans;
  color: #54565A;
}
.training-detail .nav-tabs {
  border-bottom: 0 !important;
}

.step-box {
  cursor: pointer;
  width: 100%;
}
.step-box.active {
  background: #F6F7F7;
}
.recommend-box img {
  height: 100px;
  width: 180px;
  margin-right: 10px;
}

.recommend-box h6 {
  font: normal normal 600 16px Work Sans;
  color: #25282A;
}

.recommend-box p {
  font: normal normal normal 14px Work Sans;
  color: #54565A;
}

.recommend-box small {
  font: normal normal normal 12px Work Sans;
  color: #54565A;
}

.steps {
  border-radius: 4px;
  min-height: 500px;
}
.steps img {
  height: 60px;
  width: 100px;
}
.steps .heading {
  font: normal normal 500 20px Work Sans;
  color: #25282A;
}
.steps h3 {
  font: normal normal 500 20px Work Sans;
  color: #25282A;
}
.steps .time {
  background: #F6F6F6;
  border-radius: 2px;font: normal normal 600 14px Work Sans;
  letter-spacing: -0.34px;
  width: max-content;
  color: #25282A;
}

.training-product-box h5 {
  font: normal normal 500 18px Work Sans;
  color: #54565A;
}
.training-product-box p {
  font: normal normal 300 16px Work Sans;
  color: #54565A;
}
.training-product-box small {
  font: normal normal normal 14px Work Sans;
  color: #54565A;
}
</style>
