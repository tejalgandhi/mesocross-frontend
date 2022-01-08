<template>
  <!-- <Tutorial/> -->
  <div>
    <HeaderContainer/>
    <BannerContainer :data="data.banner" />
    <PromotedProducts  :title="data.title_products"/>
    <HilightedProducts :data="data.cat"/>
    <FooterContainer/>
  </div>
</template>

<script>
import content from "assets/json/homepage.json";

import HeaderContainer from "../components/layouts/headers/header.vue";
import BannerContainer from "../components/sections/banner.vue";
import PromotedProducts from "../components/sections/promoted-products.vue";
import HilightedProducts from "../components/sections/hilighted-products.vue";
import FooterContainer from "../components/layouts/footer.vue";
export default {
  components: {
    HeaderContainer,
    BannerContainer,
    PromotedProducts,
    HilightedProducts,
    FooterContainer
  },
  data(){
    return {
      data: content,
    }
  }
}
</script>
