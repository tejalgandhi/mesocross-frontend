<template>
    <div class="steps-container">
        <div class="step">
            <div>
                <span>1</span>
            </div>
            <p>{{ $t('checkout.delivery') }}</p>
        </div>
        <span class="line"></span>
        <div class="step">
            <div>
                <span>2</span>
            </div>
            <p>{{ $t('checkout.billing') }}</p>
        </div>
        <span class="line"></span>
        <div class="step">
            <div>
                <span>3</span>
            </div>
            <p>{{ $t('checkout.review') }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.steps-container {
    margin: 6.75rem auto 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .line {
        height: 1px;
        width: 4.75rem;
        background-color: $black;
    }

    .step {
        position: relative;
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
            position: absolute;
            bottom: 0;
            transform: translate(0, calc(100% + 8px));
        }
    }
}
</style>