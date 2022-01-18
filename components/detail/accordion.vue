<template>
    <div class="container">
        <div class="accordion-container">
            <div v-for="(item, i) in acc" :key="i" class="accordion" :class="{active : active == i}">
                <button @click="show(i)">
                    {{ item.title }}
                    <img v-if="active == i" src="/svgs/minus.svg" alt="image">
                    <img v-else src="/svgs/plus.svg" alt="image">
                </button>
                <p v-if="active == i">{{ item.description }}</p>
            </div>
        </div>
        <figure>
            <img :src="data.feature_image" alt="image">
        </figure>
    </div>
</template>

<script>
export default {
    props: {
        acc: {
            type: Array,
            required: false,
            default: () => {}
        },
        data: {
            type: Object,
            required: false,
            default: () => {}
        },
    },
    data() {
        return {
            active: 0
        }
    },
    methods: {
        show(x) {
            if(this.active === x) this.active = null
            else this.active = x
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        padding-left: 3.25rem;
        background-color: $black;
        padding-top: 8.75rem;
        // padding-bottom: 5.75rem;
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 2rem;

        figure {
            height: 432px;
            width: 40%;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }

    .accordion-container {
        width: 33%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        
        @media (min-width: 1100px) {
            width: 40%;
        }

        @media (min-width: 1366px) {
            width: 55%;
        }

        @media (min-width: 1800px) {
            width: 50%;
        }

    }

    .accordion {

        &.active {
            button {
                margin-bottom: 1rem;
            }
        }

        button, p {
            @extend .text;
            color: $white;
        }

        button {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>