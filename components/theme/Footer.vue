<template>
  <footer id="footer">
    <div class="support-links p-2 border-top border-bottom">
      <div class="container-fluid text-center">
        <div class="row justify-content-center align-items-center">
          <div class="col-4 border-right">
            <button class="btn btn-default w-100 px-0">
              HOW TO SHOP?
            </button>
          </div>
          <div class="col-4 border-right">
            <button class="btn btn-default w-100 px-0">
              FAQs
            </button>
          </div>
          <div class="col-4">
            <button class="btn btn-default w-100 px-0">
              NEED HELP?
            </button>
          </div>
        </div>
      </div>
    </div>
    <CommonNewsletter />
    <div class="footer-main">
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

              <!-- <b-card-header v-b-toggle.accordion-2 class="panel panel-default" header-tag="header" role="tab">
                <h3 class="panel-title">
                  <a block variant="info">
                    {{ $t('training') }}
                  </a>
                </h3>
              </b-card-header>
              <b-collapse id="accordion-2">
                <b-card-body>
                  <ul>
                    <li>
                      <nuxt-link to="/exhibitions-and-events">
                        {{ $t('exhibitions_and_events') }}
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/about-training">
                        {{ $t('footer.training_app') }}
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/documents">
                        {{ $t('footer.downloads') }}
                      </nuxt-link>
                    </li>
                  </ul>
                </b-card-body>
              </b-collapse>

              <b-card-header v-b-toggle.accordion-3 class="panel panel-default" header-tag="header" role="tab">
                <h3 class="panel-title">
                  <a block variant="info">
                    {{ $t('footer.online_shop') }}
                  </a>
                </h3>
              </b-card-header>
              <b-collapse id="accordion-3">
                <b-card-body>
                  <ul>
                    <li>
                      <nuxt-link to="/pages?page=shipping-methods">
                        {{ $t('footer.shipment_methods') }}
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/pages?page=payment-methods">
                        {{ $t('footer.payment_methods') }}
                      </nuxt-link>
                    </li>
                    <li>
                      <a href="javascript:void(0)" @click="redirectToPage('return-exchange')">
                        {{ $t('footer.returns_and_exchanges') }}
                      </a>
                    </li>
                  </ul>
                </b-card-body>
              </b-collapse>

              <b-card-header v-b-toggle.accordion-4 class="panel panel-default" header-tag="header" role="tab">
                <h3 class="panel-title">
                  <a block variant="info">
                    {{ $t('footer.costumer_service') }}
                  </a>
                </h3>
              </b-card-header>
              <b-collapse id="accordion-4">
                <b-card-body>
                  <ul>
                    <li>
                      <a href="javascript:void(0)" @click="redirectToPage('contact-us')">
                        {{ $t('contact_us') }}
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" @click="redirectToPage('faq')">
                        {{ $t('footer.FAQ_s') }}
                      </a>
                    </li>
                  </ul>
                </b-card-body>
              </b-collapse> -->
              </b-card>
            </div>

            <div v-for="(link, i) in footerLinks.parent" :key="i" class="col-md-3 d-none d-md-block">
              <h2>{{ link.name }}</h2>
              <ul>
                <li v-for="(child, index) in footerLinks.children[link.id]" :key="index">
                  <NuxtLink :to="child.slug">
                    {{ child.name }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <div class="col-md-3 d-none d-md-block">
              <div class="mb-5">
                <h2>DELIVERY DESTINATION OR REGION</h2>
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
            </div>
          </div>
        </div>
        <div class="footer_bottom mb-0 mt-0 mt-md-5 mb-md-4">
          <div class="row py-3 justify-content-between">
            <div class="col-lg-3 order-3 order-md-0">
              <div class="copyright">
                <p>&copy; {{ currentYear }} MCCM Medical Cosmetics</p>
              </div>
            </div>
            <div class="col-lg-3 py-3 py-md-0">
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
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  filters: {
    removeBase (val) {
      return val
    }
  },
  data () {
    return {
      socialLinks: [],
      currentYear: '',
      accordianCollapse: [true, true, true, true],
      baseUrl: process.env.baseUrl,
      footerLinks: null
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
      this.setSelectedPageComponent({ slug: name })
      this.$router.push(`/services/${name}`)
    },
    ...mapMutations({
      setSelectedPageComponent: 'setSelectedPageComponent'
    })
  }
}
</script>

<style type="text/css">
.support-links{
  background: #000;
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

#footer{
  background: #FFFFFF;
}
</style>
