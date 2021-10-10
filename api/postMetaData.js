const express = require('express')
const app = express()
const multer = require('multer')

const upload = multer({ inMemory: true, storage: multer.memoryStorage() })

// GET メソッドによる message API
app.post('/metadata', upload.array('files'), async (req, res, next) => {
  console.log('[POST] [/api/metadata]')
  console.log(JSON.stringify(req.body))

  const metaDataName = req.body.metaDataName
  const registrarEmail = req.body.registrarEmail
  const samplePictFilePath = req.body.samplePictFilePath
  const imagePictFilePath = req.body.imagePictFilePath
  const files = req.files

  console.log('メタデータ名: ', metaDataName)
  console.log('登録者メールアドレス: ', registrarEmail)
  console.log('データファイルパス: ', samplePictFilePath)
  console.log('データ画像ファイルパス: ', imagePictFilePath)

  let samplePictFile = ''
  let imagePictFile = ''

  for (let i = 0; i < files.length; i++) {
    const orgName = files[i].originalname

    if (samplePictFilePath === orgName) {
      samplePictFile = files[i]
    } else if (imagePictFilePath === orgName) {
      imagePictFile = files[i]
    }
  }

  console.log('サンプル画像ファイル: ', samplePictFile)
  console.log('イメージ画像ファイル: ', imagePictFile)

  res.send('The meta data is registered.')
})

module.exports = app
