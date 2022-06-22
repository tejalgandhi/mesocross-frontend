<template>
  <main class="main-header">
    <template v-if="!isMobile()">
      <div class="topbar container-fluid">
        <div class="lang_part">
          <CommonAccessPrice />
          <CommonLangSwitcher />
        </div>
        <div class="">
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
              <span :key="i" class="text-uppercase" :class="{active: isActive === item.id}" @click="goTo(item.custom_slug)">{{ item.name }}</span>
              <!-- <span :key="i" class="text-uppercase" :class="{active: isActive === item.id}" @click="goTo(item.custom_slug)" @mouseover="isActive = item.id">{{ item.name }}</span> -->
            </template>
          </section>
        </section>
      </nav>
      <ThemeHeaderSubMenu v-if="isActive" :slug="headItems.filter(el => el.id === isActive)" :data="subItems[isActive]" @close="isActive = 0" />
    </template>
    <template v-else>
      <ThemeHeaderMobileNav :from="isActive" @openMenu="isActive = 1" @closeMenu="isActive = 0" />
      <transition name="slide">
        <ThemeHeaderMobileNavMenuItems v-if="isActive" :head-items="headItems" :data="subItems" @close="isActive = 0" />
      </transition>
    </template>
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
      closedMenu: true
    }
  },

  async fetch () {
    const { data } = await this.$axios.$get('http://mesocross-api.test/api/header/get-header-data')
    this.headItems = data.parent
    this.subItems = data.children
  },
  fetchOnServer: true,

  created () {
    this.getCountries()
  },

  methods: {
    ...mapActions({
      getCountries: 'getCountries'
    }),

    goHome () {
      this.$router.push('/')
    },

    goTo (to) {
      if (to) { this.$router.push(`/${to}`) }
    }
  }
}
</script>

<style lang="scss" scoped>
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
        position: sticky;
        top: 0;
        left: 0;
        background: #000;
        z-index: 80;

        .topbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding:1rem;
            padding-bottom: 0;
            position: relative;
        }

        nav {
            justify-content: space-between;
            align-items: center;
            padding: 1.45rem;
            position: relative;
            min-height: 100px;
            @media (min-width:1250px) {
              padding: 0;
              min-height: 0;
            }

            .menu {
                display: flex;
                align-items: center;
                z-index: 80;

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

                    @media screen and (max-width: 1250px){
                        display: none;
                    }

                    span {
                        height: 80px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding-left: 2rem;
                        user-select: none;
                        cursor: pointer;

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
    .brand-logo{
      font-weight: bold;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      font-size: 20px;
      margin: 0;
    }
</style>
