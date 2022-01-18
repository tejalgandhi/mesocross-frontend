<template>
    <footer class="footer">
        <div class="footer__top">
            <div class="buttons">
                <a v-for="(link, i) in data.short_links" :key="i" :href="link.path" class="text">
                    {{ link.name }}
                </a>
            </div>
            <section>
                <h1 class="xxs-title">{{ data.title }}</h1>
                <button class="retangular-button" @click="show = !show">{{ data.newsletter }}</button>
            </section>
        </div>
        <div class="footer__bottom container-52">
            <nav>
                <ul v-for="(nav, i) in data.menu" :key="i">
                    <li class="text">{{ nav.title }}</li>
                    <li v-for="(item, x) in nav.items" :key="x" class="text">
                        <a :href="item.path">{{ item.name }}</a>
                    </li>
                </ul>
            </nav>
            <div class="footer__selects">
                <section>
                    <h1 class="text">{{ data.title_coin }}</h1>
                </section>
                <section>
                    <h1 class="text">{{ data.title_lang }}</h1>
                </section>
            </div>
            <p class="credits text">© Copyright {{new Date().getFullYear()}} Mesocross Limited. All rights reserved.</p>
        </div>
        <Newsletter v-show="show" :data="newsletter" @closeNewsletter="show = !show"/>
    </footer>
</template>

<script>
// Data
import content from "assets/json/footer.json";
import Newsletter from "../global/newsletter.vue"
export default {
    components: {
        Newsletter
    },
    data(){
        return {
            data: content.footer,
            newsletter: content.newsletter,
            show: false
        }
    },
}
</script>

<style lang="scss" scoped>
.footer {

    &__top {
        background-color: $black;
        padding-bottom: 5rem;

        section {
            margin: 5rem auto 0;
            width: 75%;
            text-align: center;

            @media (min-width: 1800px) {
                width: 60%;
            }

            h1{
                color: $white;
                margin-bottom: 2rem;
            }

            a {
                margin: auto;
            }
        }

        .buttons {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            border-top: 1px $white solid;
            border-bottom: 1px $white solid;

            a {
                text-align: center;
                color: $white;
                padding: 1.5rem;
                transition: .3s;

                &:hover {
                    background-color: rgba($white, .15);
                }
            }
        }
    }

    &__bottom {
        padding-top: 4rem;
        padding-bottom: 1.5rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    &__selects {
        width: 20%;

        @media (min-width: 1800px) {
            width: 30%;
        }

        section {
            h1 {
                text-transform: uppercase;
                color: $black;
                opacity: .6;
            }
        }
    }

    nav {
        width: 66%;
        display: flex;
        justify-content: space-between;

        @media (min-width: 1800px) {
            width: 50%;
        }

        ul {
            li {
                margin-bottom: .2rem;
                opacity: .6;
                transition: .3s ;

                &:hover {
                    opacity: 1;
                }

                &:first-of-type {
                    text-transform: uppercase;
                    margin-bottom: 1rem;
                    color: $black;
                }

                a {
                    color: $black;
                }
            }
        }
    }

    .credits {
        opacity: .6;
        margin-top: 6rem;
    }
}
</style>