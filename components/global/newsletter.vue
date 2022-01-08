<template>
    <form>
        <h4>{{ data.title }}</h4>
        <div v-for="(input, i) in data.form" :key="i" class="input-container">
            <template v-if="input.type == 'text' || input.type == 'email' || input.type == 'number'">
                <input :type="input.type" :name="input.name" :placeholder="input.label">
            </template>
            <template v-if="input.type == 'select'">
                <select :name="input.name">
                    <option value="" disabled selected>{{ input.label }}</option>
                    <option v-for="(country, x) in countries" :key="x" :value="country.iso_code">{{ country.label }}</option>
                </select>
            </template>
        </div>
        <button class="retangular-button">{{ data.button }}</button>
    </form>
</template>

<script>
import api from '../../assets/js/api'
export default {
    props: {
        data: {
            type: Object,
            required: false,
            default: () => {}
        },
    },
    data(){
        return {
            countries: []
        }
    },
    async mounted() {
        const response = await api.get('countries')
        this.countries = response.data.countries
    }
}
</script>

<style lang="scss" scoped>
    form {
        width: 33%;
        position: fixed;
        left: 50%;
        top: 5rem;
        transform: translate(-50%);
        background-color: $white;
        z-index: 100;
        padding: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: .5rem;

        h4 {
            @extend .text;
            color: $black;
            text-align: center;
            margin-bottom: 2rem;
        }

        .retangular-button {
            margin: auto;
        }

        .input-container {
            border: 1px solid $black;
            
            input,
            select {
                @extend .text;
                padding: 0.75rem;
                width: 100%;
            }
        }
    }
</style>