<template>
  <div class="mega-box bg-white blog-menu">
    <div class="row pb-4 col-lg-11 box-row">
      <div v-for="(children, childKey) in parentChildren" :key="childKey" class="col-md-3 hover-div">
        <h5 class="pb-4 font-weight-bold">
          {{ children.title }}
        </h5>
        <nuxt-link v-if="children.slug && children.slug" :to="children | slug" class="p-0 d-block" style="line-height: normal">
          <div class="blog-item">
            <div class="img-div">
              <img :src="children.image" alt="image">
            </div>
            <div class="pb-4 pt-3" :inner-html.prop="children.short_description | stringLimit" />
            {{ children.name }}
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  filters: {
    stringLimit (value) {
      if (value) {
        return `${value.substring(0, 50)}.`
      } else {
        return ''
      }
    },
    slug (value) {
      switch (value.type) {
        case 'blog':
          return `/blog-detail/${value.slug}`
        case 'equipment':
          if (value.slug === 'see-all-equipment') {
            return '/all-equipments'
          } else {
            return `/equipment-details/${value.slug}`
          }
        default:
          return ''
      }
    }

  },
  props: {
    parent: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapState({
      headerMenuChildren: state => state.menu.headerMenuChildren,
      currentHoverMenu: state => state.menu.currentHoverMenu
    }),
    parentChildren () {
      return this.headerMenuChildren[this.currentHoverMenu]
    }
  }

}
</script>
