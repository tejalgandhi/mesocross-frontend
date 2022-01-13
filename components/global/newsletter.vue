<template>
    <form>
        <h4>{{ data.title }}</h4>
        <button class="close" @click="close()"><img src="/imgs/close.png" alt="close"></button>
        <template v-for="(input, i) in data.form">
            <Input :key="i" :input="input" :countries="countries" @modelUpdate="modelUpdate"/>
        </template>
        <button class="retangular-button black">{{ data.button }}</button>
    </form>
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
        }
    }
}
</script>

<style lang="scss" scoped>
    form {
        width: 33%;
        position: fixed;
        left: 50%;
        top: 4rem;
        transform: translate(-50%);
        background-color: $white;
        z-index: 100;
        padding: 4rem 2.5rem 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: .5rem;

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