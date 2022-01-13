<template>
    <section class="existing-address" :class="{ active : active }" @click="makeDefault()">
        <div class="name"> 
            <input :id="data.id" type="radio" name="radio">
            <p>{{data.address_first_line}}, {{data.address_second_line}}</p>
        </div>
        <p>{{data.country}}</p>
        <div class="buttons">
            <button @click="editAddress">{{ $t('reserved.edit_address') }}</button>
            <button @click="removeAddress">{{ $t('reserved.remove_address') }}</button>
        </div>
    </section>
</template>

<script>
import api from '../../../assets/js/api';
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
            active: false
        }
    },
    methods: {
        async removeAddress(){
            const response = await api.delete('delete-address', {address_id: this.data.id})
            this.countries = response.data.countries
        },
        editAddress(){
            this.$emit('editAddress', this.data)
        },
        makeDefault(){
            this.active = true
        }
    }
}
</script>
<style lang="scss" scoped>
    .existing-address {
        border: 1px solid rgba($black, .4);
        border-radius: 4px;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0;

        &.active {
            border: 1px solid $black;
        }

        .name {
            width: 33%;
            display: flex;
            align-items: center;
            gap: 1rem;

            label {
                @extend .text;
                color: $black;
                font-weight: bold;
            }
        }

        > p {
            width: 16%;
            @extend .md-text;
            color: $black;
        }

        .buttons {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            width: fit-content;
            gap: 1rem;

            button {
                @extend .md-text;
                color: $black;
                text-decoration: underline;
                font-weight: 500;
            }
        }
    }
</style>