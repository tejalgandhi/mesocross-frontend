<template>
  <footer id="footer">
    <div class="support-links p-2 border-top border-bottom">
      <div class="container-fluid text-center">
        <div class="row justify-content-center align-items-center">
          <div class="col-4 border-right">
            <nuxt-link to="/virtual-consultation" class="btn btn-default w-100 px-0 underline">
              {{ $t('virtual_consultation') }}
            </nuxt-link>
          </div>
          <div class="col-4 border-right">
            <nuxt-link to="/services/faq" class="btn btn-default w-100 px-0 underline">
              FAQs
            </nuxt-link>
          </div>
          <div class="col-4">
            <!-- <button class="btn btn-default w-100 px-0">
              NEED HELP?
            </button> -->
            <nuxt-link to="/services/help" class="btn btn-default w-100 px-0 underline">
              {{ $t('need_help') }}
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <!-- <CommonNewsletter /> -->
    <div class="footer-main inverse">
      <div class="container-fluid">
        <div v-if="footerLinks" class="footer_links">
          <div class="row pt-3 pt-lg-5">
            <div class="accordion d-md-none accordion-section clearfix mb-3 col-12" role="tablist">
              <b-card no-body class="mb-1 border-0">
                <div v-for="(link, i) in footerLinks.parent" :key="i">
                  <b-card-header v-b-toggle="`toggle${i}`" class="panel panel-default" header-tag="header" role="tab">
                    <div class="panel-title">
                      <a block variant="info">
                        {{ link.name }}
                      </a>
                    </div>
                  </b-card-header>
                  <b-collapse :id="`toggle${i}`">
                    <b-card-body>
                      <ul>
                        <li v-for="(child, index) in footerLinks.children[link.id]" :key="index">
                          <NuxtLink :to="`/${child.slug.replace('/','')}`">
                            {{ child.name }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </b-card-body>
                  </b-collapse>
                </div>

                <div>
                  <b-card-header v-b-toggle="`language`" class="panel panel-default" header-tag="header" role="tab">
                    <div class="panel-title">
                      <a block variant="info">
                        DELIVERY DESTINATION OR REGION
                      </a>
                    </div>
                  </b-card-header>
                  <b-collapse :id="`language`">
                    <b-card-body>
                      <div class="mb-5 mt-4">
                        <button class="btn border btn-block text-left d-flex justify-content-between custom-btn">
                          Portugal (EUR)
                          <b-icon-chevron-down />
                        </button>
                      </div>
                      <div class="mb-5">
                        <h2 class="text-capitalize">
                          Language
                        </h2>
                        <button class="btn border btn-block text-left d-flex justify-content-between custom-btn" @click="$bvModal.show('lang')">
                          {{ $i18n.locale.toUpperCase() }}

                          <b-icon-chevron-down />
                        </button>
                      </div>
                    </b-card-body>
                  </b-collapse>
                </div>
              </b-card>
            </div>

            <div v-for="(link, i) in footerLinks.parent" :key="i" class="col-md-3 d-none d-md-block">
              <h2>{{ link.name }}</h2>
              <ul>
                <li v-for="(child, index) in footerLinks.children[link.id]" :key="index">
                  <template v-if="child.slug !== 'subscription'">
                    <a href="javascript:void(0);" @click="redirectToPage(`/${child.slug.replace('/','')}`)">
                      {{ child.name }}
                    </a>
                  </template>
                  <template v-else>
                    <a href="javascript:void(0);" @click="$bvModal.show('subscribeModal')">
                      {{ child.name }}
                    </a>
                  </template>
                </li>
              </ul>
            </div>

            <div class="col-md-3 d-none d-md-block">
              <div class="mb-5">
                <CommonNewsletter />
              </div>
              <div class="mb-5">
                <div class="row">
                  <div class="col-md-6">
                    <h2>
                      {{ $t('Country') }}
                    </h2>
                    <button class="btn border btn-block text-left d-flex justify-content-between custom-btn" @click="$bvModal.show('country-modal')">
                      {{ country }}
                      <b-icon-chevron-down />
                    </button>
                  </div>
                  <div class="col-md-6">
                    <h2>
                      {{ $t('language') }}
                    </h2>
                    <button class="btn border btn-block text-left d-flex justify-content-between custom-btn" @click="$bvModal.show('lang')">
                      {{ $i18n.locale.toUpperCase() }}
                      <b-icon-chevron-down />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer_bottom mb-0 mt-0 mt-md-0 mb-md-4">
          <div class="row pt-5 pb-3 justify-content-between">
            <div class="col-md-4">
              <div class="logos my-md-0 my-3 d-flex justify-content-md-start justify-content-center align-items-center">
                <figure>
                  <img src="@/assets/img/reduniq.svg" alt="">
                </figure>
                <figure>
                  <img src="@/assets/img/mastercard.svg" alt="">
                </figure>
                <figure>
                  <img src="@/assets/img/visa.svg" alt="">
                </figure>
                <img src="@/assets/img/paypal.svg" alt="">
                </figure>
                <figure>
                  <img src="@/assets/img/applepay.svg" alt="">
                </figure>
              </div>
            </div>
            <div class="col-md-4 col-md-4 order-0 order-md-1">
              <div class="footer-brand my-md-0 my-3">
                <figure class="brand-logo" @click="goHome">
                  Mesocross
                </figure>
              </div>
            </div>
            <div class="col-md-4 col-md-4 py-3 py-md-0 order-2 order-md-2">
              <div class="social_links my-md-0 my-3">
                <ul class="text-center text-md-right">
                  <li v-for="(link,index) in socialLinks" :key="index">
                    <a target="_blank" :href="link.link">
                      <img :src="link.image" height="20px" width="20px" alt="instagram">
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="copyright">
                <p>&copy; {{ currentYear }} Mesocross Limited. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      socialLinks: [],
      currentYear: '',
      baseUrl: process.env.baseUrl,
      footerLinks: null,
      country: 'USA'
    }
  },
  computed: {
    telephone () {
      return process.env.TELEPHONE
    }
  },
  mounted () {
    const d = new Date()
    this.currentYear = d.getFullYear()
    this.getSocial()
    this.getFooterLinks()
    this.country = localStorage?.country || 'USA'

    this.$nuxt.$on('newCountry', this.handleNewCountry)
  },
  methods: {
    async getSocial () {
      const data = await this.$axios.get('get-social-link')
      this.socialLinks = data.data.data
    },
    async getFooterLinks () {
      const data = await this.$axios.get('/footer/get-footer-data')
      console.log(data)
      this.footerLinks = data.data.data
    },
    redirectToPage (name) {
      if (name === 'subscription') {
        this.$bvModal.show('subscribeModal')
        return
      }
      this.$router.push(name)
    },
    goHome () {
      this.$router.push('/')
    },

    handleNewCountry (val) {
      this.country = val
    }
  }
}
</script>

