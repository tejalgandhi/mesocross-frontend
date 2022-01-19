<template>
    <div class="container">
        <h1>{{ data.title }}</h1>
        <div v-if="products_list.length && Object.keys(user).length" class="product-list">
            <Product v-for="product in getWishlist" :key="product.id" :product="product" :wishlist="true" @update="remove"/>
        </div>
        <Empty v-else :data="data" :user="user"/>
    </div>
</template>

<script>
import { mapGetters, mapMutations  } from 'vuex';
import api from '../../assets/js/api';
import Empty from "../../components/basket/partials/empty.vue";
import Product from "../../components/cards/product.vue";
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
    data() {
        return {
            products_list: []
        }
    },
    computed: {
        ...mapGetters({
            getWishlist: 'user/getWishlist',
        })
    },
    mounted(){
        this.wishlist()
    },
    methods: {
        ...mapMutations({
            setWishlist: 'user/setWishlist',
            deleteFromWishlist: 'user/deleteFromWishlist'
        }),
        async wishlist() {
            this.products_list = []
            const response = await api.get('wishlist')
            this.setWishlist(response.data.data)
            this.products_list = this.getWishlist
        },
        remove(id) {
            api.post('wishlist', {
                product_id: id,
            })
            this.deleteFromWishlist(id)
        }
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

.product-list {
    display: grid;
    padding: 0 13.5rem;
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem 2rem;
    margin-top: 3rem;
}
</style>