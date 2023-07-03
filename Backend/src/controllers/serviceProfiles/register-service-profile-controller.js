'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Create service Profile
// @route   POST /api/perfilservicios
// @access  Private/Admin
const registerServiceProfile = asyncHandler(async (req, res) => {
  const { codigo_servicio, descripcion_servicio } = req.body

  const isUniqueServiceCodeQuery = `
  SELECT * FROM perfil_servicio WHERE perfil_servicio.codigo_servicio = '${codigo_servicio}'
`

  const isUniqueServiceCode = await getAllRecords(isUniqueServiceCodeQuery)

  if (isUniqueServiceCode.length > 0) {
    return res.status(400).json({ message: 'Ya existe un servicio con ese codigo' })
  }

  db.query(
    `INSERT INTO perfil_servicio (codigo_servicio , descripcion_servicio) VALUES ('${codigo_servicio}', '${descripcion_servicio}')`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result) {
        res.status(201).json({
          message: 'Perfil servicio Creado',
        })
      }
    }
  )
})

module.exports = registerServiceProfile
