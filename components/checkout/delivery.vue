<template>
    <div class="big-container">
        <section>
            <button>
                <img src="/svgs/chevron.svg" alt="">
                {{$t('checkout.goback')}}
            </button>
            <h1>{{$t('checkout.delivery_label')}}</h1>
        </section>
        <div>
            <div v-if="!addAddress" class="address-container">
                <ExistingAddress v-for="(address, i) in existing_address" :key="i" :data="address" :checkout="true" @selectPayment="selectPayment" @editAddress="update"/>
            </div>
            <form v-if="addAddress">
                <template v-for="(input, i) in data">
                    <Input :key="i" :input="input" :countries="countries" :fillform="edit_address" @modelUpdate="modelUpdate"/>
                </template>
                <button class="retangular-button black" type="button" @click="submit()">
                    <span v-if="!Object.keys(edit_address).length">{{ $t('reserved.add_address') }}</span>
                    <span v-else>{{ $t('reserved.save_address') }}</span>
                </button>
                <button class="retangular-button retangular-button__inverted" type="button" @click="toggleAddress()">{{ $t('reserved.cancel_address') }}</button>
            </form>
            <button v-show="!addAddress" class="new-address retangular-button retangular-button__inverted" @click="toggleAddress()">
                {{ $t('reserved.add_address') }}
            </button>
        </div>
    </div>
</template>

<script>
import api from '../../assets/js/api';
import ExistingAddress from '../reserved/partials/existing-address.vue';
export default {
    components: {
        // Input,
        ExistingAddress,
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
            countries: [],
            existing_address: [],
            addAddress: false,
            form: {},
            selected_payment: {}
        }
    },
    async mounted() {
        const countries = await api.get('countries')
        this.countries = countries.data.countries

        const address = await api.get('address')
        this.existing_address = address.data.data
    },
    methods: {
        update(data){
            this.edit_address = data;
            this.addAddress = true
        },
        toggleAddress(){
            this.addAddress = !this.addAddress;
            this.edit_address = {}
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
            const response = await api.post('address', this.form)
            this.$emit('alert', response.data)
        },
        selectPayment(val){
            const obj = {}
            for (const key in val ) {
                const propertie = key
                obj[propertie] = val[key]
                this.selected_payment[propertie] = obj[propertie]
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.big-container {
    background-color: $white;

    > section {

        h1 {
            margin-top: 2rem;
            @extend .text;
            color: $black;
        }
    }

    > div {
        margin-top: 2rem;

        form {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 1.25rem;
            width: 75%;

            button {
                width: calc(50% - .625rem);
            }
        }

        .new-address {
            margin-left: auto;
            display: flex;
            margin-top: 1.5rem;
        }
    }

    .address-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}
</style>