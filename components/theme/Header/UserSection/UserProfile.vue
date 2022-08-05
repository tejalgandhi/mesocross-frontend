<template>
  <article>
    <template v-if="!$auth.loggedIn">
      <span class="log" @click=";goTo('/login'), $emit('close')">login / register</span>
    </template>
    <template v-else>
      <div class="items">
        <span class="name" @click="goTo('/dashboard')" v-if="loggedinUser.full_name">{{ loggedinUser.full_name }}</span>
        <span class="name" @click="goTo('/dashboard')" v-else>{{ loggedinUser.name }}</span>
        <div class="tabs">
          <span v-if="$auth.user.type === 1" @click="goTo('/dashboard?page=personal-data')">{{ $t('dashboard.personal_data') }}</span>
          <span v-else-if="$auth.user.type === 2" @click="goTo('/dashboard?page=company-data')">{{ $t('dashboard.company_data') }}</span>
          <span @click="goTo('/dashboard?page=address-book')">{{ $t('dashboard.address_book') }}</span>
          <span @click="goTo('/dashboard?page=payment-methods')">{{ $t('payment_methods') }}</span>
          <span @click="goTo('/dashboard?page=login-data')">{{ $t('dashboard.login_data') }}</span>
        </div>
        <span class="logout" @click="Logout">logout</span>
      </div>
    </template>
  </article>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
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
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
    article {
        position: absolute;
        top: 3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #242424;
        box-shadow: 0px 32px 64px #00000033;
        width: fit-content;
        border-radius: 5px;
        z-index: 100;

        &:before {
            content: "";
            display: block;
            position: absolute;
            top: -15px;
            border-bottom: 15px solid #242424;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
        }

        span {
            white-space: nowrap;
            text-transform: capitalize;
            transition: 0.2s;
            border-radius: 5px;
        }

        .log {
            padding: 5px 15px;
            font-weight: 500;

            &:hover {
                text-decoration: underline;
            }
        }

        .items {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 15rem;
            max-width: 100%;
            gap: 1rem;

            .name {
                padding: 10px 15px 0px;
                font-weight: 600;
                font-size: 1.1rem;
            }

            .tabs {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-bottom: 5px;
                position: relative;
                gap: 0.5rem;

                span {
                    padding: 0px 15px;
                    position: relative;

                    &::after {
                        content: '';
                        width: 0%;
                        height: 2px;
                        background: #fff;
                        position: absolute;
                        left: 15px;
                        bottom: 0;
                        transition: 0.2s;
                    }

                    &:hover {
                        &::after {
                            width: 5rem;
                            max-width: 100%;
                        }
                    }
                }
            }

            .logout {
                padding: 10px;
                display: flex;
                justify-content: center;
                width: 100%;
                background: rgba(0,0,0,0.1);
                border-top-left-radius: 0px;
                border-top-right-radius: 0px;
                font-weight: 500;

                &:hover {
                    background: rgba(0,0,0,0.05);
                }
            }
        }
    }
</style>
