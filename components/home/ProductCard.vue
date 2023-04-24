<template>
  <div v-if="productInfo != null" class="col-lg-3">
    <div class="prod_box">
      <nuxt-link :to="`/product-detail/${productInfo.slug}`">
        <nuxt-img :src="productInfo.feature_image" alt="image" />
        <img v-if="isNew" src="@/assets/img/new-badge.png" alt="image" class="new">
        <div class="desc_box">
          {{ productInfo.name }}
          <p>{{ productInfo.short_description }}</p>
          <span v-if="$auth.$state.loggedIn">{{ productInfo.product_size.price }}€</span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    isNew: {
      type: Boolean,
      default: false
    },
    productInfo: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState({
      isLoggedin: state => state.user.loggedIn
    })
  }
}
</script>

<style>

</style>
