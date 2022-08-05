<template>
  <div class="w-100 border-bottom main-navbar">
    <div class="pt-2 container-fluid px-0 position-relative">
      <nav class="px-2 w-100">
        <div class="wrapper px-0 w-100">
          <div class="d-flex align-items-center justify-content-between justify-content-lg-start inside-wrapper">
            <div class="d-flex align-items-start d-lg-none">
              <button v-b-toggle.sidebar-mobile class="bg-transparent border-0 mx-2">
                <i class="fa fa-bars font-20" />
              </button>
              <a href="javascript:void(0)" class="mx-2" @click="setSearch"><img
                src="@/assets/img/search.svg"
                alt="search"
              ></a>
            </div>
            <NuxtLink to="/">
              <img src="@/assets/img/logo.svg" style="height: 50px; width: 50px" alt="Brand">
            </NuxtLink>
            <ul class="ml-md-5 nav-links d-lg-block d-none">
              <li
                v-for="(parent,index) in headerParent"
                :key="index"
                class="li"
                @mouseenter="parentHover(parent)"
                @mouseleave="isOverlay = false"
              >
                <div v-if="isOverlay" class="overlay" @mouseenter="isOverlay = !isOverlay" />
                <NuxtLink v-if="parent.custom_slug" :to="`/${parent.custom_slug}`">
                  {{ parent.name }}
                </NuxtLink>
                <a v-else href="javascript:void(0)">{{ parent.name }}</a>
                <input id="showMega3" type="checkbox">
                <label for="showMega3" class="mobile-item">{{ parent.name }}</label>
                <MenuHeaderMultiLevel v-if="parent.level == 3" :parent="parent" />
                <MenuHeaderTwoLevel v-if="parent.level == 2" :parent="parent" />
                <!-- <ThemeStaticHeader /> -->
              </li>
              <!--  PLACE FOR STATIC HEADER-->
            </ul>

            <div class="d-flex align-items-start d-lg-none">
              <NuxtLink
                to="/wishlist"
                class="position-relative mx-2"
              >
                <img src="@/assets/img/heart.svg" alt="herat">
                <span v-if="wishList.length && $auth.loggedIn" class="badge badge-secondary">{{ wishList.length }}</span>
              </NuxtLink>
              <NuxtLink to="/cart" class="position-relative mx-2">
                <img src="@/assets/img/cart.svg" alt="search">
                <span v-if="products.length && $auth.loggedIn" class="badge badge-secondary">{{ products.length }}</span>
              </NuxtLink>
            </div>
          </div>
          <ul class="nav-links d-flex align-items-center new-nav">
            <label for="close-btn" class="btn close-btn"><i class="fas fa-times" /></label>

            <li class="d-xl-none">
              <input id="showMega31" type="checkbox">
              <label for="showMega31" class="mobile-item">
                {{ $t('header.products') }}
              </label>
              <div class="mega-box px-0 bg-white">
                <div class="row pb-4 col-12 px-0 mx-auto">
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      {{ $t('header.professional') }}
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/essentials">
                          {{ $t('header.essentials') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/peelings-2">
                          {{ $t('header.pellings') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/aesthetical-treatments-2">
                          {{ $t('header.aesthetical_treatments') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/mesotheraphy">
                          {{ $t('header.mesotherapy') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/fillers">
                          {{ $t('header.fillers') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/biorevitalization">
                          {{ $t('header.biorevitalization') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/professional">
                          {{ $t('header.all_products') }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      {{ $t('header.homecare') }}
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/dermocosmetic">
                          {{ $t('header.dermocosmetic') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/nutricosmetic">
                          {{ $t('header.nutricosmetics') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/homecare">
                          {{ $t('header.all_products') }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      {{ $t('header.collections') }}
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/xr">
                          {{ $t('header.xr') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/gold">
                          {{ $t('header.gold') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/platinum">
                          {{ $t('header.platinum') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/cellcontroll">
                          {{ $t('header.cellcontroll') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/melanoout">
                          {{ $t('header.melanoout') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/spa">
                          {{ $t('header.spa') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/collections">
                          {{ $t('header.all_collections') }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      {{ $t('header.treatment_solutions') }}
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/ts/acne">
                          {{ $t('header.anti_acne') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/aggression-protector">
                          {{ $t('header.aggression_protector') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/anti-aging">
                          {{ $t('header.anti_aging') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/body-contouring">
                          {{ $t('header.body_contouring') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/couperose">
                          {{ $t('header.couperose') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/depigmentation">
                          {{ $t('header.depigmentation') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/eye-area">
                          {{ $t('header.eye_area') }}
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products">
                          {{ $t('header.all_solutions') }}
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li class="d-xl-none">
              <input id="showMega41" type="checkbox">
              <label for="showMega41" class="mobile-item">{{ $t('header.professional_treatments') }}</label>
              <div class="mega-box px-0 bg-white">
                <div class="row pb-4 col-12 px-0">
                  <div class="col-12 hover-div">
                    <h5 class="pb-4">
                      {{ $t('header.treatment_packs') }}
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">{{ $t('header.cvita_180') }}</a></li>
                      <li><a href="#">{{ $t('header.glutathione') }}</a></li>
                      <li><a href="#">{{ $t('header.pack_smart') }}</a></li>
                      <li><a href="#">{{ $t('header.all_packs') }}</a></li>
                    </ul>
                  </div>
                  <div class="col-12 hover-div">
                    <h5 class="pb-4">
                      {{ $t('header.perfomance') }}
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">{{ $t('header.treatment_recommender') }}</a></li>
                      <li><a href="#">{{ $t('header.treatments_results') }}</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li class="d-xl-none">
              <input id="showMega21" type="checkbox">
              <label for="showMega21" class="mobile-item">{{ $t('header.equipment') }}</label>
              <div class="mega-box px-0 bg-white">
                <div class="row pb-4 col-12 px-0 mx-auto">
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL 111
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="d-xl-none">
              <input id="showMega51" type="checkbox">
              <label for="showMega51" class="mobile-item">{{ $t('header.about_mesocross') }}</label>
              <div class="mega-box px-0 bg-white">
                <div class="row pb-4 col-12 px-0 mx-auto">
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      {{ $t('company') }}
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">{{ $t('about_us') }}</a></li>
                      <li><a href="#">{{ $t('our_story') }}</a></li>
                      <li><a href="#">{{ $t('header.mesocross_medical_spa') }}</a></li>
                      <li><a href="#">{{ $t('mesocross_solutions') }}</a></li>
                      <li><a href="#">{{ $t('expansion') }}</a></li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      {{ $t('training') }}
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/exhibitions-and-events">
                          {{ $t('exhibitions_and_events') }}
                        </nuxt-link>
                      </li>
                      <li><a href="#">{{ $t('header.mesocross_training') }}</a></li>
                      <li><a href="#">{{ $t('header.documents') }}</a></li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      {{ $t('header.customer_service') }}
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">{{ $t('contact_us') }}</a></li>
                      <li><a href="#">{{ $t('become_a_partner') }}</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li class="d-xl-none">
              <input id="showMega11" type="checkbox">
              <label for="showMega11" class="mobile-item">Forum</label>
              <div class="mega-box px-0 bg-white">
                <div class="row pb-4 col-12 px-0 mx-auto">
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL 111
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="d-xl-none">
              <input id="showMega111" type="checkbox">
              <label for="showMega111" class="mobile-item">{{ $t('header.blogs') }}</label>
              <div class="mega-box px-0 bg-white">
                <div class="row pb-4 col-12 px-0 mx-auto">
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4 font-weight-bold">
                      BºCOOL
                    </h5>
                    <div class="blog-item">
                      <div class="img-div" />
                      <p class="pb-4 pt-3">
                        Focusing on innovation and development, we aim to present the market with effective results.
                      </p>
                      <a href="#" class="p-0 d-block" style="line-height: normal">All about BºCOOL</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <access-price />
            </li>
            <li>
              <CommonLangSwitcher />
            </li>
            <li>
              <a href="javascript:void(0)" @click="setSearch"><img src="@/assets/img/search.svg" alt="search"></a>
            </li>
            <li
              class="dropdown d-flex align-items-center"
              style="height: 80px;"
              @click="isClicked(!Clicked)"
            >
              <div
                v-if="$auth.loggedIn"
                style="height: 12px !important;width: 12px !important;background: #25282A;border-radius: 100%;position: absolute;right: 0; top: 27px"
              />
              <span
                id="dropdownMenuLink"
                style="cursor: pointer"
                aria-expanded="false"
              >
                <img src="@/assets/img/user.svg" alt="search">
              </span>
              <ul class="dropdown-menu p-0 mx-0" :class="{'d-block' : Clicked}" aria-labelledby="dropdownMenuLink">
                <li v-show="!$auth.loggedIn" class="border-bottom mx-0 w-100" @click="isClicked(!Clicked)">
                  <nuxt-link :to="userUrl" class="dropdown-item px-2 py-2 text-center">
                    {{ $t('header.login_register') }}
                  </nuxt-link>
                </li>
                <li v-if="$auth.loggedIn" class="px-0 mx-0 py-1 border-bottom w-100" @click="isClicked(!Clicked)">
                  <span class="dropdown-item w-100">
                    {{ loggedinUser.full_name }}
                  </span>
                </li>
                <li v-if="$auth.loggedIn && $auth.user.type == 1" class="px-0 py-1 mx-0 border-bottom w-100" @click="isClicked(!Clicked)">
                  <a
                    href="javascript:void(0)"
                    class="dropdown-item w-100"
                    @click="redirectToDashboard('personal-data')"
                  >
                    {{ $t('dashboard.personal_data') }}
                  </a>
                </li>
                <li v-if="$auth.loggedIn && $auth.user.type == 2" class="px-0 py-1 mx-0 border-bottom w-100" @click="isClicked(!Clicked)">
                  <a href="javascript:void(0)" class="dropdown-item w-100" @click="redirectToDashboard('company-data')">
                    {{ $t('dashboard.company_data') }}
                  </a>
                </li>
                <li v-if="$auth.loggedIn" class="px-0 py-1 mx-0 border-bottom w-100" @click="isClicked(!Clicked)">
                  <a href="javascript:void(0)" class="dropdown-item w-100" @click="redirectToDashboard('address-book')">
                    {{ $t('dashboard.address_book') }}
                  </a>
                </li>
                <li v-if="$auth.loggedIn" class="px-0 py-1 mx-0 border-bottom w-100" @click="isClicked(!Clicked)">
                  <a
                    href="javascript:void(0)"
                    class="dropdown-item w-100"
                    @click="redirectToDashboard('payment-methods')"
                  >
                    {{ $t('payment_methods') }}
                  </a>
                </li>
                <li v-if="$auth.loggedIn" class="px-0 py-1 mx-0 border-bottom w-100" @click="isClicked(!Clicked)">
                  <a href="javascript:void(0)" class="dropdown-item w-100" @click="redirectToDashboard('login-data')">
                    {{ $t('dashboard.login_data') }}
                  </a>
                </li>
                <li v-if="$auth.loggedIn" class="px-0 mx-0 w-100 text-center" style="background: #e8e8e8" @click="isClicked(!Clicked)">
                  <AuthLogout class="dropdown-item" />
                </li>
              </ul>
            </li>
            <li>
              <NuxtLink
                to="/wishlist"
                class="position-relative"
              >
                <img src="@/assets/img/heart.svg" alt="herat">
                <span v-if="wishList.length && $auth.loggedIn" class="badge badge-secondary">{{ wishList.length }}</span>
              </NuxtLink>
            </li>
            <li>
              <a v-if="products.length > 0" class="position-relative pl-0" @mouseenter="showCart">
                <img src="@/assets/img/cart.svg" alt="search">
                <span v-if="products.length && $auth.loggedIn" class="badge badge-secondary">{{ products.length }}</span>
              </a>
              <a v-else class="position-relative pl-0">
                <img src="@/assets/img/cart.svg" alt="search">
                <span v-if="products.length && $auth.loggedIn" class="badge badge-secondary">{{ products.length }}</span>
              </a>
              <theme-cart-products :cart-preview-visibility="cartPreviewVisibility" :cart-products="products" @hideCart="hideCart" />
            </li>
          </ul>
        </div>

        <b-sidebar
          id="sidebar-mobile"
          backdrop
          shadow
        >
          <template #header="{ hide }">
            <div v-if="!backArrow" class="d-flex align-items-center justify-content-center position-relative py-2 border-bottom w-100">
              <NuxtLink to="/">
                <img src="@/assets/img/logo.svg" style="height: 50px; width: 50px" alt="Brand">
              </NuxtLink>
              <b-button class="bg-transparent border-0 close-sidebar" @click="hide">
                <i class="fa fa-times font-large text-secondary" />
              </b-button>
            </div>
            <div v-else class="d-flex align-items-center position-relative py-4 border-bottom w-100">
              <p class="d-flex align-items-center pl-3" @click="backClick()">
                <img src="@/assets/img/arrow-left.svg" class="mr-2" height="15" alt="image"> {{ menuName }}
              </p>
              <b-button class="bg-transparent border-0 close-sidebar" @click="hide">
                <i class="fa fa-times font-large text-secondary" />
              </b-button>
            </div>
          </template>
          <div class="px-3 py-2">
            <h3 v-if="childMenuName" class="mb-3 font-25">
              {{ childMenuName }}
            </h3>
            <ul>
              <li
                v-for="(parent,index) in headerMenuData"
                :key="index"
                class="w-100"
                @click="onParentClick(parent.id ? parent.id : index, parent.id ? 'level-1' : 'children', parent.name)"
              >
                <a
                  href="javascript:void(0)"
                  class="d-flex w-100 justify-content-between align-items-center px-1 py-2"
                >{{ parent.name }} <i
                  class="fa fa-angle-right font-20"
                /></a>
              </li>
            </ul>
          </div>
          <template v-if="!backArrow" #footer>
            <div class="px-3 py-3">
              <p class="mb-3">
                My account
              </p>
              <nuxt-link v-if="!$auth.loggedIn" :to="userUrl" class="btn w-100 d-block my-2 signin-btn">
                Sign In
              </nuxt-link>
              <nuxt-link v-if="$auth.loggedIn" to="/dashboard">
                <img src="@/assets/img/user.svg" alt="search" class="mr-3">{{ userName }}
              </nuxt-link>
              <nuxt-link v-if="$auth.loggedIn" to="/" class="btn w-100 d-block logout-btn mt-3">
                <AuthLogout />
              </nuxt-link>
              <nuxt-link v-else :to="userUrl" class="btn w-100 d-block logout-btn">
                Register
              </nuxt-link>
            </div>
          </template>
        </b-sidebar>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import accessPrice from '~/components/common/accessPrice'

export default {
  components: {
    accessPrice
  },
  data () {
    return {
      isProducts: false,
      isProfessional: false,
      isEuquipment: false,
      isMesocross: false,
      isForum: false,
      isProfileClicked: false,
      Clicked: false,
      categories: [],
      isOverlay: false,
      headerParent: [],
      parentChildren: [],
      headerMenuData: [],
      backArrow: false,
      menuId: null,
      childMenu: false,
      menuName: '',
      childMenuName: '',
      displayMenuName: '',
      cartPreviewVisibility: false
    }
  },
  async fetch () {
    const { data } = await this.$axios.$get('/header/get-header-data')
    this.headerParent = data.parent
    this.headerMenuData = this.headerParent
    this.setHeaderMenuChildren(data.children)
  },
  fetchOnServer: true,
  computed: {
    userUrl () {
      return this.$auth.loggedIn ? '#' : '/login'
    },
    fullName () {
      return (this.$auth.loggedIn && this.loggedinUser?.full_name) ? `${this.loggedinUser?.full_name.substring(0, 5)}...` : ''
    },
    ...mapState({
      wishList: state => state.cart.wishList,
      products: state => state.cart.products,
      isLoggedin: state => state.user.loggedIn,
      loggedinUser: state => state.user.loggedinUser,
      parentMenu: state => state.menu.parentMenu,
      hoveredParents: state => state.menu.hoveredParents,
      headerMenuChildren: state => state.menu.headerMenuChildren
    }),
    userName () {
      let userName = this.loggedinUser.full_name
      if (this.loggedinUser.type === 1 && this.loggedinUser.company_name) {
        userName = this.loggedinUser.company_name
      }
      return userName
    }
  },
  watch: {
    $route (to, from) {
      this.Clicked = false
    }
  },
  mounted () {
    if (this.$auth.strategy.token.get()) {
      this.fetchUserInfo()
    } else {
      this.setLoggedin(false)
      this.setLoggedinUser({})
    }
    this.getCountries()
  },
  methods: {
    showCart () {
      this.cartPreviewVisibility = true
    },
    hideCart () {
      this.cartPreviewVisibility = false
    },
    parentHover (parent) {
      this.isOverlay = true
      // if (this.parentMenu.find(element => element.id === parent.id)) {
      // this.setcurrentHoverMenu(parent.id)
      // } else {
      this.setcurrentHoverMenu(parent.id)
      // }
    },
    redirectToDashboard (name) {
      this.setSelectedDashboardComponent(name)
      this.$router.push(`/dashboard?page=${name}`)
    },
    ...mapMutations({
      setSelectedDashboardComponent: 'setSelectedDashboardComponent'
    }),
    ...mapActions({
      setSearch: 'setSearch',
      isClicked: 'isClicked',
      getCountries: 'getCountries'
    }),
    ...mapMutations({
      setLoggedin: 'user/setLoggedin',
      setLoggedinUser: 'user/setLoggedinUser',
      setcurrentHoverMenu: 'menu/setcurrentHoverMenu',
      setHeaderMenuChildren: 'menu/setHeaderMenuChildren'
    }),
    isClicked () {
      this.Clicked = !this.Clicked
    },
    async fetchUserInfo () {
      try {
        const user = await this.$axios.$get('/user')
        this.setLoggedin(true)
        this.setLoggedinUser(user)
      } catch (e) {
        this.setLoggedin(false)
        this.setLoggedinUser({})
      }
    },
    onParentClick (id, level, name) {
      this.displayMenuName = name
      if (level === 'level-1') {
        this.menuName = name
        this.backArrow = true
        this.menuId = id
        this.headerMenuData = this.headerMenuChildren[id]
      } else if (this.headerMenuData[id].children) {
        this.childMenuName = name
        this.headerMenuData = this.headerMenuData[id].children
        this.childMenu = true
      } else {
        switch (this.headerMenuData[id].type) {
          case 'product':
            this.$router.push(`/product-detail/${this.headerMenuData[id].slug}`)
            break
          case 'treatment':
            this.$router.push(`/products/ts/${this.headerMenuData[id].slug}`)
            break
          case 'category':
            this.$router.push(`/products/${this.headerMenuData[id].slug}`)
            break
          case 'blog':
            this.$router.push(`/blog-detail/${this.headerMenuData[id].slug}`)
            break
          default:
            this.$router.push(this.headerMenuData[id].slug)
            break
        }
        this.headerMenuData = this.headerParent
        this.backArrow = false
      }
    },
    backClick () {
      if (this.menuId && this.childMenu) {
        this.headerMenuData = this.headerMenuChildren[this.menuId]
        this.displayMenuName = this.menuName
        this.childMenuName = ''
        this.childMenu = false
      } else {
        this.headerMenuData = this.headerParent
        this.menuId = null
        this.backArrow = false
      }
    }
  }
}
</script>

<style type="text/css">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.main-navbar {
  height: 80px;
  position: fixed;
  background-color: white;
  z-index: 10;
}
.font-25 {
  font-size: 25px !important;
}
.new-nav li {
  margin-right: 5px;
}

.new-nav li:last-child {
  margin-right: 0 !important;
}

.hover-div h5 {
  font: normal normal 600 16px Arquitecta;
  letter-spacing: 0px;
  color: #25282A;
}
.hover-div h5 a {
  padding: 0 !important;
}

.hover-div li a {
  font: normal normal 400 14px Arquitecta;
  letter-spacing: 0px;
  display: block;
  padding: 0 0 10px 0 !important;
  line-height: normal !important;
  color: #25282A;
}

.hover-div li {
  display: block !important;
}

.li {
  height: 80px;
  padding-top: 10px;
}

.overlay {
  display: none; /* Hidden by default */
}

.blog-item .img-div {
  width: 100%;
  height: 198px;
  background: #F4F4F4 0% 0% no-repeat padding-box;
}

.blog-item .img-div img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.blog-item p {
  font: normal normal normal 13px Arquitecta;
  letter-spacing: 0px;
  color: #25282A;
}

.badge-secondary {
  position: absolute;
  top: 10px;
  right: 5px;
  background-color: #25282A;
  border-radius: 100%;
  height: 20px;
  width: 20px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu {
  margin-top: 10px;
  left: -80px !important;
  top: 65px;
}

.dropdown li a {
  line-height: normal !important;
}

nav {
  z-index: 99;
  width: 100%;
}

nav .wrapper {
  position: relative;
  padding: 0px 30px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-links li a:hover {
  font-weight: bold;
}

.nav-links .mobile-item {
  display: none;
}

.nav-links .drop-menu {
  position: absolute;
  background: #242526;
  width: 180px;
  top: 85px;
  opacity: 0;
  visibility: hidden;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.nav-links li:hover .drop-menu,
.nav-links li:hover .mega-box {
  transition: expand .3s ease;
  animation: topToBottom ease .3s;
  -webkit-animation: topToBottom ease .3s;
  -moz-animation: topToBottom ease .3s;
  -o-animation: topToBottom ease .3s;
  -ms-animation: topToBottom ease .3s;
  top: 70px;
  opacity: 1;
  visibility: visible;
  z-index: 2;
}

@keyframes topToBottom {
  0% {
    margin-top: -20px;
  }
  100% {
    margin-top: 0%;
  }
}

@-webkit-keyframes expand {
  0% {
    height: 0px;
    transition: all .3s ease-out
  }
  100% {
    height: 100%;
    transition: all .3s ease-out
  }
}

.box-row {
  margin: 0 55px;
}

.overlay:hover ~ .mega-box {
  display: none;
}

.nav-links li:hover .overlay {
  display: block !important;
  position: fixed; /* Sit on top of the page content */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 1; /* Specify a stack order in case you're using a different order for other elements */
}

.drop-menu li a {
  width: 100%;
  display: block;
  padding: 0 0 0 15px;
  font-weight: 400;
  border-radius: 0px;
}

.mega-box .row {
  padding-top: 15px;
}

.mega-box {
  position: absolute;
  left: 0;
  width: 100%;
  padding: 0 30px;
  top: 85px;
  opacity: 0;
  visibility: hidden;
  border-top: 1px solid #ececec;
  box-shadow: 0 3px 10px -4px rgb(0 0 0 / 0.2);
}

.row .mega-links li {
  padding: 0 20px;
}

.row .mega-links li a {
  padding: 0px;
  padding: 0 20px;
  font-size: 17px;
  display: block;
}

.wrapper .btn {
  color: #25282A;
  font-size: 20px;
  cursor: pointer;
  display: none;
}

.wrapper .btn.close-btn {
  position: absolute;
  right: 30px;
  top: 10px;
}

.menu-btn {
  display: none !important;
}

@media screen and (min-width: 993px) and (max-width: 1058px) {
  nav ul li a {
    padding: 15px 7px;
    display: inline-block;
    color: #25282A;
    font-size: 13px;
  }
}
@media screen and (max-width: 992px) {
  .menu-btn {
    display: block !important;
  }

  .wrapper .btn {
    display: block;
  }

  .wrapper .nav-links {
    position: fixed;
    height: 100vh;
    width: 100%;
    max-width: 350px;
    top: 0;
    left: -100%;
    background: white;
    display: block;
    padding: 50px 10px;
    overflow-y: auto;
    box-shadow: 0px 15px 15px rgba(0, 0, 0, 0.18);
    transition: all 0.3s ease;
    z-index: 1;
  }

  /* custom scroll bar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #242526;
  }

  ::-webkit-scrollbar-thumb {
    background: #3A3B3C;
  }

  #menu-btn:checked ~ .nav-links {
    left: 0%;
  }

  #menu-btn:checked ~ .btn.menu-btn {
    display: none;
  }

  #close-btn:checked ~ .btn.menu-btn {
    display: block;
  }

  .nav-links li {
    margin: 15px 10px;
  }

  .nav-links li a {
    padding: 0 20px;
    display: block;
    font-size: 20px;
  }

  .nav-links .drop-menu {
    position: static;
    opacity: 1;
    top: 65px;
    visibility: visible;
    padding-left: 20px;
    width: 100%;
    max-height: 0px;
    overflow: hidden;
    box-shadow: none;
    transition: all 0.3s ease;
  }

  #showDrop:checked ~ .drop-menu,
  #showMega:checked ~ .mega-box {
    max-height: 100%;
  }

  #showMega1:checked ~ .mega-box {
    max-height: 100%;
  }

  #showMega2:checked ~ .mega-box {
    max-height: 100%;
  }

  #showMega3:checked ~ .mega-box {
    max-height: 100%;
  }

  #showMega4:checked ~ .mega-box {
    max-height: 100%;
  }

  #showMega5:checked ~ .mega-box {
    max-height: 100%;
  }

  #showMega111:checked ~ .mega-box {
    max-height: 100%;
  }

  #showMega11:checked ~ .mega-box {
    max-height: 100%;
  }

  #showMega21:checked ~ .mega-box {
    max-height: 100%;
  }

  #showMega31:checked ~ .mega-box {
    max-height: 100%;
  }

  #showMega41:checked ~ .mega-box {
    max-height: 100%;
  }

  #showMega51:checked ~ .mega-box {
    max-height: 100%;
  }

  .nav-links .desktop-item {
    display: none;
  }

  .nav-links .mobile-item {
    display: block;
    color: #25282A;
    font-size: 20px;
    font-weight: 500;
    padding-left: 20px;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  .nav-links .mobile-item:hover {
    background: #3A3B3C;
    color: white;
  }

  .drop-menu li {
    margin: 0;
  }

  .drop-menu li a {
    border-radius: 5px;
    font-size: 18px;
  }

  .mega-box {
    position: static;
    top: 65px;
    z-index: 2 !important;
    opacity: 1;
    visibility: visible;
    padding: 0 20px;
    max-height: 0px;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .row .mega-links li {
    margin: 0;
  }
}

nav input {
  display: none;
}

.cart-side-bar .b-sidebar {
  width: 100%;
  max-width: 530px;
  max-height: 100vh;
  overflow-y: auto;
}

.cart-side-bar .b-sidebar .b-sidebar-body img.img-fluid{height:100px; width:100px; object-fit:contain;}

.cart-bar-footer {
  background: #eeeff0;
}

.cart-bar-footer .price-tag h6 {
  font: normal normal normal 16px Arquitecta;
  color: #25282A;
}

.cart-bar-footer .price-tag h3 {
  font: normal normal 600 24px Arquitecta;
  color: #25282A;
}

.cart-purchase-btn {
  background: #25282A;
  border: 1px solid #25282A;
  font-family: Arquitecta;
  font-size: 16px !important;
  text-align: center;
  color: #fff;
  border-radius: 4px;
}
.cart-purchase-btn:hover{
  background: transparent;
  color: #25282A;
  transition:0.4s ease all;
}
.basket-btn{
  border: 1px solid #25282A;
  border-radius: 4px;
  font-weight: 600;
  margin-top: 15px;
  text-align: center;
  border-radius: 4px;
}

.basket-btn:hover{
  background: #25282A;
  color: #fff;
  transition:0.4s ease all;
  font-weight: normal !important;
}

.side-header-title {
  font: normal normal 600 20px Arquitecta;
  color: #25282A;
}

.btn:focus {
  outline: none !important;
  box-shadow: none !important;
}

.cart-side-btn {
  height: 45px;
  display: inline-block !important;
}

.btn-2 {
  right: 0;
}

.input-cart {
  height: 45px;
  width: 100px;
  display: inline-block !important;
}

.cart-desc p {
  font: normal normal normal 16px Arquitecta;
  color: #00000099;
}

.cart-desc h6 {
  font: normal normal 600 20px Arquitecta;
  color: #25282A;
}

.cart-desc {
  padding-right: 35px;
}

.cart-trash {
  height: 22px;
  position: absolute;
  top: 20px;
  right: 10px;
  width: 20px;
}

.cart-price {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font: normal normal 600 20px Arquitecta;
  color: #25282A;
}

.close-sidebar {
  position: absolute;
  top: 15px;
  right: 10px;
}

.font-large {
  font-size: 27px;
}

#sidebar-mobile {
  width: 100%;
}

#sidebar-mobile .b-sidebar-header {
  padding: 5px 0 !important;
}

.signin-btn {
  border-radius: 5px;
  color: white;
  background: #25282A;
  border: 1px solid #25282A;
}

.logout-btn {
  border-radius: 5px;
  color: #25282A;
  background: white;
  border: 1px solid #25282A;
}

.blog-menu h5{height:50px; overflow: hidden;}
</style>
