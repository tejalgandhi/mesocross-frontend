<template>
    <ul>
        <li v-for="(item, i) in data" :key="i">
            <NuxtLink :to="item.path">
                {{item.name}}
            </NuxtLink>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: false,
            default: () => {}
        },
    }
}
</script>

<style lang="scss" scoped>
    ul {
        display: flex;
        gap: 0.5rem;

        li {
            a {
                color: $white;
                text-transform: uppercase;
                font-family: $primary;
                font-size: 0.75rem;

                &::after {
                    content: '/'
                }
            }

            &:last-of-type {
                opacity: .5;

                a {
                    &::after {
                        content: ''
                    }
                }
            }
        }
    }
</style>