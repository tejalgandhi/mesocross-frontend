<template>
    <ul class="alert" :class="{'error' : status === false}">
        <li v-for="(item, i) in data" :key="i">
            {{ item }}
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        alerts: {
            type: Array,
            required: true,
            default: () => {}
        },
        status: {
            type: Boolean,
            required: true,
            default: () => {}
        }
    },
    data(){
        return {
            data: {}
        }
    },
    watch: {
        alerts(){
            this.data = this.alerts
        }
    }
}
</script>

<style lang="scss" scoped>
.alert {
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translate(-50%);
    max-width: 60%;
    background-color: $white;
    padding: 2rem;

    &.error {
        background-color: #e24149;

        li {
            color: $white;
        }
    }

    li {
        @extend .text;
        color: $black;
        text-align: center;
    }
}
</style>