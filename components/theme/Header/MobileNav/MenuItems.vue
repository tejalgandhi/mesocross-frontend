<template>
  <section class="mobile-navigation">
    <transition name="slide">
      <div v-if="!selectedMenu" class="items">
        <template v-for="(item, i) in headItems">
          <!-- {{ item }} -->
          <div :key="i" class="item" @click="data[item.id] ?selectedMenu = item : null">
            <span>{{ item.name }}</span>
            <span v-if="data[item.id]" class="arrow" />
          </div>
        </template>
      </div>
      <div v-else class="items sub">
        <div class="return" @click="selectedMenu = undefined">
          <span class="back" />
          <span>{{ selectedMenu.name }}</span>
        </div>
        <template v-for="(item, i) in data[selectedMenu.id]">
          <ThemeHeaderMobileNavSubMenuItems :key="i" :main="selectedMenu" :data="item" @close="$emit('close')" />
        </template>
      </div>
    </transition>
    <div class="user">
      <CommonLangSwitcher />
      <span class="semi-bold">My Account</span>
      <template v-if="!$auth.loggedIn">
        <span class="log text-uppercase" @click=";goTo('/login'), $emit('close')">login / register</span>
      </template>
      <template v-else>
        <div class="logged">
          <div class="user-logged">
            <figure>
              <img src="@/assets/img/user.svg" alt="user">
            </figure>
            <span class="name" @click="goTo('/dashboard')">{{ loggedinUser.full_name }}</span>
          </div>
          <span class="logout" @click="Logout">logout</span>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {}
    },
    headItems: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  data () {
    return {
      selectedMenu: undefined,
      submenu: []
    }
  },

  computed: {
    ...mapState({
      loggedinUser: state => state.user.loggedinUser
    })
  },

  methods: {
    ...mapMutations({
      setLoggedin: 'user/setLoggedin',
      setLoggedinUser: 'user/setLoggedinUser',
      setIsSubscribed: 'training/setIsSubscribed'
    }),

    async Logout () {
      this.setIsSubscribed(false)
      this.setLoggedin(false)
      this.setLoggedinUser({})
      await this.$auth.logout()
      this.$router.push('/')
    },
    goTo (url) {
      if (!url) {
        return
      }
      this.$router.push(url)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header__cta + nav + .mobile-navigation {
      top: 128px;
      height: calc(100vh - 128px);
  }
    .slide-enter-active,
    .slide-leave-active {
        animation: slide 0.5s ease-in;
    }

    .slide-enter-from,
    .slide-leave-to {
        animation: slide 0.5s reverse ease-out;
    }

    section {
        position: fixed;
        width: 100vw;
        height: calc(100vh - 80px);
        top: 80px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        z-index: 70;
        background: black;
    // border: 0.5px solid #4a4a4a;
        padding: 1rem 3rem;

        .items {
            width: 100%;
            display: flex;
            flex-direction: column;
            text-transform: uppercase;
            &.sub {
                gap: 1rem;
            }

            .item {
                padding: 10px 0;
                font-weight: 500;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .arrow {
                    width: 10px;
                    height: 10px;
                    border-top: solid 1px #fff;
                    border-right: solid 1px #fff;
                    transform: rotate(45deg);
                    transition: 0.2s;
                }
            }

            .return {
                display: flex;
                align-items: center;
                gap: 0.2rem;
                margin-bottom: 1rem;
                span {
                    font-weight: 600;
                }
                .back {
                    width: 10px;
                    height: 10px;
                    border-top: solid 1px white;
                    border-right: solid 1px white;
                    transform: rotate(225deg);
                }
            }
        }

        .user {
            width: 100%;
            margin: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            margin-bottom: 0;
            text-transform: uppercase;

            .logged {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 1rem;

                .user-logged {
                    display: flex;
                    gap: 0.5rem;
                    font-weight: 600;
                }
            }

            .log, .logout {
                width: 100%;
                display: flex;
                justify-content: center;
                padding: 10px 0;
                border-radius: 2px;
                background: #25282A;
                color: white;
                text-transform: capitalize;
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
</style>
