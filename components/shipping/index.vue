<template>
  <div>
    <div class="select-text mb-4">
      {{ $t('select_your_address') }}
    </div>
    <template v-if="!addressShow">
      <ShippingAddress
        v-for="(address, index) in addresses"
        :key="index"
        :selected-address="selectedAddress"
        :address="address"
        @addressChange="addressSelect"
        @showEditAddress="addressShow = true"
      />
    </template>
    <template v-else>
      <ShippingAddAddress @addressSave="addressSave" @hideAddAdrress="addressShow = false" />
    </template>
    <div class="py-3 text-right">
      <button v-if="!addressShow" class="btn btn-outline-dark filter-invert" @click="addAddress">
        {{ $t('add_new_address') }}
      </button>
    </div>
    <template v-if="!addressShow && shippings && shippings.length">
      <div class="select-text mb-4">
        {{ $t('select_Your_shipping_mode') }}
      </div>
      <ShippingSelection />
    </template>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      addressShow: false
    }
  },
  computed: {
    ...mapState({
      addresses: state => state.user.address,
      selectedAddress: state => state.user.selectedAddress,
      shippings: state => state.cart.shippings
    })
  },
  mounted () {
    this.getAddress()
    if (this.selectedAddress) {
      setTimeout(() => {
        this.getShippingCharge()
      }, 1000)
    }
  },
  methods: {
    addressSave () {
      this.addressShow = false
      this.getAddress()
    },
    addAddress () {
      this.addressShow = !this.addressShow
      this.resetAddressInput()
    },
    addressSelect ($event) {
      this.settSelectedAddress($event)
    },
    ...mapActions({
      getAddress: 'user/getAddress',
      getShippingCharge: 'cart/getShippingCharge'
    }),
    ...mapMutations({
      settSelectedAddress: 'user/settSelectedAddress',
      resetAddressInput: 'user/resetAddressInput'
    })
  }
}
</script>
