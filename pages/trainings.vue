<template>
  <div>
    <!-- <Banner :page-name="'training'" /> -->
    <div class="banner mb-5 text-center">
      <div
        class="container-fluid training-bg position-relative px-0 px-md-3 content-1 d-flex align-items-center"
        :style="{height: '300px'}"
      >
        <div class="px-2 content-data">
          <h1>Welcome to MESOCROSS trainings.</h1>
          <span class="name">Watch the trainings that MESOCROSS has available for you and increase your knowledge.</span>
          <button class="btn mt-3 bg-white px-5 text-dark">
            Watch trainings
          </button>
        </div>
      </div>
    </div>
    <div class="container-fluid main-content">
      <p class="font-16 categories" @click="isAllCategories = !isAllCategories">
        All Categories <i v-if="!isAllCategories" class="fa fa-angle-up ml-1" />
        <i v-else class="fa fa-angle-down ml-1" />
      </p>
      <div v-show="isAllCategories" class="row my-4">
        <div v-for="(val, index) in treatmentSolutions" :key="index" class="col-md-4 col-lg-3 mb-3">
          <div class="treatment-box" @click="searchByTreatment(val.id)">
            <div class="py-4 text-center">
              <img :src="val.image" class="img-fluid mb-2" alt="image">
              <p>{{ val.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <h1 v-if="selectedTreatment === ''" class="my-4">
        Home panel
      </h1>
      <p v-else>
        Home panel > <strong> {{ selectedTreatment }} </strong>
      </p>
      <b-tabs content-class="nav nav-tabs">
        <b-tab title="Most Populares" active class="w-100">
          <div id="one1" class="tab-pane w-100 pb-3 fade show  border-0" role="tabpanel">
            <template v-if="mostPopulars && mostPopulars.length">
              <VueSlickCarousel v-bind="settings1" class="row mx-0 pro_slider">
                <div v-for="(single, index) in mostPopulars" :key="index" class="mb-3 col-12 slide-item">
                  <TrainingSingle :single="single" />
                </div>
              </VueSlickCarousel>
            </template>
            <h1 v-else>
              No Data
            </h1>
          </div>
        </b-tab>
        <b-tab title="New" class="w-100">
          <div class="tab-pane pb-3 w-100 fade show active" role="tabpanel">
            <template v-if="newData && newData.length">
              <VueSlickCarousel v-bind="settings2" class="row mx-0 pro_slider">
                <div v-for="(newOne, index) in newData" :key="index" class="mb-3 col-12 slide-item">
                  <TrainingSingle :single="newOne" />
                </div>
              </VueSlickCarousel>
            </template>
            <h1 v-else>
              No Data
            </h1>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <template v-if="featured && featured.length">
      <div class="container-fluid main-content">
        <b-tabs content-class="nav nav-tabs">
          <b-tab title="Featured" active class="w-100">
            <div id="one1" class="tab-pane w-100 pb-3 fade show active border-0" role="tabpanel">
              <VueSlickCarousel v-bind="settings1" class="row mx-0 pro_slider">
                <div v-for="(featureSingle, index) in featured" :key="index" class="mb-3 col-12 slide-item">
                  <TrainingSingle :single="featureSingle" />
                </div>
              </VueSlickCarousel>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </template>
    <div class="container-fluid main-content">
      <b-tabs content-class="nav nav-tabs">
        <b-tab title="Continue Watching" active class="w-100">
          <div id="one1" class="tab-pane w-100 pb-3 fade show active border-0" role="tabpanel">
            <VueSlickCarousel v-bind="settings1" class="row mx-0 pro_slider">
              <div v-for="(document, index) in documents2" :key="index" class="mb-3 col-12 slide-item">
                <div class="course_box">
                  <div class="img_box">
                    <img src="@/assets/img/training-bg.webp" class="img-fluid" alt="image">
                  </div>
                  <div class="content_box p-0">
                    <p>{{ document.title }}</p>
                    <div>
                      {{ document.description }}...
                    </div>
                    <span>{{ document.date }}</span>
                  </div>
                </div>
              </div>
            </VueSlickCarousel>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <div class="container-fluid main-content">
      <b-tabs content-class="nav nav-tabs">
        <b-tab title="Recommended for you" active class="w-100">
          <div id="one1" class="tab-pane w-100 pb-3 fade show active border-0" role="tabpanel">
            <VueSlickCarousel v-bind="settings1" class="row mx-0 pro_slider">
              <div v-for="(document, index) in documents" :key="index" class="mb-3 col-12 slide-item">
                <div class="course_box">
                  <div class="img_box">
                    <img src="@/assets/img/training-bg.webp" class="img-fluid" alt="image">
                  </div>
                  <div class="content_box p-0">
                    <p>{{ document.title }}</p>
                    <div>
                      {{ document.description }}...
                    </div>
                    <span>{{ document.date }}</span>
                  </div>
                </div>
              </div>
            </VueSlickCarousel>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <b-modal
      id="trainingModal"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      centered
      hide-footer
      hide-header
    >
      <template #default="">
        <div class="welcome my-3">
          <img src="@/assets/img/close.svg" alt="image" class="close" @click="hideModal()">
          <client-only>
            <div class="container my-5 text-center training-modal-content">
              <h4>Welcome to MESOCROSS trainings!</h4>
              <p class="my-4">
                You have just signed up for MESOCROSS’s <b>basic training package</b>. If you change your mind, you can change your package in the <a href="#" class="text-underline font-weight-bold">Trainings panel</a>.
                <b class="d-block mt-3">Let’s go learn together!</b>
              </p>
              <div class="row">
                <div class="col-12">
                  <button class="my-4 d-block col-12 btn btn-dark" @click="hideModal()">
                    Start learning
                  </button>
                  <a href="#" class="text-underline">Change plan</a>
                </div>
              </div>
            </div>
          </client-only>
        </div>
      </template>
    </b-modal>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
export default {
  components: {
    VueSlickCarousel
  },
  async asyncData ({ $axios }) {
    // try {
    const { data } = await $axios.$get('/trainings')
    // eslint-disable-next-line camelcase
    const mostPopulars = data?.most_populars
    const newData = data?.new_data
    const featured = data?.featured
    return { mostPopulars, newData, featured }
    // } catch (error) {
    //   const errorMessage = 'Something went wrong'
    //   return { errorMessage }
    // }
  },
  data () {
    return {
      selectedTreatment: '',
      documents: [
        {
          title: 'How to reduce fat through controlled cold…',
          description: 'Focusing on innovation and development, we aim to present the market with',
          date: '9 de jun. De 2021'
        },
        {
          title: 'How to reduce fat through controlled cold…',
          description: 'Focusing on innovation and development, we aim to present the market with',
          date: '9 de jun. De 2021'
        },
        {
          title: 'How to reduce fat through controlled cold…',
          description: 'Focusing on innovation and development, we aim to present the market with',
          date: '9 de jun. De 2021'
        },
        {
          title: 'How to reduce fat through controlled cold…',
          description: 'Focusing on innovation and development, we aim to present the market with',
          date: '9 de jun. De 2021'
        },
        {
          title: 'How to reduce fat through controlled cold…',
          description: 'Focusing on innovation and development, we aim to present the market with',
          date: '9 de jun. De 2021'
        }
      ],
      documents2: [
        {
          title: 'How to reduce fat through controlled cold…',
          description: 'Focusing on innovation and development, we aim to present the market with',
          date: '9 de jun. De 2021'
        }
      ],
      settings1: {
        arrows: true,
        dots: false,
        infinite: false,
        loop: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        edgeFriction: 0.35,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      },
      settings2: {
        arrows: true,
        dots: false,
        infinite: false,
        loop: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        edgeFriction: 0.35,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          }
        ]
      },
      isAllCategories: false
    }
  },

  computed: {
    ...mapGetters({
      treatmentSolutions: 'training/setTrainingTreatmentSolutions'
    }),
    ...mapState({
      isLoggedin: state => state.user.loggedIn,
      trainingModalPopup: state => state.training.trainingModalPopup
    })
  },
  mounted () {
    if (!this.isLoggedin) {
      this.$router.push('login')
    }

    this.getTrainingTreatmentSolutions()

    if (this.trainingModalPopup) {
      this.$bvModal.show('trainingModal')
      this.getIsSubscribed()
    }
  },
  methods: {
    hideModal () {
      this.$bvModal.hide('trainingModal')
      this.setTrainingModalPopup(false)
    },
    ...mapActions({
      getTrainingTreatmentSolutions: 'training/getTrainingTreatmentSolutions',
      getIsSubscribed: 'training/getIsSubscribed'
    }),
    ...mapMutations({
      setTrainingModalPopup: 'training/setTrainingModalPopup'
    }),
    async searchByTreatment (id) {
      this.isAllCategories = false
      const treatment = this.treatmentSolutions.find(treatment => treatment.id === id)
      this.selectedTreatment = treatment.name
      const { data } = await this.$axios.$get(`/training?treatment_solution_id=${id}`)
      this.mostPopulars = data.most_populars
      this.newData = data.new_data
    }
  }
}
</script>

