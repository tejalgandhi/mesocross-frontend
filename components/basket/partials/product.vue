<template>
    <article>
        <figure>
            <img :src="product.feature_image" alt="Imagem">
            <section>
                <h1>{{ product.name }}</h1>
                <h2>Ref: {{ product.ref_number }}</h2>
            </section>
        </figure>
        <div class="quantity">
            <button @click="sub()"><img src="/svgs/sub.svg" alt="button"></button>
            <p>{{ qty }}</p>
            <button @click="add()"><img src="/svgs/sub.svg" alt="button"></button>
        </div>
        <p>€ {{ product.price }}</p>
        <p>€ {{ product.price * qty }}</p>
        <div class="buttons">
            <button>DELETE ITEM</button>
            <button>SAVE TO WISHLIST</button>
        </div>
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
    },
    data(){
        return {
            qty: 1,
        }
    },
    methods: {
        sub() {
            if(this.qty > 1) this.qty--
        },
        add() {
            this.qty++
        }
    }
}
</script>

<style lang="scss" scoped>
    article {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem 0;
        border: 1px solid rgba($white, .4);
        border-left: none;
        border-right: none;
        position: relative;

        figure {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            width: 40%;

            img {
                max-width: 140px;
                max-height: 140px;
                height: 100%;
                width: 100%;
            }
        }

        section {
            h1 {
                @extend .text;
                color: $white;
                margin-bottom: .5rem;
            }

            h2 {
                @extend .md-text;
                color: $white;
                opacity: .4;
            }
        }

        .quantity {
            display: flex;
            gap: .5rem;
            align-items: center;
            border: 1px solid rgba($white, .4);
        }

        p {
                @extend .text;
                color: $white;
        }

        .buttons {
            position: absolute;
            right: 0;
            bottom: 2rem;
            display: flex;
            align-items: center;
            gap: 2.5rem;

            button {
                @extend .md-text;
                text-transform: uppercase;
                color: $white;
                text-decoration: underline;
            }
        }
    }
</style>