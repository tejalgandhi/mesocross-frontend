<template>
  <div class="product-page mb-5 equipment-details">
    <div class="banner">
      <div class="container-fluid position-relative px-0 px-md-3">
        <img :src="product.feature_image" alt="image">
        <div class="content">
          <h1>{{ product.name }}</h1>
          <p>{{ product.short_description }}</p>
        </div>
      </div>
    </div>
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
                <img :src="image" class="img-fluid">
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
                  <img :src="image">
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
              <label>Ref.{{ product.ref_number }}</label>
              <span v-show="isLoggedin && price">{{ price }}€</span>
              <!-- eslint-disable vue/no-v-html -->
              <div class="mt-3" v-html="product.product_content" />
              <!--eslint-enable-->
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
    <div v-if="product.equipment_detail" class="home_category">
      <div class="container-fluid">
        <div v-if="product.equipment_detail.image_hotspot_title" class="row align-middle mx-0 box py-3">
          <div class="col-lg-6 d-flex align-items-center justify-content-center">
            <client-only>
              <v-hotspot :init-options="hotspotConfig" />
            </client-only>
          </div>
          <!-- eslint-disable vue/no-v-html -->
          <div class="col-lg-6 align-items-center d-flex justify-content-md-center w-100">
            <div class="desc px-0 text-center text-md-left">
              <h3>{{ product.equipment_detail.image_hotspot_title }}</h3>
              <!-- eslint-disable vue/no-v-html -->
              <p v-if="product.equipment_detail.image_hotspot_arr" class="d-none d-md-block">
                <ul>
                  <li v-for="(hotspot, index) in product.equipment_detail.image_hotspot_arr" :key="index">
                    {{ index+1 }}. {{ hotspot.Message }}
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>

        <div v-for="(equipment, index) in product.equipment_detail.equipment" :key="index">
          <div v-show="index == 0 || index == 2" class="row mx-0 box" style="background-color: white;">
            <div class="col-lg-6 second align-items-center d-flex justify-content-md-center order-1 order-md-0 w-100">
              <div class="desc px-0 text-center text-md-left">
                <h3>{{ equipment.title }}</h3>
                <!-- eslint-disable vue/no-v-html -->
                <p class="d-none d-md-block" v-html="equipment.description" />
              </div>
            </div>
            <div class="col-lg-6 first d-flex align-items-center justify-content-center order-0 order-md-1">
              <img :src="equipment.image" alt="image" style="height:400px;">
            </div>
          </div>
          <div v-show="index == 1 || index == 3" class="row align-middle mx-0 box">
            <div class="col-lg-6 d-flex align-items-center justify-content-center">
              <img :src="equipment.image" alt="image" style="height:400px;">
            </div>
            <!-- eslint-disable vue/no-v-html -->
            <div class="col-lg-6 align-items-center d-flex justify-content-md-center w-100">
              <div class="desc px-0 text-center text-md-left">
                <h3>{{ equipment.title }}</h3>
                <!-- eslint-disable vue/no-v-html -->
                <p class="d-none d-md-block" v-html="equipment.description" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home_category">
      <div class="container-fluid">
        <b-tabs content-class="nav nav-tabs">
          <b-tab :title="$t('Main_Characteristics_and_Effects')" active>
            <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel" v-html="product.characteristics_effect" />
          </b-tab>
          <b-tab :title="$t('application')">
            <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel" v-html="product.application" />
          </b-tab>
          <b-tab :title="$t('additional_information')">
            <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel" v-html="product.additional_info" />
          </b-tab>
          <b-tab :title="$t('contact_a_professional')">
            <div id="one" class="tab-pane pb-3 fade show active" role="tabpanel" v-html="product.contact_professional" />
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import VueHotspot from 'vue-hotspot' // refers to components/VueHotspot.vue in webpack
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  components: {
    VueSlickCarousel,
    'v-hotspot': VueHotspot
  },
  async asyncData ({ params, $axios }) {
    const { data } = await $axios.$get(`/equipment-details/${params.slug}`)
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
      networks: [
        { network: 'facebook', name: 'Facebook', icon: 'share_facebook.svg', color: '#1877f2' },
        { network: 'whatsapp', name: 'Whatsapp', icon: 'share_whatsapp.svg', color: '#25d366' }
        // { network: 'instagram', name: 'Instagram', icon: 'share_instagram.svg', color: '#0084ff' }
      ],
      ref_number: '',
      data: [],
      product: [],
      middleSections: [],
      filterParams: '',
      hotspotConfig: {},
      breadcrumbs: [
        {
          path: '/',
          label: 'Home',
          active: 0
        },
        {
          path: '/equipments',
          label: 'Equipment',
          active: 0
        }
      ]
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
    isLoggedin () {
      setTimeout(() => {
        this.price = (this.product.product_size && this.product.product_size[0] && this.product.product_size[0].price) ? this.product.product_size[0].price : ''
      }, 500)
    }
  },
  mounted () {
    if (this.product && this.product.product_size && this.product.product_size[0]) {
      this.size = (this.product.product_size[0].size_id) ? this.product.product_size[0].size_id : ''
      this.price = (this.product.product_size[0].price) ? this.product.product_size[0].price : ''
      this.ref_number = (this.product.product_size[0].ref_number) ? this.product.product_size[0].ref_number : ''
    }
    this.breadcrumbs.push(
      {
        path: '/equipment',
        label: this.product?.name,
        active: 1
      }
    )
    if (this.product.equipment_detail) {
      this.hotspotConfig = {
        image: this.product.equipment_detail.image_hotspot,
        editable: false,
        interactivity: 'hover',
        data: this.product.equipment_detail.image_hotspot_arr,
        hotspotColor: '#000000',
        messageBoxColor: '#409eff',
        textColor: '#333',
        opacity: 0.9
      }
    } else {
      this.hotspotConfig = {}
    }

    this.getProductCollections()
  },
  methods: {
    copy () {
      this.$toast.info('Copied!', { duration: 3000, position: 'top-right' })
      navigator.clipboard.writeText(window.location.href)
    },
    changeSize (sizeId) {
      this.size = sizeId
      const selectedSize = this.product?.product_size.find(pr => pr.size_id === this.size)
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
      const size = this.product?.product_size.find(pr => pr.size_id === this.size)
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
      this.$toast.success(this.$t('product_added_to_cart_successfully'), { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
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

.tabs{
  margin-top: 30px;
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

.tab-pane >>> tr td:first-child {
  width: 250px !important;
  display: inline-table;
  margin-bottom: 20px;
}
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
  .ui__vue_hotspot >>> .ui__vue_hotspot_hotspot {
    margin-left: 0px;
    margin-top: 0px;
  }
  .ui__vue_hotspot_background_image {
    width: 324px !important;
    height: 404px !important;
  }

  .ui__vue_hotspot {
    counter-reset: number;
  }
  .ui__vue_hotspot >>> .ui__vue_hotspot_hotspot {
    counter-increment: number;
  }
  .ui__vue_hotspot >>> .ui__vue_hotspot_hotspot::after {
    content: counter(number)" ";
    color: white;
    margin-left: 5px;
  }

.equipment-details{float: left;width: 100%;}

.equipment-details .banner img {
  filter: brightness(0.9);
}
.equipment-details .content.white h1, .content.white p {
  color: white !important;
}
.equipment-details .home_category .box img {
  object-fit: contain !important;
}

.share-network-list img {
    margin-right: 15px;
    width: 24px;
    height: 24px;
    float: left;
}

</style>
