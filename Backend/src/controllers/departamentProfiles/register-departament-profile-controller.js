'use strict'

const asyncHandler = require('express-async-handler')
const db = require('../../config/mysql/db')
const { getAllRecords } = require('../../utils/queryPromises')

// @desc    Create departament Profile
// @route   POST /api/perfildepartamentos
// @access  Private/Admin
const registerDepartamentProfile = asyncHandler(async (req, res) => {
  const { codigo_departamento, descripcion_departamento } = req.body
  const isUniqueDepartamentCodeQuery = `
    SELECT * FROM perfil_departamento WHERE perfil_departamento.codigo_departamento = '${codigo_departamento}'
  `

  const isUniqueDepartamentCode = await getAllRecords(isUniqueDepartamentCodeQuery)

  if (isUniqueDepartamentCode.length > 0) {
    return res.status(400).json({ message: 'Ya existe un departamento con ese codigo' })
  }
  db.query(
    `INSERT INTO perfil_departamento (codigo_departamento , descripcion_departamento) VALUES ('${codigo_departamento}', '${descripcion_departamento}')`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.sqlMessage })
      }
      if (result) {
        res.status(201).json({
          message: 'Perfil departamento Creado',
        })
      }
    }
  )
})

module.exports = registerDepartamentProfile
