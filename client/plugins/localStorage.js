import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'myapp',
    paths: ['registForm']
  })(store)
}
