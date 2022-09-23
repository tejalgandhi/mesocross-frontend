<template>
  <main class="main-header" :class="{mobile: isMobile()}">
    <template v-if="!isMobile()">
      <div class="topbar container-fluid">
        <div class="lang_part d-md-flex" @mouseover="isActive = 0">
          <CommonAccessPrice />
          <CommonCountrySwitcher :country="country" @newCountry="handleNewCountry" />
          <CommonLangSwitcher />
        </div>
        <div class="navbar-brand">
          <figure class="brand-logo" @mouseover="isActive = 0" @click="goHome">
            Mesocross
          </figure>
        </div>
        <section class="user-tab" @mouseover="isActive = 0">
          <ThemeHeaderUserSection />
        </section>
      </div>
      <nav>
        <section class="menu container-fluid">
          <section class="nav">
            <template v-for="(item, i) in headItems">
              <!-- {{ item }} -->
              <div :key="i" class="menu-item position-relative">
                <span :class="{active: isActive === item.id}" @mouseover="isActive = item.id" @click="goTo(item)">{{ item.name }}</span>
                <ThemeHeaderSubMenu
                  v-if="isActive === item.id && (subItems[item.id] && subItems[item.id].length !== 0)"
                  :slug="[item]"
                  :data="subItems[item.id]"
                  @close="isActive = 0"
                />
              </div>
            </template>
          </section>
        </section>
      </nav>
    </template>
    <template v-else>
      <ThemeHeaderMobileNav
        :from="isActive"
        @openMenu="isActive = 1"
        @closeMenu="isActive = 0"
      />
      <transition name="slide">
        <ThemeHeaderMobileNavMenuItems
          v-if="isActive"
          :head-items="headItems"
          :data="subItems"
          @close="isActive = 0"
        />
      </transition>
    </template>
    <UiSidebarCart />
    <UiSidebarWishlist />
  </main>
</template>

<script>
import { mapActions } from 'vuex'
import isMobile from '@/mixins/isMobile'
export default {
  mixins: [isMobile],

  data () {
    return {
      headItems: [],
      subItems: [],
      isActive: 0,
      closedMenu: true,
      country: 'USA'
    }
  },

  async fetch () {
    const { data } = await this.$axios.$get('/header/get-header-data')
    this.headItems = data.parent
    this.subItems = data.children
  },
  fetchOnServer: true,

  created () {
    this.getCountries()
  },

  mounted () {
    this.country = localStorage?.country || 'USA'
    this.$nuxt.$on('newCountry', this.handleNewCountry)
  },

  methods: {
    ...mapActions({
      getCountries: 'getCountries'
    }),

    goHome () {
      this.$router.push('/')
    },

    goTo (to) {
      if (to.custom_slug === 'mesocross-services') {
        this.$router.push('/virtual-consultation')
        return
      }
      if (to.custom_slug === 'discover') {
        this.$router.push('/brand')
        return
      }

      if (to.type) {
        this.$router.push(`/${to.type}/${to.custom_slug}`)
        return
      }

      this.$router.push(`/${to.custom_slug}`)
    },

    handleNewCountry (val) {
      this.country = val
    }
  }
}
</script>

<style lang="scss" scoped>
@media (min-width: 1251px) {
  .lang_part {
    min-width: 33.33%;
    width: 33.33%;
  }
  .user-tab {
    min-width: 33.33%;
    width: 33.33%;
    display: flex;
    justify-content: flex-end;
  }
}
.header__cta {
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  position: relative;

  a {
    font: normal normal bold 12px/16px Arquitecta;
    letter-spacing: 0.6px;
    color: #221f20;
    text-transform: uppercase;
  }

  button {
    position: absolute;
    right: 3.25rem;
    top: 50%;
    transform: translate(0, -50%);
    background: transparent;
    filter: invert(1);
    @media (max-width: 767px) {
      right: 0.75rem;
      img {
        width: 16px;
        height: 16px;
      }
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  animation: slide 0.5s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  animation: slide 0.5s reverse ease-out;
}

main.main-header {
  width: 100%;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 80;

  &.mobile {
    position: sticky;
    backdrop-filter: blur(30px);
  }

  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    padding-bottom: 0;
    position: relative;
  }

  nav {
    justify-content: space-between;
    align-items: center;
    padding: 1.45rem;
    position: relative;
    min-height: 100px;
    @media (min-width: 1250px) {
      padding: 0;
      min-height: 0;
    }
    @media (max-width: 1249px) {
      min-height: 80px;
    }

    .menu {
      display: flex;
      align-items: center;
      z-index: 80;
      position: relative;
      figure {
        cursor: pointer;
        width: 3rem;
        user-drag: none;
        img {
          width: 100%;
        }
      }

      .nav {
        display: flex;

        margin: 0 auto;

        @media screen and (max-width: 1250px) {
          display: none;
        }

        span {
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          user-select: none;
          cursor: pointer;
          font-weight: 300;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          &.active {
            font-weight: 600;
          }
        }
      }
    }

    .user-tab {
      margin: 0;
      display: flex;
      gap: 2rem;
    }
  }
}

@keyframes slide {
  from {
    transform: translateX(-100px);
    opacity: 0;
  }

  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
.brand-logo {
    font-weight: 900;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 26px;
    margin: 0;
    cursor: pointer;
}
</style>
