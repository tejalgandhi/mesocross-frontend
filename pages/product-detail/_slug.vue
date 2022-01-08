<template>
  <!-- <Tutorial/> -->
  <div>
    <HeaderContainer/>
    <div class="detail-container">
      <div class="left">
        <figure>
            <img :src="product.feature_image" alt="image">
        </figure>
        <Accordion :acc="data.characteristics" :data="product"/>
      </div>
      <div class="right">
        <Details v-if="Object.keys(product).length" :data="data" :product="product" @alert="alertHandeler"/>
      </div>
    </div>
    <div></div>
    <BannerContainer :data="data.banner" />
        <!-- <PromotedProducts :data="products.products"/> -->
    <FooterContainer/>
    <Alert v-show="alerts.length" :alerts="alerts" :status="status"/>
  </div>
</template>

<script>
import contentProduct from "assets/json/product.json";
// import contentProducts from "assets/json/products.json";
import HeaderContainer from "../../components/layouts/headers/header.vue";
import FooterContainer from "../../components/layouts/footer.vue";

import Details from "../../components/detail/details.vue"
import Accordion from "../../components/detail/accordion.vue"
import BannerContainer from "../../components/sections/banner.vue";
import Alert from "../../components/global/alert.vue";

import api from '../../assets/js/api'
export default {
  components: {
    HeaderContainer,
    FooterContainer,
    Details,
    Accordion,
    // PromotedProducts,
    BannerContainer,
    Alert
  },
  data(){
    return {
        data: contentProduct,
        product: {},
        alerts: [],
        status: false
    }
  },
  async mounted(){
      const response = await api.get('product-detail/'+this.$route.params.slug)
      this.product = response.data.data
  },
  methods: {
    alertHandeler(data){
      this.status = true
      if(typeof data === 'object') this.alerts = Object.values(data) 
      else this.alerts.push(data)
      setTimeout(function(){
        this.alerts = [];
      }.bind(this), 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
    background-color: $black;
    display: flex;
    gap: 2rem;
    padding: 8.75rem 0;

    @media (min-width: 1100px) {
        padding: 2rem 0;
    }
    
    @media (min-width: 1366px) {
        padding: 3rem 0;
    }

    @media (min-width: 1800px) {
        padding: 8.75rem 0;
    }

    .left {
      width: 60%;

        figure {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          img {
              object-fit: contain;
              width: 50%;
              height: 100%;
          }
        }
    }
  
  .right {
    width: 40%;
    padding: 0 2rem;

    @media (min-width: 1800px) {
      width: 30%;
    }
  }

}
</style>