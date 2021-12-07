<template>
  <div v-show="bestSeller.length > 0" class="best_seller">
    <div class="container-fluid">
      <h2>Best sellers</h2>
      <div class="row justify-content-center">
        <HomeProductCard v-for="(iteams,index) in bestSeller" :key="index" :product-info="iteams " />
      </div>
      <nuxt-link to="/products" class="see_all">
        See all products
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bestSeller: []
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('/products/bestsellers?isSinglePrice=true')
      this.bestSeller = data.data
    } catch (e) {

    }
  }
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
