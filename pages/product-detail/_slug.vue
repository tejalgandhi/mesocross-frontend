<template>
  <div class="product-page slug product-detail">
    <Bredcrumb :items="breadcrumbs" />
    <div class="prod_detail_box">
      <div class="container-fluid position-relative">
        <div class="row">
          <div class="col-lg-7 detail-slider">
            <!-- eslint-disable-next-line vue/attribute-hyphenation -->
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
                <nuxt-img
                  preload
                  format="webp"
                  :src="image"
                  alt="product_image"
                  quality="100"
                  sizes="md:512"
                />
              </div>
            </VueSlickCarousel>
            <div class="col-lg-12 product-image-list order-2 order-md-3 my-3 my-md-0">
              <!-- eslint-disable-next-line vue/attribute-hyphenation -->
              <VueSlickCarousel
                ref="slider-thumb"
                :class="'slider-thumb'"
                v-bind="{ slidesToShow: 5 }"
                :focus-on-select="true"
                @beforeChange="syncSliders"
              >
                <div v-for="(image, index) in productImages" :key="index">
                  <nuxt-img
                    preload
                    format="webp"
                    :src="image"
                    alt="product_image"
                    quality="100"
                    sizes="xs:128 md:256"
                  />
                </div>
              </VueSlickCarousel>
            </div>
          </div>
          <div class="col-lg-5 order-3 order-md-2">
            <div class="prod_desc">
              <a v-if="isLoggedin" href="javascript:void(0)" @click="addToWishlist">
                <img :src="isProductInWishList ? require('@/assets/img/Heart_icon_selected.svg') : require('@/assets/img/heart-icon.svg')" alt="image" class="fav">
              </a>
              <div class="d-flex align-items-center justify-content-between">
                <h1>{{ product.name }}</h1>
              </div>
              <label v-show="ref_number">Ref:{{ ref_number }}</label>
              <span v-show="isLoggedin && price">{{ price }}€</span>
              <nuxt-link v-if="isLoggedin" to="/customize-treatment">
                <img src="@/assets/img/custom_treatment.svg" alt="image">
                {{ $t('get_a_personalized_treatment') }}
              </nuxt-link>
              <!-- eslint-disable vue/no-v-html -->
              <div class="mt-3" v-html="product.product_content" />
              <!--eslint-enable-->
              <div class="size">
                <p><span>{{ $t('size') }}</span>({{ product.product_size.length }} {{ $t('size_available') }})</p>
                <div class="size_box float-none">
                  <ul class="float-none">
                    <li v-for="(s, i) in product.product_size" :key="i" :class="{'active': s.size_id == size}">
                      <a @click="changeSize(s.size_id)">{{ s.name }}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <ul v-if="collections.length > 0" class="collections">
                <h3>{{ $t('Collection') }}</h3>
                <li v-for="(item, index) in collections" :key="index">
                  <nuxt-link :to="`/product-detail/${item.slug}`">
                    <img :src="item.feature_image" height="30" width="30">
                  </nuxt-link>
                </li>
              </ul>
              <div class="add_cart d-flex align-items-center mt-5 float-none">
                <div v-if="isLoggedin" class="position-relative mr-3">
                  <!-- <span>Disponível apenas por encomenda</span> -->
                  <button type="button" class="btn btn-1 position-absolute" @click="qty > 1 ? qty--: qty=qty">
                    -
                  </button>
                  <input type="text" disabled :value="qty" class="text-center py-1" style="height: 45px; width: 110px">
                  <button type="button" class="btn btn-2 position-absolute" @click="qty++">
                    +
                  </button>
                </div>
                <a href="javascript:void(0)" class="" @click="cart">{{ $t('add_to_cart') }}</a>
              </div>
              <div class="share-network-list mt-3 float-none">
                <label>{{ $t('Share') }}</label>
                <ShareNetwork
                  v-for="network in networks"
                  :key="network.network"
                  :network="network.network"
                  :url="currentUrl"
                  :title="product.name"
                  :description="product.short_description"
                  :twitter-user="loggedinUser.full_name"
                >
                  <img :src="require(`~/assets/img/${network.icon}`)" alt="image">
                </ShareNetwork>
                <ShareNetwork
                  v-if="shareMessenger"
                  network="messenger"
                  :url="currentUrl"
                  :title="product.name"
                >
                  <img src="@/assets/img/share_messanger.svg" alt="image">
                </ShareNetwork>
                <a @click="copy()">
                  <img src="@/assets/img/Caminho_copy.svg" alt="image">
                </a>
              </div>
              <ul v-if="complementry.length > 0" class="complementry">
                <h3>{{ $t('Similar_Products') }}</h3>
                <li v-for="(item, index) in complementry" :key="index">
                  <nuxt-link :to="`/product-detail/${item.slug}`">
                    <img :src="item.feature_image" height="30" width="30">
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="product_info mb-5">
      <div class="container-fluid">
        <b-tabs content-class="nav nav-tabs">
          <b-tab :title="$t('Main_Characteristics_and_Effects')" active>
            <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel" v-html="product.characteristics_effect" />
          </b-tab>
          <b-tab :title="$t('application_protocol')">
            <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel" v-html="product.application" />
          </b-tab>
          <b-tab :title="$t('additional_information')">
            <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel" v-html="product.additional_info" />
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <template v-if="otherSolutions.length">
      <ProductOtherList :products="otherSolutions" :title="$t('other_solutions')" />
    </template>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import { mapActions, mapState } from 'vuex'
import { showPricePopup } from 'assets/js/custom'

export default {
  components: {
    VueSlickCarousel
  },
  async asyncData ({ params, $axios }) {
    const { data } = await $axios.$get(`/product-detail/${params.slug}`)
    const product = data
    return { product }
  },
  data () {
    return {
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
    productImages () {
      try {
        if (this.product) {
          const productImages = JSON.parse(this.product.product_images)
          let images = []
          for (const key in productImages) {
            images.push(`${process.env.uploadURL}${productImages[key]}`)
          }
          images = [this.product.feature_image, ...images]
          return images
        } else {
          return []
        }
      } catch (e) {
        return []
      }
    },
    isProductInWishList () {
      const iswish = this.wishList.findIndex(pr => pr.product_id === this.product.id && pr.product_size_price_id === this.product_size_id) > -1
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
  },
  methods: {
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

.tab-pane >>> table {
  width: 100% !important;
}

.tab-pane {
  overflow-x: auto;
}

/* .tab-pane >>> tr td:first-child {
  width: 250px !important;
  display: inline-table;
  margin-bottom: 20px;
} */
.tab-pane >>> tr td:last-child {
  width: 100% !important;
  margin-bottom: 20px;
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
    margin-top: 40px;
  }

  .share-network-list label {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    color: #25282A;
  }

  .share-network-list img{
    margin-right: 15px;
    width: 24px;
    height: 24px;
    float: left;
  }

  a[class^="share-network-"] {
    flex: none;
    /* color: #FFFFFF; */
    /* background-color: #333; */
    border-radius: 3px;
    overflow: hidden;
    flex-direction: row;
    align-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 20px 10px 0;
  }
  a[class^="share-network-"] .fah {
    /* background-color: rgba(0, 0, 0, 0.2); */
    padding: 10px;
    flex: 0 1 auto;
  }
  a[class^="share-network-"] span {
    padding: 0 10px;
    flex: 1 1 0%;
    font-weight: 500;
  }
</style>
