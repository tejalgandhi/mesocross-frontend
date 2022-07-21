<template>
  <div class="shipping">
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

    <div v-if="!addressShow" class="col-md-4 py-4 mx-auto">
      <button class="w-100 d-block btn btn-outline-dark filter-invert" @click="addAddress">
        {{ $t('checkout.add_new_address') }}
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
    this.getAddress(false)
  },
  methods: {
    addressSave () {
      this.addressShow = false
      this.getAddress(false)
    },
    addAddress () {
      this.addressShow = !this.addressShow
      this.resetAddressInput()
    },
    addressSelect ($event) {
      this.settSelectedAddress($event)
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

<style scoped>
.store h2 {
  font: normal normal 600 34px Work Sans;
  letter-spacing: 0px;
  margin: 0 !important;
  color: #25282A;
}
.address-radio {width: 100%; border: 1px solid #0000004D; padding: 20px 0; border-radius: 4px; display: flex !important}
input[type="radio"]:checked + .address-radio {border-color: #25282A;}
.address-radio {min-height: 100px;}
[type="radio"]:checked + label:before, [type="radio"]:not(:checked) + label:before {top: calc(50% - 9px);left: 20px;}
[type="radio"]:checked + label:after, [type="radio"]:not(:checked) + label:after {top: calc(50% - 5px);left: 24px;}
</style>
