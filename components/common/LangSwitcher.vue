<template>
  <div>
    <button class="bg-transparent d-flex align-items-center text-light" @click="$bvModal.show('lang')">
      {{ userCountryCode }}{{ $i18n.locale.toUpperCase() }}
      <img src="../../assets/img/angel-down.svg" class="icon-down ml-2" alt="image">
    </button>

    <b-modal
      id="lang"
      class="modal fade"
      tabindex="-1"
      aria-hidden="true"
      centered
      hide-footer
      hide-header
    >
      <template #default="">
        <div class="">
          <div class="">
            <div class="">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" />
            </div>
            <div class="lang_box">
              <img src="@/assets/img/close.svg" alt="image" class="close" @click="hideModal()">
              <h3>{{ $t('please_select_your_language') }}</h3>
              <form action="">
                <p>
                  <span>{{ $t('language') }}</span>
                  <select v-model="vModelSetLanguage" class="form-control mb-3">
                    <option value="" disabled>
                      {{ selectedLocaleName.name }}
                    </option>
                    <option v-for="language in availableLocales" :key="language.code" :value="language">
                      {{ language.name }}
                    </option>
                  </select>
                </p>
                <button class="btn btn-primary btn-block" @click.prevent.stop="setLanguage(vModelSetLanguage)">
                  {{ $t('confirm') }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </template>

      <template #modal-footer="">
        <button @click.prevent.stop="setLanguage(vModelSetLanguage)">
          Confirm
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      vModelSetLanguage: ''
    }
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    selectedLocaleName () {
      const selectedName = this.$i18n.locales.filter(i => i.code === this.$i18n.locale)
      return selectedName[0]
    },
    userCountryCode () {
      let userCode = ''
      if (this.loggedinUser?.country_code) { userCode = `${this.loggedinUser.country_code}/` }
      return userCode
    },
    ...mapState({
      languageSelected: state => state.lang,
      loggedinUser: state => state.user.loggedinUser
    })
  },
  mounted () {
    // console.log('tee')
    // this.showModalOnLoad()
  },
  methods: {
    setLanguage (locale) {
      this.$i18n.setLocale(locale.code)
      this.setStoreLang(locale.code)
      this.setLanguagePopUp(false)
      this.$bvModal.hide('lang')
      setTimeout(() => {
        window.location.reload(true)
      }, 300)
    },
    showModalOnLoad () {
      if (!this.languageSelected) {
        this.openModalSetUp()
      }
    },
    openModalSetUp () {
      this.$bvModal.show('lang')
    },
    showModal () {
      this.openModalSetUp()
    },
    hideModal () {
      this.$bvModal.hide('lang')
      this.setLanguagePopUp(false)
    },
    ...mapMutations({
      setStoreLang: 'setStoreLang',
      setLanguagePopUp: 'setLanguagePopUp'
    })
  }
}
</script>

<style lang="scss" scoped>
div {
    button {
        @media screen and (max-width: 1200px){
            padding: 0 !important;
        }
    }
}

</style>

<style>
.icon-down{
  height: 15px !important;
  width: 15px !important;
}
</style>
