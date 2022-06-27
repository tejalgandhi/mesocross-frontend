<template>
  <section class="our-mission">
    <div class="container">
      <div class="row no-gutters">
        <div class="col-12">
          <div class="mission-banner">
            <div class="inner-content text-center">
              <!-- eslint-disable vue/no-v-html -->
              <p class="title-34">
                {{ data.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Mission',
  // eslint-disable-next-line vue/require-prop-types
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>
.our-mission .mission-banner::before{
  background-color: rgba(0, 0, 0, 0);
}

.our-mission .mission-banner .inner-content p {
    color: #000;
}
</style>
