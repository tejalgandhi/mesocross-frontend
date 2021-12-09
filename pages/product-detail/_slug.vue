<template>
  <div class="product-page slug">
<!--    <Bredcrumb :items="breadcrumbs" />-->
<!--
    <div class="prod_detail_box">
      <div class="container-fluid position-relative">
        <div class="row">
          <div class="col-lg-7 detail-slider">
            &lt;!&ndash; eslint-disable-next-line vue/attribute-hyphenation &ndash;&gt;
            <VueSlickCarousel
              ref="slider-big"
              v-bind="{
                fade: true,
                infinite: false,
                settings:{
                  arrows: true,
                  dots: true,
                },
                responsive: [{
                  breakpoint: 640,
                  settings: {
                    dots: true,
                    infinite: false,
                  }
                }]
              }"
              @beforeChange="syncSliders"
            >
              <div v-for="(image, index) in productImages" :key="index" class="images">
                <img :src="image" class="img-fluid">
              </div>
            </VueSlickCarousel>
          </div>
          <div class="col-lg-5">
            <div class="prod_desc">
              <a v-if="isLoggedin" href="javascript:void(0)" @click="addToWishlist">
                <img :src="isProductInWishList ? require('@/assets/img/Heart_icon_selected.svg') : require('@/assets/img/heart-icon.svg')" alt="" class="fav">
              </a>
              <div class="d-flex align-items-center justify-content-between">
                <h1>{{ product.name }}</h1>
              </div>
              <label v-show="ref_number">Ref:{{ ref_number }}</label>
              <span v-show="isLoggedin && price">{{ price }}€</span>
              &lt;!&ndash; eslint-disable vue/no-v-html &ndash;&gt;
              <div v-html="product.product_content" />
              &lt;!&ndash;eslint-enable&ndash;&gt;
              <div class="size">
                <p><span>Size</span>({{ product.product_size.length }} size available)</p>
                <select v-model="size" @change="changeSize">
                  <option v-for="(s, i) in product.product_size" :key="i" :value="s.size_id">
                    {{ s.name }}
                  </option>
                </select>
              </div>
              <div class="add_cart d-flex align-items-center mt-5">
                <div v-if="isLoggedin" class="position-relative mr-3">
                  &lt;!&ndash; <span>Disponível apenas por encomenda</span> &ndash;&gt;
                  <button type="button" class="btn btn-1 position-absolute" @click="qty > 1 ? qty&#45;&#45;: qty=qty">
                    -
                  </button>
                  <input type="text" disabled :value="qty" class="text-center py-1" style="height: 45px; width: 110px">
                  <button type="button" class="btn btn-2 position-absolute" @click="qty++">
                    +
                  </button>
                </div>
                <a href="javascript:void(0)" class="" @click="cart">Add to Cart</a>
              </div>
            </div>
          </div>
          <div class="col-lg-7 product-image-list">
            &lt;!&ndash; eslint-disable-next-line vue/attribute-hyphenation &ndash;&gt;
            <VueSlickCarousel
              ref="slider-thumb"
              :class="'slider-thumb'"
              v-bind="{ slidesToShow: 5 }"
              :focus-on-select="true"
              @beforeChange="syncSliders"
            >
              <div v-for="(image, index) in productImages" :key="index">
                <img :src="image">
              </div>
            </VueSlickCarousel>
          </div>
        </div>
      </div>
    </div>
-->

<!--
    <div class="product_info mb-5">
      <div class="container-fluid">
        <b-tabs content-class="nav nav-tabs">
          <b-tab title="Main Characteristics & Effects" active>
            <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel" v-html="product.characteristics_effect" />
          </b-tab>
          <b-tab title="Application Protocol">
            <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel" v-html="product.application" />
          </b-tab>
          <b-tab title="Additional Information">
            <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel" v-html="product.additional_info" />
          </b-tab>
        </b-tabs>
      </div>
    </div>
-->

    <div class="container-fluid pt-5">
      <div class="row">
        <div class="col-md-7 text-center">
          <img src="@/assets/img/slug.png" class="img-fluid" alt="">
        </div>
        <div class="col-md-7">

        </div>
      </div>
    </div>

    <ProductBanner />
    <template v-if="otherSolutions.length">
      <ProductOtherList :products="otherSolutions" :title="`RECOMMENDED FOR YOU`" />
    </template>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { showPricePopup } from 'assets/js/custom'
