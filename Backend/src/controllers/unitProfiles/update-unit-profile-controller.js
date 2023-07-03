'use strict'

const asyncHandler = require('express-async-handler')
const { NULL } = require('mysql/lib/protocol/constants/types')
const db = require('../../config/mysql/db')

// @desc    Update unit profile
// @route   put /api/perfilunidades/:id
// @access  Private/Admin
const updateUnitProfile = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { codigo_unidad, descripcion_unidad, activo, fecha_baja } = req.body

  const variableValues = [
    { active: activo },
    { unitCode: codigo_unidad },
    { unitDescription: descripcion_unidad },
    { fecha_baja },
  ]

  const keysQuery = []
  const valuesQuery = []

  variableValues.map((data, i) => {
    if (data.active) {
      keysQuery.push('activo = ?')
      valuesQuery.push(`${data.active}`)
      if (data.active === 'NO') {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(`${fecha_baja}`)
      } else {
        keysQuery.push('fecha_baja = ?')
        valuesQuery.push(`${NULL}`)
      }
    }
    if (data.unitDescription) {
      keysQuery.push('descripcion_unidad = ?')
      valuesQuery.push(`${data.unitDescription}`)
    }
    if (data.unitCode) {
      keysQuery.push('codigo_unidad = ?')
      valuesQuery.push(`${data.unitCode}`)
    }
  })

  db.query('SELECT * FROM perfil_unidad WHERE id_unidad = ? ', id, (err, results) => {
    if (err) {
      res.status(400).json({ message: err.sqlMessage })
    }
    if (results.length < 1) {
      res.status(404).json({ message: 'No existe una perfil unidad con ese id' })
    } else {
      db.query(
        `UPDATE perfil_unidad SET ${keysQuery.toString()} WHERE id_unidad = '${id}'`,
        valuesQuery,
        (err, result) => {
          if (err) {
            res.status(400).json({ message: err.sqlMessage })
          }
          if (result) {
            res.status(201).json({
              message: 'Perfil unidad editado correctamente',
            })
          }
        }
      )
    }
  })
})

module.exports = updateUnitProfile
