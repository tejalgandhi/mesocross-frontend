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
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      fields: [],
      finalData: {},
      positions: [
        { value: 'Business Owner', name: this.$t('business_owner') },
        { value: 'Business Partner', name: this.$t('business_partner') },
        { value: 'Managing Director', name: this.$t('managing_director') },
        { value: 'Department Director', name: this.$t('department_director') },
        { value: 'General Manager', name: this.$t('general_manager') },
        { value: 'Coordinator', name: this.$t('coordinator') },
        { value: 'Sales Manager', name: this.$t('sales_manager') },
        { value: 'Account Manager', name: this.$t('account_manager') },
        { value: 'Purchase Assistant', name: this.$t('purchase_assistant') },
        { value: 'Trainee', name: this.$t('trainee') },
        { value: 'Beauty Professional', name: this.$t('beauty_professional') },
        { value: 'Beauty Consultant', name: this.$t('beauty_consultant') },
        { value: 'Beauty Advisor', name: this.$t('beauty_advisor') },
        { value: 'Physician', name: this.$t('physician') },
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
    this.dataToFields()
    this.getUser()
  },

  methods: {

    ...mapMutations({
      setLoggedinUser: 'user/setLoggedinUser'
    }),

    async getUser () {
      const user = await this.$axios.get('/user')
      this.setLoggedinUser(user.data)
    },

    dataToFields () {
      this.fields = [
        {
          title: 'personal_information',
          items: [
            {
              type: 'text',
              name: 'name',
              tag: 'name',
              value: this.user.first_name
            },
            {
              type: 'text',
              name: 'surname',
              tag: 'surname',
              value: this.user.last_name
            }
          ]
        },
        {
          title: 'password',
          items: [
            {
              type: 'password',
              name: 'old_password',
              tag: 'password',
              value: undefined
            },
            {
              type: 'password',
              name: 'password',
              tag: 'new_password',
              value: undefined
            },
            {
              type: 'password',
              name: 'repeat_password',
              tag: 'new_password_confirmation',
              value: undefined
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
              name: 'phone',
              tag: 'phone_number',
              iso_alpha2: this.user.iso_alpha2,
              dial_code: this.user.dial_code,
              value: this.user.phone_number
            },
            {
              type: 'email',
              name: 'email',
              tag: 'email',
              value: this.user.email
            }
          ]
        },
        {
          title: 'email_options',
          items: [
            {
              type: 'boolean',
              name: 'email_marketing_options',
              tag: 'email_marketing',
              value: this.user.email_marketing
            },
            {
              type: 'boolean',
              name: 'newsletter',
              tag: 'newsletter',
              value: this.user.newsletter || 0
            }
          ]
        }
      ]

      if (this.user.type === 1) {
        this.fields[0].items.push(
          {
            type: 'number',
            name: 'vat_number',
            tag: 'nif',
            value: this.user.nif,
            disabled: this.user?.nif?.length
          })

        this.fields.splice(1, 0, {
          title: 'billing_address',
          items: [
            {
              type: 'text',
              name: 'address',
              tag: 'address',
              value: this.user.address
            },
            {
              type: 'text',
              name: 'postal_code',
              tag: 'postal_code',
              value: this.user.postal_code
            },
            {
              type: 'country',
              name: 'country',
              tag: 'country',
              value: this.user.country_code
            },
            {
              type: 'text',
              name: 'city',
              tag: 'city',
              value: this.user.city || ''
            },
            {
              type: 'text',
              name: 'region',
              tag: 'region',
              value: this.user.region || ''
            }
          ]
        })
      }

      if (this.user.type === 2) {
        this.fields[0].items.push({
          type: 'select-other',
          name: 'position',
          tag: 'position',
          value: this.user.position,
          options: this.positions,
          other: {
            type: 'text',
            name: 'other_position',
            tag: 'other_position',
            value: undefined
          }
        })
      }
    },

    handleSelected (data) {
      this.finalData[data.name] = data.value
    },

    async sendData () {
      const form = this.finalData
      form.iso_alpha = form.iso_alpha2
      form.phone_number = form.phone_no
      const response = await this.$axios.post('change-personal-details', form)

      if (response.status !== 200) {
        this.$toast.error(response.data.message, { duration: 5000, position: 'top-right' })
      }

      this.getUser()
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
            justify-content: start;
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
