'use strict'

const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    let directoryPath = ''
    switch (req.baseUrl) {
      case '/api/visits':
        directoryPath = 'public/assets/img/visits/'
        break
      case '/api/users':
        directoryPath = 'public/assets/img/avatars/'
        break
      default:
        break
    }

    cb(null, directoryPath)
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Solo Imagenes Permitidas!')
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

module.exports = { upload }
