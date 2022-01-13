<template>
    <div class="step" :class="{active : active === position}">
        <div>
            <span>{{position}}</span>
        </div>
        <p>{{ $t(`${name}`) }}</p>
    </div>
</template>

<script>
export default {
    props: {
        position: {
            type: Number,
            required: false,
            default: () => {}
        },
        name: {
            type: String,
            required: false,
            default: () => {}
        },
        active: {
            type: Number,
            required: false,
            default: () => {}
        },
    }
}
</script>

<style lang="scss" scoped>
    .step {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: .4;

        &.active {
            opacity: 1;
        }

        > div {
            width: 40px;
            height: 40px;
            background-color: $black;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            span {
                @extend .lg-text;
                color: $white
            }
        }

        p {
            @extend .md-text;
            color: $black;
            font-weight: 500;
            position: absolute;
            bottom: 0;
            transform: translate(0, calc(100% + 8px));
        }
    }
</style>