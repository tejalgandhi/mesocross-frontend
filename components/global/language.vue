<template>
    <aside>
        <button @click="close()">
            <img  src="/imgs/close.png" alt="close">
        </button>
        <h2>{{$t('language.title')}}</h2>
        <ul>
            <li :class="{'active' : currentLang === 'en'}">
                <nuxt-link :to="switchLocalePath('en')">En</nuxt-link>
            </li>
            <li :class="{'active' : currentLang === 'pt'}">
                <nuxt-link :to="switchLocalePath('pt')">Pt</nuxt-link>
            </li>
        </ul>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            currentLang: this.$i18n.locale
        }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss" scoped>
    aside {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: $white;
        width: 33%;
        padding: 2rem 1.5rem;
        box-shadow: 0px 6px 12px rgba($black, .1);

        button {
            filter: brightness(1) invert(1);
                margin: 0 auto 1rem;
            
            img {
                max-height: 16px;
            }
        }

        h2 {
            @extend .text;
            color: $black;
            text-align: center;
        }

        ul {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 2rem auto 0;

            li {
                padding: 0 .75rem;
                position: relative;
                text-transform: uppercase;
                opacity: 0.6;

                &.active {
                    opacity: 1;
                }

                &::after {
                    content: '';
                    height: 100%;
                    width: 1px;
                    background-color: rgba($black, .4);
                    position: absolute;
                    right: 0;
                }

                &:last-of-type {
                    &::after {
                        display: none;
                    }
                }
            }
        }

        a {
            color: $black;
        }
    }
</style>