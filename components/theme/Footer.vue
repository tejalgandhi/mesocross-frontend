<template>
  <footer>
    <CommonNewsletter />
    <div class="container-fluid footer-main">
<!--      <div class="footer_logo">-->
<!--        <img src="@/assets/img/logo.svg" alt="brand">-->
<!--      </div>-->
      <div class="footer_links">
        <div class="row pt-5">
          <div class="col-lg-3">
            <ul>
              <h2>HELP & SUPPORT</h2>
              <li>
                <nuxt-link to="/under-construction">
                  Help & contact us
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Orders & shipping
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Payment & pricing
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Returns & refunds
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  FAQs
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Terms & conditions
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Privacy policy
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Cookie preferences
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Modern slavery statement
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Accessibility
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-3">
            <ul>
              <h2>ABOUT MESOCROSS</h2>
              <li>
                <nuxt-link to="/under-construction">
                  About Us
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Investors
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Loyalty programme
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Partners
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Affiliate Programme
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Careers
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Mesocross Customer
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Promise
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Sitemap
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Positively Messocross
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-3">
            <ul>
              <h2>PAYMENT METHODS</h2>
              <li>
                <nuxt-link to="/under-construction">
                  About Us
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Investors
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Loyalty programme
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Partners
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Affiliate Programme
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Careers
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Mesocross Customer
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Promise
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Sitemap
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/under-construction">
                  Positively Messocross
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="col-lg-3">
            <ul class="select-footer">
              <h2>DELIVERY DESTINATION OR REGION</h2>
              <li>
                <select class="custom-select">
                  <option selected value="1">
                    Portugal (EUR)
                  </option>
                  <option value="1">
                    India (INR)
                  </option>
                </select>
              </li>
              <li>
                <h2 class="mb-2 mt-5">Language</h2>
                <select class="mt-0 custom-select">
                  <option selected value="1">
                    Português
                  </option>
                  <option value="2">
                    Hindi
                  </option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer_bottom">
        <div class="row">
          <div class="copyright col-12">
            <p>&copy; 2021 MCCM Medical Cosmetics</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  filters: {
    removeBase (val) {
      return val
    }
  },
  data () {
    return {
      socialLinks: []
    }
  },
  created () {
    this.getSocial()
  },
  methods: {
    async getSocial () {
      const data = await this.$axios.get('get-social-link')
      this.socialLinks = data.data.data
    }
  }
}
</script>
