<template>
    <div class="big-container">
        <div>
            <button>
                <img src="/svgs/chevron.svg" alt="">
                {{$t('checkout.goback')}}
            </button>
            <div>
                <p>{{$t('checkout.delivery_label')}}</p>
            </div>
            <div class="address-container">
                <ExistingAddress v-for="(address, i) in existing_address" :key="i" :data="address" @editAddress="update"/>
            </div>
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
    data(){
        return {
            countries: [],
            existing_address: [],
        }
    },
    async mounted() {
        const address = await api.get('address')
        this.existing_address = address.data.data
    },
    methods: {
        update(){

        }
    }
}
</script>

<style lang="scss" scoped>
.big-container {
    padding: 0 3rem;

    > div {
        margin-top: 4rem;
    }

    .address-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 65%;
    }
}
</style>