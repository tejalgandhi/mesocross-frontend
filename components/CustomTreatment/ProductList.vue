<template>
  <div>
    <span>{{ $t('thank_you_for_your_answers') }}!</span>
    <h2 class="my-3">
      {{ $t('your_personalized_treatment') }}
    </h2>
    <span class="text-muted"> {{ treatmentStr }} <a class="text-dark" style="text-decoration: underline" @click="$emit('changeDetail')">{{ $t('change_details') }}</a></span>
    <template v-if="products">
      <div v-for="(product, index) in products" :key="index" class="row answer-item py-5 border-bottom">
        <div class="col-12 text-center pt-4 pb-3 answer-text">
          <h2>{{ product.length }}  </h2>
          <p>{{ solutionArray[index] }}</p>
        </div>

        <div class="col-auto text-center mx-auto d-flex align-items-center justify-content-center reco-ans">
          <template v-for="(children, index1) in product">
            <div :key="index1" class="answer-box">
              <div class="mx-4 my-4">
                <nuxt-link :to="`/product-detail/${children.slug}`">
                  <div class="img-top my-3">
                    <img :src="children.feature_image" alt="image">
                  </div>
                  <p class="font-18 text-dark mb-2">
                    {{ children.name }}
                  </p>
                  <p class="font-16">
                    {{ children.short_description | stringLimit }}
                  </p>
                  <p v-if="$auth.loggedIn" class="font-14 text-dark my-4">
                    {{ children.price }}€
                  </p>
                </nuxt-link>
                <div v-if="$auth.loggedIn">
                  <button v-if="!isThisProductIsInCart(children.product_id, children.product_size_ref_number)" class="w-100 mb-3 d-block btn btn-dark text-white" @click="cart(children)">
                    {{ $t('add_to_cart') }}
                  </button>
                </div>
                <button v-if="isProductInWishList(children.product_id)" class="w-100 mb-3 mt-3 d-block btn btn-outline-dark" @click="addToWishlist(children)">
                  {{ $t('remove_from_wishlist') }}
                </button>
                <button v-else class="w-100 mb-3 mt-3 d-block btn btn-outline-dark" @click="addToWishlist(children)">
                  {{ $t('add_to_wishlist') }}
                </button>
              </div>
            </div>
            <div v-if="(product.length - index1) !== 1" :key="index1" class="mx-5 plus-icon text-center">
              +
            </div>
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
    },
    solutionArray: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default () {
        return []
      }
    }
  },
  computed: {
    treatmentStr () {
      // const selectedType = this.treatment.type[this.selectedTreatment.part_of_body]
      const selectedType = this.treatment.type[this.selectedTreatment.part_of_body][this.selectedTreatment.type]
      const fullString = `${this.treatment.gender[this.selectedTreatment.gender]} / ${this.treatment.ageGroup[this.selectedTreatment.age_group]} / ${this.treatment.partsOfBody[this.selectedTreatment.part_of_body]} / ${selectedType}`
      if (this.selectedTreatment.part_of_body === 'hair') {
        return fullString
      } else {
        const SpecificType = this.treatment.typeChildren[this.selectedTreatment.type].children[this.selectedTreatment.specific_type]
        return `${fullString} / ${SpecificType}`
      }
    },
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
        return this.wishList.findIndex(pr => pr.id === productId) > -1
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
