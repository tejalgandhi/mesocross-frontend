<template>
    <article>
        <button v-if="wishlist" @click="remove()">
            <img src="/imgs/close.png" alt="">
        </button>
        <NuxtLink :to="'/product-detail/'+product.slug">
            <figure>
                <img :src="product.feature_image" alt="image">
            </figure>
            <section>
                <h1 class="lg-text">{{ product.name }}</h1>
                <p class="text">{{ product.short_description }}</p>
            </section>
        </NuxtLink>
    </article>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: false,
            default: () => {}
        },
        wishlist: {
            type: Boolean,
            required: false,
            default: () => {}
        },
    },
    methods: {
        remove(){
            this.$emit('update', this.product.product_id)
        }
    }
}
</script>

<style lang="scss" scoped>


    article {
        position: relative;

        &:hover {
            img {
                transform: scale(1.1);
            }
        }

        button {
            filter: brightness(1) invert(1);
            position: absolute;
            right: 1.25rem;
            top: 1.25rem;

            img {
                width: 20px;
            }
        }

        figure {
            height: 26.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            
            @media (min-width: 1100px) {
                height: 18.5rem;
            }

            @media (min-width: 1366px) {
                height: 22.5rem;
            }

            @media (min-width: 1800px) {
                height: 26.5rem;
            }
        
            img {
                object-fit: contain;
                transition: .3s;
                max-height: 85%;
            }
        }

        section {
            color: $white;
            text-align: center;
            margin-top: 1.5rem;

            h1 {
                margin-bottom: .75rem;

                @media (min-width: 1366px) {
                    margin-bottom: 1rem;
                }
            }
        }
    }
</style>