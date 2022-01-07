<template>
    <div class="container">
        <h1>{{ data.title }}</h1>
        <Empty v-if="!products_list.length" :data="data" :user="user"/>
        <div v-else class="shopping-bag">
            <div class="product-list">
                <Product v-for="product in products_list" :key="product.id" :product="product"/>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../assets/js/api';
import Empty from "../../components/basket/partials/empty.vue";
import Product from "../../components/basket/partials/product.vue";
export default {
    components: {
        Empty,
        Product
    },
    props: {
        data: {
            type: Object,
            required: false,
            default: () => {}
        },
        user: {
            type: Object,
            required: false,
            default: () => {}
        },
    },
    data(){
        return {
            products_list: []
        }
    },
    async mounted() {
        const response = await api.get('cart')
        this.products_list.push(...response.data.data)
    },
}
</script>

<style lang="scss" scoped>
.container {
    background-color: $black;
    padding: 6.5rem 0 12.5rem;

     h1 {
         @extend .xxs-title;
         color: $white;
         margin-bottom: 1.5rem;
         text-align: center;
     }
}

.shopping-bag {
    @extend .container-52;
    width: 100%;
    display: flex;
}

.product-list {
    width: 75%;
}
</style>