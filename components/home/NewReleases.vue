<template>
  <div class="best_seller new_release pb-5">
    <div v-show="newProducts.length > 0" class="pb-5">
      <h2 class="mb-5 pb-5">NEW COLLECTION</h2>
      <div class="row justify-content-center mx-0">
        <div class="col-md-6 col-lg-3" v-for="(items,index) in newProducts" :key="index">
          <div class="text-center each-product cursor-pointer">
            <img src="@/assets/img/product-1.png" class="img-fluid mb-5" alt="product">
            <h6 class="py-3">SUN CREAM 50+</h6>
            <p>Cream for oily skin</p>
          </div>
        </div>
<!--        <HomeProductCard v-for="(iteams,index) in newProducts" :key="index" :is-new="true" :product-info="iteams" />-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newProducts: ['', '', '']
    }
  },
  // async fetch () {
  //   try {
  //     // const { data } = await this.$axios.get('/products/new-release?isSinglePrice=true')
  //     // this.newProducts = data.data
  //   } catch (e) {
  //
  //   }
  // },
  fetchOnServer: true
}
</script>

<style>
.container-fluid {
  width: 95%;
  margin: 0 auto;
}

@media screen and (min-width: 320px) and (max-width: 1024px){
  .container-fluid {
    width: 100%;
  }
}
</style>
