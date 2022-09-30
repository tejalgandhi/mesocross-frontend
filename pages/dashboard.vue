<template>
  <div class="dashboard">
    <header>
      <h2 v-if="user.type === 2">
        {{ user.company_name }}
      </h2>
      <h2 v-else>
        {{ user.full_name }}
      </h2>
      <span>{{ $t('welcome_to_your_account') }}</span>
    </header>
    <div class="page-content">
      <div class="tab-selector">
        <template v-for="(tab, i) in filteredTabs">
          <UiDashboardTab :key="i" :active="i === activeTab" :data="tab" @select="handleClick(tab.query)" />
        </template>
      </div>
      <div v-if="filteredTabs.length" class="section-content">
        <UiDashboard :tab="filteredTabs[activeTab]" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tabs from '@/assets/json/user-tab.json'

export default {
  data () {
    return {
      tabs,
      activeTab: 0
    }
  },

  computed: {
    ...mapGetters({
      user: 'user/getLoggedinUser'
    }),

    filteredTabs () {
      return this.tabs.filter(el => el.profiles.includes(this.user.type))
    }
  },

  watch: {
    '$route.query': {
      immediate: true,
      handler (val) {
        if (!val.tab || !val.tab.length) {
          this.activeTab = 0
          return
        }

        const index = this.filteredTabs.findIndex(el => el.query === val.tab)
        this.activeTab = index
      }
    }
  },

  methods: {
    handleClick (query) {
      if (!query.length) {
        this.$router.push('/dashboard')
        return
      }
      this.$router.push({ path: '/dashboard', query: { tab: query } })
    }
  }
}
</script>

<style lang="scss" scoped>
    .dashboard {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 1680px;
        margin: 0 auto;

        header {
            margin: 0 0 16px;
            background: #25282A;
            color: white;
            height: 400px;
            max-height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 8px;

            h2 {
                font-size: 34px;
                font-weight: 500;
            }

            span {
                font-weight: 100;
                font-size: 20px;
            }
        }

        .page-content {
            display: flex;
            gap: 2rem;
            margin: 0 0 16px;

            @media screen and (max-width: 768px){
                flex-direction: column;
                align-items: center;
            }

            .tab-selector {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;
                width: 300px;

                @media screen and (max-width: 768px){
                    width: 90%;
                }
            }

            .section-content {
                width: calc(100% - 300px);

                @media screen and (max-width: 768px){
                    width: 90%;
                }
            }
        }
    }
</style>
