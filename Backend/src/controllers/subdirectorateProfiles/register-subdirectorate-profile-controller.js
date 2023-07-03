'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Create subdirectorate Profile
// @route   POST /api/perfilsubdirecciones
// @access  Private/Admin
const registerSubdirectorateProfile = asyncHandler(async (req, res) => {
  const { codigo_subdireccion, descripcion_subdireccion } = req.body

  const isUniqueSubdirectorateCodeQuery = `
  SELECT * FROM perfil_subdireccion WHERE perfil_subdireccion.codigo_subdireccion = '${codigo_subdireccion}'
`

  const isUniqueDirectorateCode = await getAllRecords(isUniqueSubdirectorateCodeQuery)

  if (isUniqueDirectorateCode.length > 0) {
    return res.status(400).json({ message: 'Ya existe un servicio con ese codigo' })
  }
  db.query(
    `INSERT INTO perfil_subdireccion (codigo_subdireccion , descripcion_subdireccion) VALUES ('${codigo_subdireccion}', '${descripcion_subdireccion}')`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result) {
        res.status(201).json({
          message: 'Perfil subdirección Creado',
        })
      }
    }
  )
})

module.exports = registerSubdirectorateProfile
