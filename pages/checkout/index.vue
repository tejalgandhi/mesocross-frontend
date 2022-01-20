<template>
    <div>
    <HeaderContainer/>
        <div class="steps-container">
            <Step :position="1" :name="'checkout.delivery'" :active="active"/>
            <span class="line"></span>
            <Step :position="2" :name="'checkout.billing'" :active="active"/>
            <span class="line"></span>
            <Step :position="3" :name="'checkout.review'" :active="active"/>
        </div>
        <div class="process-checkout">
            <div class="left">
                <Delivery v-if="active === 1" :data="data.reserved.address_form"/>
            </div>
            <Process  @nextStep="nextStep"/>
        </div>
    <FooterContainer/>
    </div>
</template>

<script>
import { mapMutations  } from 'vuex';
import content from "assets/json/reserved.json";
import api from '../../assets/js/api';
import HeaderContainer from "../../components/layouts/headers/header.vue";
import FooterContainer from "../../components/layouts/footer.vue";
import Step from "../../components/checkout/step.vue";
import Delivery from "../../components/checkout/delivery.vue";
import Process from "../../components/basket/partials/process.vue"
export default {
    components: {
        HeaderContainer,
        FooterContainer,
        Step,
        Delivery,
        Process
    },
    data(){
        return {
            data: content,
            active: 1
        }
    },
    mounted() {
        this.getProducts()
    },
    methods: {
        ...mapMutations({
            setCart: 'user/setCart',
            deleteFromCart: 'user/deleteFromCart',
            updateQuantity: 'user/updateQuantity'
        }),
        async getProducts() {
            const response = await api.get('cart')
            this.setCart(response.data.data)
        },
        nextStep() {
            this.active++
        }
    }
}
</script>

<style lang="scss" scoped>
.steps-container {
    margin: 6.75rem auto 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .line {
        height: 1px;
        width: 4.75rem;
        background-color: $black;
        opacity: .4;
    }
}

.process-checkout {
    display: flex;
    justify-content: space-between;
    margin: 5rem 0;
    padding: 0 3rem;

    .left {
        width: 70%;
    }
}
</style>