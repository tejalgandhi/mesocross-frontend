<template>
    <section>
        <p>{{ data.description }}</p>
        <p v-if="!Object.keys(user).length">{{ data.signin }}</p>
        <a v-if="!Object.keys(user).length" :href="data.link.path" class="retangular-button">{{ data.link.name }}</a>
    </section>
</template>

<script>
export default {
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
    }
}
</script>

<style lang="scss" scoped>
 section {
     width: 25%;
     margin: auto;
     color: $white;
     text-align: center;

     p {
         @extend .md-text;
         color: $white;
         margin-bottom: .75rem;

         &:last-of-type {
            margin-bottom: 2.75rem;
         }
     }
 }
</style>