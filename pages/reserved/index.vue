<template>
    <div>
    <HeaderContainer/>
        <div class="big-container">
            <section class="top-section">
                <div>
                    <NuxtLink to="products" >
                        <img src="/svgs/chevron.svg" alt="">
                        {{ $t('reserved.goback') }}
                    </NuxtLink>
                    <h1>{{ $t('reserved.title') }}</h1>
                </div>
                <button @click="logout">
                    {{ $t('reserved.logout') }}
                </button>
            </section>
            <PersonalData :data="data.reserved.personaldata_form" :active="active" @close="close" @alert="alertHandeler"/>
            <Address :data="data.reserved.address_form" :active="active" @close="close" @alert="alertHandeler"/>
            <Billing :data="data.reserved.add_payment" :active="active" @close="close" @alert="alertHandeler"/>
            <LoginData :data="data.reserved.login" :active="active" @close="close" @alert="alertHandeler"/>
            <Alert v-show="alerts.length" :alerts="alerts" :status="status" :active="active"/>
        </div>
    <FooterContainer/>
    </div>
</template>

<script>
import { mapMutations, mapGetters  } from 'vuex';
import content from "assets/json/reserved.json";
import api from '../../assets/js/api';
import HeaderContainer from "../../components/layouts/header.vue";
import FooterContainer from "../../components/layouts/footer.vue";
import Address from "../../components/reserved/address.vue";
import PersonalData from "../../components/reserved/personal-data.vue";
import LoginData from "../../components/reserved/login-data.vue";
import Billing from "../../components/reserved/billing.vue";
import Alert from "../../components/global/alert.vue";
export default {
    components: {
        HeaderContainer,
        FooterContainer,
        Address,
        PersonalData,
        Billing,
        Alert,
        LoginData
    },
    data(){
        return {
            data: content,
            user: {},
            alerts: [],
            status: false,
            active: null,
        }
    },
    computed: {
        ...mapGetters({
            getReserved: 'user/getReserved',
        }),
    },
    watch: {
        getReserved: {
            immediate: true,
            handler(val){
                if(val !== null) {
                    this.active = this.getReserved
                    this.setReserved(null)
                }
            }
        }
    },
    mounted() {
        if(!localStorage.loginToken) this.$router.replace({path: 'auth'})
    },
    methods: {
        ...mapMutations({
            setUser: 'user/setUser',
            setReserved: 'user/setReserved',
        }),
        alertHandeler(data){
            if(data.code === 200) this.status = true
            else this.status = false
            if(typeof data === 'object') this.alerts = Object.values(data) 
            else this.alerts.push(data.message)
            setTimeout(function(){
                this.alerts = [];
            }.bind(this), 4000)
        },
        async logout() {
            await api.post('logout')
            this.setUser({})
            localStorage.clear()
            this.$router.replace({path: '/'})
        },
        close(val) {
            this.active = val
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

.top-section {
    margin-bottom: 2.25rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    h1 {
        color: $black;
        font-size: 30px;
        font-family: $primary;
        margin-top: 1.25rem;
    }

    a {
        @extend .text;
        color: $black;
        display: flex;
        align-items: center;
        
        img {
            margin-right: 6px;
        }
    }
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