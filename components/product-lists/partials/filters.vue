<template>
<div v-show="show">
    <div class="overlay" @click="close()"></div>
    <aside >
        <section>
            <div class="filters__title">
                <h1 class="xxs-title">{{ text.title }}</h1>
                <button class="close" @click="close()"><img src="/imgs/close.png" alt="close"></button>
            </div>
            <div class="filters-container">
                <div v-for="(filter, i) in filters" :key="i">
                    <button class="main-button text" @click="showFilters(i)">
                        <span>
                        {{ filter.name }}</span>
                        <img src="/svgs/plus-black.svg" alt="Plus">
                    </button>
                    <ul v-if="i == active">
                        <li v-for="button in filter.data" :key="button.id">
                            <button class="text" @click="handleFilter(button, i)">
                                {{ button.name }}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <div>
            <button class="md-text">{{ text.clean }}</button>
            <button class="md-text" @click="applyFilters()">{{ text.apply }}</button>
        </div>
    </aside>
</div>
</template>

<script>
export default {
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
        show: {
            type: Boolean,
            required: false,
            default: () => {}
        },
    },
    data(){
        return {
            active: null,
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        handleFilter(cat, i){
            this.$emit('filterProducts', cat)
        },
        applyFilters(){
            this.$emit('applyFilters')
        },
        showFilters(i) {
            if(this.active === i) this.active = null
            else this.active = i
        }
    }
}
</script>

<style lang="scss" scoped>
.overlay {
    width: 100vw;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba($black, .6);
}
aside {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 25%;
    background-color: $white;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 50;

    section {
        padding: 2.5rem 2.5rem  4.25rem;
        height: 90%;

        .filters {

            &__title {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                margin-bottom: 3rem;
                height: fit-content;

                h1 {
                    color: $black-200;
                }

                .close {
                    max-width: 20px;

                    img {
                        width: 100%;
                    }
                }
            }

            &-container {
                width: 100%;
                display: flex;
                flex-direction: column;
                gap: 1.875rem;
                height: 70%;

                button {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;

                    &.main-button {
                            position: sticky;
                        top: 0;
                        background-color: white;
                        z-index: 1;
                    }

                    img {
                        height: 28px;
                    }
                }

                > div {
                    max-height: 60%;
                    overflow-y: auto;

                    &::-webkit-scrollbar {
                        width: 4px;
                    }

                    ul {
                        margin-top: 1rem;
                        display: flex;
                        flex-direction: column;
                        gap: .5rem;
                        

                        li {
                            &.active {
                                button {
                                    font-weight: medium;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    > div {
        display: flex;
        z-index: 10;

        button {
            padding: 1rem;
            text-transform: uppercase;
            width: 50%;
            transition: .3s;

            &:first-of-type {
                color: $black-200;
                background-color: $white;
            }
            
            &:last-of-type {
                color: $white;
                background-color: $black;
            }

            
            &:hover {
                color: $black-200;
                background-color: rgba($black, .15);
            }

        }
    }
}
</style>