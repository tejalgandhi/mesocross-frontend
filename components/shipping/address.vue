<template>
  <div>
    <input
      :id="`Add_${address.id}`"
      class="form-check-input"
      :checked="selectedAddress === address.id"
      type="radio"
      name="flexRadioDefault"
      @change="$emit('addressChange', address.id)"
    >
    <label class="address-radio row d-block d-md-flex mx-0 align-items-center mb-3" :for="`Add_${address.id}`">
      <div v-if="loggedinUser.type === 2" class="col-12 mb-2 mb-md-0 col-md-3">
        <div class="form-check px-0">
          <label class="form-check-label font-16 text-dark" :for="`Add_${address.id}`">
            {{ address.company_name }}
          </label>
        </div>
      </div>
      <div class="col-12 mb-2 mb-md-0 col-md-3">
        <p class="font-16 text-dark m-0 text-uppercase">{{ address.address_first_line }} {{ address.address_second_line }}</p>
      </div>
      <div class="col-12 mb-2 mb-md-0 col-md-3 text-left">
        <p class="font-16 text-dark m-0 text-uppercase">{{ address.country }}</p>
      </div>
      <div class="col-12 mb-2 mb-md-0 col-md-3 text-left text-md-right ml-auto">
        <a href="javascript:void(0)" class="font-16 text-dark m-0 border-bottom d-inline" @click="editAddress">{{ $t('edit_address') }}</a>
      </div>
    </label>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  props: {
    address: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {}
    },
    selectedAddress: {
      type: Number,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: ''
    }
  },
  computed: {
    ...mapState({
      loggedinUser: state => state.user.loggedinUser
    })
  },
  methods: {
    editAddress () {
      this.$emit('showEditAddress')
      this.setSingleAddress(this.address)
    },
    ...mapMutations({
      setSingleAddress: 'user/setSingleAddress'
    })
  }
}
</script>
