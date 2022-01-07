<template>
  <!-- <Tutorial/> -->
  <div>
    <HeaderContainer/>
    <Banner :data="data.banner"/>
    <ProductsList :breadcrumbs="data.breadcrumbs" :filters="data.filters" :text="data.text"/>
    <FooterContainer/>
  </div>
</template>

<script>
import content from "assets/json/products-page.json";
import HeaderContainer from "../../components/layouts/headers/header.vue";
import FooterContainer from "../../components/layouts/footer.vue";

import Banner from "../../components/product-lists/banner.vue"
import ProductsList from "../../components/product-lists/products.vue"
export default {
  components: {
    HeaderContainer,
    FooterContainer,
    Banner,
    ProductsList
  },
  data(){
    return {
      data: content,
    }
  }
}
</script>