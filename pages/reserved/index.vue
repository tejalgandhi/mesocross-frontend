<template>
    <div>
    <HeaderContainer/>
        <div class="big-container">
            <PersonalData :data="data.reserved.personaldata_form"/>
            <Address :data="data.reserved.address_form" @alert="alertHandeler"/>
            <Billing :data="data.reserved.add_payment"/>
            <!-- <LoginData :data="data.reserved.login"/> -->
            <Alert v-show="alerts.length" :alerts="alerts" :status="status"/>
        </div>
    <FooterContainer/>
    </div>
</template>

<script>
import content from "assets/json/reserved.json";
// import api from '../../assets/js/api';
import HeaderContainer from "../../components/layouts/headers/header.vue";
import FooterContainer from "../../components/layouts/footer.vue";
import Address from "../../components/reserved/address.vue";
import PersonalData from "../../components/reserved/personal-data.vue";
import Billing from "../../components/reserved/billing.vue";
import Alert from "../../components/global/alert.vue";
export default {
    components: {
        HeaderContainer,
        FooterContainer,
        Address,
        PersonalData,
        Billing,
        Alert
    },
    data(){
        return {
            data: content,
            user: {},
            alerts: [],
            status: false,
        }
    },
    methods: {
        alertHandeler(data){
            if(data.code === 200) this.status = true
            else this.status = false
            if(typeof data === 'object') this.alerts = Object.values(data) 
            else this.alerts.push(data.message)
            setTimeout(function(){
                this.alerts = [];
            }.bind(this), 4000)
        }
    }
}
</script>

<style lang="scss">
.big-container {
    @extend .container-52;
    background-color: $grey;
    padding-top: 3.75rem;
    padding-bottom: 8.75rem;
}


.container {
    background-color: $white;
    margin-bottom: 0.25rem;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .button {
        @extend .text;
        color: $black;
        padding: 0 1.5rem;
        background-color: $white;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    > section {
        margin-top: 6px;
        padding: 0 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    form {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 1.25rem;
        width: 50%;

        button {
            width: calc(50% - .625rem);
        }
    }
}
</style>