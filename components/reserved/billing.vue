<template>
    <div class="container">
        <button class="button" @click="toggle()">
            {{ $t('billing.title') }}
            <img src="/svgs/chevron.svg" alt="bag">
        </button>
        <section v-show="active === 2">
            <section v-show="!addPayment" class="address-container">
                <ExistingBilling v-for="(billing, i) in existing_billing" :key="i" :data="billing"/>
            </section>
            <form v-if="addPayment">
                <template v-for="(input, i) in data">
                    <Input :key="i" :input="input" :fillform="form" @modelUpdate="modelUpdate"/>
                </template>
                <button class="retangular-button black" type="button" @click="submit()">
                    {{ $t('billing.add_payment') }}
                </button>
                <button class="retangular-button retangular-button__inverted" type="button" @click="togglePayment()">{{ $t('reserved.cancel_address') }}</button>
            </form>
            <button v-show="!addPayment" class="new-address retangular-button black" @click="togglePayment()">
                {{ $t('billing.add_payment') }}
            </button>
        </section>
    </div>
</template>

<script>
import api from '../../assets/js/api';
import ExistingBilling from '../reserved/partials/existing-billing.vue';
export default {
    components: {
        ExistingBilling
    },
    props: {
        data: {
            type: Array,
            required: false,
            default: () => {}
        },
        active: {
            type: Number,
            default: () => {}
        },
    },
    data(){
        return {
            form: {},
            addPayment: false,
            existing_billing: {}
        }
    },
    async mounted() {
        const response = await api.get('stripe/card-list')
        this.existing_billing = response.data.data
    },
    methods: {
        toggle(){
            let val = 2
            if(this.active === 2) val = null
            this.$emit('close', val)
        },
        togglePayment(){
            this.addPayment = !this.addPayment
        },
        modelUpdate(val){
            const obj = {}
            for (const key in val ) {
                const propertie = key
                obj[propertie] = val[key]
                this.form[propertie] = obj[propertie]
            }
        },
        async submit(){
            // const response = await api.post('stripe/create-card', {
            //     brand: "Visa",
            //     expiry_date: "12/2032",
            //     id: "card_1KHF3EAorcrWvyC1YxCzcDuj",
            //     name: null,
            //     number: "4242424242424242",
            // })
            const response = await api.post('stripe/create-card', this.form)
            this.$emit('alert', response.data)
        },
    }
}
</script>

<style lang="scss" scoped>
.button {
    img {
        transform: rotate(-90deg);
    }
}
</style>