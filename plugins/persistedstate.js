import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'vuex',
    paths: ['lang', 'languagePopup', 'cart', 'user', 'training']
  })(store)
}
