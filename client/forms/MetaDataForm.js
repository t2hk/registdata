class MetaDataForm {
  constructor () {
    this.metaDataName = ''
    this.samplePictFilePath = ''
    this.samplePictFile = ''
    this.samplePictPreview = ''
    this.registrarEmail = ''
    this.imagePictFilePath = ''
    this.imagePictFile = ''
    this.imagePictPreview = ''
  }

  clear () {
    this.metaDataName = ''
    this.samplePictFilePath = ''
    this.samplePictFile = ''
    this.samplePictPreview = ''
    this.registrarEmail = ''
    this.imagePictFilePath = ''
    this.imagePictFile = ''
    this.imagePictPreview = ''
  }

  setForm (form) {
    this.metaDataName = form.metaDataName
    this.samplePictFilePath = form.samplePictFilePath
    this.samplePictFile = form.samplePictFile
    this.samplePictPreview = form.samplePictPreview
    this.registrarEmail = form.registrarEmail
    this.imagePictFilePath = form.imagePictFilePath
    this.imagePictFile = form.imagePictFile
    this.imagePictPreview = form.imagePictPreview
  }

  setMetaDataName (metaDataName) {
    this.metaDataName = metaDataName
  }

  setRegistrarEmail (registrarEmail) {
    this.registrarEmail = registrarEmail
  }

  setSamplePictFile (samplePictFileName, samplePictFile) {
    this.samplePictFilePath = samplePictFileName
    this.samplePictFile = samplePictFile
  }

  setSamplePictPreview (samplePictPreview) {
    this.samplePictPreview = samplePictPreview
  }

  setImagePictFile (imagePictFileName, imagePictFile) {
    this.imagePictFilePath = imagePictFileName
    this.imagePictFile = imagePictFile
  }

  setImagePictPreview (imagePictPreview) {
    this.imagePictPreview = imagePictPreview
  }

  getFormData () {
    const formData = new FormData()

    formData.append('metaDataName', this.metaDataName)
    formData.append('registrarEmail', this.registrarEmail)
    formData.append('samplePictFilePath', this.samplePictFilePath)
    formData.append('imagePictFilePath', this.imagePictFilePath)
    formData.append('files', this.samplePictFile)
    formData.append('files', this.imagePictFile)

    return formData
  }

  validateMetaDataName () {
    const errors = []
    if (!this.metaDataName || this.metaDataName.length < 1) {
      errors.push('????????????????????????????????????????????????')
    }
    return errors
  }

  validateSamplePictFilePath () {
    const errors = []
    if (!this.samplePictFilePath || this.samplePictFilePath.length < 1) {
      errors.push('????????????????????????????????????????????????')
    }
    return errors
  }

  validateRegistrarEmail () {
    const errors = []
    if (!this.registrarEmail || this.registrarEmail.length < 1) {
      errors.push('???????????????????????????????????????????????????????????????')
    }
    return errors
  }
}

export default MetaDataForm
