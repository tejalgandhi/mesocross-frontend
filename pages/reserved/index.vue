<template>
    <div>
    <HeaderContainer/>
        <div class="big-container">
            <Address :data="data.reserved.address_form"/>
            <PersonalData :data="data.reserved.personaldata_form"/>
        </div>
    <FooterContainer/>
    </div>
</template>

<script>
import content from "assets/json/reserved.json";
// import api from '../../assets/js/api';
import HeaderContainer from "../../components/layouts/headers/header-sec.vue";
import FooterContainer from "../../components/layouts/footer.vue";
import Address from "../../components/reserved/address.vue";
import PersonalData from "../../components/reserved/personal-data.vue";
export default {
    components: {
        HeaderContainer,
        FooterContainer,
        Address,
        PersonalData
    },
    data(){
        return {
            data: content,
            user: {}
        }
    },
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
    .button {
        @extend .text;
        color: $black;
        padding: 1rem;
        background-color: $white;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
.container {
    background-color: $white;
    margin-bottom: 0.25rem;

    section {
        margin-top: 6px;
        padding: 2.25rem;
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