<template>
    <div class="filters">
        <p class="lg-text">{{count}} {{text.products}}</p>
        <div>
            <button class="md-text">{{text.sort}}</button>
            <button class="md-text" @click="toggleFilters" >{{text.filters}}</button>
            <FiltersModule :filters="filters" :text="text" :show="show" @filterProducts="filter" @close="toggleFilters" @applyFilters="applyFilters"/>
        </div>
    </div>
</template>

<script>
import FiltersModule from "./filters.vue";
export default {
    components: {
        FiltersModule
    },
    props: {
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
        count: {
            type: Number,
            required: false,
            default: () => {}
        },
    },
    data() {
        return {
            show: false,
        }
    },
    methods: {
        toggleFilters() {
            this.show = !this.show
        },
        filter(cat) {
            this.$emit('filterProducts', cat)
        },
        applyFilters(){
            this.$emit('applyFilters')
        }
    }
}
</script>

<style lang="scss" scoped>
    .filters {
        display: flex;
        justify-content: space-between;
        margin-top: 3rem;

        p {
            color: $white;
        }

        button {
            background-color: $white;
            color: $black;
            border-radius: 2px;
            padding: 4px 8px;
        }
    }
</style>