<template>
  <div>
    <h2 class="my-5">
      RESULTS
    </h2>
    <div class="text-uppercase">
      <h6 class="font-weight-normal">
        OUR QUESTIONS + YOUR ANSWERS = THIS PERSONALIZED REGIMEN THAT’S JUST FOR YOUR SKIN.
      </h6>
      <a class="text-dark" style="text-decoration: underline" @click="$emit('changeDetail')">{{ $t('change_details') }}</a>
    </div>
    <template v-if="products">
      <div v-for="(product, index) in products" :key="index">
        <div class="">
          <template v-for="(children, index1) in product">
            <div :key="index1">
              <div class="prod_detail_box my-lg-5 py-lg-5 my-4 py-4">
                <div class="row align-items-center">
                  <div class="col-lg-7 product-image p-4">
                    <div v-if="children.feature_image" class="images main-image">
                      <nuxt-img
                        class="mx-auto d-block"
                        preload
                        format="webp"
                        :src="children.feature_image"
                        alt="product_image"
                        quality="100"
                        sizes="md:512"
                      />
                    </div>
                  </div>
                  <div class="col-lg-5 order-3 order-md-2">
                    <div class="prod_desc text-center">
                      <div>
                        <h1 class="h2 text-uppercase mb-1">
                          {{ children.name }}
                        </h1>
                      </div>
                      <div class="text-uppercase">
                        <p>{{ children.short_description | stringLimit }}</p>
                      </div>
                      <div class="size">
                        <div class="size_box float-none">
                          <ul class="float-none">
                            <li v-for="(s, i) in product.product_size" :key="i" class="mr-0" :class="{'active': s.size_id == size}">
                              <a class="p-1">{{ s.name }}</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <span />
                      <div v-show="$auth.loggedIn && children.price">
                        <a class="btn btn-outline-primary d-flex w-100 px-3 button-price mb-2 justify-content-center" @click="cart(children)">
                          <small>
                            {{ children.price }}€
                          </small>
                          <small class="add_cart_text">ADD TO BAG <b-icon-chevron-right /></small>
                        </a>
                      </div>
                      <div :class="['d-flex align-items-center', { 'justify-content-between' : $auth.loggedIn, 'justify-content-center': !$auth.loggedIn} ]">
                        <a v-if="$auth.loggedIn" class="btn px-0 text-underline" href="javascript:void(0)" @click="addToWishlist(children)">
                          {{ isProductInWishList(children.product_id) ? 'ADDED' : 'ADD' }}  TO MY STAR LIST
                        </a>
                        <div v-show="children.ref_number" class="text-uppercase btn px-0">
                          Ref:{{ children.ref_number }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div v-if="(product.length - index1) !== 1" :key="index1" class="mx-5 plus-icon text-center">
              +
            </div> -->
          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="col-12 text-center pt-4 pb-3 answer-text">
        <h2> {{ $t('no_data_found_for_this_quiz') }} </h2>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  filters: {
    stringLimit (content) {
      return `${content.substring(0, 30)}...`
    }
  },
  props: {
    treatment: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    selectedTreatment: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    products: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default () {
        return []
      }
    }
  },
  computed: {
    productPrice () {
      return (product) => {
        const prices = JSON.parse(product.price)
        return prices[0].price || ''
      }
    },
    isThisProductIsInCart () {
      return (productId, referenceNumber) => {
        return this.cartProducts.findIndex(val => val.product_id === productId && val.ref_number === referenceNumber) > -1
      }
    },
    isProductInWishList () {
      return (productId) => {
        return this.wishList.findIndex(pr => (pr.product_id === productId || pr.id === productId)) > -1
      }
    },
    ...mapState({
      cartProducts: state => state.cart.products,
      wishList: state => state.cart.wishList,
      isLoggedin: state => state.user.loggedIn
    })
  },
  mounted () {
    if (this.$auth.loggedIn) {
      this.getCart()
      this.getWishList()
    }
  },
  methods: {
    cart (product) {
      // const size = JSON.parse(product.price)
      const singleProduct = {
        name: product.name,
        slug: product.slug,
        price: product.price,
        size_id: product.size_id,
        feature_image: product.feature_image,
        size: product.size_name,
        product_id: product.product_id,
        ref_number: product.product_size_ref_number,
        flag: 1,
        qty: 1
      }
      this.addToCart(singleProduct)
      this.$toast.success('Product Added to cart successfully.', { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
    },
    addToWishlist (product) {
      const singleProduct = {
        name: product.name,
        slug: product.slug,
        product_id: product.product_id,
        feature_image: product.feature_image,
        flag: !this.isProductInWishList(product.product_id) ? 1 : 2
      }
      this.addWishList(singleProduct)
    },
    ...mapActions({
      addToCart: 'cart/addToCart',
      addWishList: 'cart/addWishList',
      getCart: 'cart/getCart',
      getWishList: 'cart/getWishList'
    })
  }
}
</script>
<style lang="scss" scoped>
.button-price {
    font-size: 20px;
    .add_cart_text{
      opacity: 0;
      visibility: hidden;
      display: none;
    }
    &:hover{
      background: transparent;
      color: #FFF;
      justify-content: space-between !important;
      .add_cart_text{
        opacity: 1;
        visibility: visible;
        display: block;
      }
    }
  }
  .product-t:after {
    content: "";
    width: 8px;
    height: 9px;
/* UI Properties */
    background: #E2C8B8 0% 0% no-repeat padding-box;
    opacity: 1;
    display: inline-block;
    margin: 0 1rem;
    transform: rotate(45deg);
}
</style>
