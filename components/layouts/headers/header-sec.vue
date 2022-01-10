<template>
    <div>
    <header class="header">
        <div class="header__top">
            <div class="lang">
                <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
                <nuxt-link :to="switchLocalePath('pt')">Tuga</nuxt-link>
            </div>
                <NuxtLink to="/" class="logo">
                    {{ data.logo }}
                </NuxtLink>
            <div class="side-buttons">
                
            </div>
        </div>
    </header>
    <div class="blank"></div>
    </div>
</template>

<script>
// Data
import content from "assets/json/header.json";
import { mapGetters, mapMutations } from 'vuex';
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
    mounted(){
        this.blankHeight()
    },
    methods:{
        ...mapMutations({
        setMessage: 'user/setMessage',
        }),
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