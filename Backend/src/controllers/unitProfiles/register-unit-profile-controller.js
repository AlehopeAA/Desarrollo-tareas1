'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Create unit Profile
// @route   POST /api/perfilunidades
// @access  Private/Admin
const registerUnitProfile = asyncHandler(async (req, res) => {
  const { codigo_unidad, descripcion_unidad } = req.body

  const isUniqueUnitCodeQuery = `
    SELECT * FROM perfil_unidad WHERE perfil_unidad.codigo_unidad = '${codigo_unidad}'
  `

  const isUniqueUnitCode = await getAllRecords(isUniqueUnitCodeQuery)

  if (isUniqueUnitCode.length > 0) {
    return res.status(400).json({ message: 'Ya existe una unidad con ese codigo' })
  }

  db.query(
    `INSERT INTO perfil_unidad (codigo_unidad , descripcion_unidad) VALUES ('${codigo_unidad}', '${descripcion_unidad}')`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result) {
        res.status(201).json({
          message: 'Perfil unidad Creado',
        })
      }
    }
  )
})
module.exports = registerUnitProfile
