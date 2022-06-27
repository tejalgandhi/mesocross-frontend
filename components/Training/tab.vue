<template>
  <div>
    <ul id="myTab" class="nav nav-tabs justify-content-center align-items-center border-0" role="tablist">
      <!-- <li class="nav-item text-center" :class="{'active': tabIndex == 1}">
        <a class="nav-link border-0 mx-0 px-2" :class="{'active': tabIndex == 1}" data-toggle="tab" @click="setTabIndex(1)">
          <span class="d-flex justify-content-center align-items-center mx-auto">1</span>
          <p class="mt-2">{{ $t('shipping') }}</p>
        </a>
      </li> -->
      <li class="nav-item text-center" :class="{'active': tabIndex == 1}">
        <a class="nav-link d-flex mx-0 align-items-center justify-content-between border-0 px-2" :class="{'active': tabIndex == 1}" data-toggle="tab" @click="setTabIndex(1)">
          <div>
            <span class="d-flex justify-content-center align-items-center mx-auto">1</span>
            <p class="mt-2">{{ $t('payment') }}</p>
          </div>
          <div class="div ml-3 mb-4 d-md-inline" />
        </a>
      </li>
      <li class="nav-item text-center" :class="{'active': tabIndex == 2}">
        <a class="nav-link border-0 mx-0 px-2" data-toggle="tab" :class="{'active': tabIndex == 2}" @click="setTabIndex(2)">
          <span class="d-flex justify-content-center align-items-center mx-auto">2</span>
          <p class="mt-2">{{ $t('review') }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    setTabIndex (index) {
      this.$emit('setTab', index)
    }
  }
}
</script>
