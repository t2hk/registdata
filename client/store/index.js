export const state = () => ({
  registForm: ''
})

export const mutations = {
  setRegistForm (state, form) {
    console.log('call setRegistForm: ', form)
    state.registForm = form
  },
  clearRegistForm () {
    console.log('call clearRegistForm')
    state.registForm = null
  }
}
