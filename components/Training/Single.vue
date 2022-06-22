<template>
  <a href="javascript:void(0)" class="course_box" @click="redirectToUser(single)">
    <div class="img_box position-relative">
      <span v-if="single.type == 'premium'" class="text-white px-1 position-absolute sub-badge text-uppercase">Subscription</span>
      <span v-else class="text-white px-1 position-absolute free-badge text-uppercase">FREE</span>
      <img :src="single.thumbnail" class="img-fluid" alt="image">
    </div>
    <div class="content_box p-0">
      <p>{{ single.title }}</p>
      <div>
        {{ single.description | characterLimitContent }}...
      </div>
      <span>{{ $moment(single.created_at).format('D MMMM, YYYY') }}</span>
    </div>
  </a>
</template>
<script>
import { mapState } from 'vuex'
export default {
  filters: {
    characterLimitContent (val) {
      return val.substring(0, 73)
    }
  },
  props: {
    single: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  },
  computed: {
    ...mapState({
      isSubscribed: state => state.training.isSubscribed
    })
  },
  methods: {
    redirectToUser (single) {
      if (single.type === 'premium' && !this.isSubscribed) {
        this.$router.push('training-pack')
      } else {
        this.$router.push(`training-detail/${single.slug}`)
      }
      // /training-detail/${single.slug}
    }
  }
}
</script>
