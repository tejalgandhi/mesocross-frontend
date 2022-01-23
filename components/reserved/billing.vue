<template>
    <div class="container">
        <button class="button" @click="toggle()">
            {{ $t('billing.title') }}
            <img src="/svgs/bag.svg" alt="bag">
        </button>
        <section v-show="active">
            <section v-show="!addPayment" class="address-container">
                <ExistingBilling v-for="(billing, i) in existing_billing" :key="i" :data="billing"/>
            </section>
            <form v-if="addPayment">
                <template v-for="(input, i) in data">
                    <Input :key="i" :input="input" @modelUpdate="modelUpdate"/>
                </template>
                <button class="retangular-button black" type="button" @click="submit()">
                    {{ $t('reserved.add_address') }}
                    <!-- <span v-if="!Object.keys(edit_address).length">{{ $t('reserved.add_address') }}</span>
                    <span v-else>{{ $t('reserved.save_address') }}</span> -->
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
// import Input from '../../components/global/input.vue';
import ExistingBilling from '../reserved/partials/existing-billing.vue';
export default {
    components: {
        // Input,
        ExistingBilling
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
            this.active = !this.active
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
            const response = await api.post('stripe/create-card', {
                brand: "Visa",
                expiry_date: "12/2032",
                id: "card_1KHF3EAorcrWvyC1YxCzcDuj",
                name: null,
                number: "4242424242424242",
            })
            this.$emit('alert', response.data)
        },
    }
}
</script>