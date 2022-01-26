<template>
    <div class="container">
        <button class="button" @click="toggle()">
            {{ $t('reserved.update_password') }}
            <img src="/svgs/chevron.svg" alt="bag">
        </button>
        <section v-show="active === 3">
            <form>
                <template v-for="(input, i) in data">
                    <Input :key="i" :input="input" :fillform="form" @modelUpdate="modelUpdate"/>
                </template>
                <button class="retangular-button black" type="button" @click="submit()">{{ $t('reserved.update_password_button') }}</button>
            </form>
        </section>
    </div>
</template>
<script>
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
        active: {
            type: Number,
            default: () => {}
        },
    },
    data(){
        return {
            addAddress: false,
            form: {},
        }
    },
    methods: {
        toggle(){
            let val = 3
            if(this.active === 3) val = null
            this.$emit('close', val)
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
            await api.post('change-password', this.form)
            // this.$emit('alert', response.data)
        },
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

.button {
    img {
        transform: rotate(-90deg);
    }
}
</style>
