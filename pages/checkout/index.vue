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
                <Delivery v-show="active === 1" :data="data.reserved.address_form" :edit="edit_address"/>
                <Billing v-show="active === 2" :data="data.reserved.add_payment"/>
                <div  v-show="active === 3">
                    <ProductList v-for="(product, i) in getCart" :key="i" :product="product" @update="remove"/>
                </div>
                <div class="selected_forms">
                    <div v-if="active !== 1  && Object.keys(getAddressForm).length" :data="getAddressForm" class="selected-method">
                        <p>{{$t('checkout.selected_address')}}</p>
                        <DeliveryData :data="getAddressForm" :checkout="true" :selected="true" @editAddress="updateAddress"/>
                    </div>
                    <div v-if="active !== 2  && Object.keys(getBillingForm).length" :data="getBillingForm" class="selected-method">
                        <p>{{$t('checkout.selected_billing')}}</p>
                        <BillingData :data="getBillingForm" :checkout="true" :selected="true"/>
                    </div>
                </div>
            </div>
            <Process @nextStep="nextStep"/>
        </div>
    <FooterContainer/>
    </div>
</template>

<script>
import { mapMutations, mapGetters  } from 'vuex';
import content from "assets/json/reserved.json";
import api from '../../assets/js/api';
import HeaderContainer from "../../components/layouts/headers/header.vue";
import FooterContainer from "../../components/layouts/footer.vue";
import Step from "../../components/checkout/step.vue";
import Delivery from "../../components/checkout/delivery.vue";
import Billing from "../../components/checkout/billing.vue";
import Process from "../../components/basket/partials/process.vue";
import ProductList from "../../components/checkout/product.vue";
import DeliveryData from '../../components/reserved/partials/existing-address.vue';
import BillingData from '../../components/reserved/partials/existing-billing.vue';
export default {
    components: {
        HeaderContainer,
        FooterContainer,
        Step,
        Delivery,
        Billing,
        Process,
        ProductList,
        DeliveryData,
        BillingData
    },
    data(){
        return {
            data: content,
            active: 1,
            edit_address: {},
            edit_billing: {}
        }
    },
    computed: {
        ...mapGetters({
            getAddressForm: 'checkout/getAddressForm',
            getBillingForm: 'checkout/getBillingForm',
            getCart: 'user/getCart',
        })
    },
    mounted() {
        this.getProducts()
    },
    methods: {
        ...mapMutations({
            setCart: 'user/setCart',
            deleteFromCart: 'user/deleteFromCart',
        }),
        async getProducts() {
            const response = await api.get('cart')
            this.setCart(response.data.data)
        },
        nextStep() {
            if(this.active === 1 && Object.keys(this.getAddressForm).length) {
                this.active++
            } else if(this.active === 2 && Object.keys(this.getBillingForm).length) {
                this.active++
            }
        },
        remove(id){
            this.deleteFromCart(id) 
        },
        updateAddress(data){
            this.edit_address = data;
            this.active = 1
        },
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

        .selected_forms {
            margin-top: 4rem;
        }
    }
}

.selected-method {
    margin-top: 2rem;

    > p {
        @extend .text;
        color: $black;
        text-transform: uppercase;
        margin-bottom: 1rem;
    }
}
</style>