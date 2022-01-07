<template>
    <div>
    <HeaderContainer/>
      <Baseket :data="data" :user="user"/>
    <FooterContainer/>
    </div>
</template>

<script>
import content from "assets/json/shopping.json";
import { mapGetters } from 'vuex';

import HeaderContainer from "../../components/layouts/headers/header.vue";
import FooterContainer from "../../components/layouts/footer.vue";

import Baseket from "../../components/basket/Main.vue";

export default {
  components: {
    HeaderContainer,
    FooterContainer,
    Baseket
  },
  data(){
    return {
        data: content,
        user: {}
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
  },
  mounted(){
    if(Object.keys(this.getUser).length) this.user = this.getUser
  },
}
</script>