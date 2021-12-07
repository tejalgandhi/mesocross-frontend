<template>
  <div class="best_seller">
    <div class="container">
      <h2>{{ title }}</h2>
      <div class="row justify-content-center">
        <div class="col-lg-3">
          <div class="prod_box">
            <img src="@/assets/img/p2.png" alt="">
            <div class="desc_box">
              <a href="#">Sun cream 50+</a>
              <p>Cream for oily skin</p>
              <span>35€</span>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="prod_box">
            <img src="@/assets/img/p2.png" alt="">
            <div class="desc_box">
              <a href="#">Sun cream 50+</a>
              <p>Cream for oily skin</p>
              <span>35€</span>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="prod_box">
            <img src="@/assets/img/p2.png" alt="">
            <div class="desc_box">
              <a href="#">Sun cream 50+</a>
              <p>Cream for oily skin</p>
              <span>35€</span>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="prod_box">
            <img src="@/assets/img/p2.png" alt="">
            <div class="desc_box">
              <a href="#">Sun cream 50+</a>
              <p>Cream for oily skin</p>
              <span>35€</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Recently Viewed'
    }
  }
}
</script>