<style type="text/css">

.content-1 .name {
  font: normal normal 500 16px Work Sans;
  color: #FFFFFF;
}

.content-1 h1 {
  font: normal normal 600 50px Work Sans;
  color: #FFFFFF;
  margin: 15px 0;
}

@media screen and (min-width: 320px) and (max-width: 567px) {
  .content-1 h1 {
    font: normal normal 600 35px Work Sans;
  }
}

.content-1 {
  background-image: url("../assets/img/training-bg.webp");
  min-height: 400px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.content-data {
  max-width: 430px;
  position: absolute;
  text-align: left;
}
.training-bg:before{
  content: '';
  display: block;
  position: absolute;
  background-color: #000;
  opacity: 0.5;
  width: 100%;
  height: 100%;
  left: 0;
}
.main-content h1 {
  font: normal normal 600 40px Work Sans;
  color: #25282A;
}
.content_box p {
  font-size: 20px !important;
}
.main-content .slick-arrow {
  background-color: #959595;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background-position: 18px;
  background-size: 10px;
}
.main-content .slick-prev {
  left: -10px !important;
}
.main-content .slick-next {
  right: -10px !important;
}
.main-content .slick-disabled {
  display: none !important;
}
.main-content .nav-tabs {
  border-bottom: none;
}
.main-content .slick-track {
  margin-left: 0;
}
.categories {
  cursor: pointer;
}
.treatment-box {
  background: #F6F7F7;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
}
.treatment-box p {
  font: normal normal 600 16px Work Sans;
  color: #25282A;
}
.sub-badge {
  left: 5px;
  top: 15px;
  z-index: 2;
  background: #25282A;
  border-radius: 4px;
  font-size: 10px;
}
.free-badge {
  left: 5px;
  top: 15px;
  z-index: 2;
  background: #C74546;
  border-radius: 4px;
  font-size: 10px;
}

.slick-slide img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
