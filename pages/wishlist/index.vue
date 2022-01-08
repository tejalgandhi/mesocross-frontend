<template>
    <div>
    <HeaderContainer/>
      <Wishlist :data="data" :user="user"/>
    <FooterContainer/>
    </div>
</template>

<script>
import content from "assets/json/basket.json";
import { mapGetters } from 'vuex';

import HeaderContainer from "../../components/layouts/headers/header.vue";
import FooterContainer from "../../components/layouts/footer.vue";

import Wishlist from "../../components/wish-list/Main.vue";

export default {
  components: {
    HeaderContainer,
    FooterContainer,
    Wishlist
  },
  data(){
    return {
        data: content.wishlist,
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