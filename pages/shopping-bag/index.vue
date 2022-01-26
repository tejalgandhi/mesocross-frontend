<template>
    <div>
    <HeaderContainer/>
      <Baseket :data="data" :user="user"/>
    <FooterContainer/>
    </div>
</template>

<script>
import content from "assets/json/basket.json";
import { mapGetters } from 'vuex';

import HeaderContainer from "../../components/layouts/header.vue";
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
        data: content.shopping_basket,
        user: {}
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
  },
  watch: {
      getUser: {
        immediate: true,
        handler(val) {
            if(Object.keys(val).length) this.user = val
        }
      }
  }
}
</script>