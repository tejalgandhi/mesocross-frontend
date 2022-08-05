<template>
  <div class="orders">
    <div v-for="(i, index) in 2" :key="i" class="row justify-content-between mb-4 py-4 order-item" :class="index === 0 ? 'border-bottom': null">
      <div class="col-auto">
        <div class="order-image">
          <img src="@/assets/img/p1.png">
        </div>
      </div>
      <div class="col">
        <div class="sent mb-1">
          SENT
        </div>
        <h5 class="order-product-title">
          Encomenda n.º 52179874575
        </h5>
        <div class="price-detail">
          Entregue a 7/10/2021
          <br>3/10/2021 - 19,95 EUR
        </div>
      </div>
      <div class="col-auto">
        <nuxt-link to="#" class="see-link">
          SEE DETAILS
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
        font: normal normal normal 16px/16px Arquitecta;
letter-spacing: 0px;
color: #231F20;
    }
    .sent{
        font: normal normal bold 12px/16px Arquitecta;
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
    .price-detail{
        font: normal normal normal 14px/18px Arquitecta;
letter-spacing: 0px;
color: #000000;
opacity: 0.3;
    }
    .see-link{
        font: normal normal normal 14px/16px Arquitecta;
letter-spacing: 0px;
color: #231F20;
text-decoration: underline;
    }
}
</style>
