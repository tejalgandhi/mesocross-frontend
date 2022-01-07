<template>
<div class="container">
    <h1>{{ title }}</h1>
    <div class="products-list container-52">
        <ProductCard v-for="product in products" :key="product.id" :product="product"/> 
    </div>
</div>
</template>

<script>
import api from '../../assets/js/api'
import ProductCard from "../../components/cards/product.vue"
export default {
    components: {
        ProductCard
    },
    props: {
        title: {
            type: String,
            required: false,
            default: () => {}
        }
    },
    data(){
        return {
            products: [],
            loaded: false,
        }
    },
    async mounted(){
        const response = await api.get('products/new-release').finally(() => {this.loaded = true})

        this.products.push(...response.data.data)
    }
}
</script>

<style lang="scss" scoped>
h1 {
    @extend .xxs-title;
    color: $white;
    margin-bottom: 3rem;
    text-align: center;
}

.container {
    padding-top: 5rem;
    padding-bottom: 5rem;
    background-color: $black;
}

.products-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}
</style>