<style lang="scss">

.underline {
    &:hover {
        text-decoration: underline;
    }
}

footer {
    display: flex;
    flex-direction: column;
    float: unset;
}

.footer-main{
  position: relative;
  &.inverse{
    .footer_links{
      h2, ul>li>a{
        color: #ffffff;
        opacity: 1;
        text-transform: uppercase;
      }
      h2{
        font-weight: 500;
      }
      ul>li>a{
        font-size: 13px;
        opacity: 0.6;
        transition: 0.2s;

        &:hover {
            opacity: 1;
        }
      }
    }
    .custom-btn{
      position: relative;
      padding: 0.5rem .75rem;
      color: #ffffff !important;
      opacity: 1;
      border-color: #ffffff !important;
    }
    .logos {
        border-radius: 10px;
        img {
            margin-right: 17px;
        }
        figure {
            margin: 0;
        }
    }
    figure.brand-logo{
      font-size: 24px;
    }
    .footer_bottom{
      position: relative;

      @media (min-width:992px) {
      border-top: 1px solid #ffffff;
      }
      .copyright{
        text-align: center;
        color: #ffffff;
        opacity: 0.6;
        margin-top:30px;
        @media (max-width:991px) {
          margin-top:10px;
          margin-bottom: 10px;
        }
        p{
          font-size:14px;
        }
      }
    }
  }
}
@media screen and (min-width: 320px) and (max-width: 567px) {
  .footer-main {
    width: 100% !important;
    float: left;
  }
  .footer-main .card-body {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .f_links ul li:nth-child(1), .f_links ul li:nth-child(3) {
    padding-right: 15px;
    height: 15px;
    vertical-align: middle;
    display: block;
  }
  .f_links ul li:nth-child(1) a, .f_links ul li:nth-child(3) a {
    display: flex;
    align-items: flex-start;
    top: -10px;
    position: relative;
  }
/*
  .accordion-section .panel-default .panel-title a {font: normal normal 500 18px Arquitecta;letter-spacing: 1.6px;color: #203032;}
  .accordion-section .not-collapsed .panel-title a:after {font: normal normal 500 18px Arquitecta;content: "\2212";color: #203032;float: right;}
  .accordion-section .collapsed .panel-title a:after {font: normal normal bold 20px Lato;content: "\002B";color: #203032;float: right;}
  .accordion-section .panel-default {border-bottom: 2px solid white; padding-top: 15px} */
}
.custom-btn{
  color: #000 !important;
  opacity:.6;
  border-color: rgba(0, 0, 0, .6) !important;
}
.footer-brand{
  position: relative;
  text-align: center;
  figure.brand-logo{
    font-size: 24px;
  }
}
.social_links{
  img{
    object-fit: contain;
  }
}
</style>
