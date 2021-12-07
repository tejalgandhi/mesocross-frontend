<template>
  <div>
    <div class="select-text my-3">
      Select your address
    </div>
    <template v-if="!addressShow">
      <ShippingAddress
        v-for="(address, index) in addresses"
        :key="index"
        :selected-address="selectedAddress"
        :address="address"
        @addressChange="settSelectedAddress($event)"
        @showEditAddress="addressShow = true"
      />
    </template>
    <template v-else>
      <ShippingAddAddress @addressSave="addressSave" @hideAddAdrress="addressShow = false" />
    </template>
    <div class="col-md-4 py-4 mx-auto">
      <button v-if="!addressShow" class="w-100 d-block btn btn-outline-dark" @click="addAddress">
        Add New Address
      </button>
    </div>
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
      selectedAddress: state => state.user.selectedAddress
    })
  },
  mounted () {
    this.getAddress()
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
    ...mapActions({
      getAddress: 'user/getAddress'
    }),
    ...mapMutations({
      settSelectedAddress: 'user/settSelectedAddress',
      resetAddressInput: 'user/resetAddressInput'
    })
  }
}
</script>
