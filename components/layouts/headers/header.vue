<template>
    <div>
    <header class="header">
        <div v-if="getMessage" class="header__cta">
            <a :href="data.link.to">{{data.link.text}}</a>
            <button @click="close()"><img src="/imgs/close.png" alt="close"></button>
        </div>
        <div class="header__top">
            <div class="lang">
                <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
                <nuxt-link :to="switchLocalePath('pt')">Tuga</nuxt-link>
            </div>
                <NuxtLink to="/" class="logo">
                    {{ data.logo }}
                </NuxtLink>
            <div class="side-buttons">
                <template v-if="!Object.keys(getUser).length">
                    <a href="/auth">{{ data.sign_in }}</a>
                </template>
                <template v-else>
                    <a href="/reserved">Ja registado</a>
                </template>
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
import api from "../../../assets/js/api.js";
// Components
export default {
    data(){
        return {
            data: content,
        }
    },
    computed: {
        ...mapGetters({
            getUser: 'user/getUser'
        }),
        ...mapGetters({
            getMessage: 'user/getMessage'
        })
    },
    async created(){
        if (typeof window !== 'undefined') {
            if(localStorage.loginToken){
                const response = await api.get('user')
                this.setUser(response.data)
                this.close()
            }
        }
    },
    mounted(){
        this.blankHeight();
    },
    methods:{
        ...mapMutations({
        setMessage: 'user/setMessage',
        }),
        ...mapMutations({
            setUser: 'user/setUser',
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
                a {
                    @extend .text;
                    color: $white;
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