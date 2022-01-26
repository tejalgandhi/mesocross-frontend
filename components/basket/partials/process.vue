<template>
    <aside :class="{ checkout : !basket }">
        <section>
            <h1>{{ $t('process.title') }}</h1>
            <form action="">
                <label for="">{{ $t('process.promo') }}</label>
                <input type="text" :placeholder="$t('process.placeholder')">
            </form>
        </section>
        <div>
            <p><span>{{ items }} {{ $t('process.items_text') }} ({{ products }} {{ $t('process.product_text') }})</span> €{{ price }}</p>
            <p><span>{{ $t('process.discount_text') }}</span> € 0</p>
            <p><span>{{ $t('process.delivery_text') }}</span> € 0</p>
            <p class="total"><span>{{ $t('process.total_text') }}</span> € {{ price }}</p>
            <NuxtLink v-if="basket" to="checkout" class="retangular-button ">
                {{ $t('process.process') }}
            </NuxtLink>
            <button v-else class="retangular-button retangular-button__inverted" @click="nextStep()">{{ $t('process.save_button') }}</button>
        </div>
    </aside>
</template>

<script>
import { mapGetters  } from 'vuex';
export default {
    props: {
        data: {
            type: Object,
            required: false,
            default: () => {}
        },
        basket: {
            type: Boolean,
            required: false,
        }
    },
    data(){
        return {
            items: 0,
            products: 0,
            price: 0,
        }
    },
    computed: {
        ...mapGetters({
            getCart: 'user/getCart'
        })
    },
    watch: {
        getCart: {
            deep: true,
            handler(){
                this.getDetails()
            }
        },
    },
    mounted() {
        this.getDetails()
    },
    methods: {
        getDetails() {
            this.price = 0
            this.items = 0
            this.products = 0
            this.getCart.forEach(product => {
                this.items += product.qty
                this.products += 1
                this.price += Math.floor(parseFloat(product.price * product.qty) * 10) / 10
            });
        },
        nextStep() {
            this.$emit('nextStep')
        }
    }
}
</script>

<style lang="scss" scoped>
    aside {
        width: 25%;
        position: sticky;
        top: 200px;
        height: fit-content;

        section {
            h1 {
                @extend .lg-text;
                color: $white;
                margin-bottom: 1rem;
            }

            form {
                background-color: rgba($white, .2);
                display: flex;
                flex-direction: column;
                padding: 1.25rem;
                width: 100%;

                label {
                    @extend .md-text;
                    color: $white;
                    margin-bottom: .5rem;
                }

                input {
                    background-color: $black;
                    padding: .75rem;
                    @extend .md-text;
                    color: rgba($white, .8);
                }
            }
        }

        > div {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1.5rem;

            p {
                @extend .text;
                color: $white;
                display: flex;
                justify-content: space-between;

                &:first-of-type {
                    font-weight: 700;
                }

                &.total {
                    padding-top: 1rem;
                    border-top: 1px solid rgba($white, .4);
                }
            }

            .retangular-button {
                text-align: center;
            }
        }

        &.checkout {
            section, div, form {
                h1, label, p, input {
                    color: $black;
                }
            }

            form {
                background-color: rgba($black, .1);
            }

            input {
                background-color: $white;
            }

            .total {
                border-top-color: $black;
            }
            button {
                @extend .black;
            }
        }

    }
</style>