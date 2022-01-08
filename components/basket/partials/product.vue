<template>
    <article>
        <figure>
            <NuxtLink :to="'/product-detail/'+product.slug">
            <img :src="product.feature_image" alt="Imagem">
            </NuxtLink>
            <section>
                <h1>{{ product.name }}</h1>
                <h2>Ref: {{ product.ref_number }}</h2>
            </section>
        </figure>
        <div class="quantity">
            <button @click="sub(product.qty)"><img src="/svgs/sub.svg" alt="button"></button>
            <p>{{ product.qty }}</p>
            <button @click="add()"><img src="/svgs/sub.svg" alt="button"></button>
        </div>
        <p>€ {{ product.price }}</p>
        <p>€ {{ product.price * product.qty }}</p>
        <div class="buttons">
            <button @click="deleteItem()">{{data.delete_product}}</button>
            <button @click="addWishlist()">{{data.save_wishlist}}</button>
        </div>
    </article>
</template>

<script>
import api from '../../../assets/js/api'
export default {
    props: {
        data: {
            type: Object,
            required: false,
            default: () => {}
        },
        product: {
            type: Object,
            required: false,
            default: () => {}
        },
    },
    methods: {
        sub(qty) {
            if(parseInt(qty) === 1) {
                this.apiMethod(null, null)
            } else {
                this.apiMethod(2, 1)
            }
        },
        add() {
            this.apiMethod(1, 1)
        },
        deleteItem() {
            this.apiMethod(null, null)
        },
        apiMethod(flagVal, isUpdate) {
            api.post('cart', {
                product_id: this.product.product_id,
                qty: 1,
                size_id: this.product.size_id,
                flag: flagVal,
                is_update: isUpdate
            }).then((response) => {
                this.$emit('update')
            });
        },
        addWishlist(){
            api.post('wishlist', {
                product_id: this.product.product_id,
                flag: 1,
                is_update: 1
            }).then((response) => {
                this.$emit('alert', response.data.message)
            });
        },
    }
}
</script>

<style lang="scss" scoped>
    article {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
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

            img {
                max-width: 140px;
                max-height: 140px;
                min-height: 100%;
                min-width: 100%;
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
            width: fit-content;
            margin: auto;
        }

        p {
            @extend .text;
            color: $white;
            text-align: center;
        }

        .buttons {
            position: absolute;
            right: 0;
            bottom: 1.25rem;
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