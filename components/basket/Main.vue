<template>
    <div class="container">
        <h1>{{ data.title }}</h1>
        <div v-if="products_list.length && Object.keys(user).length" class="shopping-bag">
            <div class="product-list">
                <div>
                    <div class="product-list__header">
                        <p>{{ data_basket.product_list.item_title }}</p>
                        <p>{{ data_basket.product_list.qty_title }}</p>
                        <p>{{ data_basket.product_list.price_title }}</p>
                        <p>{{ data_basket.product_list.total_title }}</p>
                    </div>
                    <Product v-for="product in products_list" :key="product.id" :product="product" :data="data_basket.product" @update="deleteProduct" @alert="alertHandeler"/>
                </div>
            </div>
            <Process :data="data_basket.process" :products_length="products_list.length" :total="total"/>
        </div>
        <Empty v-else :data="data" :user="user"/>
        <Alert v-show="alerts.length" :alerts="alerts" :status="status"/>
    </div>
</template>

<script>
import { mapGetters, mapMutations  } from 'vuex';
import api from '../../assets/js/api';
import content from '../../assets/json/basket';
import Empty from "../../components/basket/partials/empty.vue";
import Product from "../../components/basket/partials/product.vue";
import Process from "../../components/basket/partials/process.vue";
import Alert from "../../components/global/alert.vue";
export default {
    components: {
        Empty,
        Product,
        Process,
        Alert
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
            products_list: [],
            data_basket: content,
            total: 0,
            alerts: [],
            status: false
        }
    },
    computed: {
        ...mapGetters({
            getCart: 'user/getCart'
        })
    },
    mounted() {
        this.getProducts()
    },
    methods: {
        ...mapMutations({
            setCart: 'user/setCart',
        }),
        totalPrice(){
            this.total = 0
            this.products_list.forEach(product => {
                this.total += parseFloat(product.price * product.qty)
            });
        },
        async getProducts() {
            this.products_list = []
            const response = await api.get('cart')
            this.totalPrice()
            this.setCart(response.data.data)
            this.products_list = this.getCart
        },
        deleteProduct(data){
            console.log(data)
            // const i = this.getCart.map(item => item.id).indexOf(data);
            // this.getCart.someArrayofObjects.splice(i, 1);
        },
        alertHandeler(data){
            this.status = true
            if(typeof data === 'object') this.alerts = Object.values(data) 
            else this.alerts.push(data)
            setTimeout(function(){
                this.alerts = [];
            }.bind(this), 2000)
        }
    }
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
    justify-content: space-between;
    margin-top: 3rem;
}

.product-list {
    width: 65%;

    &__header {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        margin-bottom: .75rem;

        p {
            @extend .text;
            text-align: center;
            color: rgba($white, .4);
        }
    }
}
</style>