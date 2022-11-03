<template>
  <form @submit.prevent="sendData">
    <template v-for="(item, i) in fields">
      <div :key="i" class="field">
        <h2>{{ $t(item.title) }}</h2>
        <template v-for="(field, index) in item.items">
          <UiDashboardInputs :key="index" :data="field" @selected="handleSelected" />
        </template>
      </div>
    </template>
    <button type="submit">
      <span>{{ $t('submit') }}</span>
      <span class="arrow" />
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      fields: [],
      finalData: {},
      industry_sectors: [
        { value: 'Beauty Clinic', name: this.$t('beauty_clinic') },
        { value: 'Spa Clinic', name: this.$t('spa_clinic') },
        { value: 'Distributor', name: this.$t('distributor') },
        { value: '', name: this.$t('other_please_describe') }
      ]
    }
  },

  computed: {
    ...mapGetters({
      user: 'user/getLoggedinUser'
    })
  },

  created () {
    this.getERPData()
  },

  methods: {
    async getERPData () {
      await this.$axios.get('user')
      this.dataToFields()
    },

    dataToFields () {
      this.fields = [
        {
          title: 'personal_information',
          items: [
            {
              type: 'text',
              name: 'name',
              tag: 'company_name',
              value: this.user.company_name
            },
            {
              type: 'number',
              name: 'vat_number',
              tag: 'nif',
              value: this.user.nif,
              disabled: true
            }
          ]
        },
        {
          title: 'billing_address',
          items: [
            {
              type: 'text',
              name: 'address',
              tag: 'company_address_first_line',
              value: this.user.address
            },
            {
              type: 'text',
              name: 'postal_code',
              tag: 'company_postal_code',
              value: this.user.postal_code
            },
            {
              type: 'country',
              name: 'country',
              tag: 'country_code',
              value: this.user.country_code
            },
            {
              type: 'text',
              name: 'city',
              tag: 'company_city',
              value: this.user.city || ''
            }
          ]
        },
        {
          title: 'contacts',
          items: [
            {
              type: 'select',
              name: 'language',
              tag: 'language',
              value: this.user.language,
              options: [
                {
                  name: this.$t('portuguese'),
                  value: 'pt'
                },
                {
                  name: this.$t('spanish'),
                  value: 'es'
                },
                {
                  name: this.$t('english'),
                  value: 'en'
                }
              ]
            },
            {
              type: 'phone',
              name: 'company_phone_number',
              tag: 'company_phone_number',
              iso_alpha2: this.user.iso_alpha2,
              dial_code: this.user.dial_code,
              value: this.user.company_phone_number
            },
            {
              type: 'select-other',
              name: 'industry_sector',
              tag: 'industry_sector',
              value: this.user.industry_sector,
              options: this.industry_sectors,
              other: {
                type: 'text',
                name: 'other_sector',
                tag: 'other_sector',
                value: undefined
              }
            },
            {
              type: 'text',
              name: 'website',
              tag: 'company_website',
              value: this.user.company_website
            }
          ]
        }
      ]
    },

    handleSelected (data) {
      this.finalData[data.name] = data.value
    },

    async sendData () {
      const form = this.finalData
      form.iso_alpha = form.iso_alpha2
      form.company_phone_number = form.phone_no
      form.company_email = this.user.email

      const response = await this.$axios.post('user/store-company-data', form)

      if (response.status !== 200) {
        this.$toast.error(response.data.message, { duration: 5000, position: 'top-right' })
      }

      this.getERPData()
      this.$toast.success(response.data.message, { duration: 3000, position: 'top-right', className: 'custom-toast-success-class' })
    }
  }
}
</script>

<style lang="scss" scoped>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;

        .field {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            h2 {
                font-weight: 600;
                font-size: 20px;
            }
        }

        button {
            margin: 10px 0 40px;
            width: fit-content;
            min-width: 12rem;
            background: #25282A;
            color: white;
            padding: 10px 20px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.5rem;
            transition: 0.2s;

            &:hover {
                background: #25282ad0;
                .arrow {
                    margin-left: 5px;
                }
            }

            .arrow {
                width: 8px;
                height: 8px;
                border: solid 1px;
                border-color: white white transparent transparent;
                transform: rotate(45deg);
                transition: 0.2s;
            }
        }

    }
</style>
