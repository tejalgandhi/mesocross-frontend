<template>
  <main class="main-header">
    <div v-if="tagline" class="header__cta">
      <a href="#">REGISTER AND ENJOY A WORLD OF BENEFITS</a> <button @click="tagline = false">
        <img width="20" height="20" src="@/assets/img/close.svg" alt="close">
      </button>
    </div>
    <template v-if="!isMobile()">
      <div class="topbar container-fluid">
        <div class="lang_part d-md-flex" @mouseover="isActive = 0">
          <CommonAccessPrice />
          <CommonCountrySwitcher />
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
              <span :key="i" class="text-uppercase" :class="{active: isActive === item.id}" @click="goTo(item.custom_slug)">{{ item.name }}</span>
              <!-- <span :key="i" class="text-uppercase" :class="{active: isActive === item.id}" @click="goTo(item.custom_slug)" @mouseover="isActive = item.id">{{ item.name }}</span> -->
            </template>
          </section>
        </section>
        <ThemeHeaderSubMenu v-if="isActive" :slug="headItems.filter(el => el.id === isActive)" :data="subItems[isActive]" @close="isActive = 0" />
      </nav>
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
      closedMenu: true,
      tagline: true
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
            font: normal normal bold 12px/16px Arial;
    letter-spacing: 0.6px;
    color: #221F20;
    text-transform: uppercase;
        }

        button {
                position: absolute;
    right: 3.25rem;
    top: 50%;
    transform: translate(0, -50%);
    background: transparent;
    filter: invert(1);
    @media (max-width:767px) {
      right: .75rem;
      img{
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
        position: sticky;
        top: 0;
        left: 0;
        background: #000;
        z-index: 80;

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
            @media (min-width:1250px) {
              padding: 0;
              min-height: 0;
            }
            @media (max-width:1249px) {
              min-height: 80px;
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
                        font: normal normal bold 14px/16px Arial;
                        letter-spacing: 0.7px;
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
      cursor: pointer;
    }
</style>
