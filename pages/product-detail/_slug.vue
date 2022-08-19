<template>
  <div class="product-page slug product-detail">
    <!-- <Bredcrumb :items="breadcrumbs" /> -->
    <div class="prod_detail_box">
      <div class="container-fluid position-relative">
        <div class="row mb-4">
          <div class="col-lg-7 product-image p-4">
            <!-- eslint-disable-next-line vue/attribute-hyphenation -->
            <div v-if="productImages[0] !== undefined" class="images main-image">
              <nuxt-img
                class="mx-auto d-block"
                preload
                format="webp"
                :src="product.feature_image"
                alt="product_image"
                quality="100"
                sizes="md:512"
              />
            </div>
          </div>
          <div class="col-lg-5 order-3 order-md-2">
            <div class="prod_desc text-center">
              <div class="">
                <h1 class="h2 text-uppercase mb-1">
                  {{ product.name }}
                </h1>
              </div>
              <!-- <label v-show="ref_number">Ref:{{ ref_number }}</label> -->
              <div class="" v-html="product.product_content" />
              <!-- <span v-show="isLoggedin && price">{{ price }}€</span> -->
              <!-- <nuxt-link v-if="isLoggedin" to="/customize-treatment">
                <img src="@/assets/img/custom_treatment.svg" alt="image">
                {{ $t('get_a_personalized_treatment') }}
              </nuxt-link> -->
              <!-- eslint-disable vue/no-v-html -->
              <!-- <div class="" v-html="product.product_content" /> -->
              <!--eslint-enable-->
              <div class="size">
                <!-- <p><span>{{ $t('size') }}</span>({{ product.product_size.length }} {{ $t('size_available') }})</p> -->
                <div class="size_box float-none">
                  <ul class="float-none">
                    <li v-for="(s, i) in product.product_size" :key="i" class="mr-0" :class="{'active': s.size_id == size}">
                      <a class="p-1" @click="changeSize(s.size_id)">{{ s.name }}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <span />
              <div v-show="isLoggedin && price">
                <a href="javascript:void(0)" class="btn btn-outline-primary d-flex w-100 px-3 button-price mb-2 justify-content-center" @click="cart">
                  <small>
                    {{ price }}€
                  </small>
                  <small class="add_cart_text">ADD TO BAG <b-icon-chevron-right /></small>
                </a>
              </div>
              <div :class="['d-flex align-items-center', { 'justify-content-between' : isLoggedin, 'justify-content-center': !isLoggedin} ]">
                <a v-if="isLoggedin" class="btn px-0 text-underline" href="javascript:void(0)" @click="addToWishlist">
                  {{ isProductInWishList ? 'ADDED' : 'ADD' }}  TO MY STAR LIST
                </a>
                <div v-show="ref_number" class="text-uppercase btn px-0">
                  Ref:{{ ref_number }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 product-image p-4">
            <div v-if="productImages[0] !== undefined" class="images main-image">
              <nuxt-img
                class="mx-auto d-block"
                preload
                format="webp"
                :src="productImages[0]"
                alt="product_image"
                quality="100"
                sizes="md:512"
              />
            </div>
          </div>
          <div class="col-lg-5 order-3 order-md-2">
            <div class="accordion accordion-detail" role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" header-class="bg-transparent" class="p-0" role="tab">
                  <b-button v-b-toggle.accordion-1 block variant="default" class="text-left btn-plus">
                    DESCRIPTION
                  </b-button>
                </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <div class="detail-text" v-html="product.characteristics_effect" />
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-0" role="tab" header-class="bg-transparent">
                  <b-button v-b-toggle.accordion-2 block variant="default" class="text-left btn-plus">
                    DETAILS
                  </b-button>
                </b-card-header>
                <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <div class="detail-text" v-html="product.application" />
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-0" role="tab" header-class="bg-transparent">
                  <b-button v-b-toggle.accordion-3 block variant="default" class="text-left btn-plus">
                    BENEFITS
                  </b-button>
                </b-card-header>
                <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <div class="detail-text" v-html="product.additional_info" />
                  </b-card-body>
                </b-collapse>
              </b-card>

              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-0" role="tab" header-class="bg-transparent">
                  <b-button v-b-toggle.accordion-4 block variant="default" class="text-left btn-plus">
                    HOW TO APPLY
                  </b-button>
                </b-card-header>
                <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <div class="detail-text">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, omnis? Blanditiis vel consectetur fuga hic, nobis odit laborum architecto corporis ut est ratione cum aliquid maxime temporibus, quia minus quis.
                    </div>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="addtocart-sticky text-uppercase py-2 px-4">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-md-3">
            <div class="d-flex align-items-center">
              <div class="catIcon mr-3">
                <img height="37" src="@/assets/img/catIcon.png">
              </div>
              <div class="product-t">
                {{ product.name }}
              </div>
              <div class="size">
                <ul class="float-none">
                  <li v-for="(s, i) in product.product_size" :key="i" class="mr-0" :class="{'active': s.size_id == size}">
                    <a class="p-1" @click="changeSize(s.size_id)">{{ s.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col">
            <div v-if="productImages[0] !== undefined">
              <img
                class="mx-auto d-block"
                :src="productImages[0]"
                alt="product_image"
                height="40"
              >
            </div>
          </div>
          <div class="col-md-3">
            <div v-show="isLoggedin && price">
              <a href="javascript:void(0)" class="btn btn-outline-primary d-flex w-100 px-3 py-2 button-price mb-2 justify-content-center" @click="cart">
                <small>
                  {{ price }}€
                </small>
                <small class="add_cart_text">ADD TO BAG <b-icon-chevron-right /></small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template v-if="complementry.length > 0">
      <div class="related-products container-fluid">
        <h3 class="text-uppercase font-weight-normal text-center mb-4">
          {{ $t('Similar_Products') }}
        </h3>
        <div class="row">
          <ProductSingle v-for="(product, index) in complementry" :key="index" :product="product" :class-name="'col-lg-4 col-md-6'" />
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { showPricePopup } from 'assets/js/custom'

export default {

  async asyncData ({ $axios, params, route }) {
    const url = `/product-detail/${params.slug}` + (route.query ? `?segment_id=${route.query.segment}` : '')
    const { data } = await $axios.$get(url)
    const product = data
    return { product }
  },
  data () {
    return {
      upHere: false,
      otherSolutions: [],
      collections: [],
      complementry: [],
      translatable: [],
      size: '',
      price: '',
      qty: 1,
      currentUrl: '',
      product_size_id: '',
      networks: [
        { network: 'facebook', name: 'Facebook', icon: 'share_facebook.svg', color: '#1877f2' },
        { network: 'whatsapp', name: 'Whatsapp', icon: 'share_whatsapp.svg', color: '#25d366' }
        // { network: 'instagram', name: 'Instagram', icon: 'share_instagram.svg', color: '#0084ff' }
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
      ],
      shareMessenger: false
    }
  },
  computed: {
    ...mapGetters({
      isWished: 'cart/isWished'
    }),
    productImages () {
      try {
        if (this.product) {
          const productImages = JSON.parse(this.product.product_images)
          const images = []
          for (const key in productImages) {
            images.push(`${process.env.uploadURL}${productImages[key]}`)
          }
          return images
        } else {
          return []
        }
      } catch (e) {
        return []
      }
    },
    isProductInWishList () {
      return this.isWished(this.product)
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
  mounted () {
    if (this.product.product_size && this.product.product_size[0]) {
      this.product_size_id = (this.product.product_size[0].product_size_id) ? this.product.product_size[0].product_size_id : ''
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
    this.getProductCollections()
    if (this.isLoggedin) {
      this.storeRecentlyViewedProducts()
    }
    this.currentUrl = window.location.href
    showPricePopup(this)
    setTimeout(() => {
      this.getOtherSolution()
    }, 2000)
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.shareMessenger = true
    }
    this.setBackgroudColor()
  },
  beforeDestroy () {
    this.setBackgroudColor(true)
  },
  methods: {
    setBackgroudColor (destroy) {
      const color = this.product.color_gradient
      if (color && !destroy) {
        document.body.style.background = color
        return
      }
      document.body.setAttribute('style', '')
    },
    copy () {
      this.$toast.info('Copied!', { duration: 3000, position: 'top-right' })
      navigator.clipboard.writeText(window.location.href)
    },
    async getOtherSolution () {
      const { data } = await this.$axios.get(`/other-solutions/${this.$route.params.slug}`)
      this.otherSolutions = data.data
    },
    changeSize (sizeId) {
      this.size = sizeId
      const selectedSize = this.product.product_size.find(pr => pr.size_id === this.size)
      this.product_size_id = selectedSize.product_size_id
      this.price = selectedSize.price
      this.ref_number = selectedSize.ref_number
    },
    syncSliders (currentPosition, nextPosition) {
      this.$refs['slider-big'].goTo(nextPosition)
      this.$refs['slider-thumb'].goTo(nextPosition)
    },
    async getProductCollections () {
      const { slug } = this.$route.params
      const { data } = await this.$axios.get(`/get-related-products?slug=${slug}`)
      this.collections = data.collections
      this.complementry = data.complementry
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
        product_size_price_id: size.product_size_id,
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
      this.$toast.success(this.$t('product_added_to_cart_successfully'), { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
    },
    addToWishlist () {
      const selectedSize = this.product.product_size.find(pr => pr.size_id === this.size)
      const singleProduct = {
        name: this.product.name,
        slug: this.product.slug,
        price: selectedSize.price,
        short_description: this.product.short_description,
        product_id: this.product.id,
        product_size_price_id: selectedSize.product_size_id,
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
<style lang="scss" scoped>
.product-detail{
  padding: 80px 0;
}
.prod_detail_box{
  padding: 80px 0;
  .delivery-text{
    font-size: 14px;
    opacity: 0.4;
    text-transform: none;
    line-height: 24px;
  }
}
.main-image {
    margin-bottom: 150px;
}
.add_cart .btn {
    height: 48px;
}
.qty-input{
    height: 48px;
    width: 110px;
    background: transparent;
    border-color: rgba(255,255,255, 0.12);
    color: #FFF;
    text-align: center;
}
.btn-wishlist{
  border-color: rgba(255,255,255, 0.12);
}

@media (max-width: 991px) {
  .main-image {
    margin-bottom: 50px;
  }
  .prod_detail_box{
    padding: 0 0 50px;
  }
  .best_seller {
    padding-top: 50px;
  }
  .product-detail {
    padding-top: 20px;
    padding-bottom: 40px;
  }
  .product-image img {
    height: 320px;
  }
  .pro_slider img {
    height: 260px;
    margin-bottom: 20px;
  }
}

.banner-content {
    text-align: center;
    padding: 2rem;
    @media (min-width:992px){
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 0;
        right: 0;
        text-align: left;
      }
  }
  .addtocart-sticky{
        background: #1D1A16;
    top: 153px;
    position: sticky;
    z-index: 10;
    ul{margin-bottom: 0;}
  }
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
.related-products{
  margin-top: 80px;
}

</style>
