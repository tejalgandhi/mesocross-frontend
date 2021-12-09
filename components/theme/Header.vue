<template>
  <div class="w-100 main-navbar">
    <div class="pt-2 container-fluid px-0 position-relative">
      <nav class="px-2 w-100">
        <div class="wrapper px-0 w-100">
          <input id="menu-btn" type="radio" name="slider">
          <input id="close-btn" type="radio" name="slider">
          <div>
            <CommonLangSwitcher />
          </div>
          <div class="d-flex align-items-center justify-content-center ml-5 pl-5">
            <NuxtLink class="ml-5" to="/">
              <h2 class="messo-brand">
                MESOCROSS
              </h2>
            </NuxtLink>
            <!--            <ul class="ml-md-5 nav-links d-lg-block d-none">
              <li class="li" @mouseenter="isOverlay = true" @mouseleave="isOverlay = false">
                <div v-if="isOverlay" class="overlay" @mouseenter="isOverlay = !isOverlay" />
                <NuxtLink to="/products">
                  Products
                </NuxtLink>
                <input id="showMega3" type="checkbox">
                <label for="showMega3" class="mobile-item">Products</label>
                <div class="mega-box bg-white">
                  <div class="row pb-4 col-lg-11 box-row">
                    <div class="col-md-3 hover-div">
                      <h5 class="pb-4">
                        Professional
                      </h5>
                      <ul class="list-unstyled">
                        <li>
                          <nuxt-link to="/products/essentials">
                            Essentials
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/peelings-2">
                            Pellings
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/aesthetical-treatments-2">
                            Aesthetical Treatments
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/mesotheraphy">
                            Mesotherapy
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/fillers">
                            Fillers
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/biorevitalization">
                            Biorevitalization
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/professional">
                            All products
                          </nuxt-link>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-3 hover-div">
                      <h5 class="pb-4">
                        Homecare
                      </h5>
                      <ul class="list-unstyled">
                        <li>
                          <nuxt-link to="/products/dermocosmetic">
                            Dermocosmetic
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/nutricosmetic">
                            Nutricosmetics
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/homecare">
                            All products
                          </nuxt-link>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-3 hover-div">
                      <h5 class="pb-4">
                        Collections
                      </h5>
                      <ul class="list-unstyled">
                        <li>
                          <nuxt-link to="/products/xr">
                            XR
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/gold">
                            Gold
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/platinum">
                            Platinum
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/cellcontroll">
                            Cellcontroll
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/melanoout">
                            Melanoout
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/spa">
                            SPA
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/collections">
                            All collections
                          </nuxt-link>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-3 hover-div">
                      <h5 class="pb-4">
                        Treatment Solutions
                      </h5>
                      <ul class="list-unstyled">
                        <li>
                          <nuxt-link to="/products/ts/acne">
                            Anti-Acne
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/ts/aggression-protector">
                            Aggression Protector
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/ts/anti-aging">
                            Anti-Aging
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/ts/body-contouring">
                            Body Contouring
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/ts/couperose">
                            Couperose
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/ts/depigmentation">
                            Depigmentation
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products/ts/eye-area">
                            Eye Area
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/products">
                            All Solutions
                          </nuxt-link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="li" @mouseenter="isOverlay = true" @mouseleave="isOverlay = false">
                <div v-if="isOverlay" class="overlay" @mouseenter="isOverlay = !isOverlay" />
                <a href="#">Professional Treatments</a>
                <input id="showMega4" type="checkbox">
                <label for="showMega4" class="mobile-item">Professional Treatments</label>
                <div class="mega-box bg-white">
                  <div class="row pb-4 col-lg-11 box-row">
                    <div class="col-md-3 hover-div">
                      <h5 class="pb-4">
                        Treatment Packs
                      </h5>
                      <ul class="list-unstyled">
                        <li><a href="#">Cvita 180</a></li>
                        <li><a href="#">Glutathione</a></li>
                        <li><a href="#">Pack-Smart</a></li>
                        <li><a href="#">All packs</a></li>
                      </ul>
                    </div>
                    <div class="col-md-3 hover-div">
                      <h5 class="pb-4">
                        Perfomance
                      </h5>
                      <ul class="list-unstyled">
                        <li><a href="#">Treatment Recommender</a></li>
                        <li><a href="#">Treatments Results</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="li" @mouseenter="isOverlay = true" @mouseleave="isOverlay = false">
                <div v-if="isOverlay" class="overlay" @mouseenter="isOverlay = !isOverlay" />
                <a href="#" class="desktop-item">Equipment</a>
                <input id="showMega2" type="checkbox">
                <label for="showMega2" class="mobile-item">Equipment</label>
                <div class="mega-box bg-white">
                  <div class="row pb-4 col-lg-11 box-row">
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
              <li class="li" @mouseenter="isOverlay = true" @mouseleave="isOverlay = false">
                <div v-if="isOverlay" class="overlay" @mouseenter="isOverlay = !isOverlay" />
                <a href="#">About MCCM</a>
                <input id="showMega5" type="checkbox">
                <label for="showMega5" class="mobile-item">About MCCM</label>
                <div class="mega-box bg-white">
                  <div class="row pb-4 col-lg-11 box-row">
                    <div class="col-md-3 hover-div">
                      <h5 class="pb-4">
                        Company
                      </h5>
                      <ul class="list-unstyled">
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">MCCM Medical Spa</a></li>
                        <li><a href="#">MCCM Solutions</a></li>
                        <li><a href="#">Expansion</a></li>
                      </ul>
                    </div>
                    <div class="col-md-3 hover-div">
                      <h5 class="pb-4">
                        Training
                      </h5>
                      <ul class="list-unstyled">
                        <li><a href="#">Exhibitions & Events</a></li>
                        <li><a href="#">MCCM Training</a></li>
                        <li><a href="#">Documents</a></li>
                      </ul>
                    </div>
                    <div class="col-md-3 hover-div">
                      <h5 class="pb-4">
                        Customer Service
                      </h5>
                      <ul class="list-unstyled">
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Become a Partner</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
              <li class="li" @mouseenter="isOverlay = true" @mouseleave="isOverlay = false">
                <div v-if="isOverlay" class="overlay" @mouseenter="isOverlay = !isOverlay" />
                <a href="#" class="desktop-item">Forum</a>
                <input id="showMega1" type="checkbox">
                <label for="showMega1" class="mobile-item">Forum</label>
                <div class="mega-box bg-white">
                  <div class="row pb-4 col-lg-11 box-row">
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
              <li class="li" @mouseenter="isOverlay = true" @mouseleave="isOverlay = false">
                <div v-if="isOverlay" class="overlay" @mouseenter="isOverlay = !isOverlay" />
                <a href="#" class="desktop-item">Blogs</a>
                <input id="showMega" type="checkbox">
                <label for="showMega" class="mobile-item">Blogs</label>
                <div class="mega-box bg-white">
                  <div class="row pb-4 col-lg-11 box-row">
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
            </ul>-->
          </div>
          <ul class="nav-links">
            <label for="close-btn" class="btn close-btn"><i class="fas fa-times" /></label>

            <!--            <li class="d-xl-none">
              <input id="showMega31" type="checkbox">
              <label for="showMega31" class="mobile-item">
                Products
              </label>
              <div class="mega-box px-0 bg-white">
                <div class="row pb-4 col-12 px-0 mx-auto">
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Professional
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/essentials">
                          Essentials
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/peelings-2">
                          Pellings
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/aesthetical-treatments-2">
                          Aesthetical Treatments
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/mesotheraphy">
                          Mesotherapy
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/fillers">
                          Fillers
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/biorevitalization">
                          Biorevitalization
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/professional">
                          All products
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Homecare
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/dermocosmetic">
                          Dermocosmetic
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/nutricosmetic">
                          Nutricosmetics
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/homecare">
                          All products
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Collections
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/xr">
                          XR
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/gold">
                          Gold
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/platinum">
                          Platinum
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/cellcontroll">
                          Cellcontroll
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/melanoout">
                          Melanoout
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/spa">
                          SPA
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/collections">
                          All collections
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Treatment Solutions
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/ts/acne">
                          Anti-Acne
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/aggression-protector">
                          Aggression Protector
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/anti-aging">
                          Anti-Aging
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/body-contouring">
                          Body Contouring
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/couperose">
                          Couperose
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/depigmentation">
                          Depigmentation
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/eye-area">
                          Eye Area
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products">
                          All Solutions
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li class="d-xl-none">
              <input id="showMega41" type="checkbox">
              <label for="showMega41" class="mobile-item">Professional Treatments</label>
              <div class="mega-box px-0 bg-white">
                <div class="row pb-4 col-12 px-0">
                  <div class="col-12 hover-div">
                    <h5 class="pb-4">
                      Treatment Packs
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">Cvita 180</a></li>
                      <li><a href="#">Glutathione</a></li>
                      <li><a href="#">Pack-Smart</a></li>
                      <li><a href="#">All packs</a></li>
                    </ul>
                  </div>
                  <div class="col-12 hover-div">
                    <h5 class="pb-4">
                      Perfomance
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">Treatment Recommender</a></li>
                      <li><a href="#">Treatments Results</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li class="d-xl-none">
              <input id="showMega21" type="checkbox">
              <label for="showMega21" class="mobile-item">Equipment</label>
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
              <label for="showMega51" class="mobile-item">About MCCM</label>
              <div class="mega-box px-0 bg-white">
                <div class="row pb-4 col-12 px-0 mx-auto">
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Company
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Our Story</a></li>
                      <li><a href="#">MCCM Medical Spa</a></li>
                      <li><a href="#">MCCM Solutions</a></li>
                      <li><a href="#">Expansion</a></li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Training
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">Exhibitions & Events</a></li>
                      <li><a href="#">MCCM Training</a></li>
                      <li><a href="#">Documents</a></li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Customer Service
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">Contact Us</a></li>
                      <li><a href="#">Become a Partner</a></li>
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
              <label for="showMega111" class="mobile-item">Blogs</label>
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
            </li>-->
            <li class="dropdown">
              <div v-if="isLoggedin" style="height: 12px !important;width: 12px !important;background: #25282A;border-radius: 100%;position: absolute;right: 0;" />
              <span
                id="dropdownMenuLink"
                style="cursor: pointer"
                aria-expanded="false"
                @click="isClicked(true)"
              >
                SIGN IN
              </span>
              <ul class="dropdown-menu p-0 mx-0" :class="{'d-block' : Clicked}" aria-labelledby="dropdownMenuLink" @click="isClicked(false)">
                <li v-show="!isLoggedin" class="px-0 py-1 border-bottom mx-0 w-100">
                  <nuxt-link :to="userUrl" class="dropdown-item">
                    Login / Register
                  </nuxt-link>
                </li>
                <li v-show="isLoggedin" class="px-0 mx-0 py-1 border-bottom w-100">
                  <a href="javascript:void(0)" class="dropdown-item w-100">
                    {{ loggedinUser.full_name }}
                  </a>
                </li>
                <li v-show="isLoggedin" class="px-0 py-1 mx-0 border-bottom w-100">
                  <nuxt-link class="dropdown-item w-100" to="wishlist">
                    Wishlist
                  </nuxt-link>
                </li>
                <li v-show="isLoggedin" class="px-0 mx-0 w-100 text-center" style="background: #e8e8e8">
                  <AuthLogout class="dropdown-item" />
                </li>
              </ul>
            </li>
            <li>
              <NuxtLink
                to="/wishlist"
                class="position-relative"
              >
                <img src="@/assets/img/star.svg" alt="herat">
                <span v-show="wishList.length && isLoggedin" class="badge badge-secondary">{{ wishList.length }}</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/cart" class="position-relative">
                <img src="@/assets/img/cart.svg" alt="search">
                <span v-show="products.length && isLoggedin" class="badge badge-secondary">{{ products.length }}</span>
              </NuxtLink>
            </li>
            <li>
              <a href="javascript:void(0)" @click="setSearch"><img src="@/assets/img/search-icon.svg" alt="search"></a>
            </li>
          </ul>
          <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars" /></label>
        </div>
        <div class="wrapper px-0 w-100 justify-content-center">
          <ul class="nav-links d-lg-block d-none">
            <li class="li">
              <div v-if="isOverlay" class="overlay" @mouseenter="isOverlay = !isOverlay" />
              <NuxtLink to="/products">
                COLLECTIONS
              </NuxtLink>
              <input id="showMega3" type="checkbox">
              <label for="showMega3" class="mobile-item">COLLECTIONS</label>
              <div class="mega-box bg-white">
                <div class="row pb-4 col-lg-11 box-row">
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Professional
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/essentials">
                          Essentials
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/peelings-2">
                          Pellings
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/aesthetical-treatments-2">
                          Aesthetical Treatments
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/mesotheraphy">
                          Mesotherapy
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/fillers">
                          Fillers
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/biorevitalization">
                          Biorevitalization
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/professional">
                          All products
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Homecare
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/dermocosmetic">
                          Dermocosmetic
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/nutricosmetic">
                          Nutricosmetics
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/homecare">
                          All products
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Collections
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/xr">
                          XR
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/gold">
                          Gold
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/platinum">
                          Platinum
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/cellcontroll">
                          Cellcontroll
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/melanoout">
                          Melanoout
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/spa">
                          SPA
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/collections">
                          All collections
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Treatment Solutions
                    </h5>
                    <ul class="list-unstyled">
                      <li>
                        <nuxt-link to="/products/ts/acne">
                          Anti-Acne
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/aggression-protector">
                          Aggression Protector
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/anti-aging">
                          Anti-Aging
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/body-contouring">
                          Body Contouring
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/couperose">
                          Couperose
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/depigmentation">
                          Depigmentation
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products/ts/eye-area">
                          Eye Area
                        </nuxt-link>
                      </li>
                      <li>
                        <nuxt-link to="/products">
                          All Solutions
                        </nuxt-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li class="li">
              <div v-if="isOverlay" class="overlay" @mouseenter="isOverlay = !isOverlay" />
              <a href="#">THE BRAND</a>
              <input id="showMega4" type="checkbox">
              <label for="showMega4" class="mobile-item">THE BRAND</label>
              <div class="mega-box bg-white">
                <div class="row pb-4 col-lg-11 box-row">
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Treatment Packs
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">Cvita 180</a></li>
                      <li><a href="#">Glutathione</a></li>
                      <li><a href="#">Pack-Smart</a></li>
                      <li><a href="#">All packs</a></li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Perfomance
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">Treatment Recommender</a></li>
                      <li><a href="#">Treatments Results</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li class="li">
              <div v-if="isOverlay" class="overlay" @mouseenter="isOverlay = !isOverlay" />
              <a href="#" class="desktop-item">NEWS AND EVENTS</a>
              <input id="showMega2" type="checkbox">
              <label for="showMega2" class="mobile-item">NEWS AND EVENTS</label>
              <div class="mega-box bg-white">
                <div class="row pb-4 col-lg-11 box-row">
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
            <li class="li">
              <div v-if="isOverlay" class="overlay" @mouseenter="isOverlay = !isOverlay" />
              <a href="#">NEWS AND EVENTS</a>
              <input id="showMega5" type="checkbox">
              <label for="showMega5" class="mobile-item">NEWS AND EVENTS</label>
              <div class="mega-box bg-white">
                <div class="row pb-4 col-lg-11 box-row">
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Company
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">About Us</a></li>
                      <li><a href="#">Our Story</a></li>
                      <li><a href="#">MCCM Medical Spa</a></li>
                      <li><a href="#">MCCM Solutions</a></li>
                      <li><a href="#">Expansion</a></li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Training
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">Exhibitions & Events</a></li>
                      <li><a href="#">MCCM Training</a></li>
                      <li><a href="#">Documents</a></li>
                    </ul>
                  </div>
                  <div class="col-md-3 hover-div">
                    <h5 class="pb-4">
                      Customer Service
                    </h5>
                    <ul class="list-unstyled">
                      <li><a href="#">Contact Us</a></li>
                      <li><a href="#">Become a Partner</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      isProducts: false,
      isProfessional: false,
      isEuquipment: false,
      isMccm: false,
      isForum: false,
      isProfileClicked: false,
      Clicked: false,
      categories: [],
      isOverlay: false
    }
  },
  computed: {
    userUrl () {
      return this.isLoggedin ? '#' : '/login'
    },
    fullName () {
      return (this.isLoggedin && this.loggedinUser?.full_name) ? `${this.loggedinUser?.full_name.substring(0, 5)}...` : ''
    },
    ...mapState({
      wishList: state => state.cart.wishList,
      products: state => state.cart.products,
      isLoggedin: state => state.user.loggedIn,
      loggedinUser: state => state.user.loggedinUser
    })
  },
  created () {
    if (this.$auth.strategy.token.get()) {
      this.fetchUserInfo()
    } else {
      this.setLoggedin(false)
      this.setLoggedinUser({})
    }
  },
  methods: {
    ...mapActions({
      setSearch: 'setSearch',
      isClicked: 'isClicked'
      // getCountries: 'getCountries'
    }),
    ...mapMutations({
      setLoggedin: 'user/setLoggedin',
      setLoggedinUser: 'user/setLoggedinUser'
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/navbar.scss";
</style>
