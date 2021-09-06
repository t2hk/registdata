class MetaDataForm {
  constructor () {
    this.metaDataName = ''
    this.dataFilePath = ''
    this.dataFile = ''
    this.registrarEmail = ''
    this.dataPictFilePath = ''
    this.dataPictFile = ''
    this.dataPictPreview = ''
  }

  clear () {
    this.metaDataName = ''
    this.dataFilePath = ''
    this.dataFile = ''
    this.registrarEmail = ''
    this.dataPictFilePath = ''
    this.dataPictFile = ''
    this.dataPictPreview = ''
  }

  addDataFile (dataFileName, dataFile) {
    this.dataFilePath = dataFileName
    this.dataFile = dataFile
  }

  addDataPictFile (dataPictFileName, dataPictFile) {
    this.dataPictFilePath = dataPictFileName
    this.dataPictFile = dataPictFile
  }

  addDataPictPreview (dataPictPreview) {
    this.dataPictPreview = dataPictPreview
  }

  getFormData () {
    const formData = new FormData()

    formData.append('metaDataName', this.metaDataName)
    formData.append('registrarEmail', this.registrarEmail)
    formData.append('dataFilePath', this.dataFilePath)
    formData.append('dataPictFilePath', this.dataPictFilePath)
    formData.append('files', this.dataFile)
    formData.append('files', this.dataPictFile)

    return formData
  }

  validateMetaDataName () {
    const errors = []
    if (!this.metaDataName || this.metaDataName.length < 1) {
      errors.push('データ名を入力してください。')
    }
    return errors
  }

  validateDataFilePath () {
    const errors = []
    if (!this.dataFilePath || this.dataFilePath.length < 1) {
      errors.push('データのファイルパスを入力してください。')
    }
    return errors
  }

  validateRegistrarEmail () {
    const errors = []
    if (!this.registrarEmail || this.registrarEmail.length < 1) {
      errors.push('登録者のメールアドレスを入力してください。')
    }
    return errors
  }
}

export default MetaDataForm
