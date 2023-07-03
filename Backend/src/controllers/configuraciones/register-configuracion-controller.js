'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Create configuracion
// @route   POST /api/configuraciones
// @access  Private/Admin
const registerConfiguracion = asyncHandler(async (req, res) => {
  const { parametro, valor, descripcion } = req.body

  const isUniqueConfiguracionQuery = `
    SELECT * FROM configuraciones WHERE configuraciones.parametro = '${parametro}'
  `

  const isUniqueParametro = await getAllRecords(isUniqueConfiguracionQuery)

  if (isUniqueParametro.length > 0) {
    return res.status(400).json({ message: 'Ya existe una configuración con ese parámetro' })
  }

  db.query(
    `INSERT INTO configuraciones (parametro, valor, descripcion) VALUES ('${parametro}', ${valor}, '${descripcion}')`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result) {
        res.status(201).json({
          message: 'Configuración Creada',
        })
      }
    }
  )
})
module.exports = registerConfiguracion
