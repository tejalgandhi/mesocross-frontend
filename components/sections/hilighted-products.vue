<template>
    <div class="hilighted-products container-52">
        <article v-for="(cat, i) in cats" :key="i" @click="showCat(cat)">
            <figure>
                <img :src="cat.image" alt="image">
            </figure>
            <section>
                <h1 class="xxs-title">{{ cat.title }}</h1>
                <p class="text">{{ cat.title }}</p>
                <p class="retangular-button retangular-button__inverted">{{data.button}}</p>
            </section>
        </article>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import api from '../../assets/js/api'
export default {
    props: {
        data: {
            type: Object,
            required: false,
            default: () => {}
        }
    },
    data(){
        return {
            cats: []
        }
    },
    async  mounted() {
        const response = await api.get('home/blogs')
        this.cats.push(...response.data.data)
    },
    methods: {
        ...mapMutations({
            setCat: 'user/setCat',
        }),
        showCat(cat){
            this.setCat(cat)
            this.$router.push({path: '/products', params: cat})
        },
    }
}
</script>

<style lang="scss" scoped>
.hilighted-products {
    background-color: $black;
    padding-top: 7rem;
    padding-bottom: 7rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem 1.25rem;

    article {
        cursor: pointer;
        
        &:hover {
            img {
                transform: scale(1.1);
            }
        }

        figure {
            height: 32rem;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;

            @media (min-width: 1100px) {
                height: 18rem;
            }

            @media (min-width: 1366px) {
                height: 24rem;
            }

            @media (min-width: 1800px) {
                height: 32rem;
            }
        
            img {
                width: 80%;
                height: 80%;
                object-fit: contain;
                transition: .3s;
            }
        }

        section {
            text-align: center;
            color: $white;
            max-width: 80%;
            margin: 2rem auto 0;

            @media (min-width: 1800px) {
                max-width: 60%;
            }

            h1 {
                margin-bottom: .75rem;

                @media (min-width: 1800px) {
                    margin-bottom: 1rem;
                }
            }

            p {
                margin-bottom: 2rem;
            }

            .retangular-button {
                cursor: pointer;  
                margin: 0 auto;
                width: fit-content;
            }
        }
    }
}
</style>