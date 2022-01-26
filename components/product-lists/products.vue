<template>
<div class="products-container container-52">
    <div>
        <Breadcrumbs :data="breadcrumbs"/>
        <Filters :filters="filter_fields" :text="text" :count="products_list.length" @filterProducts="addFilter" @applyFilters="filter" @cleanFilters="cleanFilters"/>
    </div>
    <div class="products-list">
        <ProductCard v-for="(product, i) in products_list" :key="i" :product="product"/> 
    </div>
    <div class="loadmore">
        <p class="md-text">{{products_list.length}} of {{total}} {{text.viwed}}</p>
        <button class="retangular-button black" @click="current_page += 1">{{text.show_more}}</button>
    </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import api from '../../assets/js/api';
import ProductCard from "../../components/cards/product.vue";
import Breadcrumbs from "./partials/breadcrumbs.vue";
import Filters from "./partials/filter-buttons.vue";
export default {
    components: {
        ProductCard,
        Breadcrumbs,
        Filters
    },
    props: {
        breadcrumbs: {
            type: Array,
            required: false,
            default: () => {}
        },
        filters: {
            type: Array,
            required: false,
            default: () => {}
        },
        text: {
            type: Object,
            required: false,
            default: () => {}
        },
    },
    data(){
        return {
            products_list: [],
            per_page: 10,
            current_page: 1,
            total_pages: 0,
            filter_fields: [],
            total: 0,
            category: '',
            catregories: []
        }
    },
    computed: {
        ...mapGetters({
            getCat: 'user/getCat'
        }),
    },
    watch: {
        current_page: {
            immediate: true,
            handler(val) {
                if(this.getCat !== null) {
                    this.addFilter(this.getCat)
                    this.filter()
                    this.getData(this.getCat)
                } else this.getData(val)
            }
        },
        category(val) {
            this.products_list = []
            this.total = 0
            this.total_pages = 0
            if (this.current_page !== 1) this.current_page = 1
            else this.getData(1)
        }
    },
    mounted(){
        this.filters.forEach(filter => {
            this.getFilters(filter)
        });
    },
    methods: {
        ...mapMutations({
            setCat: 'user/setCat',
        }),
        async getData(page) {
            const response = await api.get(`products?limit=${this.per_page}&category=${this.category}&page=${page}`)
            if(!this.total) this.total = response.data.meta.total
            if(!this.total_pages ) this.total_pages = response.data.meta.last_page
            this.products_list.push(...response.data.data)
        },

        async getFilters(data) {
            const response = await api.get(`${data.api}`)
            this.filter_fields.push({data: response.data.data, name: data.name})
        },
        addFilter(id) {
            this.catregories.push(id)
        },
        filter(){
            const message = this.catregories.join()
            this.category = message
        },
        cleanFilters(){
            this.category = '';
        }
    },
}
</script>

<style lang="scss" scoped>
.products {
    &-container {
        background-color: $black;
        padding-top: 3rem;
        padding-bottom: 3rem;

        .loadmore {
            margin: 6rem 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            p {
                color: $white;
                opacity: .4;
                margin-bottom: .75rem;
            }
        }
    }

    &-list {
        padding-top: 3rem;
        padding-bottom: 3rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6rem 1.25rem;
    }
}
</style>