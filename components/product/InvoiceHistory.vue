<template>
  <div class="orders">
    <div v-for="(i, index) in 3" :key="i" class="row justify-content-between mb-3 py-3 order-item" :class="index === 0 ? 'border-bottom': null">
      <div class="col">
        <h5 class="order-product-title">
          Encomenda n.º 52179874575
        </h5>
        <div class="price-detail mb-3">
          7/10/2021
        </div>
        <div class="price">
          <span class="d-block text-light">19,95 EUR</span>
        </div>
      </div>
      <div class="col-auto">
        <nuxt-link to="#" class="see-link">
          DOWNLOAD
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

.orders{
    .order-item{
        border-color: rgba(#000000, 0.12) !important;
    }
    .order-product-title{
        font: normal normal normal 16px/24px Arial;
letter-spacing: 0px;
color: #231F20;
    }
    .sent{
        font: normal normal bold 12px/16px Arial;
letter-spacing: 0px;
color: #F18500;
    }
    .order-image{
    img{
        width: 80px;
        height: 112px;
        object-fit: contain;
    }
    }
    .price-detail,
    .price{
        font: normal normal normal 14px/18px Work Sans;
letter-spacing: 0px;
color: #000000;
opacity: 0.3;
    }
    .price{
      opacity: 1;
    }
    .see-link{
        font: normal normal normal 14px/16px Arial;
letter-spacing: 0px;
color: #231F20;
text-decoration: underline;
    }
}
</style>
