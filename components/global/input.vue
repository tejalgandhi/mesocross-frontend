<template>
    <div v-if="(input.type === 'text' || input.type === 'number' || input.type === 'email') && input.name !== 'phone'" :class="'input-container input-container-'+input.width">
        <label :for="input.name">{{ input.label }}</label>
        <input v-model="inputModel[input.name]" :type="input.type" :name="input.name">
    </div>
    <div v-else-if="input.name === 'phone'" :class="'input-container input-container-'+input.width">
        <label :for="input.name">{{ input.label }}</label>
        <div class="phone">
            <client-only placeholder="loading...">
                <vue-country-code :preferred-countries="['gb', 'pt', 'es']"  @onSelect="onSelect"></vue-country-code>
            </client-only>
            <input v-model="inputModel[input.name]" :type="input.type" :name="input.name">
        </div>
    </div>
    <div v-else-if="input.type === 'select'" :class="'input-container input-container-'+input.width">
        <label :for="input.name">{{ input.label }}</label>
        <select v-model="inputModel[input.name]" :name="input.name">
            <option v-for="(country, x) in countries" :key="x" :value="country.iso_code">{{ country.label }}</option>
        </select>
    </div>
</template>

<script>
import VueCountryCode from "vue-country-code";
import api from '../../assets/js/api';
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
    },
    data() {
        return {
            inputModel: {}
        }
    },
    watch: {
        inputModel: {
            deep: true,
            handler(val){
                this.$emit('modelUpdate', val)
            }
        }
    },
    async mounted() {
        if(localStorage.loginToken) {
            const response = await api.get('user')
            this.inputModel = response.data;
        }
    },
    methods: {
        onSelect({iso2, dialCode}) {
            this.inputModel.dial_code = dialCode
            this.inputModel.iso_alpha2 = iso2
            this.$emit('modelUpdate', this.inputModel)
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