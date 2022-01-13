<template>
    <div class="container">
        <button class="button" @click="toggle()">
            {{ $t('reserved.shipping') }}
            <img src="/svgs/bag.svg" alt="bag">
        </button>
        <section v-show="active">
            <section v-show="!addAddress" class="address-container">
                <ExistingAddress v-for="(address, i) in existing_address" :key="i" :data="address" @editAddress="editAddress"/>
            </section>
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
            <button v-show="!addAddress" class="new-address retangular-button black" @click="toggleAddress()">
                {{ $t('reserved.shipping') }}
            </button>
        </section>
    </div>
</template>

<script>
import api from '../../assets/js/api';
import Input from '../../components/global/input.vue';
import ExistingAddress from '../reserved/partials/existing-address.vue';
export default {
    components: {
        Input,
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
            active: false,
            addAddress: false,
            form: {},
            countries: [],
            existing_address: [],
            edit_address: {}
        }
    },
    async mounted() {
        const countries = await api.get('countries')
        this.countries = countries.data.countries

        const address = await api.get('address')
        this.existing_address = address.data.data
    },
    methods: {
        toggle(){
            this.active = !this.active
        },
        toggleAddress(){
            this.addAddress = !this.addAddress;
            this.edit_address = {}
        },
        async submit(){
            const response = await api.post('address', this.form)
            this.$emit('alert', response.data)
        },
        modelUpdate(val){
            const obj = {}
            for (const key in val ) {
                const propertie = key
                obj[propertie] = val[key]
                this.form[propertie] = obj[propertie]
            }
        },
        editAddress(data) {
            this.edit_address = data;
            this.addAddress = true
        }
    }
}
</script>

<style lang="scss">
.address-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0;
}

.new-address {
    margin-left: auto;
    width: fit-content;
}
</style>