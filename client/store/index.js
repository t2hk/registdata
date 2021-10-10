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

/**
export const state = () => ({
  metaDataName: '',
  samplePictFilePath: '',
  samplePictFile: '',
  samplePictPreview: '',
  registrarEmail: '',
  imagePictFilePath: '',
  imagePictFile: '',
  imagePictPreview: ''
})

export const mutations = {
  clear: function () {
    this.metaDataName = ''
    this.samplePictFilePath = ''
    this.samplePictFile = ''
    this.samplePictPreview = ''
    this.registrarEmail = ''
    this.imagePictFilePath = ''
    this.imagePictFile = ''
    this.imagePictPreview = ''
  },

  setMetaDataName: function (metaDataName) {
    this.metaDataName = metaDataName
  },

  setRegistrarEmail: function (registrarEmail) {
    this.registrarEmail = registrarEmail
  },

  setSamplePictFile: function (samplePictFileName, samplePictFile) {
    this.samplePictFilePath = samplePictFileName
    this.samplePictFile = samplePictFile
  },

  setSamplePictPreview: function (samplePictPreview) {
    this.samplePictPreview = samplePictPreview
  },

  setImagePictFile: function (imagePictFileName, imagePictFile) {
    this.imagePictFilePath = imagePictFileName
    this.imagePictFile = imagePictFile
  },

  setImagePictPreview: function (imagePictPreview) {
    this.imagePictPreview = imagePictPreview
  },

  getFormData: function () {
    const formData = new FormData()

    formData.append('metaDataName', this.metaDataName)
    formData.append('registrarEmail', this.registrarEmail)
    formData.append('samplePictFilePath', this.samplePictFilePath)
    formData.append('imagePictFilePath', this.imagePictFilePath)
    formData.append('files', this.samplePictFile)
    formData.append('files', this.imagePictFile)

    return formData
  },

  validateMetaDataName: function () {
    const errors = []
    if (!this.metaDataName || this.metaDataName.length < 1) {
      errors.push('メタデータ名を入力してください。')
    }
    return errors
  },

  validateSamplePictFilePath: function () {
    const errors = []
    if (!this.samplePictFilePath || this.samplePictFilePath.length < 1) {
      errors.push('サンプル画像を選択してください。')
    }
    return errors
  },

  validateRegistrarEmail: function () {
    const errors = []
    if (!this.registrarEmail || this.registrarEmail.length < 1) {
      errors.push('登録者のメールアドレスを入力してください。')
    }
    return errors
  }
}
**/
