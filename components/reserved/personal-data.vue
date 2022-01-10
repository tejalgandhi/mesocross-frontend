<template>
    <div class="container">
        <button class="button" @click="toggle()">
            {{ $t('reserved.personal_data_title') }}
            <img src="/svgs/bag.svg" alt="bag">
        </button>
        <section v-show="active">
            <form>
                <template v-for="(input, i) in data">
                    <Input :key="i" :input="input" :countries="countries" @modelUpdate="modelUpdate"/>
                </template>
                <button class="retangular-button black" type="button" @click="submit()">{{ $t('reserved.personal_data_submit') }}</button>
            </form>
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
            form: {},
            countries: [],
            active: false
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
        async submit(){
            await api.post('change-personal-details', this.form)            
            // await api.post('change-personal-details', {
            //     password:"123456",
            //     email: "testjl@gmail.com",
            //     name: "Mendes",
            //     surname: "Memon",
            //     phone_number: "+918141809038"
            // })
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
</style>