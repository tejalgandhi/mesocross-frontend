<template>
    <section>
        <h1>{{ product.name }}</h1>
        <p>{{ product.short_description }}</p>
        <p v-if="product.product_size.length === 1" class="quantity">{{ product.product_size[0].name }}</p>
        <select  v-else id="" v-model="size" name="" class="quantity">
            <option v-for="option in product.product_size" :key="option.size_id" :value="option.id" class="quantity">
                {{option.name}}
            </option>
        </select>
        <h2>€ {{ data.price }}</h2>
        <div class="add-buttons">
            <button class="add-buttons__fav"  @click="addWishlist()"><img src="/svgs/heart.svg" alt="close"></button>
            <button class="add-buttons__bag" @click="addProduct()">{{ data.add_bag }}</button>
        </div>
        <p class="sm">{{ data.delivery }}</p>
        <p class="sm">{{ data.returns }}</p>
    </section>
</template>

<script>
import api from '../../assets/js/api'
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
    data() {
        return {
            size: this.product.product_size[0].id
        }
    },
    methods: {
        async addProduct(){
            await api.post('cart', {
                product_id: this.product.id,
                qty: 1,
                size_id: this.size,
            })
        },
        async addWishlist(){
            await api.post('wishlist', {
                product_id: this.product.id,
            })
        }
    }
}   
</script>

<style lang="scss" scoped>
    section {
        position: sticky;
        top: 42.5%;
        text-align: center;
        width: 100%;
        
        h1,
        h2 {
            @extend .xxs-title;
            color: $white;
            margin-bottom: 2px;
        }

        p {
            @extend .text;
            color: $white;

            &.sm {
                @extend .md-text;
                opacity: .4;
            }
        }

        .quantity {
            margin: 1.5rem 0 2rem;
            background-color: transparent;
            border: none;
            @extend .text;
            color: $white;

            option {
                color: $black;
            }
        }

        .add-buttons {
            display: flex;
            gap: 1rem;
            width: fit-content;
            margin: 1.5rem auto;

            &__fav {
                border: 1px solid rgba($white, .4);
                border-radius: 4px;
                padding: .1rem .8rem;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: .2s;

                &:hover {
                    background-color: rgba($white, .2);
                }
            }

            &__bag {
                @extend .text;
                background-color: $white;
                color: $black;
                text-transform: uppercase;
                padding: .75rem 3rem;
                border-radius: 4px;
                transition: .2s;
                    border: 1px solid $black;

                &:hover {
                    border: 1px solid $white;
                    color: $white;
                    background-color: transparent;
                }
            }
        }
    }
</style>