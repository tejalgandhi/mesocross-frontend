<template>
  <div class="breadcrumb px-0 px-md-3 mb-0 mb-md-3">
    <div class="container-fluid pl-md-0">
      <ul class="d-flex">
        <li v-for="(item, index) in items" :key="index" :class="{'first': index == 0, 'active': item.active == 1}">
          <nuxt-link v-if="item.active != 1" :to="item.path">
            {{ $t(item.label) }}
          </nuxt-link>
          <template v-else>
            {{ $t(item.label) }}
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    }
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb{
  font: normal normal normal 12px/16px Arial;
  letter-spacing: 0px;
  text-transform: uppercase;
    a:after{
      content: "/";
    margin: 0 4px 0 1px;
    }
  li.active{
    color: rgba(255, 255, 255, .6);
  }
}
</style>
