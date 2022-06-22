<template>
  <div class="mega-box bg-white">
    <div class="row pb-4 col-lg-11 box-row">
      <div v-for="(children, childKey) in parentChildren" :key="childKey" class="col-md-3 hover-div">
        <h5 v-if="children.slug" class="pb-4">
          <nuxt-link v-if="children.slug && children.slug" :to="children | slug ">
            {{ children.name }}
          </nuxt-link>
        </h5>
        <h5 v-else class="pb-4">
          {{ children.name }}
        </h5>
        <ul class="list-unstyled">
          <li v-for="(children1, childKey1) in children.children" :key="childKey1">
            <nuxt-link v-if="children1.slug && children1.slug" :to="children1 | slug ">
              {{ children1.name }}
            </nuxt-link>
            <a v-else href="javascript:void(0)">{{ children1.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  filters: {
    slug (value) {
      if (value.type === '') {
        return value.slug
      }
      switch (value.type) {
        case 'product':
          return `product-detail/${value.slug}`
        case 'treatment':
          return `/products/ts/${value.slug}`
        case 'category':
          return `/products/${value.slug}`
        case 'blog':
          return `/blog-detail/${value.slug}`
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
