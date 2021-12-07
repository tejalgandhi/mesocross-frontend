<template>
  <div class="col-lg-3 mt-5 pt-5">
    <div class="summary mt-3">
      <h3 class="mb-3 mt-2">
        Order summary
      </h3>
      <!-- <div class="discount">
        <span>Add discount
          <a href="#"><img src="@/assets/img/plus.svg" alt=""></a>
          <input type="text" name="" style="display: none;">
        </span>
      </div> -->
      <div class="prod_detail">
        <p class="product">
          <label>{{ totalUnits }} Units ({{ products.length }} X products)</label><span>{{ totalProductPrice }} €</span>
        </p>
        <p><label>Dicount</label> <span>0 €</span></p>
        <p><label>Shipping</label> <span>0 €</span></p>
        <p class="total">
          <label>Total</label> <span>{{ totalProductPrice }} €</span>
        </p>
        <a href="javascript:void(0)" class="checkout" @click="$emit('countinue')">Continue <i class="fa fa-angle-right ml-3" /></a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState({
      products: state => state.cart.products,
      isUserLoggedIn: state => state.user.loggedIn
    }),
    ...mapGetters({
      totalProductPrice: 'cart/totalProductPrice',
      totalUnits: 'cart/totalUnits'
    })
    // isUserLoggedIn () {
    //   return this.$auth.user
    // }
  }
}
</script>
