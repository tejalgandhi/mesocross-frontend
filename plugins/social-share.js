import Vue from 'vue'
import VueSocialSharing from 'vue-social-sharing'

Vue.use(VueSocialSharing, {
  networks: {
    instagram: 'https://www.instagram.com/share?url=@url&title=@title'
  }
})
