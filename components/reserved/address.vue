<template>
    <div class="container">
        <button class="button" @click="toggle()">
            {{ $t('reserved.shipping') }}
            <img src="/svgs/bag.svg" alt="bag">
        </button>
        <section v-show="active">
            <form v-show="addAddress">
                <template v-for="(input, i) in data">
                    <Input :key="i" :input="input" :countries="countries" @modelUpdate="modelUpdate"/>
                </template>
                <button class="retangular-button black" type="button" @click="submit()">{{ $t('reserved.add_address') }}</button>
                <button class="retangular-button retangular-button__inverted" type="button" @click="toggleAddress()">{{ $t('reserved.cancel_address') }}</button>
            </form>
            <button v-show="!addAddress" class="retangular-button black" @click="toggleAddress()">
                {{ $t('reserved.shipping') }}
            </button>
        </section>
    </div>
</template>

<script>
import api from '../../assets/js/api';
import Input from '../../components/global/input.vue';
export default {
    components: {
        Input
    },
    props: {
        data: {
            type: Array,
            required: false,
            default: () => {}
        },
    },
    data(){
        return {
            active: false,
            addAddress: false,
            form: {},
            countries: []
        }
    },
    async mounted() {
        const response = await api.get('countries')
        this.countries = response.data.countries
    },
    methods: {
        toggle(){
            this.active = !this.active
        },
        toggleAddress(){
            this.addAddress = !this.addAddress
        },
        async submit(){
            await api.post('address', this.form)
        },
        modelUpdate(val){
            const obj = {}
            for (const key in val ) {
                const propertie = key
                obj[propertie] = val[key]
                this.form[propertie] = obj[propertie]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// .container {
//     background-color: $white;
//     margin-bottom: 0.25rem;

//     section {
//         margin-top: 6px;
//         padding: 2.25rem;
//     }

//     form {
//         display: flex;
//         flex-wrap: wrap;
//         justify-content: space-between;
//         gap: 1.25rem;
//         width: 40%;

//         button {
//             width: calc(50% - .625rem);
//         }
//     }
// }
</style>