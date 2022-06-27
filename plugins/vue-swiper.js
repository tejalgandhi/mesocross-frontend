import Vue from 'vue'

import SwiperClass, { Navigation, Pagination } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/vue'

// import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/swiper-bundle.css'
// import 'swiper/css/navigation'
// import 'swiper/css/pagination'

const swiper = new SwiperClass('.swiper', {
  modules: [Navigation, Pagination]
})

// Vue.component('Swiper', Swiper)
// Vue.component('SwiperSlide', SwiperSlide)
Vue.use(swiper)
