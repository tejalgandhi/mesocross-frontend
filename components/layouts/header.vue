<template>
    <div>
    <header class="header">
        <div v-if="getMessage" class="header__cta">
            <a :href="data.link.to">{{data.link.text}}</a>
            <button  @click="close()"><img src="/imgs/close.png" alt="close"></button>
        </div>
        <div class="header__top">
            <div class="lang">
                <button :class="{active : changeLang}" @click="changeLanguage()">
                    {{currentLang}}
                    <img src="/svgs/chevron.svg" alt="">
                </button>
                <transition name="fade">
                    <Language v-if="changeLang" @close="changeLanguage"/>
                </transition>
            </div>
                <NuxtLink to="/" class="logo">
                    {{ data.logo }}
                </NuxtLink>
            <div class="side-buttons">
                <NuxtLink v-if="!Object.keys(getUser).length" to="/auth">
                    {{ data.sign_in }}
                </NuxtLink>
                <div v-else @mouseleave="dropdown = false">
                    <div  @mouseover="dropdown = true" >
                        <NuxtLink to="/reserved" class="reserved">
                            <img  src="/svgs/person.svg" alt="bag">
                        </NuxtLink>
                    </div>
                    <transition name="fade">
                        <ul v-show="dropdown">
                            <li @click="reserved(0)">
                                {{ $t('reserved.personal_data_title') }}
                            </li>
                            <li  @click="reserved(1)">
                                {{ $t('reserved.shipping') }}
                            </li>
                            <li @click="reserved(2)">
                                {{ $t('reserved.billing') }}
                            </li>
                            <li  @click="reserved(3)">
                                {{ $t('reserved.update_password') }}
                            </li>
                        </ul>
                    </transition>
                </div>
                <NuxtLink to="/wishlist">
                    <img src="/svgs/wishlist.svg" alt="bag">
                </NuxtLink>
                <NuxtLink to="/shopping-bag">
                    <img src="/svgs/bag.svg" alt="bag">
                </NuxtLink>
                <button><img src="/svgs/search.svg" alt="search"></button>
            </div>
        </div>
        <nav>
            <ul>
                <li v-for="(item, i) in data.menu" :key="i">
                    <NuxtLink :to="'/'+item.path">
                        {{item.name}}
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
    <div class="blank"></div>
    </div>
</template>

<script>
// Data
import content from "assets/json/header.json";
import { mapGetters, mapMutations } from 'vuex';
import api from "../../assets/js/api.js";
import Language from "../global/language.vue"
// Components
export default {
    components: {
        Language
    },
    data(){
        return {
            data: content,
            dropdown: false,
            changeLang: false,
            currentLang: this.$i18n.locale
        }
    },
    computed: {
        ...mapGetters({
            getUser: 'user/getUser',
            getMessage: 'user/getMessage',
            getSignIn: 'user/getSignIn'
        }),
    },
    async mounted(){
        if (typeof window !== 'undefined') {
            if(localStorage.loginToken){
                const response = await api.get('user')
                this.setUser(response.data)
                this.close()
            }
        }
        this.blankHeight();
        window.onbeforeunload = () => {
            if(!this.getSignIn) localStorage.clear()
        }
    },
    methods:{
        ...mapMutations({
            setMessage: 'user/setMessage',
            setUser: 'user/setUser',
            setReserved: 'user/setReserved',
        }),
        close(){
            this.setMessage(false)
            this.blankHeight()
        },
        blankHeight(){
            const test = document.querySelector('header');
            const blank = document.querySelector('.blank');
             setTimeout(function () {
                blank.style.height = test.offsetHeight + "px";
            }, .1);
        },
        changeLanguage() {
            this.changeLang = !this.changeLang
        },
        reserved(val) {
            this.setReserved(val)
            this.$router.push({path: 'reserved'})
        }
    },
}
</script>

<style  lang="scss">

    .blank {
        background-color: $black;
    }

    .header {
        background-color: $black;
        width: 100%;
        z-index: 30;
        transition: .3s;
        position: fixed;

        &__cta {
            background-color: $white;
            padding: 1rem;
            display: flex;
            justify-content: center;
            position: relative;

            a {
                font-size: 12px;
                text-transform: uppercase;
                color: $black;
                font-weight: bold;
            }

            button {
                position: absolute;
                right: 3.25rem;
                top: 50%;
                transform: translate(0,-50%);
                max-width: 16px;

                img {
                    width: 100%;
                }
            }
        }

        &__top {
            padding: 1.5rem 3.25rem;
            display: flex;
            justify-content: space-between;
            position: relative;

            .lang {
                button {
                    @extend .text;
                    color: $white;
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;

                    img {
                        margin-left: .75rem;
                        filter: brightness(1) invert(1);
                        transform: rotate(-90deg);
                    }

                    &.active {
                        img {
                            transform: rotate(90deg);
                        }
                    }
                }
            }

            .logo {
                font-weight: bold;
                color: $white;
                text-transform: uppercase;
                letter-spacing: .07em;
                font-size: 20px;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }

            .side-buttons {
                display: flex;
                align-items: center;
                gap: 1.25rem;

                a {
                    @extend .md-text;
                    color: $white;
                    text-transform: uppercase;
                    position: relative;

                    &.reserved {
                        img {
                            max-height: 20px;
                            filter: brightness(1) invert(1);
                        }
                    }
                }

                > div {
                    position: relative;
                    
                    ul {
                        box-shadow: 0px 6px 12px rgba($black, .1);
                        min-width: 180px;
                        visibility: visible;
                        opacity: 1;
                        transform: translate(-50%, 100%);
                        z-index: 1;
                        position: absolute;
                        left: 50%;
                        bottom: 0;
                        background-color: $white;
                        display: flex;
                        flex-direction: column;

                        li {
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            padding: .75rem 0;
                            border-bottom: 1px solid rgba($black, .4);
                            transition: .2s;
                            color: $black;
                            width: 100%;
                            text-align: center;
                            cursor: pointer;
                            text-align: center;

                            &:hover {
                                background-color: rgba($black, .1);
                            }
                        }
                    }
                }
            }
        }

        nav {
            padding: 1rem 0 1.5rem 0;
            display: flex;
            justify-content: center;

            > ul {
                display: flex;
                gap: 2.5rem;

                li {
                    a {
                        font-size: 14px;
                        color: $white;
                        text-transform: uppercase;
                        font-weight: bold;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>