<template>
  <footer id="footer" class="mt-5">
    <div class="support-links p-2 border-top border-bottom">
      <div class="container-fluid text-center">
        <div class="row justify-content-center align-items-center">
          <div class="col-4 border-right">
            <nuxt-link to="/customize-treatment" class="btn btn-default w-100 px-0">
             VIRTUAL CONSULTATION
            </nuxt-link>
          </div>
          <div class="col-4 border-right">
            <nuxt-link to="/services/faq" class="btn btn-default w-100 px-0">
              FAQs
            </nuxt-link>
          </div>
          <div class="col-4">
            <!-- <button class="btn btn-default w-100 px-0">
              NEED HELP?
            </button> -->
            <a class="btn btn-default w-100 px-0" :href="`tel:+${telephone}`">NEED HELP?</a>
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
                          <NuxtLink :to="child.slug">
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
                  <a href="javascript:void(0);" @click="redirectToPage(child.slug)">
                    {{ child.name }}
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-md-3 d-none d-md-block">
              <div class="mb-5">
                <h2>WELCOME TO THE NEW YOUTH</h2>
                <button class="btn border btn-block text-left d-flex justify-content-between custom-btn">
                  SUBSCRIBE TO OUR NEWSLETTER

                  <b-icon-chevron-right />
                </button>
              </div>
              <div class="mb-5">
                <div class="row">
                  <div class="col-md-6">
                    <h2>
                      Country
                    </h2>
                    <button class="btn border btn-block text-left d-flex justify-content-between custom-btn" @click="$bvModal.show('country-modal')">
                      USA
                      <b-icon-chevron-down />
                    </button>
                  </div>
                    <div class="col-md-6">
                      <h2>
                        Language
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
            <div class="col-lg-4 col-md-4 order-1 order-md-0">
            </div>
            <div class="col-lg-4 col-md-4 order-0 order-md-1">
              <div class="footer-brand">
                <figure class="brand-logo" @click="goHome">
                  Mesocross
                </figure>
              </div>
            </div>
            <div class="col-lg-4 col-md-4 py-3 py-md-0 order-2 order-md-2">
              <div class="social_links">
                <ul class="text-left text-md-center">
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
      footerLinks: null
    }
  },
  computed:{
    telephone(){
      return process.env.TELEPHONE
    }
  },
  mounted () {
    const d = new Date()
    this.currentYear = d.getFullYear()
    this.getSocial()
    this.getFooterLinks()
  },
  methods: {
    async getSocial () {
      // const data = await this.$axios.get('get-social-link')
      // this.socialLinks = data.data.data
    },
    async getFooterLinks () {
      const data = await this.$axios.get('/footer/get-footer-data')
      this.footerLinks = data.data.data
    },
    redirectToPage (name) {
      if(name === 'subscription'){
        this.$bvModal.show('subscribeModal');
        return
      }
      this.$router.push(name)
    },
    goHome () {
      this.$router.push('/')
    },
  }
}
</script>

<style lang="scss">
.support-links{
  background: #000;
}

.footer-main{
  position: relative;
  &.inverse{
    background: #000000;
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
      }
    }
    .custom-btn{
      position: relative;
      padding: 0.5rem .75rem;
      color: #ffffff !important;
      opacity: 1;
      border-color: #ffffff !important;
    }
    .footer_bottom{
      position: relative;
      border-top: 1px solid #ffffff;
      .copyright{
        text-align: center;
        color: #ffffff;
        opacity: 0.6;
        margin-top:30px;
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
  .accordion-section .panel-default .panel-title a {font: normal normal 500 18px Work Sans;letter-spacing: 1.6px;color: #203032;}
  .accordion-section .not-collapsed .panel-title a:after {font: normal normal 500 18px Work Sans;content: "\2212";color: #203032;float: right;}
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
    font-size: 18px;
  }
}
</style>
