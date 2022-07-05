<template>
  <section class="tab-all-content">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4 col-xl-3">
          <div class="custom-tabs">
            <ul v-if="!isMobile()" class="nav nav-pills flex-column" role="tablist">
              <li v-for=" (component, index ) in components" :key="index" class="nav-item">
                <span class="nav-link" :class="{active: selectedTab === component.slug}" @click="goTo(`/services/${component.slug}`)">{{ component.label }}</span>
              </li>
            </ul>
            <div v-else class="mobile">
              <div class="selected" @click="selectPage = !selectPage">
                <span>{{ components.filter(el => el.slug === selectedTab)[0].label }}</span>
                <span class="arrow" :class="{opened: selectPage}" />
              </div>
              <div v-if="selectPage" class="toSelect">
                <template v-for="(component,i) in components.filter(el => el.slug !== selectedTab)">
                  <NuxtLink :key="i" :to="`/services/${component.slug}`">
                    {{ component.label }}
                  </NuxtLink>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-8 col-xl-9">
          <!-- Tab panes -->
          <!-- {{ callApi }} -->
          <div class="tab-content mt-0">
            <div :id="pagecurrentComponent" class="tab-paneb active">
              <component :is="pagecurrentComponent" :data="data" :temp-title="components.filter(el => el.slug === selectedTab)[0].label" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import isMobile from '@/mixins/isMobile'
export default {
  mixins: [isMobile],
  data () {
    return {
      baseUrl: process.env.baseUrl,
      data: {},
      selectedTab: this.$route.params.slug,
      pagesDashboard: [
        { label: this.$t('contact_us'), component: 'contact-us', slug: 'contact-us', static: true },
        { label: this.$t('faqs'), component: 'faq', slug: 'faq', static: true },
        { label: this.$t('shipping_methods'), component: 'pages-content', slug: 'shipping-methods' },
        { label: 'Secure Payments', component: 'pages-content', slug: 'payment-methods' },
        { label: this.$t('returns_and_exchanges'), component: 'pages-content', slug: 'return-exchange' },
        { label: this.$t('quality_policy'), component: 'pages-content', slug: 'quality-policy' },
        { label: 'Terms and Condition', component: 'pages-content', slug: 'terms-condition' },
        { label: this.$t('privacy_policy'), component: 'pages-content', slug: 'privacy-policy' },
        { label: this.$t('cookie_policy'), component: 'pages-content', slug: 'cookie-policy' },
        { label: this.$t('fraud'), component: 'pages-content', slug: 'fraud' }
      ],
      selectPage: false
    }
  },
  computed: {
    components () {
      return this.pagesDashboard
    },
    ...mapState({
      selectedPageComponent: state => state.selectedPageComponent,
      selectedPageComponentIndex: state => state.selectedPageComponentIndex,
      pagecurrentComponent: state => state.pagecurrentComponent
    })
  },
  watch: {
    $route: {
      immediate: true,
      handler (val) {
        this.setPage()
        this.callApi()
        this.selectedTab = val.params.slug
        if (this.isMobile()) { this.selectPage = false }
      }
    }

  },
  mounted () {
    this.setPage()
  },
  methods: {
    callApi () {
      const currentComponent = this.pagesDashboard[this.selectedPageComponentIndex]

      if (currentComponent.slug && !currentComponent.static) {
        this.getApiData(currentComponent.slug)
      }
    },

    setPage () {
      const { slug } = this.$route.params
      if (slug) {
        this.setSelectedPageComponent({ slug })
      }
    },
    setComponent (val) {
      this.setSelectedPageComponent(val)
      if (val.slug && !val.static) {
        this.getApiData(val.slug)
      }
    },
    ...mapMutations({
      setSelectedPageComponent: 'setSelectedPageComponent'
    }),
    getApiData (slug) {
      this.$axios.get(`/get-page-content?page=${slug}&only_title_contetnt=1`).then(({ data }) => {
        this.data = data.data
      })
    },
    goTo (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style lang="scss" scoped>

.tab-all-content {
    @media screen and (max-width: 1200px){
        margin-top: 40px;
    }
}
.custom-tabs {
    margin: 0 auto;
}

.nav-link {
    cursor: pointer;
    user-select: none;
}

.mobile {
    margin-bottom: 40px;
    .selected {
        width: 100%;
        padding: 10px 0;
        background: rgba(#fff, 0.15);
        text-align: center;
        font-weight: 500;
    }

    .toSelect {
        width: 100%;
        display: flex;
        flex-direction: column;
        border: solid 1px rgba(#fff, 0.15);

        a {
            text-align: center;
            padding: 10px;
            border-bottom: solid 1px rgba(#fff, 0.15);

            &:last-of-type {
                border-bottom: none;
            }
        }
    }
}

</style>
