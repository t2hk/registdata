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
  const dataFilePath = req.body.dataFilePath
  const dataPictFilePath = req.body.dataPictFilePath
  const files = req.files

  console.log('メタデータ名: ', metaDataName)
  console.log('登録者メールアドレス: ', registrarEmail)
  console.log('データファイルパス: ', dataFilePath)
  console.log('データ画像ファイルパス: ', dataPictFilePath)

  let dataFile = ''
  let dataPictFile = ''

  for (let i = 0; i < files.length; i++) {
    const orgName = files[i].originalname

    if (dataFilePath === orgName) {
      dataFile = files[i]
    } else if (dataPictFilePath === orgName) {
      dataPictFile = files[i]
    }
  }

  console.log('データファイル: ', dataFile)
  console.log('データ画像ファイル: ', dataPictFile)

  res.send('The meta data is registered.')
})

module.exports = app
