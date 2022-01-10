<template>
    <div>
    <HeaderContainer/>
    <div class="container">
      <div>
        <h1>{{ data.title }}</h1>
        <div class="container-buttons">
          <button :class="{ 'active' : active == false }" @click="toggle()">{{ data.signin.title }}</button>
          <button  :class="{ 'active' : active == true }" @click="toggle()">{{ data.regist.title }}</button>
        </div>
        <AuthForm v-show="!active" :data="data.signin" @alertHandeler="alertHandeler" @resetPass="resetActive = !resetActive"/>
        <AuthForm v-show="active" :data="data.regist" @alertHandeler="alertHandeler"/>
        <AuthReset v-show="resetActive" :data="data.reset_pass"/>
        <Alert v-show="alerts.length" :alerts="alerts" :status="status"/>
      </div>
    </div>
    <FooterContainer/>
    </div>
</template>

<script>
import content from "assets/json/auth.json";

import HeaderContainer from "../../components/layouts/headers/header.vue";
import FooterContainer from "../../components/layouts/footer.vue";
import Alert from "../../components/global/alert.vue";

export default {
  components: {
    HeaderContainer,
    FooterContainer,
    Alert
  },
  data(){
    return {
      data: content,
      active: false,
      alerts: [],
      status: false,
      resetActive: false
    }
  },
  methods: {
    toggle() {
      this.active = !this.active;
    },
    alertHandeler(data, status){
      this.status = status
      if(typeof data === 'object') this.alerts = Object.values(data) 
      else this.alerts.push(data)
      setTimeout(function(){
        this.alerts = [];
      }.bind(this), 4000)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: $black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem 0;

  > div {
    width: 30%;

    h1 {
      @extend .xxs-title;
      color: $white;
      text-align: center;
      margin-bottom: 2rem;
    }
  }

  &-buttons {
    display: flex;
    margin-bottom: 1.5rem;

    button {
      width: 50%;
      @extend .text;
      color: $white;
      padding: 1rem;
      border-bottom: 1px solid rgba($white, .4);

      &.active {
        border-bottom: 2px solid $white;
      }
    }
  }
}
</style>