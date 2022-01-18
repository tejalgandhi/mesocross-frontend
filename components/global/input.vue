<template>
    <div v-if="(input.type === 'text' || input.type === 'number' || input.type === 'email' || input.type === 'password') && (input.name !== 'phone_no' && input.name !== 'phone_number')" :class="'input-container input-container-'+input.width">
        <label v-if="input.label" :for="input.name">{{ input.label }}</label>
        <input v-model="inputModel[input.name]" :type="input.type" :name="input.name">
    </div>
    <div v-else-if="input.name === 'phone_no' || input.name === 'phone_number'" :class="'input-container input-container-'+input.width">
        <label :for="input.name">{{ input.label }}</label>
        <div class="phone">
            <client-only placeholder="loading...">
                <vue-country-code :default-country="fillform.iso_alpha2" @onSelect="onSelect"></vue-country-code>
            </client-only>
            <input v-model="inputModel[input.name]" :type="input.type" :name="input.name">
        </div>
    </div>
    <div v-else-if="input.type === 'select'" :class="'input-container input-container-'+input.width">
        <label :for="input.name">{{ input.label }}</label>
        <select v-model="inputModel[input.name]" :name="input.name" @change="countryChange(inputModel)">
            <template v-if="input.options">
                <option v-for="(option, x) in input.options" :key="x" :value="option">{{ option }}</option>
            </template>
            <template v-else-if="countries">
                <option v-for="(country, x) in countries" :key="x" :value="country.iso_code">{{ country.label }}</option>
            </template>
        </select>
    </div>
</template>

<script>
import VueCountryCode from "vue-country-code";
export default {
    components: {
        VueCountryCode,
    },
    props: {
        input: {
            type: Object,
            required: false,
            default: () => {}
        },
        countries: {
            type: Array,
            required: false,
            default: () => {}
        },
        fillform: {
            type: Object,
            required: false,
            default: () => {}
        },
    },
    data() {
        return {
            inputModel: {
                // brand: 'Visa'
            }
        }
    },
    watch: {
        inputModel: {
            deep: true,
            handler(val){
                this.$emit('modelUpdate', val)
            }
        },
        fillform:{
            immediate: true,
            deep: true,
            handler(val){
                this.inputModel = val;
            }
        }
    },
    methods: {
        onSelect({iso2, dialCode}) {
            this.inputModel.dial_code = dialCode
            this.inputModel.iso_alpha2 = iso2
            this.$emit('modelUpdate', this.inputModel)
        },
        countryChange() {
            if(this.countries) this.inputModel.country = this.inputModel.country_code
        },
    }
}
</script>

<style lang="scss" scoped>

    .input-container {
        display: flex;
        flex-direction: column;

        .phone {
            width: 100%;
            display: flex;

            .vue-country-select {
                background-color: $white;
                border-top-right-radius: 0px;
                border-bottom-right-radius: 0px;
                border-right: none;
                user-select: none;

                &:focus {
                    border: none;
                }
            }

            input {
                width: 100%;
                border-top-left-radius: 0px;
                border-bottom-left-radius: 0px;
            }
        }

        label {
            @extend .text;
            color: $black;
            margin-bottom: 6px;
        }

        input,
        select {
            padding: .75rem;
            border: 1px solid rgba($black, .2);
        }

        &-50 {
            width: calc(50% - .625rem);
        }

        &-100 {
            width: 100%;
        }

        &-150 {
            width: 100%;

            .phone,
            input {
                width: 50%;
            }
        }
    }
</style>