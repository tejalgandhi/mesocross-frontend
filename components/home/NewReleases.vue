<template>
  <div class="best_seller new_release">
    <div v-show="newProducts.length > 0" class="container">
      <h2>New releases</h2>
      <div class="row justify-content-center">
        <HomeProductCard v-for="(iteams,index) in newProducts" :key="index" :is-new="true" :product-info="iteams" />
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
      newProducts: []
    }
  },
  async fetch () {
    try {
      const { data } = await this.$axios.get('/products/new-release?isSinglePrice=true')
      this.newProducts = data.data
    } catch (e) {

    }
  },
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
