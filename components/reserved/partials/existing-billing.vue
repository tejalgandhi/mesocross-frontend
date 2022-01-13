<template>
    <section class="existing-billing" :class="{ active : active }" @click="makeDefault()">
        <div class="name"> 
            <input :id="data.id" type="radio" name="radio">
            <!-- <img src="/imgs/visa.png" alt=""> -->
            <label :for="data.id">
                <p>Jenifer Arruda</p>
                <span>{{data.number}}</span>
            </label>
        </div>
        <div class="buttons">
            <button @click="removeBilling">{{ $t('reserved.remove_address') }}</button>
        </div>
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
    },
    data(){
        return {
            active: false
        }
    },
    methods: {
        makeDefault(){
            this.active = true
        },
        removeBilling(){

        }
    }
}
</script>
<style lang="scss" scoped>
    .existing-billing {
        border: 1px solid rgba($black, .4);
        border-radius: 4px;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0;

        &.active {
            border: 1px solid $black;
        }

        .name {
            width: 20%;
            display: flex;
            align-items: center;
            gap: 1rem;

            label {
                @extend .text;
                color: $black;
                font-weight: bold;

                p {
                    font-weight: 400;
                }
            }
        }

        .buttons {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            width: fit-content;
            gap: 1rem;

            button {
                @extend .md-text;
                color: $black;
                text-decoration: underline;
                font-weight: 500;
            }
        }
    }
</style>