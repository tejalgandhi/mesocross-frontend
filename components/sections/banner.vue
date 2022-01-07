<template>
    <div class="banner">
        <section>
            <h1 class="title">{{ data.title }}</h1>
            <p class="text">{{ data.description }}</p>
            <a v-if="data.link" class="retangular-button" :href="data.link.to">{{ data.link.name }}</a>
        </section>
        <img :src="data.image.path" :alt="data.image.alt_text">
    </div>
</template>

<script>
// import api from '../../assets/js/api'
export default {
    props: {
        data: {
            type: Object,
            required: false,
            default: () => {}
        },
    }
}
</script>

<style lang="scss" scoped>
.banner {
    position: relative;
    background-color: $black;
    display: flex;
    justify-content: flex-end;

    img {
        width: auto;
        min-width: 50%;
        object-fit: cover;

        @media (min-width: 1100px) {
            height: 24rem;
        }

        @media (min-width: 1800px) {
            height: 33rem;
        }
    }

    section {
        position: absolute;
        top: 50%;
        left: 6rem;
        transform: translate(0, -50%);
        width: 33%;
        text-align: center;
        color: $white;
        

        h1 {
            margin-bottom: 1rem;

            @media (min-width: 1100px) {
                margin-bottom: 1.5rem;
            }
        }

        p {
            margin-bottom: 2rem;
        }
    }
}
</style>