export default {
  async asyncData ({ params, $axios }) {
    const { data } = await $axios.$get(`/product-detail/${params.slug}`)
    const product = data
    return { product }
  },
  data () {
    return {
      otherSolutions: [],
      translatable: [],
      size: '',
      price: '',
      qty: 1,
      currentUrl: '',
      networks: [
        { network: 'facebook', name: 'Facebook', icon: 'fab fah fa-lg fa-facebook-f', color: '#1877f2' },
        { network: 'whatsapp', name: 'Whatsapp', icon: 'fab fah fa-lg fa-whatsapp', color: '#25d366' },
        { network: 'email', name: 'Email', icon: 'far fah fa-lg fa-envelope', color: '#333333' },
        { network: 'pinterest', name: 'Pinterest', icon: 'fab fah fa-lg fa-pinterest', color: '#bd081c' }
      ],
      ref_number: '',
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
          active: 0
        },
        {
          path: '/products',
          label: 'Products',
          active: 2
        }
      ]
    }
  },
  computed: {
    productImages () {
      if (this.product) {
        let images = JSON.parse(this.product.product_images).map((val) => {
          return `${process.env.uploadURL}${val}`
        })
        images = [this.product.feature_image, ...images]
        return images
      } else {
        return []
      }
    },
    isProductInWishList () {
      const iswish = this.wishList.findIndex(pr => pr.product_id === this.product.id) > -1
      return iswish
    },
    ...mapState({
      wishList: state => state.cart.wishList,
      pricePopup: state => state.pricePopup,
      isLoggedin: state => state.user.loggedIn,
      loggedinUser: state => state.user.loggedinUser
    }),
    lastIndex () {
      return this.productImages ? this.productImages.length - 1 : 0
    }
  },
  watch: {
    isLoggedin (val) {
      setTimeout(() => {
        this.price = (this.product.product_size && this.product.product_size[0] && this.product.product_size[0].price) ? this.product.product_size[0].price : ''
      }, 500)
    }
  },
  created () {
    if (this.product.product_size && this.product.product_size[0]) {
      this.size = (this.product.product_size[0].size_id) ? this.product.product_size[0].size_id : ''
      this.price = (this.product.product_size[0].price) ? this.product.product_size[0].price : ''
      this.ref_number = (this.product.product_size[0].ref_number) ? this.product.product_size[0].ref_number : ''
    }
    this.breadcrumbs.push(
      {
        path: '/',
        label: this.product.name,
        active: 1
      }
    )
  },
  mounted () {
    if (this.isLoggedin) {
      this.storeRecentlyViewedProducts()
    }
    this.currentUrl = window.location.href
    showPricePopup(this)
    setTimeout(() => {
      this.getOtherSolution()
    }, 2000)
  },
  methods: {
    async getOtherSolution () {
      const { data } = await this.$axios.get(`/other-solutions/${this.$route.params.slug}`)
      this.otherSolutions = data.data
    },
    changeSize () {
      const selectedSize = this.product.product_size.find(pr => pr.size_id === this.size)
      this.price = selectedSize.price
      this.ref_number = selectedSize.ref_number
    },
    syncSliders (currentPosition, nextPosition) {
      this.$refs['slider-big'].goTo(nextPosition)
      this.$refs['slider-thumb'].goTo(nextPosition)
    },
    cart () {
      if (!this.isLoggedin) {
        this.$bvModal.show('price')
        return false
      }
      const size = this.product.product_size.find(pr => pr.size_id === this.size)
      const singleProduct = {
        name: this.product.name,
        slug: this.product.slug,
        price: this.price,
        size_id: this.size,
        feature_image: this.product.feature_image,
        size: size.name,
        product_id: this.product.id,
        // ref_number: this.product.ref_number,
        ref_number: this.ref_number,
        domestic_price: size.domestic_price,
        international_price: size.domestic_price,
        flag: 1,
        qty: this.qty
      }
      this.addToCart(singleProduct)
      this.$toast.success('Product Added to cart successfully.', { duration: 3000, position: 'top-right' })
    },
    addToWishlist () {
      const singleProduct = {
        name: this.product.name,
        slug: this.product.slug,
        product_id: this.product.id,
        feature_image: this.product.feature_image,
        flag: !this.isProductInWishList ? 1 : 2
      }
      this.addWishList(singleProduct)
    },
    storeRecentlyViewedProducts () {
      this.$axios.post('/recently-viewed/store', { product_id: this.product.id })
    },
    ...mapActions({
      addToCart: 'cart/addToCart',
      addWishList: 'cart/addWishList'
    })
  }
}
</script>

<style scoped>
#__BVID__158__BV_tab_container-fluid_ {
  border-bottom: none !important;
}

.slick-track {
  margin: 0;
}

.tab-pane >>> td, .tab-pane >>> th {
  padding: 10px !important;
  border: none !important;
}
.tab-pane >>> tr td:first-child p {
  font-weight: bold !important;
}
.slick-slider {
  max-width: 550px;
  max-height: 550px;
  margin: auto;
}

.btn:focus {
  outline: none !important;
  box-shadow: none !important;
}
.btn {
  height: 45px;
}
.btn-2 {
  right: 0;
}

  .share-network-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 1000px;
    margin: auto;
  }
  a[class^="share-network-"] {
    flex: none;
    color: #FFFFFF;
    background-color: #333;
    border-radius: 3px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 10px 10px 0;
  }
  a[class^="share-network-"] .fah {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px;
    flex: 0 1 auto;
  }
  a[class^="share-network-"] span {
    padding: 0 10px;
    flex: 1 1 0%;
    font-weight: 500;
  }
</style>
