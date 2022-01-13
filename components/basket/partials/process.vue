<template>
    <aside>
        <section>
            <h1>{{ data.process_title }}</h1>
            <form action="">
                <label for="">{{ data.promo_title }}</label>
                <input type="text" :placeholder="data.promo_text">
            </form>
        </section>
        <div>
            <p><span>{{ products_length }} {{ data.products_text }}</span> {{ total }}</p>
            <p><span>{{ data.discount_text }}</span> € 0</p>
            <p><span>{{ data.delivery_text }}</span> € 0</p>
            <p class="total"><span>{{ data.total_text }}</span> € {{ total }}</p>
            <NuxtLink to="checkout" class="retangular-button ">
                {{ data.button }}
            </NuxtLink>
        </div>
    </aside>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: false,
            default: () => {}
        },
        products_length: {
            type: Number,
            required: false,
            default: () => {}
        },
        total: {
            type: Number,
            required: false,
            default: () => {}
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

                &.total {
                    padding-top: 1rem;
                    border-top: 1px solid rgba($white, .4);
                }
            }

            .retangular-button {
                text-align: center;
            }
        }
    }
</style>