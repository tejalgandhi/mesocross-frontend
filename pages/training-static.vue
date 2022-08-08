<template>
  <div>
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
      <h1 class="my-4">
        Home panel
      </h1>
      <b-tabs content-class="nav nav-tabs">
        <b-tab title="Most Populares" active class="w-100">
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
                      {{ document.description | documentContent }}...
                    </div>
                    <span>{{ document.date }}</span>
                  </div>
                </div>
              </div>
            </VueSlickCarousel>
          </div>
        </b-tab>
        <b-tab title="New">
          <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel" />
        </b-tab>
      </b-tabs>
    </div>
    <div class="container-fluid main-content">
      <b-tabs content-class="nav nav-tabs">
        <b-tab title="Webinars" active class="w-100">
          <div id="one1" class="tab-pane w-100 pb-3 fade show active border-0" role="tabpanel">
            <VueSlickCarousel v-bind="settings1" class="row mx-0 pro_slider">
              <div v-for="(document, index) in documents1" :key="index" class="mb-3 col-12 slide-item">
                <div class="course_box">
                  <div class="img_box">
                    <img src="@/assets/img/training-bg.webp" class="img-fluid" alt="image">
                  </div>
                  <div class="content_box p-0">
                    <p>{{ document.title }}</p>
                    <div>
                      {{ document.description | documentContent }}...
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
                      {{ document.description | documentContent }}...
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
                      {{ document.description | documentContent }}...
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
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'

export default {
  components: {
    VueSlickCarousel
  },
  filters: {
    documentContent (val) {
      return val.substring(0, 73)
    }
  },
  data () {
    return {
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
      documents1: [
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
      documents3: [
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
      }
    }
  }
}
</script>

<style type="text/css">

.content-1 .name {
  font: normal normal 500 16px Arquitecta;
  color: #FFFFFF;
}

.content-1 h1 {
  font: normal normal 600 50px Arquitecta;
  color: #FFFFFF;
  margin: 15px 0;
}

@media screen and (min-width: 320px) and (max-width: 567px) {
  .content-1 h1 {
    font: normal normal 600 35px Arquitecta;
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
  font: normal normal 600 40px Arquitecta;
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
</style>
