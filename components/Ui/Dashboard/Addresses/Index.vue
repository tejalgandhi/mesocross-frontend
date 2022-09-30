<template>
  <section v-if="loaded && !isCreating && !isEditing">
    <template v-if="addresses.length">
      <template v-for="(address, i) in addresses">
        <UiDashboardAddressesItem :key="i" :data="address" @edit="selectEdit(i)" />
      </template>
    </template>
    <template v-else>
      <span>{{ $t('no_addresses_created') }}.</span>
    </template>
    <div class="new" @click="isCreating = true">
      <span>{{ $t('create_new_address') }}</span>
      <span class="arrow" />
    </div>
  </section>
  <UiDashboardAddressesForms v-else-if="loaded && (isCreating || isEditing)" :title="isCreating ? $t('create_new_address') : $t('edit_address') " :data=" isCreating ? toCreate : toEdit" @back="handleBack" @submit="handleSubmit" />
  <section v-else-if="!loaded" class="loading">
    <span class="loader" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isCreating: false,
      isEditing: false,
      editingId: undefined,
      loaded: false,
      addresses: [],
      toEdit: [],
      toCreate: []
    }
  },

  computed: {
    ...mapGetters({
      user: 'user/getLoggedinUser'
    })
  },

  watch: {
    isEditing (val) {
      if (!val) {
        this.toEdit = []
      }
    }
  },

  created () {
    this.getAdresses()
    this.dataToFields()
  },

  methods: {
    async getAdresses () {
      this.loaded = false
      const response = await this.$axios.get('/address')
      this.loaded = true
      if (response.data.code !== 200) {
        return
      }
      this.addresses = response.data.data
    },

    selectEdit (index) {
      this.isEditing = true
      this.isCreating = false
      this.handleData(this.addresses[index])
      this.editingId = this.addresses[index].id
    },

    dataToFields () {
      this.toCreate = [
        {
          title: '',
          items: [
            {
              type: 'text',
              name: 'address',
              tag: 'address_first_line'
            },
            {
              type: 'text',
              name: 'address_second_line',
              tag: 'address_second_line'
            },
            {
              type: 'text',
              name: 'postal_code',
              tag: 'post_code'
            },
            {
              type: 'text',
              name: 'city',
              tag: 'city'
            },
            {
              type: 'text',
              name: 'region',
              tag: 'state'
            },
            {
              type: 'country',
              name: 'country',
              tag: 'country_code'
            }
          ]
        },
        {
          title: '',
          items: [
            {
              type: 'phone',
              name: 'phone',
              tag: 'phone_no'
            },
            {
              type: 'email',
              name: 'email',
              tag: 'email'
            }
          ]
        }
      ]
    },

    handleData (item) {
      const items = this.toCreate

      this.toEdit = items.map((el) => {
        return {
          items: el.items.map((e) => {
            if (e.type === 'phone') {
              return {
                type: e.type,
                name: e.name,
                tag: e.tag,
                iso_alpha2: item.iso_alpha2,
                dial_code: item.dial_code,
                value: item[e.tag]
              }
            }
            return {
              type: e.type,
              name: e.name,
              tag: e.tag,
              value: item[e.tag]
            }
          }),
          title: el.title

        }
      })
    },

    handleBack () {
      this.isCreating = false
      this.isEditing = false
    },

    async handleSubmit (data) {
      const form = data
      if (!Object.keys(data).length) {
        this.handleBack()
        return
      }

      if (this.isEditing) {
        form.id = this.editingId
      }

      const response = await this.$axios.post('/address', form)

      if (response.status !== 200) {
        this.$toast.error(response.data.message, { duration: 5000 }, 'top-right')
        return
      }

      this.$toast.success(response.data.message, { duration: 5000, position: 'top-right', className: 'custom-toast-success-class' })
      this.handleBack()
      this.getAdresses()
    }
  }
}
</script>

<style lang="scss" scoped>
    .loading {
        height: 200px;
    }
</style>
