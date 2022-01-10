<template>
    <div>
    <HeaderContainer/>
        <Steps/>
        <Delivery/>
    <FooterContainer/>
    </div>
</template>

<script>
import HeaderContainer from "../../components/layouts/headers/header-sec.vue";
import FooterContainer from "../../components/layouts/footer.vue";
import Steps from "../../components/cheackout/steps.vue"
import Delivery from "../../components/cheackout/delivery.vue"
export default {
    components: {
        HeaderContainer,
        FooterContainer,
        Steps,
        Delivery
    }
}
</script>