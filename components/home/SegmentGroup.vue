<template>
  <div class="segment-group mt-5 mb-5">
    <div class="container-fluid">
      <h2 class="section-title mb-4 mb-lg-5 text-center">
        {{ title }}
      </h2>
      <div class="row">
        <SegmentSingle v-for="segment, segmentIndex in segmentList" :key="segmentIndex" :segment="segment" />
      </div>
    </div>
  </div>
</template>

<script>
import SegmentSingle from '../product/SegmentSingle.vue'
export default {
  components: { SegmentSingle },
    data() {
        return {
            segmentList: [
                {
                    imgicon: require('@/assets/img/segment-timeless.png'),
                    name:'timeless'
                },
                {
                    imgicon: require('@/assets/img/segment-spiritual.png'),
                    name:'spiritual'
                },
                {
                    imgicon: require('@/assets/img/segment-core.png'),
                    name:'core'
                },
                {
                    imgicon: require('@/assets/img/segment-youth.png'),
                    name:'youth'
                },
                {
                    imgicon: require('@/assets/img/segment-man.png'),
                    name:'man'
                }
            ]
        }
    },
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
    .segment-group{
        position: relative;
        padding: 40px 0;
        .section-title{
            position: relative;
            text-transform: uppercase;
            font-weight: 300;
        }
    }     
</style>
