<template>
  <div>
    <div class="banner mb-5 text-center">
      <div
        class="container-fluid position-relative px-0 px-md-3 content-1 d-flex align-items-center justify-content-center"
        style="height: 300px"
      >
        <figure class="bg">
          <div class="overlay" />
          <nuxt-img
            preload
            format="webp"
            :src="currentBlog.image"
            alt="banner"
            quality="100"
            sizes="xs:500 s:1024 md:1366 lg:1920"
          />
        </figure>

        <div class="banner-text text-center mx-auto px-2">
          <span class="name">{{ currentBlog.treatment_solution_name }}</span>
          <h1 v-if="currentBlog.title">
            {{ currentBlog.title }}
          </h1>
          <span class="date">{{ $moment(currentBlog.created_at).format('MMMM D, YYYY') }}</span>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <!-- eslint-disable vue/no-v-html -->
      <div class="row pb-5">
        <div class="share col-12 col-lg-2 text-lg-right">
          <p class="font-weight-bold" style="letter-spacing: 1px">
            Share
          </p>
          <div class="links">
            <ShareNetwork
              v-for="network in networks"
              :key="network.network"
              :network="network.network"
              :url="currentUrl"
              :title="currentBlog.title"
            >
              <img :src="require(`~/assets/img/${network.icon}`)" alt="image">
            </ShareNetwork>
            <ShareNetwork
              v-if="shareMessenger"
              network="messenger"
              :url="currentUrl"
              :title="currentBlog.title"
            >
              <img src="@/assets/img/share_messanger.svg" class="social-icon" alt="image">
            </ShareNetwork>
            <a @click="copy()">
              <img src="@/assets/img/Caminho_copy.svg" class="social-icon" alt="image">
            </a>
          </div>
        </div>
        <div class="col-lg-8 offset-xl-1 col-xl-7 html-content width-wraper" v-html="currentBlog.content" />
      </div>
      <!--eslint-enable-->
    </div>

    <div class="next-previous row px-0 mx-0 mt-5">
      <div v-if="previous.length != '' " class="article col-md-6 border-right-side next-prev position-relative">
        <nuxt-link v-if="previous.slug" :to="previous.slug">
          <figure class="next-art w-100 text-center h-100">
            <img v-if="previous.image" :src="previous.image" alt="image">
          </figure>
          <div class="pr-md-5 pl-3 text-content w-100 text-md-right d-flex justify-content-md-end align-items-center">
            <div class="pr-md-5">
              <p>Previous Article</p>
              <h1>{{ previous.title }}</h1>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div v-if="next.length != ''" class="article col-md-6 next-prev position-relative">
        <nuxt-link v-if="next.slug" :to="next.slug">
          <figure class="next-art w-100 text-center h-100">
            <img v-if="next.image" :src="next.image" alt="image">
          </figure>
          <div class="pl-md-5 text-content w-100 d-flex align-items-center pl-3">
            <div class="pl-md-5">
              <p>Next Article</p>
              <h1>{{ next.title }}</h1>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async asyncData ({ params, $axios }) {
    const { data } = await $axios.$get(`/blog-detail/${params.slug}`)
    const currentBlog = data.current
    const previous = data.previous
    const next = data.next
    return { currentBlog, previous, next }
  },
  data () {
    return {
      currentUrl: '',
      networks: [
        { network: 'facebook', name: 'Facebook', icon: 'share_facebook.svg', color: '#1877f2' },
        { network: 'whatsapp', name: 'Whatsapp', icon: 'share_whatsapp.svg', color: '#25d366' }
      ],
      shareMessenger: false
    }
  },
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn,
      loggedinUser: state => state.user.loggedinUser
    })
  },
  mounted () {
    this.currentUrl = window.location.href
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.shareMessenger = true
    }
  },
  methods: {
    copy () {
      this.$toast.info('Copied!', { duration: 3000, position: 'top-right' })
      navigator.clipboard.writeText(window.location.href)
    }
  }
}
</script>
<style lang="scss" scoped>

.bg {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;

    .overlay {
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.share {
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 992px){
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 20px;
    }

    .links {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 1rem;
        @media screen and (max-width: 992px){
            flex-direction: row;
            margin-bottom: 10px;
        }
        a {
            display: flex;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
                padding: 0;
                margin: 0;
                @media screen and (max-width: 992px){
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
}

.next-previous {
    display: flex;
    flex-wrap: nowrap;
    @media screen and (max-width: 992px){
        height: 120px;
    }

    .article {
        &:hover {
            a {
                .next-art {
                    overflow: hidden;
                    img {
                        transform: scale(1.1);
                    }
                }
            }
        }

        h1 {
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;

            @media screen and (max-width: 1200px){
                font-size: 1.2rem;
            }
            @media screen and (max-width: 778px){
                font-size: 0.8rem;
            }

        }

        a {
            .next-art {
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;

                &:hover {
                    img {
                        transform: scale(1.1);
                    }
                }

                img {
                    transition: 0.5s ease-in-out;
                }
            }
        }

    }
}

</style>

<style scoped>
.border-right-side {
  border-right: 1px solid #979797;
}

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

.content-1 .date {
  font: normal normal 300 16px Work Sans;
  color: #FFFFFF;
}

.content-1 {
  min-height: 450px;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.html-content p img {
  height: 100% !important;
  max-height: 100% !important;
  width: 100% !important;
  max-width: 100% !important;
}

.social-icon {
  /* background-color: black; */
  padding: 5px;
  display: block;
  margin-top: 15px;
  text-align: right;
  margin-left: auto;
  /* border-radius: 50%; */
}

.next-prev img {
  height: 250px;
  width: 100%;
  text-align: center;
  background-color: white;
  filter: brightness(75%);
  object-fit: cover;
}
.next-prev {
  background-color: white;
  padding: 0;
}

.text-content {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}

.text-content p {
  font: normal normal 500 20px Work Sans;
  letter-spacing: 1.4px;
  color: #FFFFFF;
}

.text-content h1 {
  font: normal normal 600 30px Work Sans;
  letter-spacing: 1.3px;
  color: #FFFFFF;
}

@media screen and (max-width: 1023px){
  .social-icon {
    display: inline-block;
    margin-top: 15px;
    margin-bottom: 30px;
    text-align: left;
    margin-right: 10px;
  }
}
</style>
