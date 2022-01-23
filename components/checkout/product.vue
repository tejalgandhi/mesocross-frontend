<template>
    <article>
        <figure>
            <NuxtLink :to="'/product-detail/'+product.slug">
            <img :src="product.feature_image" alt="Imagem">
            </NuxtLink>
            <section>
                <h1>{{ product.name }}</h1>
                <h2>{{$t('product_card.ref')}}: {{ product.ref_number }}</h2>
            </section>
        </figure>
        <div class="quantity">
            <p><span>{{$t('product_card.qty')}}:</span>{{ qty }}</p>
        </div>
        <p><span>{{$t('product_card.price')}}:</span>€ {{ product.price }}</p>
        <p><span>{{$t('product_card.total')}}:</span>€ {{ product.price * product.qty }}</p>
        <div class="buttons">
            <button @click="deleteItem()">{{$t('product_card.delete')}}</button>
        </div>
    </article>
</template>

<script>
import api from '../../assets/js/api'
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
            qty: this.product.qty,
        }
    },
    methods: {
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
                if(flagVal === null) this.$emit('update', this.product.product_id)
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
        border: 1px solid rgba($black, .4);
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

            section {
                padding: 0;
            }
        }

        section {
            h1 {
                @extend .text;
                color: $black;
                margin-bottom: .5rem;
            }

            h2 {
                @extend .md-text;
                color: $black;
                opacity: .4;
            }
        }

        p {
            @extend .text;
            color: $black;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
                @extend .text;
                color: $grey-200;
                opacity: .6;
            }
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
                color: $black;
                text-decoration: underline;
            }
        }
    }
</style>