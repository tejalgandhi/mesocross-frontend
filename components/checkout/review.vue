<template>
  <div class="accordion accordion-section clearfix mt-3 mb-3" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header v-b-toggle.accordion-1 class="panel panel-default" header-tag="header" role="tab">
        <h3 class="panel-title">
          <a block variant="info">
            Products
          </a>
        </h3>
      </b-card-header>
      <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div v-for="(product, index) in products" :key="index" class="panel-body mb-4">
            <div class="row my-4 mx-0 border-bottom pb-3 mb-3">
              <div class="col-md-3 align-self-center pr-md-0 mx-auto text-center">
                <img :src="product.feature_image" class="img-fluid" alt="">
              </div>
              <div class="col-md-9 pl-md-0 text-left">
                <div class="mt-4">
                  <nuxt-link :to="`/product-detail/${product.slug}`">
                    <p class="font-20 text-dark" style="font-weight: 600">
                      {{ product.name }} ({{ product.size }})
                    </p>
                  </nuxt-link>
                  <p class="font-16">
                    Ref:{{ product.ref_number }}
                  </p>
                  <div class="counter px-3 py-2 my-4 d-flex align-items-center justify-content-between">
                    <a href="#"><i class="fa fa-minus text-muted font-weight-light" aria-hidden="true" /></a>
                    <span class="mx-2">{{ product.qty }}</span>
                    <a href="#"><i class="fa fa-plus text-muted font-weight-light" aria-hidden="true" /></a>
                  </div>
                  <p class="font-20 text-dark">
                    {{ product.price }}€
                  </p>
                </div>
              </div>
            </div>
          </div>
        </b-card-body>
      </b-collapse>
      <b-card-header v-b-toggle.accordion-2 class="panel panel-default" header-tag="header" role="tab">
        <h3 class="panel-title">
          <a block variant="info">
            Shipping
          </a>
        </h3>
      </b-card-header>
      <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div class="panel-body mb-4">
            <div class="mt-4">
              <p class="font-16 text-dark">
                {{ address.company_name }}
              </p>
              <p class="font-14">
                {{ address.address_first_line }} {{ address.address_second_line }} <br> {{ address.post_code }}, {{ address.city }}
              </p>
              <p class="font-14">
                {{ address.country }}
              </p>
            </div>

            <div class="mt-4">
              <p class="font-16 text-dark">
                Standard Shipping - <span class="text-success">Free</span>
              </p>
              <p class="mb-4 font-14">
                Monday 16, March — Thursday 16, March
              </p>
            </div>

            <!-- <a href="#" class="font-16 text-dark pt-4 border-bottom d-inline">Edit Shipping</a> -->
          </div>
        </b-card-body>
      </b-collapse>
      <b-card-header v-b-toggle.accordion-3 class="panel panel-default" header-tag="header" role="tab">
        <h3 class="panel-title">
          <a block variant="info">
            Payment
          </a>
        </h3>
      </b-card-header>
      <b-collapse id="accordion-3" visible accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <div class="panel-body mb-4">
            <p class="font-16 text-dark">
              Condições de pagamento acordadas com a empresa
            </p>
            <p class="mb-4 font-14">
              Pagamento até 30 dias após a recepção da encomenda
            </p>

            <!-- <a href="#" class="font-16 text-dark pt-4 border-bottom d-inline">Edit Payment</a> -->
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  computed: {
    totalProductPrice () {
      return this.products.map(val => val.price).reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
    },
    ...mapState({
      products: state => state.cart.products,
      isUserLoggedIn: state => state.user.loggedIn
    }),
    ...mapGetters({
      address: 'user/getUserAddress'
    })
    // isUserLoggedIn () {
    //   return this.$auth.user
    // }
  },
  mounted () {
    this.getCart()
    if (!this.isUserLoggedIn) {
      this.setCartProduct([])
    }
  },
  methods: {
    ...mapActions({
      getCart: 'cart/getCart'
    }),
    ...mapMutations({
      setCartProduct: 'cart/setCartProduct'
    })
  }
}
</script>
