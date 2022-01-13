<template>
    <div class="container">
        <button class="button" @click="toggle()">
            {{ $t('reserved.personal_data_title') }}
            <img src="/svgs/bag.svg" alt="bag">
        </button>
        <section v-show="active">
            <form>
                <template v-for="(input, i) in data">
                    <Input :key="i" :input="input" :fillform="user" @modelUpdate="modelUpdate"/>
                </template>
                <button class="retangular-button black" type="button" @click="submit()">{{ $t('reserved.personal_data_submit') }}</button>
            </form>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
            active: false,
            user: {}
        }
    },
    computed: {
        ...mapGetters({
            getUser: 'user/getUser'
        })
    },
    watch: {
        getUser: {
            immediate: true,
            deep: true,
            handler(val){
                this.user = {
                    name: val.first_name,
                    surname : val.last_name,
                    email: val.email,
                    phone_number: val.phone_number,
                    iso_alpha2: val.iso_alpha2,
                    dial_code: val.dial_code
                }
            }
        }
    },
    methods: {
        toggle(){
            this.active = !this.active
        },
        async submit(){
            await api.post('change-personal-details', this.form)
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