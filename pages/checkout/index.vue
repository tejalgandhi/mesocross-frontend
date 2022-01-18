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
        <Delivery :data="data.reserved.address_form"/>
    <!-- <FooterContainer/> -->
    </div>
</template>

<script>
import content from "assets/json/reserved.json";
import HeaderContainer from "../../components/layouts/headers/header.vue";
// import FooterContainer from "../../components/layouts/footer.vue";
import Step from "../../components/checkout/step.vue"
import Delivery from "../../components/checkout/delivery.vue"
export default {
    components: {
        HeaderContainer,
        // FooterContainer,
        Step,
        Delivery
    },
    data(){
        return {
            data: content,
            active: 1
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
</style>