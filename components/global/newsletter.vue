<template>
<div class="overlay">
    <form>
        <h4>{{ data.title }}</h4>
        <button type="button" class="close" @click="close()"><img src="/imgs/close.png" alt="close"></button>
        <template v-for="(input, i) in data.form">
            <Input :key="i" :input="input" :fillform="form" :countries="countries" @modelUpdate="modelUpdate"/>
        </template>
        <button type="button" class="retangular-button black" @click="submit()">{{ data.button }}</button>
    </form>
</div>
</template>

<script>
import api from '../../assets/js/api'
import Input from '../../components/global/input.vue';
export default {
    components: {
        Input,
    },
    props: {
        data: {
            type: Object,
            required: false,
            default: () => {}
        },
    },
    data(){
        return {
            countries: [],
            form: {}
        }
    },
    async mounted() {
        const response = await api.get('countries')
        this.countries = response.data.countries
    },
    methods: {
        modelUpdate(val){
            const obj = {}
            for (const key in val ) {
                const propertie = key
                obj[propertie] = val[key]
                this.form[propertie] = obj[propertie]
            }
        },
        close() {
            this.$emit('closeNewsletter')
        },
        submit() {
            api.post('subscribe/store', this.form)
        }
    }
}
</script>

<style lang="scss" scoped>
.overlay {
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba($black, .5);
    width: 100%;
    height: 100%;
    overflow-y: auto;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 0;
}
    form {
        width: 33%;
        background-color: $white;
        padding: 5rem 2.5rem 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: .5rem;
        position: relative;
        box-shadow: 0px 6px 12px rgba($black, .1);

        .close {
            position: absolute;
            left: 50%;
            top: 2rem;
            transform: translate(-50%);
            img {
                width: 16px;
            }
        }

        h4 {
            @extend .text;
            font-size: 24px;
            color: $black;
            text-align: center;
            margin-bottom: 2rem;
        }

        .retangular-button {
            width: 100%;
            margin-top: 1rem;
        }

        // .input-container {
        //     border: 1px solid $black;
            
        //     input,
        //     select {
        //         @extend .text;
        //         padding: 0.75rem;
        //         width: 100%;
        //     }
        // }
    }
</style>